import {C,TAU,clamp,ease,lerp,text,line,poly,rect,circle,ellipse,arrow,iso,person,wheel,shipIcon,grain,foot,material} from './draw.mjs';
import {portion} from './map.mjs';

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
function bronzeStone(c,t,p){
 line(c,[[960,270],[960,800]],'#547375',1);
 c.save();c.translate(590,520);c.rotate(Math.sin(t*.35)*.018);
 let g=c.createLinearGradient(-240,0,240,0);g.addColorStop(0,'#294c43');g.addColorStop(.35,'#a2af82');g.addColorStop(.7,'#557f68');g.addColorStop(1,'#1d3d36');
 for(let x of[-170,170]){c.strokeStyle='#9aa778';c.lineWidth=22;c.beginPath();c.roundRect(x-32,-215,64,135,12);c.stroke()}
 for(let x of[-140,0,140])poly(c,[[x-25,50],[x+25,50],[x+18,260],[x-20,260]],g);
 c.beginPath();c.moveTo(-230,-135);c.bezierCurveTo(-240,170,230,170,230,-135);c.closePath();c.fillStyle=g;c.fill();ellipse(c,0,-135,230,65,'#102d29','#a6b28a');
 for(let x=-175;x<200;x+=50){rect(c,x,-85,35,95,null,'#c1c89c',2);rect(c,x+9,-73,17,70,null,'#597658',1)}for(let x of[-65,65])circle(c,x,42,14,'#29483c','#c6c49a');c.restore();
 c.save();c.translate(1370,515);c.rotate(Math.sin(t*.25)*-.02);material(c,-208,-245,416,495,'#8b9582','#b2b49b');rect(c,-190,-225,380,100,'#687d72','#adb49a',42);poly(c,[[-183,-120],[-209,20],[-165,115],[-155,221],[155,221],[165,115],[209,20],[183,-120]],'#8b9985');
 for(let side of[-1,1]){c.beginPath();c.ellipse(side*96,-52,64,27,side*.12,0,TAU);c.fillStyle='#50695e';c.fill();line(c,[[side*40,-55],[side*145,-52]],'#b2b49c',9);ellipse(c,side*178,48,25,49,'#60776b','#a9b19a')}poly(c,[[-25,-63],[-46,66],[0,88],[46,66],[25,-63]],'#b1b59a');line(c,[[-93,140],[0,130],[93,140]],'#4d655a',9);line(c,[[-90,157],[0,180],[90,157]],'#bdbea4',10);c.restore();
 text(c,'商周 · 青铜与礼制',590,800,28,C.gold,'center');text(c,'奥尔梅克 · 石雕与社会组织',1370,800,28,C.gold,'center');foot(c,'器物造型为原创概念示意，非出土实物的复制');
}
function theatre(c,t,p){
 const cx=960,cy=595;c.save();c.translate(cx,cy);c.scale(1,.65);
 for(let i=8;i>=0;i--){let r=235+i*37;c.beginPath();c.arc(0,0,r,Math.PI,TAU);c.lineWidth=25;c.strokeStyle=i%2?'#a7a88f':'#7b897e';c.stroke();for(let k=0;k<36;k++){let a=Math.PI+k/35*Math.PI;line(c,[[Math.cos(a)*(r-12),Math.sin(a)*(r-12)],[Math.cos(a)*(r+12),Math.sin(a)*(r+12)]],'#425b57',1)}}
 ellipse(c,0,0,232,232,'#c4b99c','#e6d5af');c.restore();
 for(let i=0;i<6;i++){let x=730+i*94;rect(c,x,538,18,187,'#d3c6a2');ellipse(c,x+9,537,18,8,C.paper)}rect(c,700,521,540,22,'#c8bb97');poly(c,[[690,519],[970,425],[1250,519]],'#bba77f','#e3cf9e');
 person(c,1060+Math.sin(t*.4)*20,745,1,C.paper,t*2);person(c,875,745,1,'#94b5b1',-t*2);text(c,'思想与戏剧',380,720,31,C.gold);text(c,'竞争与战争',1500,720,31,C.red,'center');foot(c,'希腊剧场形制与人物为概念场景');
}
function rome(c,t,p){
 poly(c,[[230,730],[1050,412],[1760,720],[970,866]],'#40554e');poly(c,[[305,733],[1100,435],[1170,462],[382,766]],'#b2b39a');
 for(let i=0;i<36;i++){let x=370+i*20,y=739-i*7.5;line(c,[[x,y],[x+55,y+18]],'#73867b',2)}
 for(let i=0;i<7;i++){let x=510+i*156,y=635-i*18;rect(c,x,y-274,143,274,'#b1b39b','#d8cdb1');c.save();c.fillStyle=C.bg;c.beginPath();c.moveTo(x+28,y);c.lineTo(x+28,y-151);c.arc(x+71.5,y-151,43.5,Math.PI,0);c.lineTo(x+115,y);c.fill();c.restore();for(let j=0;j<5;j++)line(c,[[x,y-230+j*37],[x+142,y-230+j*37]],'#7b8f80',1);}
 line(c,[[505,361],[1600,235]],'#d6cbaa',21);line(c,[[505,353],[1600,227]],C.cyan,6);for(let i=0;i<14;i++){let q=(t*.07+i/14)%1;circle(c,510+q*1076,352-q*124,3,C.cyan)}
 for(let i=0;i<10;i++){let q=(t*.05+i*.1)%1;person(c,380+q*730,752-q*280,.4,C.paper,t*6+i)}text(c,'水渠',1530,325,28,C.cyan);text(c,'道路 · 税收 · 劳动',1360,785,28,C.gold,'center');foot(c,'罗马道路与高架水渠概念场景，非指定建筑复原');
}
function woodblock(c,t,p){
 c.save();c.translate(713,524);c.rotate(-.12);material(c,-365,-245,730,490,'#644d36','#b79f6d');rect(c,-342,-220,684,440,'#8d714c');
 const chars=['山','水','田','人','日','月','木','禾','文','字','工','城'];c.save();c.scale(-1,1);chars.forEach((s,i)=>text(c,s,235-i%4*156,-145+Math.floor(i/4)*139,78,'#d7bf8e','center',true));c.restore();
 const brushY=-160+(Math.sin(t*1.7)+1)*140;rect(c,-285,brushY,573,48,'#182d2c',null,5);rect(c,-270,brushY-18,545,24,'#b39971',C.gold,5);for(let i=0;i<48;i++)line(c,[[-268+i*11,brushY+25],[-268+i*11,brushY+55]],'#526058',2);c.restore();
 let peel=ease(p*1.6);c.save();c.translate(1430,515);c.rotate(.06-peel*.06);material(c,-227,-239,454,478,C.paper,'#a5a080');chars.forEach((s,i)=>{c.globalAlpha=clamp(p*2-i*.04);text(c,s,-146+i%3*146,-150+Math.floor(i/3)*102,60,'#324b48','center',true)});c.restore();
 arrow(c,[1080,720],[1180,720],C.cyan);text(c,'反刻 · 上墨',680,793,29,C.gold,'center');text(c,'铺纸 · 刷印',1420,793,29,C.cyan,'center');foot(c,'工序与示例文字为示意，不是古代原件的复刻');
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
function monsoon(c,t,p){
 for(let row=0;row<7;row++){let pts=[];for(let x=140;x<=1770;x+=14)pts.push([x,650+row*23+Math.sin(x*.012-t*2+row)*8]);line(c,pts,row%2?'#2a667b':'#377c8b',2)}
 c.save();c.translate(1000,636+Math.sin(t*.9)*8);c.rotate(Math.sin(t*.7)*.018);poly(c,[[-530,-46],[470,-70],[397,111],[-392,128]],'#75533a','#c8ac75',3);poly(c,[[-520,-47],[470,-70],[419,-13],[-473,13]],'#c4a777');for(let j=0;j<6;j++)line(c,[[-450+j*8,18+j*16],[427-j*7,-5+j*17]],'#aa80566a',2);
 for(let x of[-250,120])line(c,[[x,-30],[x,-425]],C.gold,8);
 const billow=25+Math.sin(t*1.7)*7;poly(c,[[-248,-418],[128,-418],[190+billow,-85],[-247,-85]],'#e3d5ae','#b8aa86');for(let i=0;i<8;i++)line(c,[[-245+i*46,-415],[-245+i*52,-90]],'#b5a58388',1.5);
 poly(c,[[125,-425],[410,-180],[128,-172]],'#cfbe96','#e7d6af');line(c,[[-250,-425],[-485,-45]],'#d7c092',1.5);line(c,[[120,-425],[460,-65]],'#d7c092',1.5);
 for(let i=0;i<5;i++)person(c,-350+i*150,-38,.38,C.paper,t+i);c.restore();
 for(let i=0;i<4;i++){let x=220+((t*.12+i*.25)%1)*1430,y=280+i*37;arrow(c,[x,y],[x+140,y-8],C.cyan+'88',1.5)}text(c,'季风与既有港口网络',350,413,27,C.cyan);foot(c,'印度洋帆船与海风概念场景；船型不代表某次特定航行');
}
function threeWorlds(c,t,p){
 const xs=[415,960,1500];for(let j=0;j<3;j++){let x=xs[j];ellipse(c,x,750,226,45,'#142b32');}
 for(let i=0;i<5;i++){let x=220+i*83,h=(190+(i%2)*82)*ease(p*2-i*.07);rect(c,x,720-h,76,h,'#a68b61','#cab080',2);poly(c,[[x,720-h],[x+38,690-h],[x+76,720-h]],'#c5a879');for(let k=0;k<3;k++)line(c,[[x-12,743-h+k*44],[x+90,743-h+k*44]],'#715d43',6)}
 for(let i=0;i<6;i++){let w=390-i*52,h=38,y=720-i*43;poly(c,[[960-w/2,y],[960+w/2,y],[960+w/2-20,y-h],[960-w/2+20,y-h]],i%2?'#8c9f88':'#afbaa0','#627c70');}for(let i=0;i<19;i++)line(c,[[930,715-i*14],[990,715-i*14]],'#d0c6a0',3);rect(c,919,412,82,64,'#aab69c','#d5cfac');
 rect(c,1310,490,380,230,'#879a8e','#c7c8ad',2);poly(c,[[1288,491],[1500,370],[1713,491]],'#6e8177','#b0b69b');for(let i=0;i<5;i++){let x=1330+i*73;rect(c,x,560,48,160,C.bg,null,24);line(c,[[x-3,550],[x+51,550]],C.gold,4)}for(let i=0;i<3;i++)person(c,1400+i*72,743,.42,C.paper,t*3+i);
 text(c,'西非 · 贸易',415,800,27,C.gold,'center');text(c,'美洲 · 城市与历法',960,800,27,C.cyan,'center');text(c,'欧洲 · 城市与大学',1500,800,27,C.paper,'center');foot(c,'三地建筑皆为概念化设计，不复原具体遗址');
}
function perspective(c,t,p){
 let vx=1010,vy=458;rect(c,315,270,1280,540,'#d9d0b2','#aa9265',4);c.save();c.beginPath();c.rect(335,290,1240,500);c.clip();c.fillStyle='#9cb2ac';c.fillRect(335,290,1240,500);c.fillStyle='#657f77';c.fillRect(335,vy,1240,332);
 for(let i=0;i<12;i++)line(c,[[335+i*113,790],[vx,vy]],'#d8d3ac',2);for(let j=1;j<8;j++){let y=vy+Math.pow(j/7,2)*330;line(c,[[335,y],[1575,y]],'#cad0ae',2)}
 for(let side of[-1,1])for(let i=0;i<5;i++){let z=(i+1)/5,w=42+z*56,x=vx+side*(90+z*490),y=vy+z*315,h=60+z*340;rect(c,x-w/2,y-h,w,h,'#c1bda1','#e1d4ae');poly(c,[[x-w/2-10,y-h],[x+w/2+10,y-h],[x+w/2,y-h-18],[x-w/2,y-h-18]],'#ded2ae')}
 circle(c,vx,vy,5,C.red);c.restore();
 let q=(Math.sin(t*.8)+1)/2,x=600+q*750,y=690-q*230;c.save();c.translate(x,y);c.rotate(-.6);rect(c,0,0,250,12,'#a7814e',null,4);poly(c,[[-38,5],[0,-5],[0,18]],'#c8b588');c.restore();text(c,'透视 · 观察 · 人的经验',960,841,24,C.gold,'center');
}
function press(c,t,p){
 const phase=(t*.65)%1,down=90*Math.sin(phase*Math.PI)**4;ellipse(c,1100,800,610,32,'#00000050');
 rect(c,760,748,770,42,'#8b704c','#c3a977',5);for(let x of[815,1420]){rect(c,x,285,45,463,'#9c8157','#c2aa7d',3);rect(c,x-24,275,94,38,'#bea373',null,5)}rect(c,783,283,715,45,'#b49c70','#d4be8c',4);
 line(c,[[1140,329],[1140,456+down]],'#dbc693',20);for(let i=0;i<17;i++)line(c,[[1125,344+i*7],[1156,357+i*7]],'#695b40',3);line(c,[[1030,393],[1250,393]],'#bda272',12);circle(c,1030,393,13,C.gold);circle(c,1250,393,13,C.gold);
 rect(c,910,466+down,469,46,'#8f7c59','#ceb689',4);rect(c,900,680,490,42,'#5c6b64',C.gold,5);
 for(let i=0;i<60;i++){let x=918+i%15*30,y=665+Math.floor(i/15)*12;rect(c,x,y,25,10,i%3?'#a6ada0':'#d0d1bd','#566863',1)}
 let sheetX=phase<.45?lerp(480,918,phase/.45):918;rect(c,sheetX,649,438,22,C.paper);if(phase>.63)for(let i=0;i<11;i++)line(c,[[940+i*35,653],[940+i*35,665]],'#4f655b',2);
 material(c,240,380,400,226,'#4c615b','#bca577');for(let i=0;i<36;i++){let x=265+i%9*40,y=412+Math.floor(i/9)*44;rect(c,x,y,30,30,'#9caa9b','#c3c6aa',2);if(i<8)text(c,'ABCDEFGH'[i],x+15,y+16,18,'#203c35','center')}
 text(c,'排字',432,655,27,C.gold,'center');text(c,'压印',1137,594,27,C.gold,'center');for(let i=0;i<5;i++){let x=1570+(i%2)*55,y=600-i*32;rect(c,x,y,190,112,C.paper,'#a8a589',2);for(let j=0;j<5;j++)line(c,[[x+16,y+22+j*16],[x+168,y+22+j*16]],'#6f8069',2)}foot(c,'欧洲金属活字工序示意；东亚此前已有不同的印刷技术传统');
}

function exchange(c,t,p){
 ellipse(c,480,550,290,232,'#24464c','#537c80');ellipse(c,1450,550,290,232,'#24464c','#537c80');
 // Two stylised geographic plaques, not territorial boundaries.
 poly(c,[[410,350],[575,369],[590,450],[510,505],[535,575],[465,730],[415,615],[433,505],[352,429]],'#78907b');poly(c,[[1295,423],[1420,343],[1592,385],[1670,471],[1571,538],[1468,501],[1410,685],[1310,595]],'#78907b');
 for(let i=0;i<3;i++){const y=389+i*153;arrow(c,[700,y],[1210,y+35],i===2?C.paper:C.gold,2);let q=(t*.17+i*.27)%1,x=735+q*427,yy=y+q*32;c.save();c.translate(x,yy);c.rotate(Math.sin(t+i)*.12);if(i===0){ellipse(c,0,0,22,47,C.gold);for(let j=0;j<8;j++)line(c,[[-16,-34+j*9],[16,-34+j*9]],'#877440',2);poly(c,[[-30,5],[-20,55],[2,57],[-5,20]],C.green);poly(c,[[30,-4],[20,53],[1,57],[4,16]],'#a7bc80')}else if(i===1){ellipse(c,0,0,46,30,'#be9a70');for(let j=0;j<7;j++)circle(c,Math.sin(j*5)*30,Math.cos(j*3)*16,2,'#796143')}else{ellipse(c,0,0,34,17,'#c3c8c1','#f0ede0');ellipse(c,0,-8,34,17,'#ece9d9','#9ca99b');text(c,'银',0,-9,23,'#657a73','center')}c.restore()}
 text(c,'美洲',480,805,31,C.gold,'center');text(c,'欧洲 · 非洲 · 亚洲',1450,805,31,C.cyan,'center');text(c,'物种与商品的传播方向概略示意',960,292,23,C.muted,'center');foot(c,'传播网络复杂，图示不代表唯一航线或精确交换数量');
}
function astronomy(c,t,p){
 c.save();c.translate(1320,519);const e=.45;for(let i=0;i<4;i++){let a=110+i*85,b=a*Math.sqrt(1-e*e),x0=-a*e;c.beginPath();c.ellipse(x0,0,a,b,0,0,TAU);c.strokeStyle='#7caba9';c.lineWidth=1.8;c.stroke();const theta=t*(.8-i*.12)+i*1.1;circle(c,x0+a*Math.cos(theta),b*Math.sin(theta),8+i*2,[C.gold,C.paper,C.cyan,C.red][i])}circle(c,0,0,30,C.gold);circle(c,0,0,45,null,C.gold+'55',1);c.restore();
 c.save();c.translate(566,550);c.rotate(-.43);let g=c.createLinearGradient(0,-50,0,50);g.addColorStop(0,'#b5bba4');g.addColorStop(.4,'#54736e');g.addColorStop(1,'#243f43');rect(c,-270,-48,510,96,g,C.gold,8);rect(c,230,-65,38,130,'#c7b68b','#f0deaf',4);rect(c,-295,-28,38,56,'#c7b68b',null,3);ellipse(c,250,0,13,56,'#9ccdd355','#e7ddb5');for(let y of[-30,0,30])line(c,[[268,y],[520,y*3]],C.cyan+'77',1);c.restore();line(c,[[570,560],[467,790]],C.gold,12);line(c,[[570,560],[690,790]],C.gold,12);
 text(c,'望远镜观测',545,325,31,C.cyan,'center');text(c,'太阳位于焦点',1660,750,25,C.gold,'center');foot(c,'轨道为平面示意；天体尺寸与运行速度不按比例');
}
function newton(c,t,p){
 // A pendulum and an orbit express linked physical models, not a historical experiment reconstruction.
 const ox=500,oy=315,L=400,angle=.38*Math.cos(t*1.25),bx=ox+Math.sin(angle)*L,by=oy+Math.cos(angle)*L;
 rect(c,255,286,490,26,'#8f9c8a',C.paper,3);line(c,[[ox,oy],[bx,by]],'#bfc5af',4);circle(c,bx,by,42,'#b4a478',C.gold,4);line(c,[[ox,oy],[ox,oy+L+60]],'#6b999977',1);arrow(c,[bx,by+50],[bx,by+122],C.cyan,3);
 c.save();c.translate(1270,505);circle(c,0,0,180,null,'#749997',2);circle(c,0,0,45,'#638d82',C.cyan,2);let a=t*.6,x=Math.cos(a)*180,y=Math.sin(a)*180;circle(c,x,y,15,C.paper);arrow(c,[x*.85,y*.85],[x*.45,y*.45],C.gold,3);c.restore();
 text(c,'运动',500,816,32,C.paper,'center');text(c,'引力 ∝ 1 / 距离²',1270,774,36,C.gold,'center');line(c,[[750,540],[950,540]],C.cyan,2);for(let i=0;i<4;i++)circle(c,770+((t*.22+i*.25)%1)*160,540,4,C.cyan);text(c,'数学描述与证据检验',960,270,27,C.muted,'center');
}
function enlightenment(c,t,p){
 ellipse(c,960,611,535,142,'#5e5746','#c0a779');ellipse(c,960,594,535,142,'#8b795b','#d2b889');for(let x of[570,1345])poly(c,[[x,680],[x+47,680],[x+67,803],[x+16,803]],'#4c4f41');
 for(let i=0;i<7;i++){let a=Math.PI+i/6*Math.PI,x=960+Math.cos(a)*600,y=592+Math.sin(a)*245;person(c,x,y,.92,i%2?C.paper:'#8db5b0',t*.4+i);rect(c,x-30,y+19,60,58,'#415b53','#728e7c',3)}
 let sheets=[[750,540,-.1],[1030,600,.12],[1180,510,-.07]];sheets.forEach(([x,y,a],i)=>{c.save();c.translate(x,y);c.rotate(a+Math.sin(t*.5+i)*.015);rect(c,-110,-67,220,134,C.paper,'#a79f7b',2);text(c,['权利','主权','法律'][i],0,-10,34,'#40584f','center');for(let j=0;j<3;j++)line(c,[[-75,22+j*17],[75,22+j*17]],'#7c8a70',1.5);c.restore()});
 for(let i=0;i<3;i++){let x=680+i*280,y=315+Math.sin(t*.7+i)*12;text(c,['理性','讨论','制度'][i],x,y,30,C.gold,'center');line(c,[[x,y+27],[x,405]],'#7fa7a277',1)}foot(c,'公共讨论场景为概念示意，不虚构历史人物对话');
}
function revolutions(c,t,p){
 // A single upright broadside and a fractured architectural order replace
 // another opening-book composition. These are interpretive visual symbols.
 c.save();c.translate(525,522);c.rotate(-.035);material(c,-250,-242,500,484,C.paper,'#b2a37d');
 ellipse(c,0,-235,250,17,'#d2c39e','#b2a37d');text(c,'1776',0,-153,73,'#36594f','center',true);text(c,'独立宣言',0,-73,37,'#526d59','center');
 for(let i=0;i<10;i++){let w=374*ease(p*2-i*.04);line(c,[[-187,5+i*23],[-187+w,5+i*23]],'#7c8a6e',2)}c.restore();
 text(c,'1789',1355,292,73,C.gold,'center',true);text(c,'法国大革命',1355,363,32,C.paper,'center');
 const breakage=ease((p-.2)*1.5);rect(c,1020,745,660,39,'#718477','#b6bea0',3);
 for(let i=0;i<3;i++){let x=1110+i*200;rect(c,x-31,612,62,132,'#a4af95','#c6c6a5',3);let shift=(i-1)*breakage*25;c.save();c.translate(x+shift,612-breakage*(i%2?9:0));c.rotate((i-1)*breakage*.08);rect(c,-31,-142,62,141,'#b6b99b','#d9ceaa',3);rect(c,-49,-155,98,20,'#c6c5a1',null,2);c.restore();line(c,[[x-30,612],[x-12,602],[x+3,617],[x+22,606],[x+31,611]],C.red,3);}
 rect(c,1050,431,608,33,'#bbba99','#d5ccaa',3);text(c,'旧制度受到冲击',1350,818,26,C.red,'center');text(c,'平等与权利的承诺',525,818,26,C.cyan,'center');foot(c,'文书与建筑为叙事象征，不是历史原件或事件现场复原');
}

function haiti(c,t,p,atlas,s){
 c.save();c.globalAlpha=.6;atlas.draw(c,s,t,p,{layers:false});c.restore();
 for(let i=0;i<9;i++){const x=500+i*111,y=590+(i%2)*12,gap=i===4?ease((p-.25)*2)*95:0;c.save();c.translate(x+(i>4?gap:-gap),y);c.rotate((i%2?1:-1)*.22);c.beginPath();c.ellipse(0,0,63,37,0,0,TAU);c.strokeStyle=i===4?'#a2b4ad':'#819990';c.lineWidth=13;c.stroke();c.restore()}
 text(c,'1791',510,410,70,C.paper,'center',true);text(c,'1804',1435,410,86,C.gold,'center',true);text(c,'起义与革命',510,479,28,C.muted,'center');text(c,'海地独立',1435,479,28,C.gold,'center');
 for(let i=0;i<7;i++)person(c,780+i*70,785,.75,i%2?C.paper:'#a1b8ac',0);foot(c,'以地理、年份与象征性断链呈现争取自由的历史');
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
function city(c,t,p){
 poly(c,[[170,695],[880,322],[1760,647],[1020,842]],'#294a47','#69857a');
 const layers=[[430,667],[650,571],[870,480],[1090,564],[1300,654]];
 for(let j=0;j<layers.length;j++)for(let i=0;i<4;i++){let [bx,by]=layers[j],x=bx+i*108,y=by+i*42,h=(75+(j*31+i*23)%170)*(.45+.55*ease(p*1.6-j*.035-i*.05));iso(c,x,y,70,54,h,['#819983','#344f4e','#54746a']);for(let r=0;r<Math.floor(h/34);r++)for(let k=0;k<2;k++)rect(c,x+36+k*21,y-h+18+r*30,9,14,(i+j+r)%3?'#cbb579':'#1d373b');}
 for(let i=0;i<4;i++){let x=1090+i*134,y=653+i*40;iso(c,x,y,36,30,278,['#677e6e','#344d4d','#4c6961']);for(let j=0;j<7;j++){let q=(t*.12+j/7)%1;circle(c,x+34+q*120,y-290-q*165,12+q*34,'#9ab3a7'+Math.floor((1-q)*45).toString(16).padStart(2,'0'))}}
 for(let i=0;i<25;i++){let q=(t*.05+i/25)%1;person(c,340+q*1220,803-q*63,.32,i%3?C.paper:C.cyan,t*4+i)}text(c,'人口迁移',365,396,29,C.cyan);text(c,'生产扩大',1490,360,29,C.gold,'center');text(c,'新的生活压力',1500,820,27,C.muted,'center');
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
 const open=ease(p*2.2),out=ease((p-.58)*2.8);if(out>0){c.save();c.globalAlpha=out;atlas.draw(c,{...s,focus:[10,20],zoom:1},t,p,{layers:false});for(let i=0;i<70;i++){let x=190+(i*137)%1500,y=300+(i*73)%450;circle(c,x,y,1.7,C.gold)}c.restore()}
 c.save();c.globalAlpha=1-out;c.translate(960,520);c.rotate(-.04);let w=310*open;poly(c,[[-w-17,-247],[0,-225],[w+17,-247],[w+17,277],[0,300],[-w-17,277]],'#884b40');poly(c,[[-w,-258],[0,-222],[0,284],[-w,258]],'#d9cbae','#b7a680');poly(c,[[0,-222],[w,-258],[w,258],[0,284]],C.paper,'#b7a680');
 if(w>80){text(c,'共产党宣言',w/2,-135,36,'#6b3e33','center',true);text(c,'1848',w/2,-53,67,'#6b3e33','center',true);text(c,'伦敦',w/2,26,28,'#6b5d48','center');text(c,'马克思 · 恩格斯',w/2,98,24,'#74674d','center');for(let i=0;i<15;i++)line(c,[[-w+35,-166+i*26],[-38,-158+i*26]],'#8a7c59',1.5)}c.restore();
 if(out>0){c.save();c.globalAlpha=out;text(c,'1848',960,480,118,C.gold,'center',true);text(c,'世界，从未停止变化',960,626,40,C.paper,'center',true);c.restore()}foot(c,'书籍为原创视觉设计，非1848年原版封面复刻');
}

export const sceneFunctions={irrigation,tablet,pyramid,bronze_stone:bronzeStone,theatre,rome,woodblock,astrolabe,monsoon,three_worlds:threeWorlds,perspective,press,exchange,astronomy,newton,enlightenment,revolutions,haiti,textile,steam,rail,city,workers,marx,manifesto};
export function drawScene(c,s,t,p,atlas){const f=sceneFunctions[s.key];if(!f)throw Error('No unique scene for '+s.key);c.save();c.lineCap='round';c.lineJoin='round';f(c,t,p,atlas,s);c.restore()}
