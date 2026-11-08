import {C,TAU,clamp,ease,lerp,text,line,poly,rect,circle,ellipse,arrow,iso,person,foot,material} from './draw.mjs';

// Original conceptual illustrations. Decorative strokes never reproduce or invent legal text.
function crown(c,x,y,k=1,color=C.gold){c.save();c.translate(x,y);c.scale(k,k);poly(c,[[-76,35],[-91,-39],[-43,-5],[0,-66],[43,-5],[91,-39],[76,35]],color,'#f1dca4',2);rect(c,-76,28,152,24,'#9b7951',color,5);for(let a of[-1,0,1])circle(c,a*85,a? -42:-70,8,color);for(let i=0;i<5;i++)circle(c,-54+i*27,40,4,i%2?C.red:C.paper);c.restore()}
function columns(c,x,y,w,h,color='#a9ad98',n=6){rect(c,x-17,y-h-14,w+34,19,color,C.paper,1);poly(c,[[x-23,y-h-15],[x+w/2,y-h-78],[x+w+23,y-h-15]],'#8b9b87',C.gold,2);for(let i=0;i<n;i++){let a=x+i*(w-24)/(n-1);rect(c,a,y-h,24,h,color);rect(c,a-6,y-h,36,12,'#d2c9a8');rect(c,a-7,y-10,38,15,'#c7c5a5');for(let k=1;k<4;k++)line(c,[[a+k*5,y-h+16],[a+k*5,y-20]],'#607c70',1)}rect(c,x-20,y,w+40,15,'#a4ad95');rect(c,x-33,y+15,w+66,14,'#748b7e')}
function inkLines(c,x,y,w,n,p,col='#6c735d',step=15){for(let i=0;i<n;i++){let q=ease(p*1.7-i*.035);line(c,[[x,y+i*step],[x+w*(.72+((i*37)%29)/100)*q,y+i*step]],col,2)}}
function quill(c,x,y,ang=-.5){c.save();c.translate(x,y);c.rotate(ang);poly(c,[[0,0],[48,-89],[169,-125],[125,-27]],'#c6c9b0','#e8ddbb',2);line(c,[[0,0],[153,-114]],'#7a8f77',3);for(let i=1;i<9;i++)line(c,[[i*15,-i*11],[i*17+20,-i*12-29]],'#8f9f87',1);line(c,[[0,0],[-18,20]],C.gold,3);c.restore()}
function torch(c,x,y,k,t){c.save();c.translate(x,y);c.scale(k,k);poly(c,[[-22,0],[22,0],[10,179],[-10,179]],'#a17c4d',C.gold,2);ellipse(c,0,0,39,14,'#b18e58',C.gold);const wob=Math.sin(t*3)*9;poly(c,[[-25,-2],[-40,-43],[-19,-76],[-8,-118],[13+wob,-78],[36,-49],[24,-6]],C.orange);poly(c,[[-11,-3],[-20,-40],[2,-79],[20,-38],[12,-1]],C.gold);c.restore()}

function hammurabi(c,t,p){
 const rise=ease(p*2),x=635,y=800;c.save();c.translate(x,y+(1-rise)*140);
 let g=c.createLinearGradient(-190,0,190,0);g.addColorStop(0,'#1b3034');g.addColorStop(.47,'#435254');g.addColorStop(1,'#10262d');c.beginPath();c.moveTo(-190,0);c.lineTo(-177,-405);c.bezierCurveTo(-165,-570,155,-570,176,-405);c.lineTo(194,0);c.closePath();c.fillStyle=g;c.fill();c.strokeStyle='#8e9a8b';c.lineWidth=3;c.stroke();
 ellipse(c,0,-410,145,108,null,'#77877c');line(c,[[-124,-330],[121,-330]],'#a6ab90',2);
 // Two schematic relief figures signal authority; they are not an attempted artifact facsimile.
 person(c,-77,-349,1.1,'#b0b298',0);rect(c,46,-405,62,61,'#708579','#adb19a',3);circle(c,54,-460,17,'#b1b39b');poly(c,[[40,-437],[73,-437],[88,-362],[31,-362]],'#a5ac91');line(c,[[61,-425],[1,-397],[-39,-407]],'#a9ae94',7);line(c,[[57,-353],[106,-353]],'#a1a88c',7);line(c,[[105,-353],[107,-318]],'#a1a88c',5);
 for(let r=0;r<18;r++)for(let col=0;col<12;col++){if((r*12+col)/216>clamp(p*1.8))continue;let xx=-135+col*23,yy=-286+r*15;line(c,[[xx,yy],[xx+12,yy+2]],'#a6a98b',1.2);poly(c,[[xx+4,yy-2],[xx+9,yy],[xx+4,yy+3]],'#a6a98b')}
 c.restore();
 text(c,'法律刻上石碑',1265,320,35,C.gold,'center',true);const balanceY=489,tilt=.105;line(c,[[1265,412],[1265,665]],C.gold,9);poly(c,[[1210,688],[1320,688],[1290,662],[1240,662]],'#a89262',C.gold,2);line(c,[[1080,balanceY-22],[1450,balanceY+22]],C.gold,7);for(let side of[-1,1]){let bx=1265+side*165,by=balanceY+side*20;line(c,[[bx,by],[bx-62,by+121]],'#d2bb81',2);line(c,[[bx,by],[bx+62,by+121]],'#d2bb81',2);c.beginPath();c.ellipse(bx,by+121,65,15,0,0,Math.PI);c.strokeStyle=C.gold;c.lineWidth=5;c.stroke();person(c,bx,by+103,.75,side===-1?C.paper:C.muted,0)}
 text(c,'身份不同，规定不同',1265,751,30,C.paper,'center');foot(c,'石碑与法律等级关系为概念示意；《汉谟拉比法典》并非最早法律');
}

