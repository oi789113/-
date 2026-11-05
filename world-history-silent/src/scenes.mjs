import {drawVisualStory,visualStoryKinds} from './visual-stories.mjs';
// Original procedural historical miniatures. No downloaded illustration assets.
// Coordinates are in a 1920 × 1080 design space. This module has no DOM dependency.
export const sceneNames = [...visualStoryKinds,'tablet','city','pyramid','bronze','book','ship','orbits','gears','factory','steam','train','workers','manifesto'];
const C = {navy:'#071521',gold:'#e9c47d',cyan:'#69c9cd',orange:'#de9153',ivory:'#f3ead5',red:'#be695f',dark:'#102532',dim:'#546973'};
const TAU=Math.PI*2;
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
function poly(c,pts,fill,stroke){c.beginPath();pts.forEach((q,i)=>i?c.lineTo(...q):c.moveTo(...q));c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.stroke()}}
function line(c,a,b,color,width=2){c.beginPath();c.moveTo(...a);c.lineTo(...b);c.strokeStyle=color;c.lineWidth=width;c.stroke()}
function circle(c,x,y,r,fill,stroke,width=2){c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}}
function text(c,s,x,y,size=22,color=C.ivory,align='left'){c.font=`${size}px "Noto Sans CJK SC", sans-serif`;c.fillStyle=color;c.textAlign=align;c.fillText(s,x,y)}
function round(c,x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}}
// Cache only static light mattes, never the moving geometry. Materialize the
// native surface once so the backend does not retain repeated gradient tasks.
const matteCache=new Map();
function radial(c,x,y,rx,ry,stops){
 const key=JSON.stringify([rx,ry,stops]);let canvas=matteCache.get(key);
 if(!canvas){try{
  const w=Math.ceil(rx*2),h=Math.ceil(ry*2);
  if(typeof OffscreenCanvas!=='undefined')canvas=new OffscreenCanvas(w,h);
  else if(c.canvas?.ownerDocument){canvas=c.canvas.ownerDocument.createElement('canvas');canvas.width=w;canvas.height=h;}
  else canvas=new c.canvas.constructor(w,h);
  const a=canvas.getContext('2d'),g=a.createRadialGradient(rx,ry,0,rx,ry,rx);
  for(const [pos,color] of stops)g.addColorStop(pos,color);
  a.translate(rx,ry);a.scale(1,ry/rx);circle(a,0,0,rx,g);
  if(typeof canvas.data==='function')canvas.data();
  matteCache.set(key,canvas);
 }catch{canvas=null}}
 if(canvas){c.drawImage(canvas,x-rx,y-ry);return;}
 const g=c.createRadialGradient(x,y,0,x,y,rx);for(const [pos,color] of stops)g.addColorStop(pos,color);
 c.save();c.translate(x,y);c.scale(1,ry/rx);circle(c,0,0,rx,g);c.restore();
}
function shadow(c,x,y,rx,ry){radial(c,x,y,rx,ry,[[0,'#00000080'],[1,'#00000000']])}
function backdrop(c,x,y,rx,ry,color=C.navy){radial(c,x,y,rx,ry,[[0,color+'f5'],[.72,color+'e8'],[1,color+'00']])}
function tag(c,s,x,y,color=C.cyan){line(c,[x,y],[x+35,y],color,2);text(c,s,x+47,y+7,21,color)}
function isoBox(c,x,y,w,d,h,top=C.gold,left='#6b674d',right='#95856a'){
  poly(c,[[x,y-h],[x+w,y-h-d*.42],[x+w+d*.72,y-h],[x+d*.72,y+d*.42-h]],top);
  poly(c,[[x,y-h],[x+d*.72,y+d*.42-h],[x+d*.72,y+d*.42],[x,y]],left);
  poly(c,[[x+d*.72,y+d*.42-h],[x+w+d*.72,y-h],[x+w+d*.72,y],[x+d*.72,y+d*.42]],right);
}
function window(c,x,y,w=8,h=16){c.fillStyle='#162e35';c.fillRect(x,y,w,h);c.fillStyle=C.gold+'80';c.fillRect(x+2,y+2,w-4,h-4)}
function person(c,x,y,s=1,color=C.ivory,arm=0){c.save();c.translate(x,y);c.scale(s,s);circle(c,0,-48,8,color);poly(c,[[-10,-34],[8,-34],[12,-7],[-12,-7]],color);line(c,[-6,-9],[-11,18],color,5);line(c,[7,-9],[10,18],color,5);line(c,[-9,-29],[-19,-11+arm],color,4);line(c,[9,-29],[19,-11-arm],color,4);c.restore()}
function gear(c,x,y,r,teeth,ang,color=C.orange){c.save();c.translate(x,y);c.rotate(ang);const pts=[];for(let i=0;i<teeth*4;i++){const a=i/(teeth*4)*TAU,rr=(i%4===0||i%4===3)?r*.87:r;pts.push([Math.cos(a)*rr,Math.sin(a)*rr])}poly(c,pts,color,C.gold+'80');circle(c,0,0,r*.65,C.navy,C.gold+'70');for(let i=0;i<6;i++){const a=i/6*TAU;line(c,[Math.cos(a)*r*.16,Math.sin(a)*r*.16],[Math.cos(a)*r*.59,Math.sin(a)*r*.59],color,r*.105)}circle(c,0,0,r*.17,color,C.ivory+'70');circle(c,0,0,r*.07,C.navy);c.restore()}

