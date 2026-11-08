import {Atlas} from './map.mjs';
import {drawScene} from './scenes.mjs';
import {C,clamp,ease,text,rect,line} from './draw.mjs';
export const WIDTH=1920,HEIGHT=1080,FPS=60,FRAMES=17640,DURATION=294;
export const CHAPTERS=['文明的产生和古代亚非文明','古代欧洲文明','封建时代的欧洲','中古时期的亚洲、非洲和美洲','走向近代','资本主义制度的初步确立','工业革命与社会主义运动'];
export const timecode=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds)%60).padStart(2,'0')}`;
export function fitSize(c,str,maxWidth,maxSize=40,minSize=26,serif=false){
 for(let size=maxSize;size>=minSize;size--){c.font=`${size}px "Noto ${serif?'Serif':'Sans'} CJK SC", sans-serif`;if(c.measureText(str).width<=maxWidth)return size}
 throw Error('Text exceeds its safe area: '+str);
}
export class Film{
 constructor(data,platform){Object.assign(this,data,platform);this.totalFrames=this.shots.at(-1).endFrame;this.duration=this.totalFrames/FPS;this.atlas=new Atlas(data,platform);this.backdrop=null;}
 at(frame){return this.shots.find(s=>frame>=s.startFrame&&frame<s.endFrame)||this.shots.at(-1)}
 async prepare(s){
  if(!this.backdrop){const cv=this.createCanvas(WIDTH,HEIGHT),c=cv.getContext('2d'),g=c.createLinearGradient(0,0,WIDTH,HEIGHT);g.addColorStop(0,'#06141e');g.addColorStop(.5,'#0c2632');g.addColorStop(1,'#06131c');c.fillStyle=g;c.fillRect(0,0,WIDTH,HEIGHT);c.globalAlpha=.1;for(let i=0;i<400;i++){const x=i*7919%WIDTH,y=i*5237%HEIGHT;c.fillStyle=i%3?C.paper:C.cyan;c.fillRect(x,y,1,1)}this.backdrop=this.loadImage?await this.loadImage(cv.toBuffer('image/png')):cv;}
  const i=this.shots.indexOf(s);for(const a of[s,this.shots[Math.max(0,i-1)]])if(a.mode==='map')await this.atlas.prepare(a);
 }
 background(c){if(this.backdrop)c.drawImage(this.backdrop,0,0);else{c.fillStyle=C.bg;c.fillRect(0,0,WIDTH,HEIGHT)}}
 content(c,s,frame){this.background(c);const p=clamp((frame-s.startFrame)/(s.endFrame-s.startFrame)),t=(frame-s.startFrame)/FPS;
  if(s.mode==='map')this.atlas.draw(c,s,t,p);else{c.save();const k=.985+.025*p;c.translate(960,530);c.scale(k,k);c.translate(-960,-530);drawScene(c,s,t,p,this.atlas);c.restore()}
 }
 render(c,frame,{captions=true,hud=true}={}){
  frame=Math.max(0,Math.min(this.totalFrames-1,frame));const s=this.at(frame),idx=this.shots.indexOf(s),u=ease((frame-s.startFrame)/25),prev=this.shots[Math.max(0,idx-1)];this.background(c);
  c.save();c.beginPath();c.rect(0,225,WIDTH,645);c.clip();
  if(idx===0||u>=1)this.content(c,s,frame);
  else if(prev.mode==='map'&&s.mode==='scene'){
   c.save();c.translate(960,520);c.scale(1+u*1.1,1+u*1.1);c.translate(-960,-520);c.globalAlpha=1-u;this.content(c,prev,prev.endFrame-1);c.restore();c.save();c.translate(960,520);const z=.3+.7*u;c.scale(z,z);c.translate(-960,-520);c.globalAlpha=u;this.content(c,s,frame);c.restore();
  }else if(prev.mode==='scene'&&s.mode==='map'){
   this.content(c,s,frame);c.save();c.translate(960,520);c.scale(1-.65*u,1-.65*u);c.translate(-960,-520);c.globalAlpha=1-u;this.content(c,prev,prev.endFrame-1);c.restore();
  }else if(s.transition==='iris'){
   this.content(c,prev,prev.endFrame-1);c.save();c.beginPath();c.arc(960,520,1120*u,0,Math.PI*2);c.clip();this.content(c,s,frame);c.restore();
  }else{
   c.save();c.translate(-u*1920,0);this.content(c,prev,prev.endFrame-1);c.restore();c.save();c.translate((1-u)*1920,0);this.content(c,s,frame);c.restore();
  }c.restore();
  if(hud){
   rect(c,0,0,WIDTH,224,'#06141e');text(c,`世界历史  /  第${s.chapter}单元  ${s.chapterTitle||CHAPTERS[s.chapter-1]}`,86,57,23,C.gold);
   const titleSize=fitSize(c,s.title,1150,48,34,true);text(c,s.title,86,133,titleSize,C.paper,'left',true);text(c,`第 ${String(s.lesson||s.chapter).padStart(2,'0')} 课`,89,190,21,C.muted);
   rect(c,1320,83,514,112,'#102c38','#426570',9);text(c,'历史时间',1346,105,18,C.cyan);
   const dateSize=fitSize(c,s.date,464,36,23);text(c,s.date,1577,151,dateSize,C.gold,'center');line(c,[[86,223],[1834,223]],'#45626b',1);
  }
  if(captions){
   rect(c,0,876,WIDTH,148,'#04111b');line(c,[[86,877],[1834,877]],'#45626b',1);
   for(let i=0;i<2;i++){const y=921+i*54,cap=s.caption[i]||'',size=fitSize(c,cap,1530,40,34);rect(c,88,y-17,72,34,i?'#624e2e':'#204754',null,5);text(c,i?'意义':'事件',124,y,22,i?C.gold:C.cyan,'center');text(c,cap,190,y,size,i?C.gold:C.paper);}
  }
  if(hud){
   const length=1746,start=87;line(c,[[start,1040],[start+length,1040]],'#35565e',2);line(c,[[start,1040],[start+length*frame/this.totalFrames,1040]],C.gold,3);
   for(let i=1;i<this.shots.length;i++)if(this.shots[i].chapter!==this.shots[i-1].chapter){const x=start+length*this.shots[i].startFrame/this.totalFrames;line(c,[[x,1035],[x,1045]],C.paper,1)}
   text(c,'两河流域 → 1871年',87,1066,16,C.muted);text(c,`${timecode(frame/FPS)} / ${timecode(this.duration)}`,1834,1066,16,C.muted,'right');
  }
  if(frame>=this.totalFrames-20){c.fillStyle=`rgba(0,0,0,${ease((frame-this.totalFrames+20)/19)})`;c.fillRect(0,0,WIDTH,HEIGHT)}
 }
}