function roman_republic(c,t,p){
 const cx=960,cy=646;c.save();c.translate(cx,cy);c.scale(1,.54);for(let row=5;row>=0;row--){let r=245+row*70;c.beginPath();c.arc(0,0,r,Math.PI,TAU);c.lineWidth=40;c.strokeStyle=row%2?'#7d8c7d':'#a1a893';c.stroke();for(let j=0;j<22;j++){let a=Math.PI+(j+.5)/22*Math.PI;circle(c,Math.cos(a)*r,Math.sin(a)*r-12,5,C.gold)}}ellipse(c,0,0,245,166,'#596e63','#adba9e');c.restore();
 for(let side of[-1,1]){let x=960+side*263,h=215*ease(p*2);rect(c,x-42,743-h,84,h,'#bec1a5','#e5d8b7');rect(c,x-55,728-h,110,22,'#d3c9a4');for(let j=0;j<4;j++)line(c,[[x-27+j*18,752-h],[x-27+j*18,721]],'#8c9c84',2);person(c,x,725-h,.73,C.paper,Math.sin(t)*.1);text(c,'执政官',x,787,27,C.gold,'center')}
 text(c,'元老院',960,285,33,C.gold,'center');for(let i=0;i<20;i++){let a=Math.PI+(i+.5)/20*Math.PI,x=cx+Math.cos(a)*558,y=cy+Math.sin(a)*285;person(c,x,y,.55,i%3?C.paper:C.muted,Math.sin(t+i)*.08)}
 text(c,'共和国的权力分配',960,603,31,C.paper,'center');foot(c,'政治机构的空间关系为概念化表达，非元老院建筑复原');
}

function twelve_tables(c,t,p){
 columns(c,340,724,1240,359,'#546f68',12);rect(c,272,752,1380,27,'#b6bda0');rect(c,225,782,1470,18,'#708b7d');
 for(let i=0;i<12;i++){let col=i%6,row=Math.floor(i/6),q=ease(p*2.5-i*.06),x=355+col*205,y=346+row*177+(1-q)*83;c.save();c.globalAlpha=q;let g=c.createLinearGradient(x,y,x+173,y+144);g.addColorStop(0,'#c5a777');g.addColorStop(.5,'#8a7655');g.addColorStop(1,'#b89f72');rect(c,x,y,173,144,g,'#e0c799',6);for(let k=0;k<4;k++)circle(c,x+16+(k%2)*141,y+15+Math.floor(k/2)*114,3,'#5a5843');text(c,String(i+1).padStart(2,'0'),x+85,y+27,21,'#334c45','center');inkLines(c,x+27,y+59,120,5,clamp(p*2.5-i*.06),'#464e3c',13);c.restore()}
 for(let i=0;i<15;i++)person(c,350+i*88,803,.49,i%3?C.paper:C.cyan,Math.sin(t*.5+i)*.08);foot(c,'十二块铜表的公开展示为概念示意；刻痕不对应法条原文');
}

