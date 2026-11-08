import {geoNaturalEarth1,geoPath,geoGraticule10} from 'd3-geo';
import {projectRouteSegments} from './routes-geometry.mjs';
import {C,TAU,clamp,ease,lerp,text,line,circle,poly,rect,shipIcon} from './draw.mjs';

export class Atlas{
 constructor(data,platform){Object.assign(this,data,platform);this.projection=geoNaturalEarth1().scale(290).translate([0,0]);this.geo=geoPath(this.projection);this.landPath=new this.Path2D(this.geo(this.land));this.gridPath=new this.Path2D(this.geo(geoGraticule10()));this.riverPath=new this.Path2D(this.geo(this.rivers));this.ancientPath=new this.Path2D(this.geo(this.ancientRivers));this.relief=new this.Path2D(this.geo({type:'FeatureCollection',features:this.regions.features.filter(f=>/Mountain|Range|Plateau|Highland/i.test(f.properties.FEATURECLA||''))}));this.caches=new Map();this.routePaths=new Map(this.routes.map(r=>[r.id,projectRouteSegments(r.points,this.projection)]));}
 base(c,s){const f=this.projection(s.focus),z=s.zoom;c.save();c.translate(960,520);c.scale(z,z);c.translate(-f[0],-f[1]);c.strokeStyle='#40616b';c.globalAlpha=.22;c.lineWidth=.7/z;c.stroke(this.gridPath);c.globalAlpha=1;c.fillStyle='#021018';c.save();c.translate(0,3/z);c.fill(this.landPath);c.restore();c.fillStyle=C.land;c.fill(this.landPath);c.strokeStyle='#718d8a';c.lineWidth=.85/z;c.stroke(this.landPath);c.globalAlpha=.24;c.fillStyle='#879276';c.fill(this.relief);c.globalAlpha=.53;c.strokeStyle='#80bec2';c.lineWidth=.8/z;c.stroke(this.riverPath);c.globalAlpha=1;c.restore()}
 async prepare(s){if(this.caches.has(s.key))return;const cv=this.createCanvas(2400,1560),c=cv.getContext('2d');c.translate(240,240);this.base(c,s);const image=this.loadImage?await this.loadImage(cv.toBuffer('image/png')):cv;this.caches.set(s.key,image);}
 camera(s,p){let dx=Math.sin((p-.5)*1.6)*38,dy=Math.sin(p*Math.PI)*12,z=1+.07*(p-.5);if(['voyages','alexander'].includes(s.key)){dx=(.5-p)*145;z=1.02}return{dx,dy,z}}
 toScreen(s,coords,p=.5){const f=this.projection(s.focus),q=this.projection(coords),cam=this.camera(s,p);return[960+(q[0]-f[0])*s.zoom*cam.z+cam.dx,520+(q[1]-f[1])*s.zoom*cam.z+cam.dy]}
 draw(c,s,t,p,{layers=true,opacity=1}={}){c.save();c.globalAlpha*=opacity;const cam=this.camera(s,p),image=this.caches.get(s.key);c.save();c.translate(960+cam.dx,520+cam.dy);c.scale(cam.z,cam.z);c.translate(-960,-520);if(image)c.drawImage(image,-240,-240);else this.base(c,s);c.restore();if(layers)this.layers(c,s,t,p);c.restore()}
 layers(c,s,t,p){
 const key=s.key,red=['slavery','conquest','napoleon','alexander','american_war'].includes(key),accent=red?C.red:C.cyan;
 const label=(name,q,color=C.gold,size=25)=>{const xy=this.toScreen(s,q,p);const font=size+'px "Noto Sans CJK SC"';c.font=font;const w=c.measureText(name).width,x=clamp(xy[0]+17,130,1775-w),y=clamp(xy[1]-25,270,770);circle(c,...xy,20,color+'16');circle(c,...xy,5,color);circle(c,...xy,9+((t*.22)%1)*15,null,color+'40',1.2);text(c,name,x,y,size,color===C.red?'#e6a39b':color);return xy};
 if(key==='uruk'){
  const f=this.projection(s.focus),cam=this.camera(s,p);c.save();c.translate(960+cam.dx,520+cam.dy);c.scale(s.zoom*cam.z,s.zoom*cam.z);c.translate(-f[0],-f[1]);c.strokeStyle=C.cyan;c.lineWidth=2/s.zoom;c.stroke(this.ancientPath);c.restore();
  for(const [txt,q] of [['幼发拉底河',[42.4,33.9]],['底格里斯河',[44.4,35.1]]]){const xy=this.toScreen(s,q,p);text(c,txt,...xy,24,C.cyan)}
 }
 if(key==='rome_split'){
  label('罗马 · 476年西部帝位终结',[12.48,41.89],C.red,24);
  const xy=this.toScreen(s,[28.98,41.01],p);circle(c,...xy,6,C.gold);text(c,'君士坦丁堡',xy[0]+16,xy[1]+24,24,C.gold);text(c,'东罗马继续存在',xy[0]+16,xy[1]+59,22,C.paper);
 }else if(key==='harappa'){
  const xy=this.toScreen(s,s.focus,p);circle(c,...xy,6,C.gold);line(c,[[xy[0]-14,xy[1]-14],[680,347]],C.gold,1.5);text(c,'印度河流域',520,318,29,C.gold);
  c.save();c.globalAlpha=ease((p-.15)*3);const x=1145,y=343;rect(c,x-30,y-32,612,438,'#102a34ee','#718e83',10);text(c,'城市街区与排水',x+270,y+10,29,C.gold,'center');
  for(let row=0;row<3;row++)for(let col=0;col<5;col++){const bx=x+col*107,by=y+48+row*103;rect(c,bx,by,81,71,'#9c9674','#c6bb91',2);rect(c,bx+22,by+18,37,32,'#334c48','#b3ae87',1);line(c,[[bx+35,by+71],[bx+35,by+88],[x+549,by+88]],'#6dabb0',5)}
  line(c,[[x+549,y+40],[x+549,y+365]],C.cyan,8);for(let i=0;i<15;i++){const u=(t*.18+i/15)%1;circle(c,x+549,y+40+u*325,3,C.paper)}
  text(c,'街区、支渠与主排水渠 · 概念示意',x+272,y+379,20,C.muted,'center');c.restore();
 }else if(key==='arabia'){
  label('麦加 · 7世纪伊斯兰教兴起',[39.83,21.42],C.gold,24);label('麦地那',[39.61,24.47],C.cyan,24);
 }else if(key==='napoleon'){
  for(const [q,name,i] of [[[16.76,49.13],'1805 · 奥斯特里茨',0],[[4.4,50.68],'1815 · 滑铁卢',1]]){c.save();c.globalAlpha=ease(p*2.5-i*.65);label(name,q,C.red,24);c.restore()}
 }else if(!['voyages','slavery','alexander'].includes(key)){
  const labelsByKey={uruk:'乌鲁克',harappa:'印度河城市文明',byzantium:'君士坦丁堡'};
  for(let i=0;i<s.events.length;i++){const e=this.events.find(e=>e.id===s.events[i]);if(!e)continue;const xy=this.toScreen(s,e.coordinates,p);if(xy[0]<100||xy[0]>1800||xy[1]<250||xy[1]>810)continue;c.save();c.globalAlpha=ease((p-i*.13)*3);let name=labelsByKey[key]||e.mapLabel||e.name;if(key==='american_war')name+=' · '+e.startYear+'年';label(name,e.coordinates,red?C.red:C.gold,24);c.restore()}
 }
 for(let i=0;i<s.routes.length;i++){
  const r=this.routes.find(r=>r.id===s.routes[i]);if(!r)continue;const col=key==='voyages'?[C.gold,C.cyan,C.orange][i]:accent,active=ease(p*1.8-i*.09);
  for(const pts0 of this.routePaths.get(r.id)||[]){const f=this.projection(s.focus),cam=this.camera(s,p),pts=pts0.map(q=>[960+(q[0]-f[0])*s.zoom*cam.z+cam.dx,520+(q[1]-f[1])*s.zoom*cam.z+cam.dy]),shown=portion(pts,active);if(shown.length<2)continue;c.save();c.globalAlpha=.83;c.setLineDash(r.type==='forced'?[5,10]:[]);line(c,shown,col,r.type==='war'?3:2.7);c.setLineDash([]);
   if(r.type==='voyage'&&active>.05){const q=portion(shown,(t*.06+i*.29)%1),xy=q.at(-1);shipIcon(c,...xy,.65,C.paper)}
   if(r.type==='war'&&shown.length>2){const a=shown.at(-2),b=shown.at(-1),th=Math.atan2(b[1]-a[1],b[0]-a[0]);poly(c,[b,[b[0]-13*Math.cos(th-.5),b[1]-13*Math.sin(th-.5)],[b[0]-13*Math.cos(th+.5),b[1]-13*Math.sin(th+.5)]],col)}c.restore()
  }
 }
 if(key==='voyages'){
  const rows=[['1492 · 哥伦布',C.gold],['1498 · 达·伽马',C.cyan],['1519—1522 · 麦哲伦—埃尔卡诺',C.orange]];for(let i=0;i<rows.length;i++){const y=715+i*36;line(c,[[180,y],[225,y]],rows[i][1],3);text(c,rows[i][0],240,y,23,rows[i][1]);}
 }
 if(key==='slavery'){text(c,'非洲',1110,452,30,C.red,'center');text(c,'美洲',560,485,30,C.paper,'center');text(c,'强迫迁移 · 路线为区域联系示意',960,784,25,C.muted,'center')}
 text(c,red?'历史事件与方向的地理示意 · 非精确疆界或完整行军轨迹':'地理位置概略示意 · 不绘制现代国界',1818,844,17,C.muted,'right');
 }
}
export function portion(points,f){if(points.length<2)return points;const lens=[0];for(let i=1;i<points.length;i++)lens.push(lens.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));const end=lens.at(-1)*clamp(f),out=[points[0]];for(let i=1;i<points.length;i++){if(lens[i]<=end)out.push(points[i]);else{const p=(end-lens[i-1])/(lens[i]-lens[i-1]||1);out.push([lerp(points[i-1][0],points[i][0],p),lerp(points[i-1][1],points[i][1],p)]);break}}return out}
