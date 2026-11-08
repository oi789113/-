import {C,TAU,clamp,ease,lerp,text,line,poly,rect,circle,ellipse,arrow,iso,person,wheel,shipIcon,grain,foot,material} from './draw.mjs';
import {portion} from './map.mjs';

import {lawScenes} from './law-scenes.mjs';
import {cultureScenes} from './culture-scenes.mjs';

function irrigation(c,t,p){
 c.save();c.translate(960,530);c.scale(1.06,1.06);c.translate(-960,-530);
 poly(c,[[215,567],[887,262],[1670,540],[1000,843]],'#3e584b','#71856b');
 c.beginPath();c.moveTo(280,560);c.bezierCurveTo(610,390,700,690,1065,574);c.bezierCurveTo(1295,500,1390,340,1590,475);c.strokeStyle='#2d7f91';c.lineWidth=38;c.stroke();
 for(let row=0;row<3;row++){let x=390+row*150,y=586-row*68;line(c,[[x,y],[x+260,y+110]],'#78c1c6',8);for(let k=0;k<5;k++){const q=(t*.27+k/5)%1;circle(c,x+q*260,y+q*110,3,C.cyan)}
 for(let i=0;i<4;i++){let a=x+50+i*50,b=y+45+i*22;poly(c,[[a,b],[a+66,b-31],[a+130,b-4],[a+62,b+29]],'#6b7b4b','#a6ae78');for(let k=0;k<4;k++)grain(c,a+37+k*18,b+3-k*8,.34*ease(p*2-row*.1));}}
 for(let i=0;i<14;i++){let x=940+i%5*111,y=430+Math.floor(i/5)*81,h=(35+i%3*19)*ease(p*2-i*.035);iso(c,x,y,62,44,h,['#d8c08d','#6e624b','#aa966b']);rect(c,x+30,y-h+18,12,23,'#26372f');}
 for(let i=0;i<9;i++){let q=(t*.05+i/9)%1;person(c,855+q*630,748-q*174,.42,C.paper,t*6+i)}
 c.restore();text(c,'引水',360,390,29,C.cyan);text(c,'储粮',1340,350,29,C.gold);text(c,'分工与协作',1470,735,29,C.paper,'center');foot(c,'灌溉与城市组织的概念场景，非具体遗址复原');
}
function tablet(c,t,p){
 ellipse(c,1120,785,480,35,'#00000045');c.save();c.translate(1100,506);c.rotate(-.06+Math.sin(t*.4)*.015);material(c,-380,-228,760,440,'#9c744b','#dabc89');rect(c,-360,-210,720,400,'#b28c5e',null,18);
 for(let r=0;r<7;r++)for(let k=0;k<11;k++){let n=r*11+k;if(n/77>ease(p*1.5))continue;let x=-315+k*60,y=-172+r*54;poly(c,[[x,y],[x+21,y+8],[x+3,y+14]],'#493724');line(c,[[x+8,y+8],[x+38,y+10]],'#614a31',3);if((r+k)%2){poly(c,[[x+19,y+21],[x+26,y+40],[x+33,y+20]],'#503a25')}}
 let penX=-315+((t*1.2)%11)*60,penY=-170+Math.floor((p*.8)*7)*54;c.save();c.translate(penX,penY);c.rotate(-.65);poly(c,[[0,0],[205,-6],[212,7],[0,12]],'#d8c79c');poly(c,[[-19,5],[0,0],[0,12]],'#62452c');c.restore();c.restore();
 for(let i=0;i<5;i++){let y=335+i*83;grain(c,310,y,.8);ellipse(c,440,y+12,26,18,'#d6b886');circle(c,440,y+9,5,'#7d6241');arrow(c,[493,y],[640,y],C.cyan,2)}text(c,'物资',310,765,28,C.gold,'center');text(c,'记号',1100,782,28,C.gold,'center');foot(c,'从计量、记录，到更复杂的书写；符号为视觉示意');
}
function pyramid(c,t,p){
 poly(c,[[225,700],[1000,369],[1755,660],[940,852]],'#756044','#b79f72');
 const apex=[1160,246],left=[744,733],mid=[1244,826],right=[1640,655];poly(c,[apex,left,mid],'#ddc490');poly(c,[apex,mid,right],'#927347');
 for(let i=1;i<21;i++){let u=i/21;line(c,[[lerp(apex[0],left[0],u),lerp(apex[1],left[1],u)],[lerp(apex[0],mid[0],u),lerp(apex[1],mid[1],u)]],'#8b6a424e',2);line(c,[[lerp(apex[0],mid[0],u),lerp(apex[1],mid[1],u)],[lerp(apex[0],right[0],u),lerp(apex[1],right[1],u)]],'#ead6a845',1.4)}
 c.beginPath();c.moveTo(270,433);c.bezierCurveTo(480,570,298,688,680,815);c.strokeStyle='#508f99';c.lineWidth=38;c.stroke();
 for(let i=0;i<7;i++){let q=(t*.03+i/7)%1;iso(c,565+q*302,741-q*137,31,24,19,['#c7ad7b','#786045','#a48c61']);person(c,550+q*302,748-q*137,.28,C.paper,t*5+i)}
 const x=535+(p*190)%190,y=676-p*80;line(c,[[x,y],[x+85,y-37]],C.gold,3);text(c,'农业',290,355,29,C.cyan);text(c,'组织',575,559,29,C.gold);text(c,'大型工程',1505,333,29,C.paper,'center');foot(c,'建筑与劳作场景为概略示意；不把复杂建造史归于单一群体');
}
function rome(c,t,p){
 poly(c,[[230,730],[1050,412],[1760,720],[970,866]],'#40554e');poly(c,[[305,733],[1100,435],[1170,462],[382,766]],'#b2b39a');
 for(let i=0;i<36;i++){let x=370+i*20,y=739-i*7.5;line(c,[[x,y],[x+55,y+18]],'#73867b',2)}
 for(let i=0;i<7;i++){let x=510+i*156,y=635-i*18;rect(c,x,y-274,143,274,'#b1b39b','#d8cdb1');c.save();c.fillStyle=C.bg;c.beginPath();c.moveTo(x+28,y);c.lineTo(x+28,y-151);c.arc(x+71.5,y-151,43.5,Math.PI,0);c.lineTo(x+115,y);c.fill();c.restore();for(let j=0;j<5;j++)line(c,[[x,y-230+j*37],[x+142,y-230+j*37]],'#7b8f80',1);}
 line(c,[[505,361],[1600,235]],'#d6cbaa',21);line(c,[[505,353],[1600,227]],C.cyan,6);for(let i=0;i<14;i++){let q=(t*.07+i/14)%1;circle(c,510+q*1076,352-q*124,3,C.cyan)}
 for(let i=0;i<10;i++){let q=(t*.05+i*.1)%1;person(c,380+q*730,752-q*280,.4,C.paper,t*6+i)}text(c,'水渠',1530,325,28,C.cyan);text(c,'道路 · 税收 · 劳动',1360,785,28,C.gold,'center');foot(c,'罗马道路与高架水渠概念场景，非指定建筑复原');
}
function astrolabe(c,t,p){
 c.save();c.translate(1000,524);circle(c,0,-281,36,null,C.gold,10);circle(c,0,0,272,'#745c35','#e1c992',9);circle(c,0,0,250,'#132c32','#cdb376',3);
 for(let i=0;i<120;i++){let a=i/120*TAU;line(c,[[Math.cos(a)*236,Math.sin(a)*236],[Math.cos(a)*(i%5?244:250),Math.sin(a)*(i%5?244:250)]],C.gold,i%5?1:2)}
 for(let i=1;i<5;i++)circle(c,0,48,i*43,null,'#b99d6355',1.5);for(let i=-3;i<=3;i++){c.beginPath();c.ellipse(i*36,0,80+i*i*4,220,0,0,TAU);c.strokeStyle='#89b7b560';c.lineWidth=1;c.stroke()}
 c.save();c.rotate(t*.22);for(let i=0;i<10;i++){let a=i/10*TAU,r=140+40*Math.sin(i*2);line(c,[[Math.cos(a)*r,Math.sin(a)*r],[Math.cos(a+.45)*185,Math.sin(a+.45)*185]],C.gold,3);circle(c,Math.cos(a)*r,Math.sin(a)*r,4,C.paper)}c.restore();
 c.save();c.rotate(-t*.3);poly(c,[[-230,-9],[226,-5],[244,0],[226,7],[-230,9]],'#d0b071');rect(c,-164,-17,31,36,C.paper);rect(c,143,-17,31,36,C.paper);c.restore();circle(c,0,0,13,'#f5dfaa');c.restore();
 for(let i=0;i<3;i++){let y=365+i*150;rect(c,250+i*25,y,270,84,'#d9caa6','#a99569',3);line(c,[[274+i*25,y+24],[489+i*25,y+24]],'#6e7661',2);text(c,['翻译','计算','观测'][i],402+i*25,y+54,25,'#435b54','center')}
 text(c,'知识在交流中继续生长',1540,520,30,C.cyan,'center');foot(c,'天文仪器为几何概念示意；不将学术进步归于单一人物');
}
function perspective(c,t,p){
 let vx=1010,vy=458;rect(c,315,270,1280,540,'#d9d0b2','#aa9265',4);c.save();c.beginPath();c.rect(335,290,1240,500);c.clip();c.fillStyle='#9cb2ac';c.fillRect(335,290,1240,500);c.fillStyle='#657f77';c.fillRect(335,vy,1240,332);
 for(let i=0;i<12;i++)line(c,[[335+i*113,790],[vx,vy]],'#d8d3ac',2);for(let j=1;j<8;j++){let y=vy+Math.pow(j/7,2)*330;line(c,[[335,y],[1575,y]],'#cad0ae',2)}
 for(let side of[-1,1])for(let i=0;i<5;i++){let z=(i+1)/5,w=42+z*56,x=vx+side*(90+z*490),y=vy+z*315,h=60+z*340;rect(c,x-w/2,y-h,w,h,'#c1bda1','#e1d4ae');poly(c,[[x-w/2-10,y-h],[x+w/2+10,y-h],[x+w/2,y-h-18],[x-w/2,y-h-18]],'#ded2ae')}
 circle(c,vx,vy,5,C.red);c.restore();
 let q=(Math.sin(t*.8)+1)/2,x=600+q*750,y=690-q*230;c.save();c.translate(x,y);c.rotate(-.6);rect(c,0,0,250,12,'#a7814e',null,4);poly(c,[[-38,5],[0,-5],[0,18]],'#c8b588');c.restore();text(c,'透视 · 观察 · 人的经验',960,841,24,C.gold,'center');
}
function textile(c,t,p){
 const a=t*1.5;wheel(c,755,540,156,a,C.cyan,10);for(let i=0;i<12;i++){let th=i/12*TAU+a;poly(c,[[755+Math.cos(th)*145,540+Math.sin(th)*145],[755+Math.cos(th+.12)*182,540+Math.sin(th+.12)*182],[755+Math.cos(th+.22)*182,540+Math.sin(th+.22)*182]],'#7eb0a5')}
 line(c,[[760,378],[1230,346]],C.gold,8);line(c,[[760,700],[1230,687]],C.gold,8);wheel(c,1230,519,173,a,C.gold,8);
 rect(c,1350,351,370,386,'#27484a','#b4b596',6);for(let i=0;i<29;i++){let x=1361+i*12;line(c,[[x,370],[x,717]],i%2?C.paper:'#9fa880',1.7)}
 let y=506+Math.sin(t*3)*26;rect(c,1362,y,340,18,'#718478',C.gold,2);let shuttle=1380+(Math.sin(t*5)+1)*143;rect(c,shuttle,y+27,40,12,C.orange,'#f2d4a0',3);line(c,[[1363,y+33],[shuttle,y+33]],C.cyan,2);
 for(let j=0;j<17;j++){let y2=600+((j*6+t*12)%111);line(c,[[1365,y2],[1700,y2]],'#d8c38e',2)}
 c.save();c.translate(335,532);c.rotate(-.08);line(c,[[-10,-170],[10,188]],C.gold,8);ellipse(c,0,100,58,22,'#e4d6b5','#99876a');for(let j=0;j<18;j++)line(c,[[-45,82+j*3],[45,82+j*3]],'#a7a58a',1);c.restore();line(c,[[370,568],[575,540]],C.paper,2);text(c,'手工',330,790,28,C.muted,'center');text(c,'动力',760,790,28,C.cyan,'center');text(c,'机械化织造',1500,790,28,C.gold,'center');foot(c,'动力与工序为概念示意；技术、资本和组织共同推动变化');
}
function steam(c,t,p){
 const a=t*1.8,r=83,L=405,cx=1310,cy=525,px=cx+r*Math.cos(a),py=cy+r*Math.sin(a),head=px-Math.sqrt(L*L-r*r*Math.sin(a)**2),piston=head-220;
 rect(c,290,758,1430,39,'#586a62','#96a18c',6);for(let x of[545,1510])poly(c,[[x,755],[x+70,755],[x+44,558],[x+25,558]],'#546c65','#9eac93');
 wheel(c,cx,cy,204,a,'#baa879',10);circle(c,cx,cy,177,null,'#ede0b044',2);
 let g=c.createLinearGradient(0,437,0,606);g.addColorStop(0,'#bfc1a6');g.addColorStop(.45,'#426872');g.addColorStop(1,'#19373f');rect(c,500,438,330,172,g,C.gold,18);rect(c,514,453,300,142,Math.cos(a)>0?'#cfa55b55':'#70b9c055',null,6);rect(c,piston-15,451,30,147,'#d1c7a5','#7e826d',2);line(c,[[piston+16,cy],[head,cy]],'#bac2aa',19);
 line(c,[[820,488],[995,488]],'#64837d',8);line(c,[[820,560],[995,560]],'#64837d',8);line(c,[[head,cy],[px,py]],'#d3bf92',18);line(c,[[head,cy],[px,py]],'#4e6a67',6);circle(c,head,cy,16,C.gold,'#4d6259');circle(c,px,py,14,C.paper,'#4d6259');
 rect(c,280,599,180,138,'#3d6060','#9fb59e',17);line(c,[[360,598],[360,350],[590,350],[590,438]],'#8fa18d',18);line(c,[[735,608],[735,706],[460,706]],'#598c91',13);
 for(let j=0;j<7;j++){let q=(t*.5+j/7)%1;circle(c,382+q*190,350,4,C.gold)}for(let j=0;j<5;j++){let q=(t*.4+j/5)%1;circle(c,720-q*240,706,3,C.cyan)}
 text(c,'蒸汽',417,305,25,C.gold);text(c,'活塞',657,663,25,C.paper,'center');text(c,'连杆',1050,650,25,C.paper,'center');text(c,'飞轮',1475,787,25,C.gold,'center');foot(c,'滑块曲柄机构示意；尺寸与配气简化，连杆长度保持不变');
}
function rail(c,t,p,atlas,s){
 const focus=atlas.projection([-2.6,53.45]),z=155,r=atlas.routes.find(r=>r.id==='liverpool-manchester'),pts=r.points.map(q=>{const a=atlas.projection(q);return[960+(a[0]-focus[0])*z,355+(a[1]-focus[1])*z]});
 c.save();c.beginPath();c.rect(210,245,1500,220);c.clip();c.translate(960,355);c.scale(z,z);c.translate(-focus[0],-focus[1]);c.fillStyle='#34574f';c.fill(atlas.landPath);c.strokeStyle='#7ba5a1';c.lineWidth=1/z;c.stroke(atlas.landPath);c.restore();
 line(c,pts,C.orange,3);const first=pts[0],last=pts.at(-1);circle(c,...first,5,C.gold);circle(c,...last,5,C.gold);text(c,'利物浦',first[0],first[1]-38,28,C.paper,'center');text(c,'曼彻斯特',last[0],last[1]-38,28,C.paper,'center');const point=portion(pts,(t*.15)%1).at(-1);circle(c,...point,8,C.gold);
 for(let x=150;x<1810;x+=52){let xx=x-(t*94%52);line(c,[[xx,772],[xx+60,820]],'#6c786d',10)}line(c,[[145,776],[1820,776]],'#adb8a2',6);line(c,[[145,811],[1820,811]],'#80978c',5);
 c.save();c.translate(1140+Math.sin(t*.7)*13,628);rect(c,-730,-88,310,175,'#587267','#acb897',6);rect(c,-746,-106,344,22,'#bcc1a0',null,5);for(let i=0;i<5;i++)rect(c,-702+i*56,-58,37,58,'#b7d0bb','#e0d4ac',3);line(c,[[-420,70],[-376,70]],C.gold,10);
 rect(c,-370,-58,480,154,'#4b7370','#c4b789',28);rect(c,-352,-158,140,252,'#7f947b','#d0bc86',4);rect(c,-370,-173,175,22,'#c3b37e',null,3);rect(c,-324,-128,84,65,'#bbd7bd',null,4);rect(c,25,-138,43,95,'#779280',C.gold,3);poly(c,[[12,-138],[83,-138],[91,-178],[4,-178]],'#acb18d',C.gold);poly(c,[[102,54],[203,116],[102,116]],'#869b81',C.gold);
 for(let [x,r]of[[-669,37],[-465,37],[-300,51],[-120,51],[80,41]])wheel(c,x,112,r,-t*2.5,'#c1ae78',8);let off=Math.cos(-t*2.5)*35,yy=112+Math.sin(-t*2.5)*35;line(c,[[-300+off,yy],[-120+off,yy]],'#e1c795',10);
 for(let i=0;i<10;i++){let q=(t*.21+i/10)%1;circle(c,42-q*330,-190-q*180,10+q*36,'#b0c4b2'+Math.floor((1-q)*65).toString(16).padStart(2,'0'))}c.restore();foot(c,'铁路节点有地理依据；列车造型与镜头内轨道为概念场景');
}
function workers(c,t,p){
 circle(c,475,480,170,'#c5c6ac','#e6d8b3',7);for(let i=0;i<12;i++){let a=i/12*TAU;line(c,[[475+Math.sin(a)*145,480-Math.cos(a)*145],[475+Math.sin(a)*158,480-Math.cos(a)*158]],'#50695a',3)}let a=t*.6;line(c,[[475,480],[475+Math.sin(a)*130,480-Math.cos(a)*130]],'#425c50',6);line(c,[[475,480],[475+Math.sin(a/12+1)*90,480-Math.cos(a/12+1)*90]],'#425c50',8);circle(c,475,480,9,C.gold);
 c.save();c.translate(1230,503);c.rotate(-.04);material(c,-335,-223,670,476,C.paper,'#bbae86');text(c,'人民宪章 · 1838',0,-152,37,'#3d5d52','center');text(c,'争取政治权利',0,-93,26,'#697c65','center');for(let i=0;i<10;i++){let w=500*ease(p*2-i*.06);line(c,[[-250,-36+i*24],[-250+w,-36+i*24]],'#8b967b',2)}c.restore();
 for(let i=0;i<17;i++)person(c,300+i*84,806,.57,i%3?C.paper:'#91b0a3',0);text(c,'工时 · 工资 · 政治参与',475,710,28,C.cyan,'center');foot(c,'宪章文献为排版示意；不同工人运动与改革诉求不能混为一个纲领');
}
function marx(c,t,p){
 // Research desks connect industrial conditions to analysis without invented dialogue or portraits.
 for(let i=0;i<12;i++){let x=240+i*128,h=70+(i*31)%150;rect(c,x,437-h,87,h,'#203d40','#3e5f57',2);for(let j=0;j<4;j++)rect(c,x+12+j*16,450-h,7,11,'#79927a44')}
 poly(c,[[240,548],[1540,474],[1760,758],[440,824]],'#685e49','#a6936d');
 const sheets=[[640,600,-.08,'马克思'],[1290,593,.055,'恩格斯']];sheets.forEach(([x,y,a,name],i)=>{c.save();c.translate(x,y);c.rotate(a);material(c,-250,-140,500,280,C.paper,'#bdb18d');text(c,name,0,-93,32,'#475f50','center');let words=i?['生产关系','阶级与矛盾']:['工业社会','历史研究'];words.forEach((s,j)=>{c.globalAlpha=ease(p*2-j*.18);text(c,s,0,-15+j*65,31,'#5e7159','center')});c.restore()});
 let x=700+(p*500)%500,y=560+Math.sin(t*1.6)*35;c.save();c.translate(x,y);c.rotate(-.55);poly(c,[[-12,0],[210,-5],[211,7],[-12,8]],'#bc9d65');poly(c,[[-35,4],[-12,0],[-12,8]],'#4a4d3b');c.restore();
 foot(c,'理论分析与政治主张须同历史事实区分；桌面场景为概念设计');
}
function manifesto(c,t,p,atlas,s){
 const open=.72+.28*ease(p*2.2),out=0;if(out>0){c.save();c.globalAlpha=out;atlas.draw(c,{...s,focus:[10,20],zoom:1},t,p,{layers:false});for(let i=0;i<70;i++){let x=190+(i*137)%1500,y=300+(i*73)%450;circle(c,x,y,1.7,C.gold)}c.restore()}
 c.save();c.globalAlpha=1-out;c.translate(960,520);c.rotate(-.04);let w=310*open;poly(c,[[-w-17,-247],[0,-225],[w+17,-247],[w+17,277],[0,300],[-w-17,277]],'#884b40');poly(c,[[-w,-258],[0,-222],[0,284],[-w,258]],'#d9cbae','#b7a680');poly(c,[[0,-222],[w,-258],[w,258],[0,284]],C.paper,'#b7a680');
 if(w>80){text(c,'共产党宣言',w/2,-135,36,'#6b3e33','center',true);text(c,'1848',w/2,-53,67,'#6b3e33','center',true);text(c,'伦敦',w/2,26,28,'#6b5d48','center');text(c,'马克思 · 恩格斯',w/2,98,24,'#74674d','center');for(let i=0;i<15;i++)line(c,[[-w+35,-166+i*26],[-38,-158+i*26]],'#8a7c59',1.5)}c.restore();
 if(out>0){c.save();c.globalAlpha=out;text(c,'1848',960,480,118,C.gold,'center',true);text(c,'世界，从未停止变化',960,626,40,C.paper,'center',true);c.restore()}foot(c,'书籍为原创视觉设计，非1848年原版封面复刻');
}


export const sceneFunctions={irrigation,tablet,pyramid,rome,astrolabe,perspective,textile,steam,rail,workers,marx,manifesto,...lawScenes,...cultureScenes};
export function drawScene(c,s,t,p,atlas){const f=sceneFunctions[s.key];if(!f)throw Error('Missing composition: '+s.key);c.save();c.lineCap='round';c.lineJoin='round';f(c,t,p,atlas,s);c.restore()}
