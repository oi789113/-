import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const shots=JSON.parse(fs.readFileSync('data/story.json')),duration=String(shots.at(-1).end);
const run=(cmd,args)=>{const r=spawnSync(cmd,args,{stdio:'inherit'});if(r.status!==0)throw Error(cmd+' failed');return r};
run('ffmpeg',['-hide_banner','-loglevel','warning','-xerror','-y','-i','output/world-history-textbook-1080p60.mp4','-map','0:v:0','-map_metadata','0','-map_chapters','0','-an','-c:v','libx264','-preset','veryfast','-crf','18','-threads','2','-pix_fmt','yuv420p','-r','60','-fps_mode','cfr','-sn','-t',duration,'-video_track_timescale','60000','-movflags','+faststart','output/master-optimized.mp4']);
fs.renameSync('output/master-optimized.mp4','output/world-history-textbook-1080p60.mp4');
run('ffmpeg',['-hide_banner','-loglevel','warning','-xerror','-y','-i','output/world-history-textbook-1080p60.mp4','-map','0:v:0','-an','-vf','scale=640:360:flags=lanczos,fps=30','-c:v','libx264','-preset','veryfast','-crf','24','-threads','2','-t',duration,'-movflags','+faststart','output/history-preview.mp4']);
fs.writeFileSync('output/decode-validation.json',JSON.stringify({videoDecodeCompleted:true,exitCode:0,method:'Successful full-master decode during full-length preview transcode',audio:'Intentionally absent: no audio streams'},null,2));
run('ffmpeg',['-hide_banner','-loglevel','warning','-y','-ss','168','-i','output/world-history-textbook-1080p60.mp4','-t','14','-map','0:v:0','-an','-vf','scale=640:360:flags=lanczos,fps=30','-c:v','libx264','-preset','veryfast','-crf','24','-threads','2','-movflags','+faststart','output/map-preview.mp4']);
run(process.execPath,['scripts/sync-public.mjs']);run(process.execPath,['scripts/validate.mjs']);
