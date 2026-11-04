#!/usr/bin/env python3
"""Synthesize actual Mandarin speech, retain timings, fit segment slots, mix score.
Requires: pip install edge-tts numpy; ffmpeg. Uses inherited HTTPS_PROXY normally.
Edge's publicly available neural voice endpoint must be reachable; this script never
substitutes fake narration. Credentials are never logged or supplied by this script.
"""
import asyncio,json,os,subprocess,wave,re
from pathlib import Path
import numpy as np
import edge_tts
ROOT=Path(__file__).resolve().parents[1]
CACHE=ROOT/'assets/voice';CACHE.mkdir(parents=True,exist_ok=True)
SR=48000;DURATION=600

def decode(path):
    p=subprocess.run(['ffmpeg','-v','error','-i',str(path),'-ar',str(SR),'-ac','1','-f','f32le','pipe:1'],capture_output=True,check=True)
    return np.frombuffer(p.stdout,dtype='<f4').copy()

def tempo(x,rate):
    if abs(rate-1)<.0001:return x
    p=subprocess.run(['ffmpeg','-v','error','-f','f32le','-ar',str(SR),'-ac','1','-i','pipe:0','-af',f'atempo={rate:.8f}','-f','f32le','pipe:1'],input=x.astype('<f4').tobytes(),capture_output=True,check=True)
    return np.frombuffer(p.stdout,dtype='<f4').copy()

