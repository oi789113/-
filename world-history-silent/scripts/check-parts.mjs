/** Check/remux packet durations before concatenation, without re-encoding. */
import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const parts=JSON.parse(fs.readFileSync('output/render-plan.json')).parts;
function probe(f){const r=spawnSync('ffprobe',['-v','error','-show_streams','-show_format','-show_chapters','-of','json',f],{encoding:'utf8'});if(r.status)throw Error(r.stderr);return JSON.parse(r.stdout)}
const rows=[];
for(const p of parts){let d=probe(p.file),v=d.streams.find(s=>s.codec_type==='video'),want=(p.end-p.start)/60;
 if(Number(v.nb_frames)!==p.end-p.start)throw Error('Unexpected frame count '+p.file);
 if(Math.abs(Number(v.duration)-want)>.00001||d.chapters.length||d.streams.length!==1){
  const tmp=p.file+'.fixed.mp4';const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',p.file,'-map','0:v:0','-c:v','copy','-an','-map_metadata','-1','-map_chapters','-1','-bsf:v','setts=duration=1000','-video_track_timescale','60000',tmp],{stdio:'inherit'});if(r.status)throw Error('Remux failed');fs.renameSync(tmp,p.file);d=probe(p.file);v=d.streams[0];
 }
 if(Math.abs(Number(v.duration)-want)>.00001||d.streams.length!==1||d.chapters.length)throw Error('Segment timing verification failed '+p.file);
 rows.push({file:p.file,frames:Number(v.nb_frames),duration:Number(v.duration),onlyVideo:true,noInheritedChapters:true});
}
const totalFrames=rows.reduce((n,r)=>n+r.frames,0);if(totalFrames!==36000)throw Error('Missing frames');
fs.writeFileSync('output/part-validation.json',JSON.stringify({passed:true,totalFrames,parts:rows},null,2));console.log(`${parts.length} segments have exact durations and ${totalFrames} video-only frames`);
