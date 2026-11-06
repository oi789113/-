import {Atlas} from './map.mjs';
import {drawScene} from './scenes.mjs';
import {C,clamp,ease,text,rect,line} from './draw.mjs';
export const WIDTH=1920,HEIGHT=1080,FPS=60,FRAMES=14400,DURATION=240;
const chapters=['文明起点','河流与城市','国家与交换','古典世界的联系','帝国与信仰','流动的中世纪','知识与远航','全球联系的代价','科学与证据','权利与革命','机器改变生活','工业社会的新思想'];
export class Film{
 constructor(data,platform){Object.assign(this,data,platform);this.atlas=new Atlas(data,platform);this.backdrop=null;}
 at(frame){return this.shots.find(s=>frame>=s.startFrame&&frame<s.endFrame)||this.shots.at(-1)}
 async prepare(s){if(!this.backdrop){const cv=this.createCanvas(1920,1080),c=cv.getContext('2d'),g=c.createLinearGradient(0,0,1920,1080);g.addColorStop(0,'#06141e');g.addColorStop(.5,'#0c2632');g.addColorStop(1,'#06131c');c.fillStyle=g;c.fillRect(0,0,1920,1080);c.globalAlpha=.1;for(let i=0;i<400;i++){let x=i*7919%1920,y=i*5237%1080;c.fillStyle=i%3?C.paper:C.cyan;c.fillRect(x,y,1,1)}this.backdrop=this.loadImage?await this.loadImage(cv.toBuffer('image/png')):cv;}
  const i=this.shots.indexOf(s);for(const a of[s,this.shots[Math.max(0,i-1)]])if(a.mode==='map'||['rail','haiti','manifesto'].includes(a.key))await this.atlas.prepare(a.key==='manifesto'?{...a,focus:[10,20],zoom:1}:a);
 }
 background(c){if(this.backdrop)c.drawImage(this.backdrop,0,0);else{c.fillStyle=C.bg;c.fillRect(0,0,1920,1080)}}
 content(c,s,frame){this.background(c);const p=clamp((frame-s.startFrame)/(s.endFrame-s.startFrame)),t=(frame-s.startFrame)/60;
  if(s.mode==='map')this.atlas.draw(c,s,t,p);else{c.save();const k=.98+.035*p;c.translate(960,530);c.scale(k,k);c.translate(-960,-530);drawScene(c,s,t,p,this.atlas);c.restore()}
 }
 render(c,frame,{captions=true,hud=true}={}){frame=Math.max(0,Math.min(14399,frame));const s=this.at(frame),idx=this.shots.indexOf(s),local=frame-s.startFrame,u=ease(local/25),prev=this.shots[Math.max(0,idx-1)];
  this.background(c);
  if(idx===0||u>=1)this.content(c,s,frame);
  else if(prev.mode==='map'&&s.mode==='scene'){
   c.save();c.translate(960,520);c.scale(1+u*1.1,1+u*1.1);c.translate(-960,-520);c.globalAlpha=1-u;this.content(c,prev,prev.endFrame-1);c.restore();c.save();c.translate(960,520);let z=.3+.7*u;c.scale(z,z);c.translate(-960,-520);c.globalAlpha=u;this.content(c,s,frame);c.restore();
  }else if(prev.mode==='scene'&&s.mode==='map'){
   this.content(c,s,frame);c.save();c.translate(960,520);c.scale(1-.65*u,1-.65*u);c.translate(-960,-520);c.globalAlpha=1-u;this.content(c,prev,prev.endFrame-1);c.restore();
  }else if(s.transition==='iris'){
   this.content(c,prev,prev.endFrame-1);c.save();c.beginPath();c.arc(960,520,1120*u,0,Math.PI*2);c.clip();this.content(c,s,frame);c.restore();
  }else{
   c.save();c.translate(-u*1920,0);this.content(c,prev,prev.endFrame-1);c.restore();c.save();c.translate((1-u)*1920,0);this.content(c,s,frame);c.restore();
  }
  if(hud){const shade=c.createLinearGradient(0,0,0,245);shade.addColorStop(0,'#041018f2');shade.addColorStop(.65,'#041018c4');shade.addColorStop(1,'#04101800');c.fillStyle=shade;c.fillRect(0,0,1920,245);
   text(c,`世界的连接  /  ${String(s.chapter).padStart(2,'0')}  ${chapters[s.chapter-1]}`,86,68,21,C.gold);text(c,s.date,1836,78,s.date.length>17?28:34,C.paper,'right',true);text(c,s.title,86,153,47,C.paper,'left',true);rect(c,87,202,70,3,C.gold);
  }
  if(captions){c.fillStyle='#06141ef2';c.fillRect(0,876,1920,146);c.fillStyle=C.gold;c.fillRect(220,908,3,80);s.caption.forEach((v,i)=>text(c,v,960,925+i*50,38,C.paper,'center'));}
  if(hud){line(c,[[87,1040],[1833,1040]],'#35565e',2);line(c,[[87,1040],[87+1746*frame/14400,1040]],C.gold,3);text(c,`${String(Math.floor(frame/3600)).padStart(2,'0')}:${String(Math.floor(frame/60)%60).padStart(2,'0')} / 04:00`,1834,1066,16,C.muted,'right');}
  if(frame>=14380){c.fillStyle=`rgba(0,0,0,${ease((frame-14380)/19)})`;c.fillRect(0,0,1920,1080)}
 }
}
