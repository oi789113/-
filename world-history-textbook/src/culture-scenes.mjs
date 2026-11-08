import {C,TAU,clamp,ease,lerp,text,line,poly,rect,circle,ellipse,arrow,iso,person,wheel,grain,foot,material} from './draw.mjs';

// Every composition is an original explanatory model, not an archaeological reconstruction.
// Coordinates reserve the upper title/date area and the lower subtitle band.
const ink='#2c494a', stone='#9da58d', pale='#d8c8a0';
function ticks(c,x,y,r,n,col=C.gold){for(let i=0;i<n;i++){const a=i/n*TAU;line(c,[[x+Math.sin(a)*(r-9),y-Math.cos(a)*(r-9)],[x+Math.sin(a)*r,y-Math.cos(a)*r]],col,i%5?1.3:2.6)}}
function crown(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);poly(c,[[-77,21],[-91,-59],[-46,-22],[0,-83],[46,-22],[91,-59],[77,21]],C.gold,'#f2db9a',2);rect(c,-80,15,160,31,'#9d8053',C.gold,5);for(let a of[-55,0,55])circle(c,a,28,5,a?C.cyan:C.red);c.restore()}
function roundArch(c,x,y,w,h,col=stone){rect(c,x-w/2,y-h,w,h,col,null,4);c.beginPath();c.moveTo(x-w*.32,y);c.lineTo(x-w*.32,y-h*.57);c.arc(x,y-h*.57,w*.32,Math.PI,0);c.lineTo(x+w*.32,y);c.closePath();c.fillStyle=C.bg;c.fill()}
function roof(c,x,y,w,h,col='#667d70'){poly(c,[[x-w/2,y],[x,y-h],[x+w/2,y],[x+w/2-18,y+18],[x-w/2+18,y+18]],col,'#b9bea0',2)}
function labels(c,a,y=792,col=C.gold){a.forEach(([s,x])=>text(c,s,x,y,27,col,'center'))}

function egypt_calendar(c,t,p){
 // The civil year had twelve 30-day months plus five additional days.
 poly(c,[[190,717],[345,339],[781,339],[885,739]],'#6f704e','#a4a379',2);
 c.save();c.beginPath();c.moveTo(430,325);c.bezierCurveTo(540,455,370,599,557,753);c.lineTo(690,753);c.bezierCurveTo(475,600,669,470,558,325);c.closePath();c.fillStyle='#3c8899';c.fill();c.clip();for(let i=0;i<20;i++){let y=335+((i*26+t*32)%425);line(c,[[395,y],[670,y]],'#8dc2c277',1.6)}c.restore();
 const flood=.5+.5*Math.sin(t*.6);rect(c,270,391,78,285,'#758e80','#c7cfac',9);rect(c,282,660-220*flood,54,220*flood,'#67bdc4',null,4);for(let i=0;i<7;i++)line(c,[[326,416+i*37],[351,416+i*37]],C.paper,2);text(c,'水位',309,730,27,C.cyan,'center');
 for(let i=0;i<25;i++){let x=665+i%5*34,y=420+Math.floor(i/5)*52;grain(c,x,y,.38+.1*Math.sin(t*.3+i))}
 c.save();c.translate(1265,520);circle(c,0,0,239,'#b99d68','#e0c994',6);circle(c,0,0,221,'#193c42','#d6ba7e',2);
 for(let i=0;i<12;i++){const a=i/12*TAU,b=(i+1)/12*TAU;c.beginPath();c.arc(0,0,201,a-.5*Math.PI,b-.5*Math.PI);c.lineWidth=26;c.strokeStyle=['#639c9d','#86a184','#c5ae70'][Math.floor(i/4)];c.stroke();line(c,[[Math.sin(a)*174,-Math.cos(a)*174],[Math.sin(a)*221,-Math.cos(a)*221]],C.bg,3)}
 ticks(c,0,0,163,60,'#b9d0bd');text(c,'365',0,-15,78,C.paper,'center',true);text(c,'日',0,58,29,C.gold,'center');
 const a=t*.2-.7;line(c,[[0,0],[Math.sin(a)*151,-Math.cos(a)*151]],C.gold,4);circle(c,0,0,8,C.gold);
 for(let i=0;i<5;i++)circle(c,-52+i*26,264,6,C.gold);c.restore();
 text(c,'尼罗河与农业节律',530,294,29,C.cyan,'center');text(c,'十二个月，另加五日',1265,291,29,C.gold,'center');
 labels(c,[['泛滥',1094],['生长',1265],['收获',1436]],807);
 foot(c,'古埃及民用历与农业节律的概念示意；不表示现代历法或精确水位');
}