function justinian(c,t,p){
 ellipse(c,990,770,746,36,'#00000035');
 const titles=['法典','学说汇纂','法学阶梯','后续新律'];for(let i=0;i<4;i++){let x=1035+i*150,h=322+(i%2)*55,y=764;c.save();c.translate(x,y);c.rotate(.035*(i-1.5));rect(c,-56,-h,112,h,'#5e7164','#bfba8c',4);rect(c,-45,-h+12,90,h-24,'#bfac7b','#d5c693',3);for(let j=0;j<5;j++)line(c,[[-48,-h+50+j*51],[48,-h+50+j*51]],'#7d825f',2);text(c,titles[i],0,-h/2,26,'#344f45','center',true);c.restore()}
 for(let i=0;i<5;i++){let q=(t*.1+i*.19)%1,xx=lerp(330,910,q),yy=lerp(350+i*77,540+i*21,q),w=190*(1-q*.55);c.save();c.translate(xx,yy);c.rotate(-.1+q*.25);rect(c,0,0,w,83,'#d4c8a4','#b6a47a',5);ellipse(c,0,42,14,42,'#b8a67c','#e0c99b');ellipse(c,w,42,12,42,'#b8a67c','#e0c99b');inkLines(c,20,21,w-36,4,1,'#7b8268',14);c.restore()}
 text(c,'法律文献的整理与编纂',590,286,31,C.gold,'center');text(c,'汇编 · 保存 · 传承',1331,308,31,C.cyan,'center');arrow(c,[757,743],[926,743],C.gold,3);foot(c,'查士丁尼时代法学汇编概念图；“新律”继续形成于534年以后');
}

function english_revolution(c,t,p){
 const y=720;rect(c,305,y-40,470,40,'#675f4e',C.gold,4);rect(c,350,y,380,35,'#465c53');crown(c,540,442+55*Math.sin(t*.35),1.2);text(c,'王权',540,651,31,C.gold,'center');
 for(let row=0;row<4;row++){let width=500+row*35,x=1240-width/2,yy=453+row*70;poly(c,[[x,yy],[x+width,yy],[x+width+23,yy+27],[x-23,yy+27]],row%2?'#6d7861':'#8d8c6a','#b5af86');for(let j=0;j<7;j++)person(c,x+40+j*(width-80)/6,yy-12,.5,C.paper,Math.sin(t+j+row)*.2)}text(c,'议会',1240,760,31,C.cyan,'center');
 const dates=['1640','1649','1660','1688'];for(let i=0;i<4;i++){let xx=373+i*392;circle(c,xx,302,7,i<=p*4?C.gold:'#42605b');if(i<3)line(c,[[xx+12,302],[xx+380,302]],'#607c71',2);text(c,dates[i],xx,267,23,C.muted,'center')}
 const q=ease(p*1.25);poly(c,[[846,546],[937,515],[937,536],[1040,536],[1040,558],[937,558],[937,579]],'#8bb1a1');text(c,'反复的政治斗争',960,806,27,C.paper,'center');foot(c,'王权与议会关系的概念示意；革命经历共和国、复辟与1688年政变');
}

function bill_rights(c,t,p){
 poly(c,[[350,805],[811,378],[1120,378],[1572,805]],'#536b60','#829780');for(let side of[-1,1])for(let row=0;row<5;row++){let xx=960+side*(285+row*56),yy=423+row*70,w=124+row*9;rect(c,xx-w/2,yy,w,36,'#745f46','#aa9467',4);for(let k=0;k<3;k++)person(c,xx-w/3+k*w/3,yy-6,.48,C.paper,Math.sin(t+k)*.12)}
 crown(c,960,370,.66);const q=ease(p*2);c.save();c.globalAlpha=q;rect(c,815,461,290,227,null,C.cyan,12);rect(c,798,476,18,195,C.cyan);rect(c,1104,476,18,195,C.cyan);text(c,'议会同意',960,576,36,C.paper,'center',true);c.restore();
 for(let i=0;i<3;i++){let x=720+i*240,y=754;circle(c,x,y,36,'#264a49',C.gold,2);text(c,['征税','军队','立法'][i],x,y,25,C.gold,'center');let u=(t*.18+i*.3)%1;circle(c,lerp(x,960,u),lerp(y,640,u),3,C.cyan)}foot(c,'《权利法案》限制王权；君主立宪制度在后续政治实践中继续发展');
}