function tablet(c,t,p){
 backdrop(c,1010,478,650,400);shadow(c,1030,785,420,60);
 c.save();c.translate(1020,477);c.rotate(-.075+Math.sin(t*.22)*.018);const g=c.createLinearGradient(-310,-220,350,250);g.addColorStop(0,'#bc9563');g.addColorStop(.5,'#8b633e');g.addColorStop(1,'#4d3628');
 round(c,-335,-240,670,460,36,'#3b2c24');round(c,-342,-257,670,460,35,g,'#e3c194');
 for(let r=0;r<8;r++){for(let k=0;k<13;k++){
   if((r*13+k)/104>clamp(p*1.4))continue;const x=-296+k*45,y=-208+r*50;
   poly(c,[[x,y],[x+17,y+6],[x+2,y+12]],'#3c2e22');line(c,[x+5,y+6],[x+26,y+7],'#523924',2);
   if((r+k)%3!==0){poly(c,[[x+12,y+16],[x+19,y+31],[x+25,y+16]],'#3b2b20');line(c,[x+19,y+20],[x+19,y+37],'#513724',2)}
 }}
 // Small irregularities evoke clay without random frame-to-frame noise.
 for(let i=0;i<35;i++)circle(c,Math.sin(i*7.91)*302,Math.cos(i*4.23)*211,1.2,'#e9c47d40');
 c.restore();
 tag(c,'粮食 · 羊群 · 交易记录',520,779,C.gold);tag(c,'记事符号 → 管理与书写',1090,779,C.cyan);
 const a=t*.4;const sx=1290+45*Math.cos(a),sy=260+35*Math.sin(a);c.save();c.translate(sx,sy);c.rotate(-.6);poly(c,[[0,0],[160,-5],[170,4],[0,13]],'#ddc9a1');poly(c,[[0,0],[-28,7],[0,13]],'#8e603c');c.restore();
}
function city(c,t,p){
 backdrop(c,1000,493,700,360);shadow(c,1050,735,570,65);
 // Two banks, irrigation channels, and fields create an urban landscape.
 poly(c,[[410,555],[1075,250],[1640,480],[975,810]],'#263f3a','#627763');
 c.beginPath();c.moveTo(480,534);c.bezierCurveTo(780,390,870,672,1230,583);c.bezierCurveTo(1370,548,1410,420,1600,455);c.strokeStyle='#377f90';c.lineWidth=42;c.stroke();
 c.strokeStyle=C.cyan+'70';c.lineWidth=1;for(let i=0;i<5;i++){c.beginPath();c.moveTo(486+i*3,532+i*3);c.bezierCurveTo(800,400+i*3,890,650+i*3,1220,583+i*3);c.stroke()}
 for(let i=0;i<9;i++){const x=550+(i%3)*94,y=548+Math.floor(i/3)*38;poly(c,[[x,y],[x+74,y-33],[x+130,y-8],[x+55,y+28]],i%2?'#747649':'#566747','#91a16c60');for(let n=1;n<5;n++)line(c,[x+n*12,y+n*5],[x+70+n*12,y-31+n*5],'#afac7560',1)}
 for(let i=0;i<15;i++){const x=830+(i%5)*95,y=380+Math.floor(i/5)*81;const h=(28+(i*17)%50)*ease(p*2-i*.03);isoBox(c,x,y,60,50,h,'#c7b58c','#615748','#9e8b69');if(h>25)window(c,x+57,y-h+20,9,19)}
 // Stepped sacred precinct, a simplified urban architectural model.
 for(let s=0;s<4;s++)isoBox(c,1110+s*21,530-s*38,180-s*37,110-s*19,39,'#d0bc8d','#78674c','#a4916a');
 for(let i=0;i<18;i++){const ph=(t*.1+i*.078)%1;const x=800+ph*565,y=710-ph*185;person(c,x,y,.25,'#f3ead5b0',Math.sin(t*3+i)*5)}
 tag(c,'灌溉渠把河水引向农田',470,796,C.cyan);tag(c,'城市：劳动分工与组织',1110,796,C.gold);
}
function romanCity(c,t,p){
 backdrop(c,1020,493,720,370);shadow(c,1050,750,580,65);
 poly(c,[[420,605],[1075,284],[1655,557],[985,824]],'#3c4b46','#77867a');
 // Two intersecting paved streets and a forum; no Mesopotamian ziggurat.
 poly(c,[[536,613],[1113,334],[1186,366],[609,648]],'#b5b399');
 poly(c,[[846,437],[919,406],[1520,681],[1443,716]],'#b5b399');
 for(let i=0;i<20;i++)line(c,[566+i*28,602-i*13.5],[616+i*28,630-i*13.5],'#7a8b7b',1);
 for(let i=0;i<12;i++){const x=655+(i%4)*166,y=489+Math.floor(i/4)*82;
  if(i===5||i===6)continue;isoBox(c,x,y,95,64,45,'#c2bda0','#6c7569','#9aa18b');
  poly(c,[[x-3,y-48],[x+80,y-102],[x+150,y-47],[x+43,y-15]],'#9e7356','#c1a484');
 }
 // Columned temple miniature, with pediment and architrave.
 isoBox(c,1062,534,229,103,22,'#c0bea4','#788374','#a3aa91');
 for(let i=0;i<6;i++){const x=1092+i*35;round(c,x,378,14,143,3,'#d3cbb1','#efe1bd');round(c,x-6,371,26,12,1,'#ddd0ad');round(c,x-5,518,24,10,1,'#ded3b3')}
 round(c,1069,351,228,21,2,'#d3c6a4','#efe1c1');poly(c,[[1055,350],[1180,276],[1310,350]],'#c9bea0','#e8d9b5');
 // A freestanding masonry arch beside the road.
 c.save();c.translate(808,646);round(c,-53,-138,106,143,3,'#aeb199','#e7dcbd');
 c.fillStyle=C.navy;c.beginPath();c.moveTo(-23,7);c.lineTo(-23,-74);c.arc(0,-74,23,Math.PI,0);c.lineTo(23,7);c.closePath();c.fill();
 c.strokeStyle='#efe3c0';c.lineWidth=7;c.beginPath();c.moveTo(-25,0);c.lineTo(-25,-74);c.arc(0,-74,25,Math.PI,0);c.lineTo(25,0);c.stroke();c.restore();
 for(let i=0;i<15;i++){const q=(t*.025+i/15)%1;person(c,565+q*590,624-q*278,.27,C.ivory+'c0')}
 tag(c,'道路 · 城市 · 公共建筑',525,807,C.gold);text(c,'罗马城市建筑概念示意，非具体遗址复原',1570,785,18,C.ivory+'90','right');
}
function manuscript(c,t,p){
 backdrop(c,1030,475,680,380);shadow(c,1040,760,480,55);
 c.save();c.translate(1020,475);c.rotate(-.075+Math.sin(t*.13)*.01);
 for(let i=8;i>=0;i--){const y=-192+i*48;round(c,-408+i*2,y,806,43,16,i%2?'#c7b778':'#d2c38c','#998853');
  for(let k=0;k<2;k++)circle(c,k?240:-240,y+22,6,'#6c6241');
  for(let n=0;n<29;n++){if((n+i*29)/261>clamp(p*2))continue;const x=-378+n*26;if(Math.abs(Math.abs(x)-240)<20)continue;const yy=y+13;
   line(c,[x,yy],[x+14,yy],'#5c5c3a',1.8);c.beginPath();c.moveTo(x+3,yy);c.quadraticCurveTo(x+11,yy+5,x+6,yy+13);c.quadraticCurveTo(x-1,yy+15,x+2,yy+8);c.strokeStyle='#5c5c3a';c.lineWidth=1.5;c.stroke();
  }
 }
 for(const x of [-240,240]){line(c,[x,-183],[x,211],'#726a47',4);circle(c,x,212,8,'#9d8f5d','#e5d5a0')}
 c.restore();tag(c,'学术手稿 · 数学、医学与文化交流',530,807,C.cyan);text(c,'叶片手稿为知识传播概念示意',1560,785,18,C.ivory+'90','right');
}
function pyramid(c,t,p){
 backdrop(c,1020,483,700,380);shadow(c,1050,749,530,70);
 // Giza plateau as an illustrative miniature, not a reconstruction.
 poly(c,[[430,648],[1140,393],[1660,625],[930,828]],'#706246','#b49c66');
 const pyramid=(x,y,s)=>{poly(c,[[x,y-s],[x-s*.87,y+s*.28],[x+s*.25,y+s*.58]],'#d9bf82','#ead5a5');poly(c,[[x,y-s],[x+s*.25,y+s*.58],[x+s*.96,y+s*.08]],'#a08550','#d3b274');for(let i=1;i<11;i++){const z=i/11;line(c,[x-s*.87*z,y-s+s*1.28*z],[x+s*.25*z,y-s+s*1.58*z],'#876e4548',1);line(c,[x+s*.25*z,y-s+s*1.58*z],[x+s*.96*z,y-s+s*1.08*z],'#d8bd7d44',1)}};
 pyramid(1170,500,190);pyramid(1450,580,118);pyramid(820,605,255);
 c.strokeStyle=C.cyan+'b0';c.lineWidth=15;c.beginPath();c.moveTo(430,735);c.bezierCurveTo(700,870,1250,777,1650,650);c.stroke();
 for(let i=0;i<13;i++){const ph=(i*.123+t*.025)%1;person(c,580+ph*800,771-ph*50,.22,C.ivory+'a0')}
 tag(c,'河谷农业、国家组织与纪念性建筑',510,807,C.gold);text(c,'建筑场景为概略示意',1560,786,18,C.ivory+'90','right');
}
function bronze(c,t,p){
 backdrop(c,1040,480,620,375);shadow(c,1040,770,370,60);
 c.save();c.translate(1040,485);c.rotate(Math.sin(t*.25)*.025);
 // Ding-form bronze vessel: handles, bowl, relief and three legs.
 const g=c.createLinearGradient(-300,0,300,0);g.addColorStop(0,'#31554b');g.addColorStop(.35,'#96a47d');g.addColorStop(.7,'#4f7564');g.addColorStop(1,'#203f39');
 c.lineWidth=25;c.strokeStyle='#61816b';for(const x of [-245,245]){c.beginPath();c.roundRect(x-34,-205,68,145,20);c.stroke()}
 for(let i=0;i<3;i++){const x=[-170,170,0][i],off=i===2?40:0;poly(c,[[x-35,100],[x+35,100],[x+26,260+off],[x-19,260+off]],g,'#a7ab7c')}
 c.beginPath();c.ellipse(0,60,276,140,0,0,Math.PI);c.lineTo(-276,-128);c.ellipse(0,-128,276,70,0,Math.PI,TAU);c.closePath();c.fillStyle=g;c.fill();c.strokeStyle='#a8b186';c.lineWidth=4;c.stroke();
 c.beginPath();c.ellipse(0,-128,276,70,0,0,TAU);c.fillStyle='#132c28';c.fill();c.strokeStyle='#8aa58a';c.lineWidth=12;c.stroke();
 c.strokeStyle='#c0c49990';c.lineWidth=3;for(let x=-220;x<240;x+=55){c.strokeRect(x,-80,35,82);c.strokeRect(x+8,-68,17,56);line(c,[x+17,-55],[x+17,-27],'#c0c49980',2)}
 for(let side of [-1,1]){circle(c,side*60,26,15,'#243f35','#adb28b');line(c,[side*45,48],[side*115,66],'#a6b18b',4)}
 c.restore();tag(c,'铸造技术 · 礼制 · 政治秩序',645,807,C.gold);
}
function book(c,t,p,manifesto=false){
 backdrop(c,1030,490,700,390);shadow(c,1050,792,520,60);
 c.save();c.translate(1030,465);c.rotate(-.035);
 const spread=ease(p*2);const pageW=manifesto?270:340;const left=-pageW,right=pageW;
 poly(c,[[left-16,-231],[0,-202],[right+17,-235],[right+17,277],[0,307],[left-16,274]],manifesto?'#793f39':'#775b3e');
 poly(c,[[left,-245],[0,-208],[0,286],[left,255]],'#dfd4b7','#baa786');
 poly(c,[[0,-208],[right,-245],[right,255],[0,286]],'#eee3c8','#c5b799');
 for(let i=0;i<6;i++)line(c,[left,-245+i*2],[0,-208+i*2],'#fbf0d550',1);
 const grd=c.createLinearGradient(-38,0,40,0);grd.addColorStop(0,'#b9a77b00');grd.addColorStop(.5,'#594a2d55');grd.addColorStop(1,'#a2926700');c.fillStyle=grd;c.fillRect(-40,-205,80,488);
 if(manifesto){
   text(c,'共产党宣言',145,-144,35,'#65362e','center');text(c,'MANIFEST DER',145,-100,20,'#514938','center');text(c,'KOMMUNISTISCHEN',145,-68,20,'#514938','center');text(c,'PARTEI',145,-36,20,'#514938','center');line(c,[45,-10],[245,-10],'#875b45',1);
   text(c,'马克思 · 恩格斯',145,50,21,'#514938','center');text(c,'历史分析与政治主张',145,96,18,'#746650','center');
   for(let r=0;r<15;r++){const yy=-168+r*25;const len=140+(r*31)%52;line(c,[left+33,yy],[left+33+len*clamp(p*2-r*.035),yy+12],'#84775b',2)}
 }else{
   for(let page of [-1,1])for(let r=0;r<17;r++){const xx=page<0?left+35:35,yy=-170+r*23;line(c,[xx,yy+(page<0?0:2)],[xx+220+Math.sin(r*3)*25,yy+(page<0?23:-15)],'#7f765b',2)}
   c.save();c.translate(-170,-28);c.strokeStyle='#aa8b4d';c.lineWidth=4;circle(c,0,0,83,null,'#aa8b4d');for(let i=0;i<8;i++){const a=i/8*TAU+t*.025;line(c,[Math.cos(a)*20,Math.sin(a)*20],[Math.cos(a)*78,Math.sin(a)*78],'#aa8b4d',2)}c.restore();
 }
 // A turning leaf is a continuous geometric gesture.
 if(!manifesto){const turn=(t*.16)%1;const w=Math.cos(turn*Math.PI)*pageW;c.save();c.globalAlpha=Math.sin(turn*Math.PI)*.65;poly(c,[[0,-208],[w,-245],[w,255],[0,286]],'#f5ecd8','#c9b892');c.restore()}
 c.restore();
 tag(c,manifesto?'工业社会的问题，进入新的理论讨论':'书写 · 翻译 · 印刷 · 知识传播',570,807,manifesto?C.red:C.cyan);
 if(manifesto)text(c,'书页为视觉化设计，非原版封面复刻',1560,786,18,C.ivory+'80','right');
 if(!manifesto){for(let i=0;i<6;i++){const x=1410+(i%3)*62,y=330+Math.floor(i/3)*89;round(c,x,y,48,67,3,'#4f5d60','#a5b3ac');text(c,['字','文','理','知','书','印'][i],x+24,y+44,25,C.ivory,'center')}}
}
function ship(c,t,p){
 backdrop(c,1030,490,720,390);shadow(c,1020,780,540,55);
 for(let row=0;row<7;row++){c.beginPath();for(let x=390;x<1690;x+=12){const y=653+row*24+Math.sin(x*.013-t*1.6+row)*7;x===390?c.moveTo(x,y):c.lineTo(x,y)}c.strokeStyle=row%2?C.cyan+'26':C.cyan+'4b';c.lineWidth=2;c.stroke()}
 c.save();c.translate(1010,640+Math.sin(t*1.2)*6);c.rotate(Math.sin(t*.8)*.016);
 poly(c,[[-315,-30],[315,-53],[258,65],[-245,70]],'#624d3d','#bda579');poly(c,[[-313,-32],[315,-53],[265,-12],[-280,5]],'#af9c71');
 for(let r=0;r<4;r++)line(c,[-270+r*9,10+r*14],[283-r*10,-8+r*14],'#b99a6a60',2);
 line(c,[-170,-30],[-170,-370],C.gold,8);line(c,[60,-35],[60,-450],C.gold,9);line(c,[230,-45],[230,-300],C.gold,7);
 const sail=(x,y,w,h)=>{const billow=20+Math.sin(t*1.8+x)*6;c.beginPath();c.moveTo(x-w/2,y);c.quadraticCurveTo(x+billow,y+h*.5,x-w/2+7,y+h);c.lineTo(x+w/2,y+h-12);c.quadraticCurveTo(x+w/2+billow,y+h*.5,x+w/2,y-5);c.closePath();const g=c.createLinearGradient(x-w/2,y,x+w/2,y);g.addColorStop(0,'#cabf9c');g.addColorStop(.5,'#f2e8cd');g.addColorStop(1,'#9d9279');c.fillStyle=g;c.fill();c.strokeStyle='#a89e83';c.lineWidth=2;c.stroke();for(let k=1;k<5;k++)line(c,[x-w/2+k*w/5,y+3],[x-w/2+k*w/5+6,y+h-8],'#a59a7f70',1)};
 sail(-170,-310,145,182);sail(60,-382,205,224);sail(230,-250,112,136);
 line(c,[60,-450],[-300,-20],'#d5c49a',1);line(c,[60,-450],[318,-50],'#d5c49a',1);line(c,[-170,-370],[60,-40],'#d5c49a',1);
 poly(c,[[60,-450],[155,-430],[60,-416]],C.red);poly(c,[[-310,-30],[-399,-60],[-310,-57]],'#ad956a');
 for(let i=0;i<7;i++)person(c,-205+i*67,-45,.27,C.ivory+'b0');
 c.restore();tag(c,'海洋航路，把远方纳入新的联系',575,807,C.cyan);text(c,'船型为概念化航海场景',1570,798,18,C.ivory+'80','right');
}
function orbits(c,t,p){
 backdrop(c,1030,480,720,410);
 const cx=1010,cy=500;const radii=[95,156,230,323,410];
 // Elliptical schematic; neither sizes nor orbital periods are to scale.
 c.save();c.translate(cx,cy);c.rotate(-.16);c.strokeStyle=C.ivory+'40';c.lineWidth=1.4;
 for(let i=0;i<5;i++){c.beginPath();c.ellipse(0,0,radii[i]*1.35,radii[i]*.66,0,0,TAU);c.stroke();const ang=t*(.75-i*.11)+i*1.4;const x=Math.cos(ang)*radii[i]*1.35,y=Math.sin(ang)*radii[i]*.66;circle(c,x,y,5+i*2,[C.ivory,C.gold,C.cyan,C.red,C.orange][i]);if(i===2)circle(c,x,y,18,null,C.cyan+'70',1)}
 const glow=c.createRadialGradient(0,0,5,0,0,110);glow.addColorStop(0,C.gold+'a0');glow.addColorStop(1,C.gold+'00');circle(c,0,0,110,glow);circle(c,0,0,28,'#f7d78c','#f5e8b9');
 c.restore();
 // Observation frame, reticle and schematic equation create a precise visual language.
 for(const [x,y,dx,dy] of [[470,252,1,1],[1580,252,-1,1],[470,765,1,-1],[1580,765,-1,-1]]){line(c,[x,y],[x+42*dx,y],C.cyan+'80',2);line(c,[x,y],[x,y+35*dy],C.cyan+'80',2)}
 tag(c,'观测 → 数学模型 → 可检验的规律',515,807,C.cyan);text(c,'轨道、尺度与速度为示意',1560,793,18,C.ivory+'90','right');
 text(c,'F ∝ 1 / r²',1460,330,30,C.gold,'center');text(c,'模型与证据，不断修正',1460,372,19,C.ivory+'a0','center');
}
function gears(c,t,p){
 backdrop(c,1010,480,730,400);shadow(c,1050,795,500,65);
 const pts=[[790,470,177,20,t*.28],[1130,470,165,19,-t*.28*20/19],[1370,635,111,13,t*.28*20/13],[680,704,90,11,-t*.28*20/11],[1100,235,86,10,t*.28*2]];
 for(const [x,y,r,n,a] of pts){gear(c,x,y,r,n,a);circle(c,x,y,5,C.ivory)}
 c.setLineDash([4,10]);line(c,[595,470],[1538,470],C.cyan+'50',1);line(c,[790,235],[790,810],C.cyan+'50',1);c.setLineDash([]);
 tag(c,'精密机械与不断积累的工艺经验',535,807,C.orange);
}
function steam(c,t,p){
 backdrop(c,1030,480,750,400);shadow(c,1040,804,580,65);
 // A horizontal, single-cylinder slider-crank. Conrod length > crank radius.
 const a=t*1.5,r=80,L=365,cx=1200,cy=520;const crankX=cx+r*Math.cos(a),crankY=cy+r*Math.sin(a),sliderX=cx+r*Math.cos(a)-Math.sqrt(L*L-r*r*Math.sin(a)**2)-115;
 round(c,470,711,1130,48,5,'#4a5454','#83938d');
 for(const x of [530,1430]){poly(c,[[x,706],[x+55,706],[x+28,540],[x+14,540]],'#58645f','#a1a99a')}
 // Flywheel spokes sit behind rod.
 c.save();c.translate(cx,cy);c.rotate(a);circle(c,0,0,176,null,'#8b8f79',25);circle(c,0,0,155,null,'#d6c99d',2);for(let i=0;i<8;i++){const ang=i/8*TAU;line(c,[Math.cos(ang)*20,Math.sin(ang)*20],[Math.cos(ang)*162,Math.sin(ang)*162],'#a19e7c',12)}circle(c,0,0,26,'#b8ac82','#ebe0bd');c.restore();
 const g=c.createLinearGradient(0,445,0,596);g.addColorStop(0,'#b3b7a4');g.addColorStop(.45,'#496369');g.addColorStop(1,'#182e37');
 round(c,500,440,360,160,16,g,'#c0b991');
 const fillSide=Math.cos(a)>0;round(c,518,456,324,128,5,fillSide?'#bba17260':'#79bdc24a');
 c.fillStyle='#c4c2a5';c.fillRect(sliderX-20,454,34,132);c.fillStyle='#56666a';c.fillRect(sliderX+14,507,120,26);
 // Slider crosshead, horizontal guide, rigid connecting rod.
 line(c,[850,485],[1015,485],'#526768',8);line(c,[850,554],[1015,554],'#526768',8);
 line(c,[sliderX+115,cy],[crankX,crankY],'#dbc797',18);line(c,[sliderX+115,cy],[crankX,crankY],'#6a7770',8);circle(c,sliderX+115,cy,17,'#d9c9a5','#4a5d5b');circle(c,crankX,crankY,15,'#e1c694','#40565a');
 // Pipes and a small boiler.
 round(c,435,606,200,98,12,'#4e625e','#a1ac91');line(c,[470,605],[470,362],'#819183',16);line(c,[470,362],[604,362],'#819183',16);line(c,[604,362],[604,440],'#819183',16);
 c.lineWidth=3;c.strokeStyle=C.cyan;const flow=(t*.7)%1;for(let k=0;k<4;k++){const xx=525+((flow+k*.25)%1)*85;line(c,[xx,370],[xx+10,370],C.cyan,3)}
 for(let i=0;i<7;i++){const q=(t*.3+i/7)%1;circle(c,460+Math.sin(i*5.8+q*4)*24,350-q*140,8+q*20,'#d0d8cd'+Math.floor((1-q)*40).toString(16).padStart(2,'0'))}
 tag(c,'往复运动 → 连杆 → 飞轮旋转',520,807,C.orange);text(c,'滑块—曲柄运动学示意，非特定机型复原',1580,790,18,C.ivory+'90','right');
}
function factory(c,t,p){
 backdrop(c,1020,475,750,410);shadow(c,1040,800,620,65);
 // Open-sided workshop: roof trusses, belts, line shaft and loom stations.
 poly(c,[[410,720],[1440,720],[1630,795],[590,795]],'#374343','#8d947f');
 poly(c,[[410,300],[1440,300],[1618,380],[590,380]],'#415254','#91a299');
 for(let x=450;x<1450;x+=195){line(c,[x,314],[x+160,378],'#afab87',9);line(c,[x+12,319],[x+12,708],'#647a79',11);line(c,[x+160,378],[x+160,782],'#687d79',11)}
 line(c,[460,391],[1510,391],'#d8c69b',12);
 const shafts=[640,935,1230];
 for(const [i,x] of shafts.entries()){
   // Belt, lower pulley, and oscillating shuttle are mechanically linked.
   const yy=560;line(c,[x-38,391],[x-38,yy],'#b5ad8c',5);line(c,[x+38,391],[x+38,yy],'#b5ad8c',5);circle(c,x,391,40,null,'#b6b895',6);circle(c,x,yy,40,null,'#d5bd8b',6);
   c.save();c.translate(x,yy);c.rotate(t*2);line(c,[-33,0],[33,0],C.gold,4);line(c,[0,-33],[0,33],C.gold,4);c.restore();
   isoBox(c,x-102,686,180,74,102,'#a19c7b','#4d5c59','#6c7770');
   poly(c,[[x-95,585],[x+85,585],[x+140,635],[x-40,635]],'#e9d9b0');
   for(let q=0;q<17;q++)line(c,[x-90+q*10,585],[x-37+q*10,633],q%2?'#9c9475':'#d1c39d',1);
   const shut=x+Math.sin(t*5+i)*70;round(c,shut-13,613,31,9,3,'#67503a',C.gold);
   person(c,x+140,712,.75,'#d3c9ad',Math.sin(t*2+i)*4);
 }
 // Distant masonry and tall factory chimney.
 isoBox(c,1480,720,84,55,317,'#667970','#354f52','#52675f');
 for(let i=0;i<11;i++){const q=(t*.13+i/11)%1;circle(c,1540+q*120+Math.sin(i*2)*14,390-q*210,13+q*35,'#a7b5ac'+Math.floor((1-q)*35).toString(16).padStart(2,'0'))}
 tag(c,'动力、机器与集中生产，共同改变劳动',470,807,C.orange);text(c,'工厂剖面为概念示意',1570,795,18,C.ivory+'90','right');
}
function train(c,t,p){
 backdrop(c,1020,485,750,385);shadow(c,1030,760,600,55);
 const railY=730;
 for(let x=400;x<1650;x+=37){const xx=x-((t*55)%37);line(c,[xx,railY-10],[xx+36,railY+26],'#65706b',8)}
 line(c,[400,railY],[1660,railY],'#a3b9b3',5);line(c,[400,railY+22],[1660,railY+22],'#748b86',5);
 c.save();c.translate(1040+Math.sin(t*.3)*18,595);
 // Carriage at left, locomotive at right. Horizontal travel is indicated by rails.
 round(c,-560,-75,292,165,8,'#435954','#8b9b83');round(c,-576,-87,322,23,7,'#8a967e');
 for(let i=0;i<5;i++)round(c,-534+i*53,-46,34,55,3,'#adc2b0','#c4c9a3');
 line(c,[-268,70],[-232,70],'#c1b48d',9);
 round(c,-230,-48,415,140,26,'#526f6d','#c0b28d');round(c,-213,-132,121,218,5,'#5e7569','#c4b58c');round(c,-229,-145,150,18,4,'#bbb391');round(c,-190,-105,73,54,5,'#abc7be','#d7c89e');
 round(c,80,-100,43,65,4,'#667d70','#c6b38b');poly(c,[[72,-100],[131,-100],[140,-140],[63,-140]],'#8a9277','#d2c49d');
 poly(c,[[177,48],[252,104],[177,104]],'#899781','#c6b68d');
 for(const [x,r] of [[-510,32],[-330,32],[-180,45],[-30,45],[119,36]]){circle(c,x,100,r,'#172c32','#baa879',6);c.save();c.translate(x,100);c.rotate(-t*2.1);for(let i=0;i<6;i++){let a=i/6*TAU;line(c,[Math.cos(a)*7,Math.sin(a)*7],[Math.cos(a)*(r-5),Math.sin(a)*(r-5)],'#a8ae93',3)}c.restore();circle(c,x,100,7,C.gold)}
 const yy=100+Math.sin(-t*2.1)*30;line(c,[-180+Math.cos(-t*2.1)*30,yy],[-30+Math.cos(-t*2.1)*30,yy],'#d0b688',10);
 for(let i=0;i<12;i++){const q=(t*.32+i/12)%1;circle(c,100-q*300+Math.sin(i*3)*12,-151-q*210,13+q*34,'#b8cbc3'+Math.floor((1-q)*68).toString(16).padStart(2,'0'))}
 c.restore();tag(c,'铁路：能源、市场与城市的新连接',535,807,C.orange);
}
function workers(c,t,p){
 backdrop(c,1010,485,750,400);
 // City in section: housing, factory windows and a restrained group of workers.
 const buildings=[[440,215,145,505],[610,330,170,390],[806,275,180,445],[1015,340,195,380],[1250,200,150,520],[1440,305,170,415]];
 for(const [x,y,w,h] of buildings){round(c,x,y,w,h,2,'#273d44','#62736b');for(let row=0;row<Math.floor(h/58)-1;row++)for(let col=0;col<3;col++){c.fillStyle=(row+col)%4===0?'#d2ac6a66':'#0c202b';c.fillRect(x+18+col*(w-33)/3,y+28+row*58,21,28)}line(c,[x-8,y],[x+w+8,y],'#9b9d82',5)}
 c.fillStyle='#102631';c.fillRect(410,650,1230,119);line(c,[410,769],[1640,769],'#9d9f83',2);
 for(let i=0;i<19;i++){const xx=475+i*59+Math.sin(t*.7+i)*3;const ss=.86+(i%3)*.13;person(c,xx,735,ss,i%3===0?'#d8cbb2':'#879b97',Math.sin(t*.6+i)*3)}
 // A clock conveys factory time without claiming specific hours.
 circle(c,1350,280,49,'#c7c4a7','#e5dbb7');line(c,[1350,280],[1350,249],'#47564e',4);line(c,[1350,280],[1378,290],'#47564e',4);
 tag(c,'劳动条件 · 城市生活 · 改革与社会运动',470,807,C.ivory);
}

export function drawHistoricalScene(ctx,{kind='city',t=0,p=0,chapter=1,width=1920,height=1080,palette={}}={}){
 if(drawVisualStory(ctx,kind,t,p))return;
 ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
 // The parent owns all camera/scene opacity. No date or subtitle is drawn here.
 switch(kind){
  case 'tablet':tablet(ctx,t,p);break;
  case 'city':chapter===4?romanCity(ctx,t,p):city(ctx,t,p);break;
  case 'pyramid':pyramid(ctx,t,p);break;
  case 'bronze':bronze(ctx,t,p);break;
  case 'book':chapter===5?manuscript(ctx,t,p):book(ctx,t,p);break;
  case 'ship':ship(ctx,t,p);break;
  case 'orbits':orbits(ctx,t,p);break;
  case 'gears':gears(ctx,t,p);break;
  case 'steam':steam(ctx,t,p);break;
  case 'factory':factory(ctx,t,p);break;
  case 'train':train(ctx,t,p);break;
  case 'workers':workers(ctx,t,p);break;
  case 'manifesto':book(ctx,t,p,true);break;
  default:city(ctx,t,p);
 }
 ctx.restore();
}