function caste(c,t,p){
 const names=['婆罗门','刹帝利','吠舍','首陀罗'];
 for(let i=0;i<4;i++){
  const y=333+i*116,offset=(3-i)*43;
  poly(c,[[365+offset,y+45],[1390+offset,y+45],[1503+offset,y+80],[478+offset,y+80]],i%2?'#405b56':'#4f6358','#8b9d84');
  line(c,[[397+offset,y-5],[1420+offset,y-5]],'#a3a98b55',1);
  text(c,names[i],217,y+30,30,C.paper,'center');
  for(let j=0;j<9;j++){const x=480+offset+j*98+Math.sin(t*.6+j)*5;person(c,x,y+37,.72,C.paper,Math.sin(t*.7+j)*.15)}
  const gate=1458+offset;line(c,[[gate,y-24],[gate,y+62]],C.red,5);for(let j=0;j<4;j++)line(c,[[gate-11,y-14+j*22],[gate+12,y-3+j*22]],C.red,3);
 }
 line(c,[[1636,328],[1636,728]],'#c07e7380',2);text(c,'世袭身份',1743,461,29,C.red,'center');text(c,'等级限制',1743,514,29,C.red,'center');
 for(let i=0;i<4;i++){let q=(t*.09+i*.25)%1;circle(c,1636,330+q*390,3,C.red)}
 foot(c,'四种姓框架为制度示意；社会现实更复杂，且存在被排斥于四种姓之外的人群');
}

function buddhism(c,t,p){
 ellipse(c,1090,758,461,40,'#152d32');rect(c,716,725,753,35,'#9f9f7f','#d7c9a0',3);rect(c,761,682,663,43,'#b9b08b','#e2cea0',3);
 // Hemispherical stupa, harmika and umbrella finial.
 c.beginPath();c.arc(1090,680,257,Math.PI,TAU);c.lineTo(1347,680);c.closePath();c.fillStyle='#b9b38d';c.fill();c.strokeStyle='#e2d1a7';c.lineWidth=2;c.stroke();
 for(let i=0;i<8;i++){const h=30+i*28,r=Math.sqrt(257**2-h*h);line(c,[[1090-r,680-h],[1090+r,680-h]],'#8b937e70',1.5)}
 rect(c,1048,395,84,42,'#c6bc94','#e5d4aa',3);line(c,[[1090,395],[1090,285]],C.gold,6);for(let i=0;i<3;i++){let y=299+i*29,w=44+i*17;ellipse(c,1090,y,w,9,'#b9a675',C.gold)}
 for(let x of[821,1360]){rect(c,x,536,25,170,'#c3b78c',C.gold,2);rect(c,x-24,524,72,19,'#ddd0a6',null,3)}rect(c,797,512,610,19,'#ad9e79',C.gold,3);
 c.save();c.translate(397,499);c.rotate(t*.07);circle(c,0,0,147,'#15373c',C.gold,7);circle(c,0,0,116,null,'#baa76d',3);for(let i=0;i<8;i++){let a=i/8*TAU;line(c,[[Math.sin(a)*27,-Math.cos(a)*27],[Math.sin(a)*146,-Math.cos(a)*146]],C.gold,8);circle(c,Math.sin(a)*149,-Math.cos(a)*149,8,C.paper)}circle(c,0,0,28,C.gold);c.restore();
 for(let i=0;i<11;i++){const a=.1+i/10*Math.PI,x=1090+Math.cos(a)*414,y=726+Math.sin(a)*57;person(c,x,y,.5,i%2?C.paper:'#aabfaa',0)}
 text(c,'反思苦难与人的行为',397,733,28,C.cyan,'center');text(c,'佛教兴起',1090,797,30,C.gold,'center');foot(c,'法轮与佛塔为宗教文化的概念表达，非佛陀时代现场复原');
}