async def fetch(cue,sem):
    target=CACHE/(cue['id']+'.mp3');metadata=CACHE/(cue['id']+'.json')
    if target.exists() and target.stat().st_size>500 and metadata.exists():return
    async with sem:
        for attempt in range(4):
            try:
                words=[]
                job=edge_tts.Communicate(cue['text'],'zh-CN-YunxiNeural',rate='+8%',boundary='WordBoundary',proxy=os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy'))
                with target.open('wb') as f:
                    async for item in job.stream():
                        if item['type']=='audio':f.write(item['data'])
                        elif item['type'] in ('WordBoundary','SentenceBoundary'):
                            words.append({'start':item['offset']/1e7,'end':(item['offset']+item['duration'])/1e7,'text':item['text']})
                metadata.write_text(json.dumps(words,ensure_ascii=False,indent=2))
                print(f"TTS {cue['id']}: {target.stat().st_size} bytes, {len(words)} word timings",flush=True)
                return
            except Exception as ex:
                if attempt==3:raise
                print(f"Retry {cue['id']} ({type(ex).__name__})",flush=True)
                await asyncio.sleep(2+attempt*3)

async def main():
    cues=json.loads((ROOT/'data/narration.json').read_text())
    sem=asyncio.Semaphore(3)
    await asyncio.gather(*(fetch(cue,sem) for cue in cues))
    whole=np.zeros(DURATION*SR,dtype=np.float32);subs=[];measure=[]
    for cue in cues:
        x=decode(CACHE/(cue['id']+'.mp3'))
        words=json.loads((CACHE/(cue['id']+'.json')).read_text())
        # Preserve the whole utterance; remove only silent tail to reduce stretching.
        audible=np.flatnonzero(np.abs(x)>.003)
        tail=min(len(x),int(audible[-1]+.12*SR)) if len(audible) else len(x)
        x=x[:tail];slot=cue['end']-cue['start'];lead=.12
        target=max(.2,slot-lead-.12)
        factor=max(1,len(x)/SR/target)
        if factor>1.40:raise RuntimeError(f"{cue['id']} requires excessive tempo {factor:.3f}; revise script")
        x=tempo(x,factor)
        offset=round((cue['start']+lead)*SR);available=round(cue['end']*SR)-offset
        if len(x)>available:x=x[:available]
        whole[offset:offset+len(x)]+=x
        # Word-aligned groups, capped at 24 Han characters. Bind punctuation from text.
        text=cue['text'];cursor=0;groups=[];buf='';a=None;b=None
        for word in words:
            w=word['text'];pos=text.find(w,cursor)
            if pos>=0:
                prefix=text[cursor:pos];cursor=pos+len(w)
                # Chinese punctuation belongs to the preceding word.
                if prefix and buf:buf+=prefix
                wtext=w
            else:wtext=w
            if a is None:a=word['start']
            buf+=wtext;b=word['end']
            if len(buf)>=21:
                # Attach immediately following punctuation to the line.
                while cursor<len(text) and text[cursor] in '，。；：！？、,.!?;:':buf+=text[cursor];cursor+=1
                groups.append((a,b,buf));buf='';a=None;b=None
        if buf:
            if cursor<len(text):buf+=text[cursor:]
            groups.append((a,b,buf))
        if not groups:groups=[(0,len(x)/SR,cue['text'])]
        if len(groups)>1 and len(groups[-1][2])<7:
            g1,g2=groups[-2:];groups[-2:]=[(g1[0],g2[1],g1[2]+g2[2])]
        for a,b,text in groups:
            start=cue['start']+lead+a/factor
            end=min(cue['end']-.04,cue['start']+lead+b/factor+.12)
            if end>start:subs.append({'start':round(start,3),'end':round(end,3),'text':text})
        measure.append({'id':cue['id'],'slot':slot,'speechSeconds':len(x)/SR,'tempo':round(factor,5),'actualStart':offset/SR,'actualEnd':(offset+len(x))/SR})
    # Avoid extended display tails overlapping the next measured word group.
    for previous,following in zip(subs,subs[1:]):
        previous['end']=round(min(previous['end'],following['start']-.015),3)
    # Conservative normalization; no clipping or aggressive limiting.
    peak=float(np.max(np.abs(whole)));gain=.82/max(peak,.001);whole*=gain
    def write(path,arr):
        with wave.open(str(path),'wb') as w:
            w.setnchannels(2 if arr.ndim==2 else 1);w.setsampwidth(2);w.setframerate(SR)
            w.writeframes((np.clip(arr,-1,1)*32767).astype('<i2').tobytes())
    write(ROOT/'output/narration.wav',whole)
    def stamp(t):
        ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
    srt='\n\n'.join(f"{i+1}\n{stamp(c['start'])} --> {stamp(c['end'])}\n{c['text']}" for i,c in enumerate(subs))+'\n'
    (ROOT/'data/subtitles.json').write_text(json.dumps(subs,ensure_ascii=False,indent=2))
    (ROOT/'subtitles.srt').write_text(srt);(ROOT/'output/subtitles.srt').write_text(srt)
    status={'voice':'zh-CN-YunxiNeural','provider':'Microsoft Edge online neural speech endpoint via edge-tts','generated':True,'duration':DURATION,'sampleRate':SR,'subtitleTiming':'actual word-boundary events transformed by the measured tempo of each utterance','segments':measure}
    (ROOT/'output/voice-status.json').write_text(json.dumps(status,ensure_ascii=False,indent=2))
    # Stereo score already deliberately quiet; duck it a further 5 dB under speech.
    with wave.open(str(ROOT/'output/soundtrack.wav'),'rb') as f:
        music=np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').reshape(-1,2).astype(np.float32)/32768
    # Smooth ducking based on known utterance windows, no pumping from word pauses.
    duck=np.ones(len(whole),dtype=np.float32)
    for m in measure:
        a=max(0,int((m['actualStart']-.1)*SR));b=min(len(whole),int((m['actualEnd']+.15)*SR))
        duck[a:b]=.56
    mixed=music*duck[:,None]+whole[:,None]*.86
    write(ROOT/'output/mix.wav',mixed)
    normalized=ROOT/'output/mix-normalized.wav'
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(ROOT/'output/mix.wav'),'-af','loudnorm=I=-18:TP=-1.5:LRA=11','-ar',str(SR),'-t','600','-c:a','pcm_s16le',str(normalized)],check=True)
    normalized.replace(ROOT/'output/mix.wav')
    print(f"Done: {len(cues)} spoken segments; {len(subs)} measured subtitle cues; normalized to -18 LUFS target",flush=True)
if __name__=='__main__':asyncio.run(main())
