import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const start=Number(process.argv[2]||1);
for(let n=start;n<=12;n++){const p=`output/chapter-${String(n).padStart(2,'0')}`;if(fs.existsSync(p+'.mp4')){let probe=spawnSync('ffprobe',['-v','quiet','-show_entries','format=duration','-of','csv=p=0',p+'.mp4'],{encoding:'utf8'});const bounds=[0,25,80,130,185,240,295,345,395,440,495,555,600];if(probe.status===0&&Math.abs(Number(probe.stdout)-(bounds[n]-bounds[n-1]))<.001){console.log('Reuse completed '+p);continue;}}
const log=fs.openSync(p+'.log','w');console.log('Rendering '+p);let r=spawnSync(process.execPath,['scripts/render.mjs','--chapter',String(n),'--width','1920','--fps','60','--output',p+'.mp4'],{stdio:['ignore',log,log]});fs.closeSync(log);if(r.status!==0)process.exit(r.status||1);}
let r=spawnSync(process.execPath,['scripts/assemble.mjs'],{stdio:'inherit'});process.exit(r.status||0);