function agora(c,t,p){
 ellipse(c,990,599,693,195,'#364d48','#718276');
 for(let row=0;row<3;row++){
  const rx=540-row*95,ry=157-row*31;for(let k=0;k<13;k++){let a=Math.PI+k/12*Math.PI,x=990+Math.cos(a)*rx,y=578+Math.sin(a)*ry;rect(c,x-26,y-3,52,15,'#8d987f','#c1c2a0',2);person(c,x,y-13,.6,C.paper,Math.sin(t*.7+k)*.12)}
 }
 poly(c,[[817,637],[1077,610],[1169,693],[896,725]],'#a2a78b','#d1c6a1');rect(c,929,556,87,98,'#a4a98d','#e1cfaa',4);person(c,970,551,.9,C.paper,Math.sin(t*.6)*.2);
 // A token visibly drops into the ballot vessel. It is a schematic assembly image.
 const q=(t*.36)%1,tx=lerp(986,1325,ease(q)),ty=468+136*q-Math.sin(q*Math.PI)*128;circle(c,tx,ty,20-9*q,C.gold,'#f0d5a0',2);
 ellipse(c,1325,612,58,18,'#b7a378','#e1ca96');poly(c,[[1268,612],[1284,704],[1366,704],[1382,612]],'#9e8c68','#c7b58d',2);ellipse(c,1325,612,42,10,'#223c3b');
 for(let i=0;i<8;i++){circle(c,286+i%4*24,518+Math.floor(i/4)*25,6,C.gold)}
 text(c,'集会',490,722,29,C.gold,'center');text(c,'讨论与表决',1327,753,29,C.cyan,'center');text(c,'成年男性公民参政',978,316,33,C.paper,'center');
 foot(c,'雅典民主具有身份限制；妇女、外邦人和奴隶被排除在公民政治权利之外');
}

function frankish(c,t,p){
 // Coronation is represented by architecture and symbols, not invented likenesses.
 for(let x of[331,1500]){rect(c,x,312,88,430,'#829585','#b9c0a0',4);rect(c,x-28,300,144,31,'#b9bc99',null,3);rect(c,x-24,737,136,27,'#a4af93',null,3);for(let j=0;j<5;j++)line(c,[[x+14+j*13,333],[x+14+j*13,723]],'#607b70',2)}
 c.beginPath();c.ellipse(960,494,527,235,0,Math.PI,TAU);c.lineWidth=40;c.strokeStyle='#667e70';c.stroke();c.beginPath();c.ellipse(960,494,527,235,0,Math.PI,TAU);c.lineWidth=2;c.strokeStyle='#aeb594';c.stroke();
 rect(c,665,717,590,34,'#8b977d','#c6c4a0',3);rect(c,706,672,508,45,'#a5a68a','#cfca9e',3);rect(c,831,523,258,150,'#566e60','#bfa977',6);rect(c,851,444,218,100,'#6d7e65','#cbb687',10);
 for(let x of[865,1055])circle(c,x,466,10,C.gold);crown(c,960,367+35*ease(p),1.15);
 for(let i=0;i<6;i++){const y=531+i*25;line(c,[[871,y],[1049,y]],'#8d9e7b77',1.5)}
 const crossX=529,crossY=485;line(c,[[crossX,crossY-64],[crossX,crossY+89]],C.gold,10);line(c,[[crossX-49,crossY-16],[crossX+49,crossY-16]],C.gold,10);
 rect(c,1324,434,163,234,'#a99f80','#d5c19b',5);for(let i=0;i<8;i++)line(c,[[1341,465+i*23],[1471,465+i*23]],'#697b64',2);
 labels(c,[['王权',958],['教会',528],['统治与文书',1407]],797);foot(c,'查理曼加冕以建筑与王权符号示意，不是800年仪式的现场复原');
}

