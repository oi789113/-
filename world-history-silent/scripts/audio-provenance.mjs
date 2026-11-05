import fs from 'node:fs';import crypto from 'node:crypto';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const p='output/audio-provenance.json',old=fs.existsSync(p)?JSON.parse(fs.readFileSync(p)):{};
const provenance={voice:false,speechSynthesisUsed:false,recordingsUsed:false,source:'scripts/audio.py: deterministic oscillators and noise; original music and SFX',duration:600,sampleRate:48000,channels:2,sourcePcmSha256:fs.existsSync('output/soundtrack.wav')?hash('output/soundtrack.wav'):old.sourcePcmSha256??null,synthesizerSha256:hash('scripts/audio.py'),mastering:'loudnorm I=-20 LUFS, TP=-2 dBTP, LRA=9; AAC 192k',output:'soundtrack.m4a',aacSha256:hash('output/soundtrack.m4a')};
fs.writeFileSync(p,JSON.stringify(provenance,null,2)+'\n');
