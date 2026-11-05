#!/usr/bin/env python3
"""Original procedural score and sound design, no sampled or quoted recordings.
Usage: python scripts/audio.py [--output output/soundtrack.wav]
600 seconds / stereo PCM16 / 48000 Hz. All synthesis is deterministic.
"""
from pathlib import Path
import argparse,json,wave
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
SR=48000
BOUNDS=[0,25,80,130,185,240,295,345,395,440,495,555,600]
# Original harmonic colour plans: base MIDI, voicing, pulse seconds, intensity.
PLANS=[(38,[0,7,14,19],2.8,.7),(43,[0,7,12,16],2.1,.7),(38,[0,7,10,17],1.4,.85),
       (45,[0,7,12,15],1.8,.85),(41,[0,7,12,14],2.5,.65),(43,[0,7,12,16],1.4,.8),
       (38,[0,7,14,19],1.65,.9),(36,[0,7,10,14],3.2,.5),(45,[0,7,12,19],.85,.75),
       (43,[0,7,12,15],1.6,.8),(38,[0,7,12,14],.8,.9),(41,[0,7,12,15],3.2,.62)]
def hz(m): return 440*2**((m-69)/12)
def env(n,attack=.02,release=.3):
    out=np.ones(n,dtype=np.float32)
    a=min(n,int(attack*SR));r=min(n,int(release*SR))
    out[:a]=np.linspace(0,1,a);out[-r:]*=np.linspace(1,0,r)
    return out

def add_tone(y,start,duration,midi,volume,pan=0,decay=2):
    i=int(start*SR);n=min(len(y)-i,int(duration*SR))
    if n<=0 or i<0:return
    tt=np.arange(n,dtype=np.float32)/SR
    f=hz(midi)
    s=(np.sin(2*np.pi*f*tt)+.22*np.sin(2*np.pi*2*f*tt)+.06*np.sin(2*np.pi*3*f*tt))
    s*=np.exp(-tt*decay)*env(n,.012,.3)*volume
    y[i:i+n,0]+=s*np.sqrt((1-pan)/2)
    y[i:i+n,1]+=s*np.sqrt((1+pan)/2)

def chapter_score(ch):
    duration=BOUNDS[ch+1]-BOUNDS[ch]
    n=duration*SR;t=np.arange(n,dtype=np.float32)/SR
    base,voicing,pulse,energy=PLANS[ch]
    y=np.zeros((n,2),dtype=np.float32)
    # Stereo evolving pad. Low harmonics form the instrumental foundation.
    fade=np.minimum(1,t/2.5)*np.minimum(1,(duration-t)/2.8)
    for k,interval in enumerate(voicing):
        f=hz(base+interval)
        swell=(.68+.24*np.sin(2*np.pi*t/(11+k*3)+k))*fade
        for channel,detune in [(0,-.001),(1,.001)]:
            y[:,channel]+=(np.sin(2*np.pi*f*(1+detune)*t+.09*np.sin(.2*t))* .013*energy*swell)
    # A nonquoted, deterministic pentatonic pattern; varied by chapter.
    scale=[0,7,12,14,19,16,12,7]
    if ch not in (7,11):
        for j,start in enumerate(np.arange(1,duration-1,pulse)):
            midi=base+24+scale[(j*3+ch)%len(scale)]
            add_tone(y,float(start),min(2.5,duration-start),midi,.018*energy,float(np.sin(j*1.7)*.65),2.3)
    # Carefully restrained mechanical textures, never battle entertainment.
    if ch in (2,8,9,10):
        rng=np.random.default_rng(1500+ch)
        for j,start in enumerate(np.arange(1,duration-.5,pulse)):
            i=int(start*SR);nn=min(int(.12*SR),n-i);tt=np.arange(nn)/SR
            click=rng.normal(0,1,nn).astype(np.float32)*np.exp(-tt*65)*.004
            click+=np.sin(2*np.pi*(64+ch*2)*tt)*np.exp(-tt*26)*.009
            y[i:i+nn,0]+=click;y[i:i+nn,1]+=click
    # Fine, filtered steam/sea air, changing gently rather than a loud loop.
    rng=np.random.default_rng(4200+ch)
    noise=rng.normal(0,1,n+31).astype(np.float32)
    filtered=(np.cumsum(noise,dtype=np.float64)[32:]-np.cumsum(noise,dtype=np.float64)[:-32])/32
    y[:len(filtered),0]+=filtered*.003*fade[:len(filtered)]
    y[:len(filtered),1]+=filtered*.0026*fade[:len(filtered)]
    return y