function feudal(c,t,p){
 poly(c,[[170,662],[815,354],[1760,611],[1100,825]],'#4e6251','#8c9c7c');
 // Manor and demesne at left, peasant holdings and village at right.
 iso(c,390,626,258,166,211,['#bdb58b','#677b62','#9a9b73']);roof(c,575,421,418,126);rect(c,543,513,66,113,'#345146','#8c9f7b',28);for(let x of[430,508,653])rect(c,x,474,32,46,'#365248','#bdc19b',3);
 for(let row=0;row<3;row++)for(let k=0;k<4;k++){let x=935+row*130+k*92,y=548-row*45+k*33;poly(c,[[x,y],[x+73,y-32],[x+146,y-8],[x+71,y+25]],'#79865c','#b5b17a');for(let j=0;j<4;j++)grain(c,x+36+j*23,y-j*9,.3)}
 for(let i=0;i<5;i++){let x=1130+i*100,y=729-i*22;iso(c,x,y,62,50,58,['#b9b28b','#6c7e63','#919c76']);roof(c,x+47,y-62,105,45,'#708469')}
 for(let i=0;i<8;i++){let q=(t*.035+i/8)%1;person(c,816+q*585,718-q*93,.44,C.paper,t*2+i)}
 const y1=302,y2=368;arrow(c,[715,y1],[1238,y1],C.gold,2.2);arrow(c,[1238,y2],[715,y2],C.cyan,2.2);const q=(t*.2)%1;circle(c,735+q*470,y1,6,C.gold);circle(c,1218-q*470,y2,6,C.cyan);
 const delivery=(t*.13)%1,dx=lerp(1450,690,delivery),dy=lerp(755,660,delivery);c.save();c.translate(dx,dy);ellipse(c,0,0,36,13,'#c7b986','#e3cb93');poly(c,[[-34,0],[34,0],[26,40],[-26,40]],'#9d885c','#d1b27b');for(let k=0;k<4;k++)line(c,[[-31,10+k*7],[31,10+k*7]],'#d2bb83',2);for(let k=0;k<5;k++)grain(c,-24+k*12,-10,.48);c.restore();
 text(c,'土地与保护',977,y1-24,27,C.gold,'center');text(c,'效忠与服役',977,y2-22,27,C.cyan,'center');text(c,'庄园',478,768,28,C.paper,'center');text(c,'农民承担地租与劳役',1430,789,27,C.paper,'center');
 foot(c,'封君封臣与庄园关系的概念示意；欧洲各地的制度和依附程度并不一致');
}