function american_war(c,t,p){
 poly(c,[[182,755],[881,424],[1745,721],[1100,851]],'#304f48','#647f6c');
 for(let i=0;i<3;i++){let x=350+i*225,y=635-i*34;poly(c,[[x-96,y+80],[x,y-85],[x+123,y+42]],'#b9b894','#e2d2aa',2);poly(c,[[x,y-85],[x+124,y+42],[x+170,y+23]],'#7d8b71');line(c,[[x,y-88],[x,y+38]],'#736d4c',3)}
 rect(c,1135,506,388,161,'#647b6b','#a1ad8c',3);for(let i=0;i<10;i++)rect(c,1122+i*44,486,28,45,'#8c9d7e');for(let i=0;i<4;i++)rect(c,1167+i*95,555,18,37,'#203b3c');poly(c,[[1300,667],[1300,583],[1360,583],[1360,667]],'#172f35');
 for(let i=0;i<14;i++)person(c,783+i*56,766-i%3*19,.47,i%2?C.paper:'#8daaa0',t*.7+i);line(c,[[1000,515],[1000,759]],C.gold,4);let ww=Math.sin(t*1.2)*7;poly(c,[[1001,519],[1092,532+ww],[1092,590+ww],[1001,575]],'#647f86','#bfd0b5');
 text(c,'1775 · 战争开始',431,328,29,C.paper,'center');text(c,'1781 · 约克镇',961,328,29,C.gold,'center');text(c,'1783 · 承认独立',1480,328,29,C.cyan,'center');foot(c,'军营与防御工事为概念场景，不复原某次战斗或虚构行军路线');
}

function independence(c,t,p){
 ellipse(c,1030,774,610,42,'#00000030');c.save();c.translate(1130,525);c.rotate(-.035);material(c,-315,-246,630,492,'#e1d5b6','#a99a71');text(c,'独立宣言',0,-157,48,'#3f5c51','center',true);text(c,'1776',0,-78,54,'#94754b','center',true);inkLines(c,-233,0,480,8,p,'#758067',25);c.restore();
 for(let i=0;i<13;i++){let a=-Math.PI/2+i/13*TAU,r=193,x=484+Math.cos(a)*r,y=549+Math.sin(a)*r,q=ease(p*2.2-i*.055);c.save();c.globalAlpha=q;circle(c,x,y,28,'#6a5346',C.gold,2);circle(c,x,y,19,null,'#c0a177',1);line(c,[[x-9,y],[x+9,y]],C.gold,2);c.restore()}
 text(c,'十三个殖民地',484,538,30,C.gold,'center');text(c,'宣布独立',484,586,27,C.paper,'center');quill(c,1480+Math.sin(t*.8)*55,653+Math.cos(t*.7)*16,-.3);foot(c,'宣言排版与印章为原创示意；不将独立等同于所有人立即获得平等权利');
}

function constitution(c,t,p){
 const points=[[960,427],[470,690],[1450,690]],labels=['立法','行政','司法'];
 const edges=[[0,1],[1,2],[2,0]];for(let i=0;i<edges.length;i++){let[a,b]=edges[i],A=points[a],B=points[b],dx=B[0]-A[0],dy=B[1]-A[1],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,px=-uy,py=ux;
 for(let direction of[-1,1]){let start=direction===1?A:B,end=direction===1?B:A,k=direction*15;let aa=[start[0]+(end[0]-start[0])*.25+px*k,start[1]+(end[1]-start[1])*.25+py*k],bb=[start[0]+(end[0]-start[0])*.75+px*k,start[1]+(end[1]-start[1])*.75+py*k];arrow(c,aa,bb,direction>0?C.cyan:C.gold,2);let q=(t*.25+i*.25+(direction+1)*.2)%1;circle(c,lerp(...[aa[0],bb[0],q]),lerp(...[aa[1],bb[1],q]),4,direction>0?C.cyan:C.gold)}}
 points.forEach(([x,y],i)=>{c.save();let q=.85+.15*ease(p*2-i*.15);c.translate(x,y);c.scale(q,q);ellipse(c,0,59,202,43,'#274b49','#799b82');columns(c,-122,15,244,95,'#b1b99e',i===0?6:4);text(c,labels[i],0,100,31,C.paper,'center');c.restore()});
 text(c,'分权与制衡',960,601,38,C.gold,'center',true);foot(c,'美国1787年宪法的制度结构示意；奴隶制与参政资格限制仍然存在');
}

