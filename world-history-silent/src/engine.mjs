import {geoPath,geoNaturalEarth1,geoOrthographic,geoGraticule10,geoCircle} from 'd3-geo';
import {projectRouteSegments} from './routes-geometry.mjs';
import {drawHistoricalScene} from './scenes.mjs';
export const WIDTH=1920,HEIGHT=1080,FPS=60,DURATION=600;
export const palette={navy:'#071521',ocean:'#0b202d',land:'#253a40',gold:'#e9c47d',cyan:'#69c9cd',red:'#be695f',orange:'#de9153',ivory:'#f3ead5',muted:'#9ba9ac'};
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v)};
const mix=(a,b,t)=>a+(b-a)*t;
export function yearLabel(y){y=Math.round(y);if(y===0)y=1;return y<0?`公元前 ${-y} 年`:`${y} 年`;}
const polyline=(c,pts)=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));};
const textCache=new Map();
export function label(c,s,x,y,size=24,color=palette.ivory,align='left',font='sans'){
 const typeface=`${size>=42?'500':'400'} ${size}px "Noto ${font==='serif'?'Serif':'Sans'} CJK SC", sans-serif`;
 c.fillStyle=color;c.font=typeface;c.textAlign=align;c.textBaseline='middle';
 if(typeof c.canvas?.data==='function'&&size!==42){
  const key=[s,typeface,color].join('|');let entry=textCache.get(key);
  if(!entry){const advance=c.measureText(s).width,w=Math.max(1,Math.ceil(advance+12)),h=Math.ceil(size*1.8+8),cv=new c.canvas.constructor(w,h),a=cv.getContext('2d');a.font=typeface;a.textBaseline='middle';a.fillStyle=color;a.fillText(s,6,h/2);const rgba=cv.data(),raster=new c.canvas.constructor(w,h),r=raster.getContext('2d'),image=r.createImageData(w,h);image.data.set(rgba);r.putImageData(image,0,0);entry={image:raster,advance,w,h};textCache.set(key,entry);if(textCache.size>400)textCache.delete(textCache.keys().next().value);}
  c.drawImage(entry.image,x-6-(align==='center'?entry.advance/2:align==='right'?entry.advance:0),y-entry.h/2);return;
 }
 c.fillText(s,x,y);
}
function glowDot(c,x,y,r,color){c.fillStyle=color;c.globalAlpha*=.16;c.beginPath();c.arc(x,y,r*3.2,0,Math.PI*2);c.fill();c.globalAlpha/=.16;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
const typeColor=e=>/战争|革命|奴隶|灾|war|disease|forced/.test(e.type)?palette.red:/工业|industrial/.test(e.type)?palette.orange:/贸易|传播|航海|trade|religion|voyage/.test(e.type)?palette.cyan:palette.gold;
export class CameraRig{
 constructor(shots){this.shots=shots;}
 at(t){let i=this.shots.findIndex(s=>t>=s.start&&t<s.end);if(i<0)i=this.shots.length-1;const shot=this.shots[i],p=clamp((t-shot.start)/(shot.end-shot.start));const prev=this.shots[Math.max(i-1,0)];const u=ease((t-shot.start)/1.25);const f=shot.focus||[15,20],pf=prev.focus||f;return {shot,index:i,p,focus:[mix(pf[0],f[0],u)+Math.sin(p*2.2)*1.5,mix(pf[1],f[1],u)],zoom:mix(prev.zoom||1,shot.zoom||1,u)*(1+.045*Math.sin(p*Math.PI)),travel:1-u};}
}
export class WorldMapEngine{
 constructor({land,rivers,regions,events,shots,routes,narration,Path2D,createCanvas,ancientRivers,empires=[]}){Object.assign(this,{land,rivers,regions,events,shots,routes,narration,Path2D,createCanvas,ancientRivers,empires});this.camera=new CameraRig(shots);this.projection=geoNaturalEarth1().translate([0,0]).scale(286);this.path=geoPath(this.projection);this.landPath=new Path2D(this.path(land));this.gridPath=new Path2D(this.path(geoGraticule10()));this.riverPath=new Path2D(this.path(rivers));this.regionFeatures=(regions?.features||[]).filter(f=>/Mountain|Range|Plateau|Highland/i.test(f.properties.FEATURECLA||''));this.terrainPath=new Path2D(this.path({type:'FeatureCollection',features:this.regionFeatures}));this.ancientPath=ancientRivers?new Path2D(this.path(ancientRivers)):null;this.mapCache=null;this.routeCache=new Map();for(const r of routes){let pts=projectRouteSegments(r.points,this.projection);this.routeCache.set(r.id,pts);}}
 transform(c,cam){const z=cam.zoom;const f=this.projection(cam.focus);c.translate(1050,506);c.scale(z,z);c.translate(-f[0],-f[1]);}
 drawBase(c,cam){c.save();this.transform(c,cam);const z=cam.zoom;
 c.strokeStyle='#27434b';c.lineWidth=.65/z;c.globalAlpha=.45;c.stroke(this.gridPath);c.globalAlpha=1;
 c.save();c.translate(0,4/z);c.fillStyle='#020c12';c.fill(this.landPath);c.restore();c.fillStyle=palette.land;c.fill(this.landPath);c.strokeStyle='#658180';c.lineWidth=.8/z;c.stroke(this.landPath);
 // Physical relief from Natural Earth geographic regions, never national borders.
 c.fillStyle='#526058';c.globalAlpha=.27;c.fill(this.terrainPath);c.globalAlpha=1;c.strokeStyle='#629ca2';c.lineWidth=.85/z;c.globalAlpha=.55;c.stroke(this.riverPath);c.globalAlpha=1;
 c.restore();}
 drawMap(c,t,cam,year){
 if(this.createCanvas&&cam.travel===0){
 const key=cam.shot.id;const margin=192;
 if(!this.mapCache||this.mapCache.key!==key){const cv=this.createCanvas(2304,1464),bc=cv.getContext('2d');bc.translate(margin,margin);const base={...cam,focus:cam.shot.focus,zoom:cam.shot.zoom};this.drawBase(bc,base);let image=cv;if(cv.data){const rgba=cv.data(),raster=this.createCanvas(cv.width,cv.height),rc=raster.getContext('2d'),pixels=rc.createImageData(cv.width,cv.height);pixels.data.set(rgba);rc.putImageData(pixels,0,0);image=raster;}this.mapCache={key,cv:image,base};}
 const {cv,base}=this.mapCache,ratio=cam.zoom/base.zoom,now=this.projection(cam.focus),then=this.projection(base.focus);
 c.save();c.translate(1050,506);c.scale(ratio,ratio);c.translate(-1050-margin+(then[0]-now[0])*base.zoom,-506-margin+(then[1]-now[1])*base.zoom);c.drawImage(cv,0,0);c.restore();
 }else this.drawBase(c,cam);
 c.save();this.transform(c,cam);
 if(cam.shot.chapter===2&&this.ancientPath){c.strokeStyle=palette.cyan;c.lineWidth=1.25/cam.zoom;c.globalAlpha=.8;c.stroke(this.ancientPath);c.globalAlpha=1;if(cam.zoom>3){for(const [name,coord] of [['幼发拉底河',[42.7,33.8]],['底格里斯河',[44.5,35.1]],['尼罗河',[31,27.8]]]){const xy=this.projection(coord);c.save();c.translate(xy[0],xy[1]);c.scale(1/cam.zoom,1/cam.zoom);label(c,name,0,0,18,palette.cyan);c.restore();}}}
 EmpireExpansion(c,this,cam,t,year);TradeRoutes(c,this,cam,t,year);CivilizationLayer(c,this,cam,t,year);WarAnimation(c,this,cam,t,year);
 if(cam.shot.id==='c12-s05'){
  const a=this.projection([45.64,31.32]),b=this.projection([-.12,51.5]);c.save();c.strokeStyle=palette.gold;c.lineWidth=2/cam.zoom;c.setLineDash([5/cam.zoom,5/cam.zoom]);polyline(c,routePoints([a,b],ease(cam.p*1.5)));c.stroke();c.setLineDash([]);for(const [xy,txt] of [[a,'约前3500 · 乌鲁克'],[b,'1848 · 伦敦']]){glowDot(c,xy[0],xy[1],4/cam.zoom,palette.gold);c.save();c.translate(xy[0],xy[1]);c.scale(1/cam.zoom,1/cam.zoom);label(c,txt,12,-24,22,palette.gold);c.restore();}c.restore();
 }
 c.restore();
 // Geographic locator corners and camera coordinate readout.
 label(c,`${Math.abs(cam.focus[1]).toFixed(1)}°${cam.focus[1]>=0?'N':'S'}   ${Math.abs(cam.focus[0]).toFixed(1)}°${cam.focus[0]>=0?'E':'W'}`,1810,196,17,palette.muted,'right');
 }
 render(c,t,{subtitles=true}={}){const cam=this.camera.at(t);const {shot,p}=cam;let year=HistoricalTimeline(shot,p);const bg=c.createLinearGradient(0,0,1920,1080);bg.addColorStop(0,'#06111e');bg.addColorStop(.55,'#102e38');bg.addColorStop(1,'#050f19');c.fillStyle=bg;c.fillRect(0,0,1920,1080);
 // Fine registration marks make the film read as a navigable atlas.
 c.strokeStyle='#567578';c.lineWidth=1;c.globalAlpha=.22;for(let x=64;x<1900;x+=64){c.beginPath();c.moveTo(x,46);c.lineTo(x,52);c.stroke();}c.globalAlpha=1;
 if(shot.kind==='globe')this.drawGlobe(c,t,p);else this.drawMap(c,t,cam,year);
 if(shot.kind==='scene')HistoricalScene(c,this,cam,t);
 TransitionEngine(c,this,cam,t);
 const ci=shot.chapter-1;const titles=['5000年的连接','河流，城市与文字','更大的国家','同时代的世界','帝国之外的信仰','流动的中世纪','海洋成为道路','连接的沉重代价','重新理解宇宙','权利与革命','机器改变生活','工业社会的新问题'];
 // Chapter title occupies a calm top band, leaving the geographic stage open.
 c.fillStyle='#071521';c.globalAlpha=.82;c.fillRect(0,55,1920,113);c.globalAlpha=1;
 label(c,'THE WORLD IS CHANGING',78,82,17,palette.gold);label(c,`${String(shot.chapter).padStart(2,'0')}  /  ${titles[ci]}`,78,130,37,palette.ivory,'left','serif');
 label(c,yearLabel(year),1825,108,42,palette.gold,'right');
 label(c,shot.title,82,223,26,palette.ivory);c.fillStyle=palette.gold;c.fillRect(82,250,48,2);
 label(c,shot.kicker||'',82,286,19,palette.muted);
 // Quiet shot index and layer legend.
 label(c,`镜头 ${String(cam.index+1).padStart(2,'0')} / 72`,82,840,15,palette.muted);
 const legend=shot.id==='c12-s05'?'金色连线：历史时间的连接 · 非实际地理路线':shot.layers?.includes('empires')?'晕染：已知城市节点与势力联系 · 非疆界':shot.layers?.includes('war')?'路线连接已知节点 · 非精确行军轨迹':shot.layers?.includes('trade')?'交流网络概略示意 · 非单一路线':'地理底图：Natural Earth · 无现代国界';
 label(c,legend,1825,840,17,palette.muted,'right');
 if(subtitles)VoiceoverTimeline(c,this.narration,t);
 this.drawTimeline(c,t,shot,year);
 // Book-to-world ending settles on 1848 while the last sentence remains legible.
 if(t>597){c.fillStyle=`rgba(0,0,0,${ease((t-597)/1.45)*.98})`;c.fillRect(0,0,1920,1080);label(c,'1848',960,520,92,palette.gold,'center','serif');if(subtitles)VoiceoverTimeline(c,this.narration,t);}
 // Intentional black tail, no encoded splice gaps.
 if(t>599.9){c.fillStyle=`rgba(0,0,0,${ease((t-599.9)/.08)})`;c.fillRect(0,0,1920,1080);}
 }
 drawGlobe(c,t,p){const ending=t>590;const pr=geoOrthographic().translate([1080,501]).scale(383).rotate([ending?-30+Math.sin(t*.07)*5:-t*4+10,-15]).clipAngle(90),path=geoPath(pr);const sphere={type:'Sphere'};c.save();const g=c.createRadialGradient(970,392,80,1080,501,403);g.addColorStop(0,'#203f4a');g.addColorStop(.75,'#0d2836');g.addColorStop(1,'#020912');c.fillStyle=g;c.fill(new this.Path2D(path(sphere)));c.strokeStyle='#6197a0';c.globalAlpha=.25;c.lineWidth=1;c.stroke(new this.Path2D(path(geoGraticule10())));c.globalAlpha=1;c.fillStyle='#354c4c';c.fill(new this.Path2D(path(this.land)));c.strokeStyle='#829b8b';c.lineWidth=.75;c.stroke(new this.Path2D(path(this.land)));if(t<8){for(const e of this.events.filter(e=>e.chapter>=9)){const pp=pr(e.coordinates);const center=[-(-t*4+10),15];if(pp&&Math.hypot(pp[0]-1080,pp[1]-501)<375){c.globalAlpha=clamp(1-t/7);glowDot(c,pp[0],pp[1],2.6,palette.gold);}}}c.globalAlpha=.3;c.strokeStyle=palette.cyan;c.lineWidth=2;c.beginPath();c.arc(1080,501,390,0,Math.PI*2);c.stroke();c.restore();label(c,ending?'历史，仍在继续':'一场不断扩大的连接',82,485,44,palette.ivory,'left','serif');label(c,ending?'无数人、技术、思想与选择的交织':'从第一批城市，到改变世界的思想',84,552,23,palette.gold);if(ending){c.save();for(const e of this.events.filter(e=>[1,11,12].includes(e.chapter))){const pp=pr(e.coordinates);if(pp){c.globalAlpha=.6;glowDot(c,pp[0],pp[1],2.2,palette.gold);}}c.restore();}}
 drawTimeline(c,t,shot,year){const x0=82,x1=1838,y=1014;const bounds=[0,25,80,130,185,240,295,345,395,440,495,555,600];c.strokeStyle='#3c5358';c.lineWidth=2;c.beginPath();c.moveTo(x0,y);c.lineTo(x1,y);c.stroke();for(let i=0;i<12;i++){let x=x0+(x1-x0)*bounds[i]/600;c.fillStyle=i+1===shot.chapter?palette.gold:'#657b7c';c.fillRect(x,y-4,2,8);label(c,String(i+1).padStart(2,'0'),x,y+23,14,i+1===shot.chapter?palette.gold:palette.muted);}let x=x0+(x1-x0)*t/600;c.fillStyle=palette.gold;c.fillRect(x0,y-1,x-x0,2);c.beginPath();c.arc(x,y,5,0,Math.PI*2);c.fill();label(c,`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')} / 10:00`,1838,1050,16,palette.muted,'right');}
}
export function HistoricalTimeline(shot,p){let y=mix(shot.yearStart??-3500,shot.yearEnd??1848,ease(p));return Math.round(y)===0?1:y;}
function activeEvents(e,cam,year){return e.chapter===cam.shot.chapter && (e.startYear<=year || cam.shot.kind==='scene') && e.coordinates?.length===2;}
export function CivilizationLayer(c,engine,cam,t,year){const z=cam.zoom;const ev=engine.events.filter(e=>activeEvents(e,cam,year));const displayed=[];ev.sort((a,b)=>Math.hypot(a.coordinates[0]-cam.focus[0],a.coordinates[1]-cam.focus[1])-Math.hypot(b.coordinates[0]-cam.focus[0],b.coordinates[1]-cam.focus[1]));for(let i=0;i<ev.length;i++){const e=ev[i],xy=engine.projection(e.coordinates);if(!xy)continue;const [x,y]=xy;const a=clamp((year-e.startYear)/Math.max(1,(cam.shot.yearEnd-cam.shot.yearStart)*.12));c.save();c.globalAlpha=.4+.6*a;const color=typeColor(e);glowDot(c,x,y,(3+.6*Math.sin(t*2+i))/Math.sqrt(z),color);const r=(6+((t*.35+i*.2)%1)*12)/z;c.globalAlpha*=.4;c.strokeStyle=color;c.lineWidth=1/z;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();c.restore();
 const f=engine.projection(cam.focus);const sx=1050+(x-f[0])*z,sy=506+(y-f[1])*z;const text=(e.mapLabel||e.name.split(/[：:]/)[0]).slice(0,16);const show=sx>360&&sx<1740&&sy>320&&sy<765&&!displayed.some(q=>Math.abs(q[0]-sx)<Math.max(q[2],text.length*19)+25&&Math.abs(q[1]-sy)<35);if(show&&displayed.length<8){displayed.push([sx,sy,text.length*19]);c.save();c.translate(x+8/z,y-13/z);c.scale(1/z,1/z);label(c,text,0,0,19,color);c.restore();}}
}
export function EmpireExpansion(c,engine,cam,t,year){
 if(!cam.shot.layers?.includes('empires'))return;
 const groups=engine.empires.filter(e=>e.chapter===cam.shot.chapter&&year>=e.startYear&&year<=e.endYear+80);
 for(const [j,e] of groups.entries()){const nodes=e.cities.filter(q=>!q.visibleByYear||q.visibleByYear<=year).map(q=>engine.projection(q.coordinates)),color=j%2?palette.cyan:palette.gold;
 c.save();c.clip(engine.landPath);for(const [i,node] of nodes.entries()){const bloom=ease(clamp(cam.p*2.2-i*.12));const g=c.createRadialGradient(node[0],node[1],0,node[0],node[1],(14+8*bloom)/Math.sqrt(cam.zoom));g.addColorStop(0,color+'80');g.addColorStop(1,color+'00');c.fillStyle=g;c.fillRect(node[0]-30,node[1]-30,60,60);}c.restore();
 for(const [i,node] of nodes.entries()){if(cam.p*nodes.length*1.6<i)continue;glowDot(c,node[0],node[1],2.5/Math.sqrt(cam.zoom),color);if(i){c.save();c.globalAlpha=.45;c.strokeStyle=color;c.lineWidth=1/cam.zoom;c.setLineDash([2/cam.zoom,5/cam.zoom]);polyline(c,[nodes[0],node]);c.stroke();c.restore();}}
 }
}
function routePoints(pts,fraction){const lens=[0];for(let i=1;i<pts.length;i++)lens.push(lens.at(-1)+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const target=lens.at(-1)*clamp(fraction);const out=[pts[0]];for(let i=1;i<pts.length;i++){if(lens[i]<=target)out.push(pts[i]);else{const p=(target-lens[i-1])/(lens[i]-lens[i-1]);out.push([mix(pts[i-1][0],pts[i][0],p),mix(pts[i-1][1],pts[i][1],p)]);break;}}return out;}
export function TradeRoutes(c,engine,cam,t,year){
 if(!cam.shot.layers?.some(x=>['trade','religion','industry','knowledge','war'].includes(x)))return;
 const active=engine.routes.filter(r=>r.chapter===cam.shot.chapter&&r.startYear<=year&&(!/war|voyage|disease/.test(r.type)||year<=r.endYear+5));
 for(const [i,r] of active.entries())for(const pts of engine.routeCache.get(r.id)||[]){
 if(pts.length<2)continue;const color=/forced|disease|war/.test(r.type)?palette.red:r.type==='rail'?palette.orange:palette.cyan;
 const shown=routePoints(pts,ease(clamp(cam.p*2.8-i*.06)));c.strokeStyle=color;c.lineWidth=(r.type==='rail'?2.6:1.5)/cam.zoom;c.globalAlpha=.66;c.setLineDash(r.type==='forced'?[3/cam.zoom,6/cam.zoom]:[]);polyline(c,shown);c.stroke();c.setLineDash([]);
 if(!/disease|forced/.test(r.type)&&shown.length>1){for(let k=0;k<3;k++){const pp=routePoints(shown,(t*.05+k/3+i*.11)%1).at(-1);c.fillStyle=color;c.globalAlpha=.92;c.beginPath();c.moveTo(pp[0]+4/cam.zoom,pp[1]);c.lineTo(pp[0]-3/cam.zoom,pp[1]-2/cam.zoom);c.lineTo(pp[0]-3/cam.zoom,pp[1]+2/cam.zoom);c.closePath();c.fill();}}c.globalAlpha=1;
 if(cam.shot.richRoutes&&!/disease|forced|war/.test(r.type)&&shown.length>1){
  for(let k=0;k<2;k++){const pp=routePoints(shown,(t*.055+k*.5+i*.17)%1).at(-1);c.save();c.translate(...pp);c.scale(1/cam.zoom,1/cam.zoom);c.fillStyle=palette.navy;c.fillRect(-19,-17,38,34);c.strokeStyle=color;c.fillStyle=color;c.lineWidth=2;
   if(r.type==='rail'){c.strokeRect(-15,-9,29,17);for(let j=0;j<3;j++)c.fillRect(-11+j*8,-5,5,5);for(let j=0;j<2;j++){c.beginPath();c.arc(-9+j*18,11,3,0,Math.PI*2);c.fill();}}
   else if(r.type==='voyage'){c.beginPath();c.moveTo(-17,4);c.lineTo(17,4);c.lineTo(10,12);c.lineTo(-11,12);c.closePath();c.fill();c.beginPath();c.moveTo(0,3);c.lineTo(0,-19);c.lineTo(14,1);c.closePath();c.stroke();}
   else{c.strokeRect(-11,-10,22,20);c.beginPath();c.moveTo(0,-10);c.lineTo(0,10);c.moveTo(-11,-2);c.lineTo(11,-2);c.stroke();}
   c.restore();
  }
 }
 }
}
export function WarAnimation(c,engine,cam,t,year){if(!cam.shot.layers?.includes('war'))return;for(const e of engine.events.filter(e=>activeEvents(e,cam,year)&&/战争|战役|革命/.test(e.type+e.name))){const xy=engine.projection(e.coordinates);if(!xy)continue;const [x,y]=xy,r=8/cam.zoom;c.strokeStyle=palette.red;c.lineWidth=2/cam.zoom;c.beginPath();c.moveTo(x-r,y-r);c.lineTo(x+r,y+r);c.moveTo(x+r,y-r);c.lineTo(x-r,y+r);c.stroke();}}
export function CivilizationAchievements(c,kind,t,p,chapter){drawHistoricalScene(c,{kind,t,p,chapter,width:1920,height:1080,palette});}
export function HistoricalScene(c,engine,cam,t){const u=ease(clamp((t-cam.shot.start)/1.15));c.save();const px=1050,py=505;c.translate(px,py);c.scale(.14+.86*u,.14+.86*u);c.translate(-px,-py);c.globalAlpha=u;const g=c.createRadialGradient(1100,490,100,1100,490,800);g.addColorStop(0,'#091b27');g.addColorStop(.7,'rgba(7,21,33,.92)');g.addColorStop(1,'rgba(7,21,33,0)');c.fillStyle=g;c.fillRect(340,180,1500,650);CivilizationAchievements(c,cam.shot.sceneKind||'city',t,cam.p,cam.shot.chapter);c.restore();}
export function TransitionEngine(c,engine,cam,t){
 const u=clamp((t-cam.shot.start)/1.2);if(u>=1||cam.index===0)return;
 const name=cam.shot.transition||'',a=Math.sin(u*Math.PI);c.save();c.globalAlpha=a*.6;c.strokeStyle=palette.gold;c.fillStyle=palette.gold;c.lineWidth=2;
 if(/Mechanical|Industrial/.test(name)){const r=130+u*330;c.translate(1050,505);c.rotate(u*1.8);for(let i=0;i<18;i++){c.rotate(Math.PI/9);c.fillRect(r,-10,35,20);}c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke();}
 else if(/Knowledge|Book/.test(name)){c.translate(1050,505);c.rotate((1-u)*-.2);for(let i=0;i<18;i++){c.globalAlpha=a*(1-i/24)*.4;c.fillRect(-390*u,(-220+i*26)*u,780*u,1.5);}c.strokeRect(-400*u,-250*u,800*u,500*u);}
 else if(/Ocean|Trade/.test(name)){c.strokeStyle=palette.cyan;for(let i=0;i<5;i++){c.beginPath();c.moveTo(250+u*900,390+i*55);c.bezierCurveTo(700,240+i*60,1100,730+i*30,1780-u*350,440+i*55);c.stroke();}}
 else if(/Battle/.test(name)){c.strokeStyle=palette.red;for(let i=0;i<3;i++){const x=780+i*220;c.beginPath();c.moveTo(x-35*u,505-35*u);c.lineTo(x+35*u,505+35*u);c.moveTo(x+35*u,505-35*u);c.lineTo(x-35*u,505+35*u);c.stroke();}}
 else if(/Bloom|Ink/.test(name)){for(let i=0;i<9;i++){const theta=i/9*Math.PI*2,rr=u*350;c.beginPath();c.arc(1050+Math.cos(theta)*rr,505+Math.sin(theta)*rr*.5,8+u*18,0,Math.PI*2);c.stroke();}}
 else if(/Architecture/.test(name)){for(let i=0;i<8;i++)c.strokeRect(650+i*110,700-u*350,75,u*350);}
 else{c.globalAlpha=a*.24;c.beginPath();c.ellipse(1050,505,40+u*1100,24+u*600,0,0,Math.PI*2);c.stroke();}
 c.restore();
}
export function VoiceoverTimeline(c,narration,t){
 const cue=narration.find(n=>t>=n.start&&t<n.end);if(!cue)return;
 const lines=cue.text.split('\n');c.fillStyle=palette.navy;c.fillRect(0,866,1920,128);
 c.fillStyle=palette.gold;c.fillRect(197,895,3,68);
 lines.forEach((line,i)=>label(c,line,960,910+i*44,34,palette.ivory,'center'));
}