function town_charter(c,t,p){
 // Gate and houses are the visual subject; a charter seal unlocks civic autonomy.
 for(let i=0;i<9;i++){let x=358+i*138,y=699,h=155+(i%3)*33;rect(c,x,y-h,105,h,'#566f61','#91a18a',2);roof(c,x+52,y-h,133,74);for(let j=0;j<3;j++)rect(c,x+15+j*28,y-h+36,17,27,'#c3bb8c',null,2)}
 for(let x of[479,1255]){rect(c,x,403,180,338,'#99a188','#d2c8a4',4);for(let i=0;i<4;i++)rect(c,x-5+i*53,377,37,49,'#a6ac90','#d2c8a4',2);for(let i=0;i<7;i++)line(c,[[x+7,437+i*43],[x+174,437+i*43]],'#758773',1.5)}
 rect(c,659,488,596,247,'#7b907a','#c6c7a2',3);roof(c,960,488,650,105,'#718970');
 const open=ease(p*1.6);rect(c,832,544,254,191,'#122f33',null,90);c.save();c.beginPath();c.rect(832,544,254,191);c.clip();for(let side of[-1,1]){const x=side<0?831-open*125:959+open*125;rect(c,x,538,129,208,'#7a6b4a','#c3ad77',5);for(let i=0;i<6;i++)line(c,[[x+8+i*20,546],[x+8+i*20,735]],'#ad9563',2)}c.restore();
 for(let i=0;i<9;i++){let q=(t*.08+i/9)%1;person(c,870+q*175,762+q*38,.45,C.paper,t*2+i)}
 c.save();c.translate(1640,457);c.rotate(.045);material(c,-108,-121,216,242,C.paper,'#cbb68b');for(let i=0;i<6;i++)line(c,[[-78,-78+i*24],[78,-78+i*24]],'#6c7b62',2);line(c,[[-19,89],[-37,151]],'#b29762',8);line(c,[[19,89],[37,151]],'#b29762',8);circle(c,0,126,31,'#995f4b',C.gold,3);text(c,'自治',0,127,22,C.paper,'center');c.restore();
 text(c,'城市争取自治',960,310,32,C.gold,'center');text(c,'特许状',1640,667,28,C.paper,'center');foot(c,'城市建筑与特许状为示意；自治权因城市、领主和年代而异');
}

function university(c,t,p){
 // A vaulted scholarly courtyard, written argument and distinct lecture staging.
 for(let i=0;i<6;i++){const x=290+i*263;roundArch(c,x,691,214,323,'#8d9e89');rect(c,x-122,358,244,28,'#b7b79a','#d6c8a3',3);for(let k=0;k<4;k++)line(c,[[x-106,412+k*63],[x+106,412+k*63]],'#6c8472',1.3)}
 poly(c,[[172,734],[945,569],[1774,739],[960,829]],'#486052','#8fa18a');
 for(let row=0;row<3;row++)for(let j=0;j<5;j++){let x=490+j*180+row*52,y=610+row*62;person(c,x,y,.64,C.paper,0);rect(c,x-58,y+13,116,19,'#aa9e76','#d2be8f',3);rect(c,x-35,y+6,70,16,C.paper,'#978e69',1)}
 rect(c,1440,533,173,52,'#b3a67e','#dbc999',3);poly(c,[[1447,533],[1519,462],[1620,521],[1605,535]],'#d9c89c','#968e69');person(c,1506,481,.85,C.paper,Math.sin(t*.5)*.15);
 let w=130*ease((p-.15)*1.5);line(c,[[1461,513],[1461+w,519]],'#536a57',2);const penY=509+Math.sin(t*1.4)*7;line(c,[[1527,penY],[1588,penY-74]],C.gold,4);
 c.save();c.translate(332,693);c.rotate(-.1);poly(c,[[-135,-51],[0,-32],[135,-51],[135,73],[0,92],[-135,73]],'#9a8662','#c9b389',2);poly(c,[[-125,-58],[0,-32],[0,83],[-125,62]],C.paper,'#b4a47e');poly(c,[[0,-32],[125,-58],[125,62],[0,83]],'#d6c7a2','#b4a47e');const turn=(.5+.5*Math.sin(t*.8));poly(c,[[0,-32],[125*Math.cos(turn*Math.PI),-58-35*Math.sin(turn*Math.PI)],[125*Math.cos(turn*Math.PI),62-35*Math.sin(turn*Math.PI)],[0,83]],'#eadcb8','#b6a77f');for(let k=0;k<5;k++)line(c,[[-109,-28+k*18],[-19,-9+k*18]],'#829070',1.2);c.restore();
 text(c,'讲授',492,315,31,C.gold,'center');text(c,'辩论',960,315,31,C.paper,'center');text(c,'研读',1450,315,31,C.cyan,'center');foot(c,'中世纪大学的教学空间概念示意；课程、身份和学术自主存在地区差异');
}