function bastille(c,t,p){
 const x=520,y=752,w=893,h=285;poly(c,[[370,769],[1450,769],[1630,829],[240,829]],'#324d46');
 // Four rear towers are occluded by the curtain wall, then four foreground towers.
 function tower(xx,yy,hh,back){rect(c,xx-53,yy-hh,106,hh,back?'#536d61':'#95a18a','#c4c7a7',3);ellipse(c,xx,yy-hh,55,13,back?'#688273':'#b4bba0','#d2cbac');for(let k=0;k<5;k++)rect(c,xx-48+k*21,yy-hh-19,13,25,back?'#7c9480':'#b3b99b');for(let k=0;k<3;k++)rect(c,xx-8,yy-hh+64+k*69,15,29,'#28413f')}
 for(let i=0;i<4;i++)tower(x-17+i*255,y-78,324,true);
 rect(c,x,y-h,w,h,'#788576','#bec0a3');for(let i=0;i<40;i++){let yy=y-h+30+(i%8)*31,xx=x+22+Math.floor(i/8)*178+(i%2)*23;line(c,[[xx,yy],[xx+155,yy]],'#4c665b',1)}
 for(let i=0;i<4;i++)tower(x+44+i*255,y,332,false);
 const open=ease((p-.25)*1.5),gateX=950;rect(c,gateX-66,617,132,135,'#183235',null,56);poly(c,[[gateX-66,640],[gateX-66+60*(1-open),637],[gateX-66+60*(1-open),752],[gateX-66,752]],'#4f5745',C.gold);poly(c,[[gateX+66,640],[gateX+66-60*(1-open),637],[gateX+66-60*(1-open),752],[gateX+66,752]],'#4f5745',C.gold);
 for(let i=0;i<28;i++){let xx=373+i*44,yy=805+(i%3)*9;person(c,xx,yy,.48,i%4?C.paper:C.cyan,Math.sin(t+i)*.25)}text(c,'1789年7月14日',960,292,33,C.gold,'center');foot(c,'巴士底狱与市民为概念化场景；不虚构具体战斗过程');
}

function rights_man(c,t,p){
 torch(c,470,484,1.42,t);c.save();c.translate(1110,513);c.rotate(.025*Math.sin(t*.4));
 const gold='#b9a271';for(let side of[-1,1]){let xx=side*195;c.beginPath();c.moveTo(xx-171,269);c.lineTo(xx-171,-126);c.bezierCurveTo(xx-171,-271,xx+171,-271,xx+171,-126);c.lineTo(xx+171,269);c.closePath();c.fillStyle='#b9c0a2';c.fill();c.strokeStyle='#e3d3aa';c.lineWidth=4;c.stroke();text(c,side<0?'自由':'法律',xx,-108,42,'#37544b','center',true);inkLines(c,xx-123,-32,245,11,p,'#738168',23)}
 line(c,[[0,-161],[0,266]],'#4d6a5b',6);c.restore();
 const spread=ease(p*1.7);for(let i=0;i<8;i++){let yy=340+i*56,x=690+spread*60;line(c,[[548,yy+88],[x,yy+65]],C.gold+'65',1.5)}foot(c,'《人权宣言》为象征性设计；权利宣称与现实中的排除仍需区分');
}

function napoleon_code(c,t,p){
 const cx=920,cy=555,open=.7+.3*ease(p*2);c.save();c.translate(cx,cy);c.rotate(-.07);let w=245*open;
 poly(c,[[-w-22,-190],[0,-162],[w+22,-190],[w+22,223],[0,245],[-w-22,223]],'#505f53',C.gold,2);poly(c,[[-w,-184],[0,-155],[0,230],[-w,208]],'#c7bea0','#e5d4ab');poly(c,[[0,-155],[w,-184],[w,208],[0,230]],C.paper,'#cab78a');text(c,'民法典',w/2,-80,37,'#4b5a48','center',true);text(c,'1804',w/2,-10,51,'#746341','center',true);for(let i=0;i<13;i++)line(c,[[-w+29,-134+i*24],[-26,-116+i*24]],'#8f8e6e',1.4);inkLines(c,27,42,w-58,5,p,'#84876a',25);c.restore();
 // Three distinct civil-life objects draw into the book; no fabricated quotation is shown.
 const q=ease(p*1.7);c.save();c.translate(390,491);rect(c,-105,-32,210,173,'#617f70',C.gold,3);poly(c,[[-136,-32],[0,-142],[136,-32]],'#96a386',C.paper,2);rect(c,-30,47,60,94,'#27443e');for(let side of[-1,1])rect(c,side*63-19,5,38,39,'#b7c7a8');c.restore();text(c,'财产',390,721,28,C.gold,'center');
 rect(c,1383,362,224,244,'#c8c6a5',C.paper,5);inkLines(c,1411,399,171,6,p,'#657d64',23);circle(c,1495,568,29,'#9d6754',C.gold,2);poly(c,[[1475,588],[1472,649],[1495,633],[1518,649],[1515,588]],'#a46a55');text(c,'契约',1495,719,28,C.gold,'center');
 arrow(c,[570,558],[645,558],C.cyan+'aa',2);arrow(c,[1340,558],[1265,558],C.cyan+'aa',2);for(let i=0;i<4;i++){let v=(t*.22+i*.25)%1;circle(c,570+v*76,558,3,C.cyan);circle(c,1340-v*76,558,3,C.cyan)}foot(c,'民事法律制度的概念示意；法典保护财产，也保留性别不平等');
}

