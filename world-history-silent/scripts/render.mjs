import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createCanvas,Image,loadImage,Path2D,GlobalFonts} from '@napi-rs/canvas';
import {WorldMapEngine} from '../src/engine.mjs';
const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
for(const file of ['/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc','/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc']){if(fs.existsSync(file))GlobalFonts.registerFromPath(file,file.includes('Serif')?'Noto Serif CJK SC':'Noto Sans CJK SC');}
export const read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
export function makeEngine(){return new WorldMapEngine({land:read('assets/ne_110m_land.geojson'),rivers:read('assets/ne_110m_rivers_lake_centerlines.geojson'),regions:read('assets/ne_110m_geography_regions_polys.geojson'),events:read('data/events.json'),shots:read('data/shots.json'),routes:read('data/routes.json'),createCanvas,Image,ancientRivers:read('assets/ancient-rivers.geojson'),empires:read('data/empire-regions.json'),narration:fs.existsSync('data/subtitles.json')?read('data/subtitles.json'):read('data/narration.json'),Path2D});}
const args=process.argv.slice(2),opt=(s,d)=>{let i=args.indexOf('--'+s);return i>=0?args[i+1]:d;};
async function main(){const preset=opt('preset','full'),width=Number(opt('width',preset==='preview'?640:1920)),height=width*9/16,fps=Number(opt('fps','60')),chapter=Number(opt('chapter',0));const chapters=[0,25,80,130,185,240,295,345,395,440,495,555,600];let start=Number(opt('start',chapter?chapters[chapter-1]:0)),end=Number(opt('end',chapter?chapters[chapter]:600));const first=Math.round(start*fps),last=Math.round(end*fps);const output=opt('output',`output/${preset==='preview'?'history-preview':chapter?'chapter-'+String(chapter).padStart(2,'0'):'world-history-1080p60'}.mp4`);fs.mkdirSync(path.dirname(output),{recursive:true});
 const engine=makeEngine(),canvas=createCanvas(width,height),ctx=canvas.getContext('2d');const still=opt('still',null);if(still!==null){ctx.save();ctx.scale(width/1920,height/1080);engine.render(ctx,Number(still));ctx.restore();fs.writeFileSync(output.replace(/\.mp4$/,'.png'),canvas.toBuffer('image/png'));return;}
 const ff=spawn('ffmpeg',['-hide_banner','-loglevel','warning','-y','-f','rawvideo','-pixel_format','rgba','-video_size',`${width}x${height}`,'-framerate',String(fps),'-i','pipe:0','-an','-c:v','libx264','-preset','ultrafast','-crf',preset==='preview'?'25':'20','-pix_fmt','yuv420p','-threads','2','-video_track_timescale','60000','-movflags','+faststart',output],{stdio:['pipe','ignore','inherit']});
 let error=null;ff.on('error',e=>error=e);ff.stdin.on('error',e=>error=e);const begun=Date.now();let prepared=null;for(let f=first;f<last;f++){
 const shot=engine.camera.at(f/fps).shot;
 if(shot.kind!=='globe'&&prepared!==shot.id){
  const cv=createCanvas(2304,1464),bc=cv.getContext('2d');bc.translate(192,192);const base={shot,focus:shot.focus,zoom:shot.zoom};engine.drawBase(bc,base);const im=await loadImage(cv.toBuffer('image/png'));engine.mapCache={key:shot.id,cv:im,base};prepared=shot.id;
 }
if(error)throw error;ctx.save();ctx.scale(width/1920,height/1080);engine.render(ctx,f/fps,{subtitles:!args.includes('--no-subtitles')});ctx.restore();const pixels=canvas.data();if(!ff.stdin.write(pixels))await once(ff.stdin,'drain');if((f-first)%600===0)console.log(JSON.stringify({output,frame:f,last,fps:((f-first+1)/((Date.now()-begun)/1000)).toFixed(1)}));}ff.stdin.end();const [code]=await once(ff,'close');if(code!==0)throw new Error(`FFmpeg exit ${code}`);console.log(JSON.stringify({output,frames:last-first,seconds:end-start,renderSeconds:(Date.now()-begun)/1000}));}
if(process.argv[1]===new URL(import.meta.url).pathname)main().catch(e=>{console.error(e);process.exit(1)});