function taika(c,t,p){
 // Registers and an administrative grid stand for gradual institutional reform.
 poly(c,[[215,646],[837,365],[1600,596],[1000,811]],'#61795d','#a4ad82');
 for(let row=0;row<5;row++)for(let j=0;j<7;j++){let x=375+j*125+row*86,y=575+row*35-j*39;c.save();c.globalAlpha=.2+.8*ease(p*2.2-(row*7+j)*.027);poly(c,[[x,y],[x+104,y-38],[x+173,y-12],[x+69,y+26]],(row+j)%3?'#7f9367':'#a3ac73','#c0bf8b',1);c.restore()}
 for(let i=0;i<12;i++){let x=520+(i%4)*218,y=534+Math.floor(i/4)*77;iso(c,x,y,35,29,22,['#c6c09a','#6b825f','#9caa7c'])}
 // Court is raised behind the countryside; no modern castle silhouette.
 rect(c,1128,424,470,52,'#b2a783','#d0bf96',3);for(let x of[1176,1257,1338,1419,1500])rect(c,x,318,17,108,'#a88361','#c6ad7f',2);roof(c,1366,312,555,105,'#667d6c');rect(c,1153,288,427,25,'#9f8964','#b6a27c',3);
 c.save();c.translate(349,363);c.rotate(-.06);material(c,-127,-93,254,190,C.paper,'#b7ab80');text(c,'户籍',0,-39,31,'#4c6854','center');for(let i=0;i<4;i++)line(c,[[-92,4+i*24],[92,4+i*24]],'#7f8d70',1.6);const stamp=ease((p-.25)*3);c.globalAlpha=stamp;rect(c,57,38,43,43,null,C.red,3);c.restore();
 const q=(t*.11)%1;line(c,[[647,315],[850,315]],'#83b6ad88',2);circle(c,647+q*203,315,5,C.cyan);text(c,'行政制度的调整',918,292,29,C.cyan,'center');text(c,'土地与户籍',810,798,28,C.gold,'center');foot(c,'大化改新及后续制度建设的概念示意；改革并非在645年一次全部完成');
}

function shogunate(c,t,p){
 line(c,[[960,292],[960,782]],'#6c8c7f55',1.5);
 // Kyoto court: shallow platform and layered eaves, not a later castle keep.
 rect(c,214,686,610,42,'#a19573','#d2bf93',3);for(let x=268;x<810;x+=94)rect(c,x,473,20,213,'#a28d68','#c0ae80',2);rect(c,254,487,537,25,'#9c8965','#c5b286',3);roof(c,523,471,689,126,'#546e61');rect(c,281,405,480,27,'#9c8864','#c2ae80',3);roof(c,523,401,560,83,'#6b7f67');for(let i=0;i<6;i++)rect(c,289+i*79,532,58,137,'#486b5e','#819a7b',3);
 text(c,'京都 · 天皇与朝廷',522,780,30,C.paper,'center');
 // Kamakura military government: residence and an armour silhouette.
 rect(c,1099,656,600,36,'#7f9075','#b7bd94',3);for(let x of[1140,1225,1310,1395,1480,1565])rect(c,x,485,19,171,'#99815d','#b9a576',2);roof(c,1398,479,681,115,'#74856b');for(let x of[1154,1345,1536])rect(c,x,516,87,135,'#486356','#96a581',4);
 for(let x of[1154,1536]){rect(c,x,516,87,135,'#213e38',null,4);const w=43*(1-ease(p*1.5));rect(c,x,516,w,135,'#64816b','#96a581',2);rect(c,x+87-w,516,w,135,'#64816b','#96a581',2)}
 c.save();c.translate(1402,565);const sway=Math.sin(t*.6)*.015;c.rotate(sway);poly(c,[[-50,-37],[50,-37],[67,65],[-67,65]],'#667d70','#c4b58b',2);for(let i=0;i<6;i++)line(c,[[-54-i, -22+i*14],[54+i,-22+i*14]],'#c0b18a',2);ellipse(c,0,-74,50,36,'#829180','#c3b58b');poly(c,[[-70,-60],[70,-60],[56,-85],[-56,-85]],'#6c806e',C.gold,2);line(c,[[-75,-19],[-115,100]],'#b7ac81',5);line(c,[[75,-19],[115,100]],'#b7ac81',5);c.restore();
 text(c,'镰仓 · 武士政权',1400,780,30,C.gold,'center');
 text(c,'朝廷延续',522,286,28,C.muted,'center');text(c,'军事统治兴起',1400,286,28,C.cyan,'center');foot(c,'幕府与朝廷关系的概念示意；政权形成有过程，不将二者画成现代国界');
}

