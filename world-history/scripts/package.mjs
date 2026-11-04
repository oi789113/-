import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const inputs=['package.json','package-lock.json','requirements-audio.txt','tsconfig.json','remotion.config.ts','README.md','HISTORY_SOURCES.md','ASSET_LICENSES.md','narration.md','subtitles.srt','src','data','assets','scripts','docs'];
const outputs=['world-history-1080p60.mp4','history-preview.mp4','map-preview.mp4','storyboard.png','timeline.png','subtitles.srt','mix.m4a','narration.wav','soundtrack.wav','validation.json','audio-validation.json','voice-status.json','environment.json','keyframes'];
for(const f of outputs)if(fs.existsSync('output/'+f))inputs.push('output/'+f);
const sourceInputs=[...inputs.filter(p=>!p.startsWith('output/')),'output/mix.m4a','output/voice-status.json'];
const source=spawnSync('python',['-c',`import pathlib,sys,zipfile
with zipfile.ZipFile('output/world-history-source.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=1) as z:
 for name in sys.argv[1:]:
  p=pathlib.Path(name)
  for f in ([p] if p.is_file() else p.rglob('*')):
   if f.is_file() and '__pycache__' not in f.parts:z.write(f,'world-history/'+str(f))
`,...sourceInputs],{stdio:'inherit'});if(source.status!==0)process.exit(1);
const r=spawnSync('python',['-c',`import pathlib,sys,zipfile
with zipfile.ZipFile('output/world-history-project.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=1) as z:
 for name in sys.argv[1:]:
  p=pathlib.Path(name)
  for f in ([p] if p.is_file() else p.rglob('*')):
   if f.is_file() and '__pycache__' not in f.parts:
    z.write(f,'world-history/'+str(f))
`,...inputs],{stdio:'inherit'});process.exit(r.status||0);
