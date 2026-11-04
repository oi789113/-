/** Offline reproducible acceptance checks. Missing final exports remain pending. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
process.chdir(root);
const expectedBounds=[0,25,80,130,185,240,295,345,395,440,495,555,600];
const checks=[];
const add=(id,status,details,evidence={})=>checks.push({id,status,details,...evidence});
const check=(id,condition,details,evidence={})=>add(id,condition?'passed':'failed',details,evidence);
const read=(file,optional=false)=>{try{return JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){add(`load:${file}`,optional?'pending':'failed',e.message);return null;}};
const array=(file,optional=false)=>{const value=read(file,optional);if(value!==null&&!Array.isArray(value)){add(`array:${file}`,'failed','Expected JSON array');return [];}return value||[];};
const events=array('data/events.json'),shots=array('data/shots.json'),routes=array('data/routes.json'),narration=array('data/narration.json'),subtitles=array('data/subtitles.json',true),sources=array('data/sources.json');
const validCoord=p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&p[0]>=-180&&p[0]<=180&&p[1]>=-90&&p[1]<=90;
const validYear=y=>Number.isInteger(y)&&y!==0;
const url=u=>{try{return ['http:','https:'].includes(new URL(u).protocol);}catch{return false;}};
const unique=xs=>new Set(xs).size===xs.length;
const close=(a,b,tolerance=0.000001)=>Math.abs(a-b)<=tolerance;
const frame=t=>Math.round(t*60);
const chapterRows=[];
check('events:fields',events.length>0&&events.every(e=>['id','name','startYear','endYear','region','coordinates','chapter','type','explanation','visual','sources','dateDisputed','approximateMap'].every(k=>k in e)&&typeof e.dateDisputed==='boolean'&&typeof e.approximateMap==='boolean'),'Required structured event fields and uncertainty booleans.',{eventCount:events.length});
check('events:unique-ids',unique(events.map(e=>e.id)),'Unique historical event IDs.');
check('events:years',events.every(e=>validYear(e.startYear)&&validYear(e.endYear)&&e.startYear<=e.endYear),'Historical years are integer BCE/CE years with no year 0.');
check('events:coordinates',events.every(e=>validCoord(e.coordinates)),'Coordinates use [longitude, latitude] in geographic bounds.');
check('events:sources',events.every(e=>Array.isArray(e.sources)&&e.sources.length>0&&e.sources.every(url)),'Every historical event has at least one explicit source URL.');
check('events:source-registry',events.every(e=>e.sources?.every(u=>sources.some(s=>s.url===u))),'Event source URLs resolve to the local source registry.',{sourceCount:sources.length});
check('events:uncertainty',events.every(e=>e.approximateMap===true),'Current representative centers and influence overlays are explicitly approximate; none claim exact historic borders.');
check('events:chapters',events.every(e=>Number.isInteger(e.chapter)&&e.chapter>=1&&e.chapter<=12)&&expectedBounds.slice(1).every((_,i)=>events.some(e=>e.chapter===i+1)),'All 12 chapters contain historical events.');
check('shots:fields',shots.length>=60&&shots.every(s=>['id','chapter','start','end','startFrame','endFrame','title','kind','focus','zoom','yearStart','yearEnd','transition','layers','climax','cameraMotion'].every(k=>k in s)),'At least 60 explicitly composed data-driven shots.',{shotCount:shots.length});
check('shots:unique-ids',unique(shots.map(s=>s.id)),'Unique shot IDs.');
check('shots:36000-frames',shots.length>0&&shots[0].startFrame===0&&shots.at(-1).endFrame===36000&&shots.every((s,i)=>s.startFrame<s.endFrame&&s.startFrame===frame(s.start)&&s.endFrame===frame(s.end)&&(i===0||s.startFrame===shots[i-1].endFrame)),'Half-open frame ranges cover exactly [0,36000), without duplicate or missing frames.',{fps:60,totalFrames:shots.reduce((sum,s)=>sum+s.endFrame-s.startFrame,0)});
check('shots:years-coordinates',shots.every(s=>validYear(s.yearStart)&&validYear(s.yearEnd)&&validCoord(s.focus)&&s.zoom>0),'Shot geography is valid and date endpoints omit year 0.');
const transitions=shots.slice(1).filter(s=>typeof s.transition==='string'&&s.transition.trim());
const transitionNames=[...new Set(transitions.map(s=>s.transition))];
check('shots:transition-plan',transitions.length>=30,'At least 30 transitions specified in the shot plan; this count alone does not prove distinctive execution.',{transitionCount:transitions.length,transitionNames});
const forms=new Set(shots.flatMap(s=>[s.kind==='scene'?`scene:${s.sceneKind}`:s.kind,...(s.layers||[]).map(l=>`layer:${l}`)]));
check('shots:animation-forms',forms.size>=10,'At least ten distinct map layers and scene animation forms are scheduled.',{forms:[...forms]});
const maxShotSeconds=shots.length?Math.max(...shots.map(s=>s.end-s.start)):Infinity;
check('shots:long-holds',maxShotSeconds<20,'No shot holds the same framing for twenty seconds.',{maxShotSeconds});
for(let c=1;c<=12;c++){
 const ss=shots.filter(s=>s.chapter===c),nn=narration.filter(s=>s.chapter===c);
 const row={chapter:c,expectedStart:expectedBounds[c-1],expectedEnd:expectedBounds[c],shots:ss.length,events:events.filter(e=>e.chapter===c).length,climaxShots:ss.filter(s=>s.climax).map(s=>s.id)};
 chapterRows.push(row);
 check(`chapter:${c}:bounds`,ss.length>0&&ss[0].startFrame===expectedBounds[c-1]*60&&ss.at(-1).endFrame===expectedBounds[c]*60,'Chapter matches the requested absolute timeline.',row);
 check(`chapter:${c}:climax`,ss.some(s=>s.climax===true),'At least one explicitly designated chapter climax.');
 check(`chapter:${c}:narration`,nn.length>0&&frame(nn[0].start)===expectedBounds[c-1]*60&&frame(nn.at(-1).end)===expectedBounds[c]*60,'Narration slots match chapter boundaries.');
}
check('narration:continuity',narration.length>0&&frame(narration[0].start)===0&&frame(narration.at(-1).end)===36000&&narration.every((n,i)=>n.start<n.end&&typeof n.text==='string'&&n.text.trim()&&(i===0||close(n.start,narration[i-1].end))),'Narration slots continuously cover 600 seconds.');
check('narration:frame-alignment',narration.every(n=>Math.abs(n.start*60-frame(n.start))<0.00004&&Math.abs(n.end*60-frame(n.end))<0.00004),'Narration segment boundaries align to 60FPS frames.');
check('narration:shot-alignment',shots.length===narration.length&&shots.every((s,i)=>s.chapter===narration[i].chapter&&s.startFrame===frame(narration[i].start)&&s.endFrame===frame(narration[i].end)),'Shot segments align with the spoken story segment slots.');
if(subtitles.length){
 check('subtitles:measured-cues',subtitles.every(s=>Number.isFinite(s.start)&&Number.isFinite(s.end)&&s.start>=0&&s.end<=600&&s.end>s.start&&typeof s.text==='string'&&s.text.trim()),'Measured subtitle cues have valid timing and Chinese text.',{cueCount:subtitles.length});
 check('subtitles:no-overlap',subtitles.every((s,i)=>i===0||s.start>=subtitles[i-1].end-.001),'Subtitle cues have no overlapping display intervals.');
 check('subtitles:slot-containment',subtitles.every(s=>narration.some(n=>s.start>=n.start-.001&&s.end<=n.end+.001)),'Every subtitle cue remains inside one scheduled utterance.');
 const normalized=t=>String(t).replace(/[\p{P}\p{Z}\s]/gu,'');
 check('subtitles:complete-text',normalized(subtitles.map(s=>s.text).join(''))===normalized(narration.map(s=>s.text).join('')),'Measured subtitle text preserves the complete narration, ignoring punctuation and spaces.');
 const ms=t=>{const n=Math.round(t*1000);return `${String(Math.floor(n/3600000)).padStart(2,'0')}:${String(Math.floor(n/60000)%60).padStart(2,'0')}:${String(Math.floor(n/1000)%60).padStart(2,'0')},${String(n%1000).padStart(3,'0')}`;};
 const expected=subtitles.map((s,i)=>`${i+1}\n${ms(s.start)} --> ${ms(s.end)}\n${s.text}`).join('\n\n')+'\n';
 check('subtitles:srt-consistency',fs.existsSync('subtitles.srt')&&fs.readFileSync('subtitles.srt','utf8')===expected,'SRT contains exactly the same measured cues as data/subtitles.json.');
}else add('subtitles:measured-cues','pending','Measured TTS/recording subtitle cues have not been generated.');
check('routes:fields',routes.length>0&&routes.every(r=>['id','name','chapter','type','startYear','endYear','points','source','approximate','detail'].every(k=>k in r)),'Routes include dates, geography, source and interpretation details.',{routeCount:routes.length});
check('routes:geography',routes.every(r=>Array.isArray(r.points)&&r.points.length>=2&&r.points.every(validCoord)),'All route nodes have valid longitude and latitude.');
check('routes:years',routes.every(r=>validYear(r.startYear)&&validYear(r.endYear)&&r.startYear<=r.endYear),'All route date ranges omit year 0.');
check('routes:source-uncertainty',routes.every(r=>url(r.source)&&r.approximate===true&&typeof r.detail==='string'&&r.detail.length>10),'Routes are sourced node-to-node schematic connections, not invented exact itineraries.');
const continents={Asia:e=>e.coordinates[0]>=32&&e.coordinates[0]<=150&&e.coordinates[1]>=-11&&e.coordinates[1]<=75,Africa:e=>e.coordinates[0]>=-20&&e.coordinates[0]<=55&&e.coordinates[1]>=-36&&e.coordinates[1]<=37,Americas:e=>e.coordinates[0]>=-170&&e.coordinates[0]<=-30,Europe:e=>e.coordinates[0]>=-25&&e.coordinates[0]<=45&&e.coordinates[1]>=35&&e.coordinates[1]<=72};
const coverage=Object.fromEntries(Object.entries(continents).map(([name,predicate])=>[name,events.filter(predicate).map(e=>e.id)]));
check('coverage:four-continents',Object.values(coverage).every(e=>e.length>=3),'Asia, Africa, the Americas and Europe each have at least three located events. Bounding regions are a coverage heuristic, not a cultural classification.',{coverage});
// Verify date formatting at the BCE/CE seam as well as every rendered frame.
try{
 const {HistoricalTimeline,yearLabel}=await import('../src/engine.mjs');let zeroLabels=0;
 for(const s of shots)for(let f=s.startFrame;f<s.endFrame;f++){const y=HistoricalTimeline(s,(f-s.startFrame)/(s.endFrame-s.startFrame));if(/(^|\s)0\s*年/.test(yearLabel(y)))zeroLabels++;}
 check('timeline:no-zero-label',zeroLabels===0&&yearLabel(-1).includes('前')&&!yearLabel(1).includes('前'),'All 36,000 frame date labels skip year 0.',{zeroLabels});
}catch(e){add('timeline:no-zero-label','failed',e.message);}
// Compare only the geographic/scene stage, excluding title/year/subtitle HUD bands.
if(!process.argv.includes('--skip-visual')){
 try{
  const {createCanvas}=await import('@napi-rs/canvas');const {makeEngine}=await import('./render.mjs');const engine=makeEngine(),canvas=createCanvas(480,270),ctx=canvas.getContext('2d');
  const sample=t=>{ctx.save();ctx.scale(.25,.25);engine.render(ctx,t,{subtitles:false});ctx.restore();return ctx.getImageData(120,80,330,115).data;};
  const visual=[];
  for(const s of shots){const a=sample(s.start+(s.end-s.start)*.27),b=sample(s.start+(s.end-s.start)*.77);let changed=0,totalDiff=0;for(let i=0;i<a.length;i+=4){const d=(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2]))/3;totalDiff+=d;if(d>10)changed++;}visual.push({id:s.id,changedPixelRatio:Math.round(changed/(a.length/4)*100000)/100000,meanDifference:Math.round(totalDiff/(a.length/4)*10000)/10000});}
  const staticShots=visual.filter(v=>v.changedPixelRatio<.001&&v.meanDifference<.15);
  check('visual:stage-changes',staticShots.length===0,'Two interior frames per shot differ in the actual map/scene stage, excluding HUD. This detects static rendering but does not measure cinematic quality.',{sampleCount:visual.length*2,staticShots,shots:visual});
 }catch(e){add('visual:stage-changes','failed',e.stack||e.message);}
}else add('visual:stage-changes','pending','Skipped by explicit --skip-visual flag.');
const voice=fs.existsSync('output/voice-status.json')?read('output/voice-status.json'):null;
if(voice){check('audio:real-narration',voice.generated===true&&voice.segments?.length===narration.length&&voice.duration===600,'Real speech generation is recorded for every narration segment.',{provider:voice.provider,voice:voice.voice,subtitleTiming:voice.subtitleTiming});check('audio:slot-fit',voice.segments?.every(s=>s.actualStart>=narration.find(n=>n.id===s.id)?.start&&s.actualEnd<=narration.find(n=>n.id===s.id)?.end+.002&&s.tempo<=1.4),'Recorded utterances fit their planned slots without overlap or excessive tempo adjustment.');}
else add('audio:real-narration','pending','No completed narration generation manifest.');
function probe(file,id,{width,height,duration,frames,fps=60,requireAudio=false}={}){
 if(!fs.existsSync(file)){add(id,'pending',`Not yet exported: ${file}`);return;}
 const r=spawnSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8',maxBuffer:5e6});
 if(r.status!==0){add(id,'failed',`ffprobe could not verify ${file}`,{error:r.stderr.slice(0,500)});return;}
 const p=JSON.parse(r.stdout),v=p.streams?.find(s=>s.codec_type==='video'),a=p.streams?.find(s=>s.codec_type==='audio');const rate=s=>{const [n,d]=String(s).split('/').map(Number);return d?n/d:n;};
 const meta={path:file,formatDuration:Number(p.format.duration),bytes:Number(p.format.size),video:v?{codec:v.codec_name,width:v.width,height:v.height,frameRate:v.avg_frame_rate,realFrameRate:v.r_frame_rate,frames:v.nb_frames,duration:Number(v.duration)}:null,audio:a?{codec:a.codec_name,sampleRate:a.sample_rate,channels:a.channels,duration:Number(a.duration)}:null};
 const failures=[];
 if(v){if(v.codec_name!=='h264')failures.push('codec must be H.264');if(!close(rate(v.avg_frame_rate),fps,.0001))failures.push(`frame rate must actually be ${fps}FPS`);if(width&&v.width!==width)failures.push(`width must be ${width}`);if(height&&v.height!==height)failures.push(`height must be ${height}`);if(frames&&Number(v.nb_frames)!==frames)failures.push(`nb_frames must be ${frames}`);if(duration&&!close(Number(v.duration),duration,.02))failures.push(`video duration must be ${duration}s`);if(v.width*9!==v.height*16)failures.push('aspect ratio must be 16:9');}
 else if(width)failures.push('video stream missing');
 if(duration&&!close(Number(p.format.duration),duration,.05))failures.push(`container duration must be ${duration}s`);
 if(requireAudio&&!a)failures.push('audio stream missing');
 check(id,failures.length===0,failures.length?failures.join('; '):'ffprobe confirms the actual encoded artifact metadata.',{metadata:meta});
}
probe('output/world-history-1080p60.mp4','export:1080p60',{width:1920,height:1080,duration:600,frames:36000,requireAudio:true});
probe('output/history-preview.mp4','export:full-preview',{width:640,height:360,duration:600,frames:18000,fps:30,requireAudio:true});
probe('output/map-preview.mp4','export:map-preview',{width:640,height:360,fps:30});
probe('output/narration.wav','export:narration-wav',{duration:600,requireAudio:true});
probe('output/mix.wav','export:audio-mix',{duration:600,requireAudio:true});
for(const file of ['output/storyboard.png','output/timeline.png','HISTORY_SOURCES.md','README.md'])add(`artifact:${file}`,fs.existsSync(file)?'passed':'pending',fs.existsSync(file)?`Present: ${file}`:`Not yet written: ${file}`);
add('manual:historical-interpretation','manual','URLs, chronology and geography are structurally checked. Source interpretation, historical completeness and approximate overlays require human editorial review; the script does not establish scholarly consensus.');
add('manual:cinematic-transitions','manual','Distinct transition names and changing frames do not prove director-level transition quality. Watch the rendered film to assess spatial continuity, route following, map dives, and object-to-world transitions.');
add('manual:spoken-audio','manual','Word-boundary timing verifies scheduling. Listen to a complete playback for pronunciation, pacing, music balance and semantic emphasis.');
const failed=checks.filter(c=>c.status==='failed'),pending=checks.filter(c=>c.status==='pending'),manual=checks.filter(c=>c.status==='manual');
const report={generatedAt:new Date().toISOString(),status:failed.length?'failed':pending.length?'pending':'automated-checks-passed',note:'A passed automated check does not imply manual cinematic or scholarly sign-off.',specification:{width:1920,height:1080,fps:60,seconds:600,frames:36000},counts:{events:events.length,shots:shots.length,routes:routes.length,sources:sources.length,narrationSegments:narration.length,subtitleCues:subtitles.length,passed:checks.filter(c=>c.status==='passed').length,failed:failed.length,pending:pending.length,manual:manual.length},chapterRows,checks};
fs.mkdirSync('output',{recursive:true});fs.writeFileSync('output/validation.json',JSON.stringify(report,null,2)+'\n');
fs.mkdirSync('docs',{recursive:true});
const md=['# Quality assurance','',`Last run: ${report.generatedAt}`,`Machine-readable report: [validation.json](../output/validation.json). Overall automatic status: **${report.status}**.`, '', 'Run `npm run validate` after all exports finish. It validates the current files and probes actual MP4 streams; an absent export is pending, never passed. `--skip-visual` skips interior frame comparison and leaves that check pending.','',`Current dataset: ${events.length} historical events, ${shots.length} composed shots, ${routes.length} sourced route schematics, ${narration.length} spoken segments and ${subtitles.length} measured subtitle cues.`, '', '## What is checked','', '- The exact 12 requested chapter boundaries and 36,000 contiguous half-open 60FPS frame ranges.', '- No year 0 in data or in any of the 36,000 generated date labels.', '- Coordinate bounds, source URLs and registry references; explicit approximate-map and route uncertainty flags.', '- Shot and narration alignment, source coverage across four continents, chapter climaxes and at least ten scheduled animation forms.', '- Complete measured subtitle text, non-overlapping timings, utterance containment and exact SRT/JSON consistency.', '- Real speech manifest, utterance slot fit, 600-second audio durations, actual exported codec/resolution/frame rate/frame count and audio streams.', '- Two interior frames per shot compared in the geographic/scene stage, excluding the title/year/subtitle HUD. This finds static rendering but cannot certify visual richness.', '', '## Results requiring action','',...(failed.length?failed.map(c=>`- **FAILED — ${c.id}:** ${c.details}`):['- No automatic check currently fails.']),...(pending.length?pending.map(c=>`- **PENDING — ${c.id}:** ${c.details}`):['- All expected automated artifact checks are complete.']), '', '## Editorial and playback limits','',...manual.map(c=>`- **${c.id}:** ${c.details}`), '', 'Historical influence overlays are representative schematic regions, not reconstructed exact sovereign boundaries. A point inside a coarse continent bounding box establishes geographical coverage only. “Climax” and transition names are director metadata, not an aesthetic score. Distinct transitions must be judged from their actual rendered behavior.', '', 'The final intentional fade to black is part of the ending. This script does not automatically classify every dark frame as an accidental splice gap. Chapter concatenation must preserve absolute frame numbering, and the full assembled video should be decoded or watched once before distribution.',''];
fs.writeFileSync('docs/QA.md',md.join('\n'));
console.log(JSON.stringify({status:report.status,counts:report.counts,failed:failed.map(c=>({id:c.id,details:c.details})),pending:pending.map(c=>c.id),report:'output/validation.json',documentation:'docs/QA.md'},null,2));
if(failed.length)process.exitCode=1;