function americas(c,t,p){
 // Three independent cultural regions, not a single empire or synchronous origin.
 const reveal=ease(p*2);for(let x of[380,960,1530])ellipse(c,x,735,244,35,'#102c31');
 // Maya stepped temple and a small calendrical wheel.
 for(let i=0;i<7;i++){const stage=ease(p*2.7-i*.14),w=372-i*43,y=716-i*40+(1-stage)*30;c.save();c.globalAlpha=.2+.8*stage;poly(c,[[380-w/2,y],[380+w/2,y],[380+w/2-22,y-38],[380-w/2+22,y-38]],i%2?'#819985':'#a5ad8e','#bec5a3',1.5);c.restore()}rect(c,336,405,88,38,'#b5bc9a','#d2cfac',2);for(let j=0;j<17;j++)line(c,[[357,709-j*15],[403,709-j*15]],'#dacda5',2);
 c.save();c.translate(372,323);c.rotate(t*.035);circle(c,0,0,53,'#294d48','#bdc49a',3);ticks(c,0,0,43,20,'#d7caa4');circle(c,0,0,23,null,C.gold,2);c.restore();
 // Aztec urban island and causeways, not its exact plan.
 ellipse(c,960,646,231,105,'#286276','#5d9299');poly(c,[[794,627],[953,547],[1138,626],[971,698]],'#8ba58b','#bdc9a5');for(let i=0;i<14;i++){const x=832+i%5*49,y=619+Math.floor(i/5)*25,h=(20+12*(i%2))*(.2+.8*ease(p*2-i*.05));iso(c,x,y,29,22,h,['#b3b99b','#597869','#879b7a'])}
 for(let k=0;k<4;k++){const w=130-k*24,y=602-k*32;poly(c,[[960-w/2,y],[960+w/2,y],[960+w/2-12,y-30],[960-w/2+12,y-30]],'#a9b392','#ced0aa')};line(c,[[749,663],[875,657]],'#a9bfa6',12);line(c,[[1049,661],[1191,701]],'#a9bfa6',12);for(let i=0;i<6;i++){let q=(t*.04+i/6)%1;circle(c,755+q*118,663-q*6,2,C.gold)}
 // Inca terraces climb a mountain, with masonry and a path.
 poly(c,[[1286,720],[1524,299],[1761,720]],'#597869','#89a18b');for(let i=0;i<7;i++){let y=704-i*44,w=417-i*46;const stage=ease(p*2.3-i*.13);c.save();c.globalAlpha=.25+.75*stage;poly(c,[[1525-w/2,y],[1525+w/2,y],[1525+w/2-19,y-24],[1525-w/2+19,y-24]],i%2?'#8ca17e':'#aab18a','#bdc1a0');line(c,[[1525-w/2+6,y-22],[1525+w/2-6,y-22]],'#c0c59e',2);c.restore()}
 for(let i=0;i<4;i++){let x=1466+i%2*57,y=519+Math.floor(i/2)*41;iso(c,x,y,39,30,35,['#b7b797','#647e6a','#98a387'])}
 labels(c,[['玛雅 · 城市与历法',380],['阿兹特克 · 湖城',960],['印加 · 山地农业',1530]],795);foot(c,'美洲不同社会的概念场景；建筑与历法图案均非具体遗址或实物复刻');
}

