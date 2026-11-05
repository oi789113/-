/** Frame-exact incremental edition. Without --reuse, every frame is regenerated.
 * --reuse points to the earlier master. Its audio is never opened for output.
 * Only unchanged visual spans may be reused; changed shots are freshly rendered.
 */
import fs from 'node:fs';import path from 'node:path';import {spawn,spawnSync} from 'node:child_process';import {once} from 'node:events';
const arg=name=>{const i=process.argv.indexOf('--'+name);return i<0?null:process.argv[i+1]};
const reuse=arg('reuse'),shots=JSON.parse(fs.readFileSync('data/shots.json')),edition=JSON.parse(fs.readFileSync('data/edition.json'));
const changed=new Set(edition.revisedShots),parts=[];fs.mkdirSync('output/parts',{recursive:true});
for(const s of shots){const native=!reuse||changed.has(s.id);let last=parts.at(-1);if(!native&&last&&!last.native){last.end=s.endFrame;last.shots.push(s.id)}else parts.push({native,start:s.startFrame,end:s.endFrame,shots:[s.id]});}
parts.forEach((p,i)=>p.file=`output/parts/part-${String(i).padStart(3,'0')}.mp4`);
fs.writeFileSync('output/render-plan.json',JSON.stringify({reuseVideoOnly:reuse,voice:false,totalFrames:36000,parts},null,2));
function frames(file){const r=spawnSync('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=nb_frames','-of','csv=p=0',file],{encoding:'utf8'});return Number(r.stdout.trim())}
async function run(cmd,args,log){const fd=fs.openSync(log,'w'),p=spawn(cmd,args,{stdio:['ignore',fd,fd]});const [code]=await once(p,'close');fs.closeSync(fd);if(code!==0)throw Error(`${cmd} failed, see ${log}`)}
const queue=[...parts];async function worker(){while(queue.length){const p=queue.shift();if(fs.existsSync(p.file)&&frames(p.file)===p.end-p.start){console.log('Verified existing '+p.file);continue;}
 console.log(JSON.stringify({action:p.native?'animate':'reuse-video-only',file:p.file,shots:p.shots,frames:p.end-p.start}));
 if(p.native)await run(process.execPath,['scripts/render.mjs','--start',String(p.start/60),'--end',String(p.end/60),'--width','1920','--fps','60','--no-subtitles','--output',p.file],p.file+'.log');
 else await run('ffmpeg',['-hide_banner','-loglevel','warning','-y','-threads','1','-ss',String(p.start/60),'-i',path.resolve(reuse),'-map','0:v:0','-an','-sn','-dn','-vf','setpts=PTS-STARTPTS','-frames:v',String(p.end-p.start),'-c:v','libx264','-preset','ultrafast','-crf','20','-pix_fmt','yuv420p','-threads','1','-video_track_timescale','60000','-map_metadata','-1','-map_chapters','-1','-r','60','-fps_mode','cfr',p.file],p.file+'.log');
 if(frames(p.file)!==p.end-p.start)throw Error('Part frame mismatch '+p.file);console.log('Complete '+p.file);
}}
await Promise.all([worker(),worker()]);
const audit=spawnSync(process.execPath,['scripts/check-parts.mjs'],{stdio:'inherit'});if(audit.status)throw Error('Segment timing check failed');
fs.writeFileSync('output/parts.txt',parts.map(p=>`file '${path.resolve(p.file)}'\nduration ${((p.end-p.start)/60).toFixed(9)}`).join('\n')+'\n');
const bounds=[0,25,80,130,185,240,295,345,395,440,495,555,600],names=['不断扩大的连接','河流与城市','国家、帝国与贸易','同时代的古典世界','帝国更替与信仰','流动的中世纪','航海时代','联系的沉重代价','科学革命','思想与革命','工业革命','工业社会与新思想'];
let meta=';FFMETADATA1\ntitle=600秒，看懂5000年世界历史｜无旁白版\nartist=The World Is Changing\ncomment=无任何人声；原创程序化音乐与音效；历史范围和路线为概略示意\n';for(let i=0;i<12;i++)meta+=`[CHAPTER]\nTIMEBASE=1/1000\nSTART=${bounds[i]*1000}\nEND=${bounds[i+1]*1000}\ntitle=${names[i]}\n`;fs.writeFileSync('output/chapters.ffmeta',meta);
console.log('Assembling 36,000 frames with editorial captions and music/SFX only');
await run('ffmpeg',['-hide_banner','-loglevel','warning','-y','-f','concat','-safe','0','-i','output/parts.txt','-i','output/soundtrack.m4a','-f','ffmetadata','-i','output/chapters.ffmeta','-i','subtitles.srt','-map','0:v:0','-map','1:a:0','-map','3:s:0','-map_metadata','2','-map_chapters','2','-vf',"setpts=N/(60*TB),drawbox=x=0:y=866:w=1920:h=128:color=0x071521:t=fill,drawbox=x=197:y=895:w=3:h=68:color=0xe9c47d:t=fill,ass=data/captions.ass,fade=t=out:st=599.9:d=0.083333",'-frames:v','36000','-r','60','-fps_mode','cfr','-c:v','libx264','-preset','veryfast','-crf','20','-threads','2','-pix_fmt','yuv420p','-c:a','copy','-c:s','mov_text','-metadata:s:s:0','language=zho','-disposition:s:0','0','-video_track_timescale','60000','-t','600','-movflags','+faststart','output/world-history-no-voice-1080p60.mp4'],'output/assembly.log');
if(frames('output/world-history-no-voice-1080p60.mp4')!==36000)throw Error('Final frame mismatch');
console.log('Finished full 600-second no-voice master');