function international(c,t,p){
 c.save();c.translate(960,597);ellipse(c,0,67,600,142,'#3e5048','#9ba58b');ellipse(c,0,47,600,142,'#8d7c5c','#c9b488');rect(c,-85,0,170,83,'#baa87d',C.gold,3);text(c,'1864',0,41,33,'#40594e','center',true);c.restore();
 for(let i=0;i<15;i++){let a=Math.PI+(i+.5)/15*Math.PI,x=960+Math.cos(a)*654,y=612+Math.sin(a)*246;person(c,x,y,.91,i%4?C.paper:C.cyan,Math.sin(t+i)*.16);if(i%3===0){let yy=y-73-12*Math.sin(t*.8+i);rect(c,x-23,yy,46,57,'#ccc8a7','#e6d5aa',3);line(c,[[x-23,y-24],[x-23,yy+38]],C.paper,4)}}
 for(let i=0;i<5;i++){let x=600+i*170,y=704;rect(c,x-53,y-30,106,48,'#d2c6a0','#a8996c',3);inkLines(c,x-39,y-15,75,3,clamp(p*2-i*.12),'#7b8568',10)}
 text(c,'伦敦 · 国际工人协会',960,255,30,C.gold,'center',true);text(c,'工人组织之间的合作',960,802,29,C.cyan,'center');foot(c,'会议为概念场景，不虚构人物肖像、发言或具体座次');
}

function commune(c,t,p){
 // Paris is represented without the Eiffel Tower, which was not built until 1889.
 for(let i=0;i<13;i++){let x=210+i*119,h=112+(i*41)%96,y=586;rect(c,x,y-h,109,h,'#536d64','#81987e',2);poly(c,[[x-3,y-h],[x+53,y-h-39],[x+112,y-h]],'#74897a');for(let row=0;row<3;row++)for(let k=0;k<4;k++)rect(c,x+12+k*24,y-h+19+row*38,10,19,'#aec1a0');}
 // A generic municipal facade anchors the working assembly, not a later Paris monument.
 columns(c,755,566,415,165,'#98a58d',7);rect(c,902,314,122,80,'#879b81','#bec6a6',3);circle(c,962,352,24,'#cfcaac');line(c,[[962,352],[962,337]],'#506c5b',3);line(c,[[962,352],[978,356]],'#506c5b',3);
 for(let row=0;row<3;row++)for(let i=0;i<6;i++){let xx=285+i*142+(row%2)*41,yy=784-row*40;iso(c,xx,yy,120,34,38,['#939478','#505f4e','#707e64'])}
 for(let i=0;i<16;i++)person(c,320+i*83,650+(i%3)*25,.64,i%3?C.paper:C.red,Math.sin(t+i)*.12);
 line(c,[[1425,334],[1425,747]],C.gold,5);let v=Math.sin(t*1.5)*9;poly(c,[[1428,340],[1625,352+v],[1625,444+v],[1428,432]],'#aa655a','#d39b83',2);for(let j=0;j<5;j++)line(c,[[1450+j*32,345],[1453+j*32,433]],'#b87d6845',1);
 text(c,'1871 · 巴黎公社',1260,798,34,C.gold,'center');foot(c,'街垒、市政建筑与群众为概念场景；革命及其镇压造成沉重伤亡');
}

export const lawScenes={hammurabi,roman_republic,twelve_tables,justinian,english_revolution,bill_rights,american_war,independence,constitution,bastille,rights_man,napoleon_code,international,commune};