function manufactory(c,t,p){
 // Preindustrial manual production. There is deliberately no steam power or drive belt.
 rect(c,184,742,1558,35,'#6b765e','#aeb18c',3);
 for(let x of[225,1703])rect(c,x,303,26,438,'#7e7757','#b9a373',3);rect(c,205,285,1540,29,'#9a875e','#cfb27a',3);for(let x=305;x<1700;x+=260)line(c,[[x,313],[x-70,366]],'#9d8860',10);
 // Hand-operated spinning wheel at left.
 wheel(c,472,555,132,t*1.4,C.gold,12);line(c,[[471,555],[570,746]],'#a59061',12);line(c,[[471,555],[373,746]],'#a59061',12);rect(c,650,557,20,155,'#a68b5c','#c4ad7a',3);ellipse(c,660,548,40,19,'#d3c7a2','#a79973');line(c,[[491,425],[659,535]],C.paper,1.5);person(c,711,658,.82,C.paper,Math.sin(t*.7)*.2);rect(c,673,682,88,15,'#8e805b','#b5a472',2);text(c,'手工纺纱',455,796,28,C.gold,'center');
 // Upright loom: the shuttle moves while the frame stays on its feet.
 for(let x of[872,1296])rect(c,x,351,25,386,'#947c55','#c6a978',3);rect(c,857,346,479,26,'#af986b','#d1b582',3);rect(c,862,708,468,27,'#af986b','#d1b582',3);
 for(let i=0;i<37;i++){const x=901+i*10.3;line(c,[[x,375],[x,706]],i%2?'#d5c6a1':'#92b3a5',1.4)}
 const barY=507+Math.sin(t*2.1)*22;rect(c,896,barY,390,15,'#b8a16f','#e0c58d',2);const shuttleX=909+(.5+.5*Math.sin(t*3.2))*328;rect(c,shuttleX,barY+23,43,12,'#ae7655',C.gold,4);line(c,[[898,barY+29],[shuttleX,barY+29]],C.paper,1.2);rect(c,899,606,388,96,'#7ea397','#c2c6a0',1);for(let j=0;j<12;j++)line(c,[[902,613+j*7],[1284,613+j*7]],'#bad0b4',1.4);text(c,'手工织造',1095,796,28,C.cyan,'center');
 // Cloth rolls and a written account express expanded production organization.
 rect(c,1435,617,236,27,'#9f8d62','#c7b07e',3);for(let i=0;i<4;i++){let y=603-i*27;rect(c,1452,y-19,194,25,i%2?'#9fa98c':'#bcb795',null,10);ellipse(c,1457,y-6,8,12,'#566e5d','#c4c5a1')}
 for(let x of[1448,1648])rect(c,x,641,15,99,'#968660','#c1ac7b',2);c.save();c.translate(1534,438);c.rotate(-.08);material(c,-89,-66,178,132,C.paper,'#b7a780');for(let i=0;i<5;i++)line(c,[[-62,-41+i*20],[62,-41+i*20]],'#728263',1.5);c.restore();text(c,'扩大生产',1550,796,28,C.paper,'center');
 foot(c,'西欧手工生产与工场发展的概念场景；工场手工业和机器工厂不是同一阶段');
}

export const cultureScenes={egypt_calendar,caste,buddhism,agora,frankish,feudal,town_charter,university,taika,shogunate,americas,manufactory};