def cue_sound(y,local,kind,seed=0):
    i=int(local*SR);n=min(int(1.15*SR),len(y)-i)
    if i<0 or n<=0:return
    t=np.arange(n,dtype=np.float32)/SR
    rng=np.random.default_rng(2000+seed)
    if any(k in kind.lower() for k in ['gear','machine','steam','rail','industrial','mechan']):
        s=.012*np.sin(2*np.pi*89*t)*np.exp(-t*12)+rng.normal(0,.006,n)*np.exp(-t*22)
    elif any(k in kind.lower() for k in ['war','plague','dark','slave','disease','sorrow']):
        s=.014*np.sin(2*np.pi*48*t)*np.exp(-t*2.5)
    elif any(k in kind.lower() for k in ['book','paper','print','page']):
        s=rng.normal(0,.004,n)*np.exp(-t*8)*np.sin(np.pi*t/1.15)**2
    elif any(k in kind.lower() for k in ['city','bloom','light','knowledge','star']):
        s=.018*(np.sin(2*np.pi*659.255*t)+.5*np.sin(2*np.pi*987.767*t))*np.exp(-t*4)*env(n)
    else:
        # Air pass: original shaped, low amplitude noise plus rounded tonal rise.
        s=rng.normal(0,.002,n)*np.sin(np.pi*t/1.15)**2
        s+=.009*np.sin(2*np.pi*(130*t+80*t*t))*np.sin(np.pi*t/1.15)**2
    s=np.asarray(s,dtype=np.float32)
    y[i:i+n,0]+=s*.9;y[i:i+n,1]+=s

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--output',default='output/soundtrack.wav');a=ap.parse_args()
    output=ROOT/a.output;output.parent.mkdir(parents=True,exist_ok=True)
    cues=[];cuefile=ROOT/'data/sound-cues.json'
    if cuefile.exists():
        raw=json.loads(cuefile.read_text())
        cues=raw if isinstance(raw,list) else raw.get('cues',[])
    if not cues:
        cues=[{'start':v,'type':'air-pass'} for v in BOUNDS[1:-1]]
    # Each chapter is synthesized once, keeping RAM under 500 MB.
    with wave.open(str(output),'wb') as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
        for ch in range(12):
            y=chapter_score(ch)
            for j,cue in enumerate(cues):
                if cue.get('kind') == 'music':continue
                at=cue.get('start',cue.get('time',cue.get('at',-1)))
                if isinstance(at,(float,int)) and BOUNDS[ch]<=at<BOUNDS[ch+1]:
                    cue_sound(y,at-BOUNDS[ch],str(cue.get('style',cue.get('type',cue.get('sound',cue.get('name','air'))))),j)
            # Soft peak protection, global master fade to silence.
            tt=np.arange(len(y),dtype=np.float32)/SR+BOUNDS[ch]
            y*=np.minimum(1,tt/2)[:,None]*np.minimum(1,(600-tt)/3)[:,None]
            y=np.tanh(y*1.5)*.75
            w.writeframes((np.clip(y,-1,1)*32767).astype('<i2').tobytes())
            print(f'chapter {ch+1:02d}: {len(y)/SR:.0f}s, peak {np.max(np.abs(y)):.3f}',flush=True)
    print(output)
if __name__=='__main__':main()
