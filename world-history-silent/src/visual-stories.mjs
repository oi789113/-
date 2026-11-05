// Original explanatory animations for the edition without narration.
// All mechanisms, layouts and magnitudes are schematic, never reconstructions.
const C={bg:'#091c28',ivory:'#f3ead5',gold:'#e9c47d',cyan:'#69c9cd',orange:'#de9153',red:'#be695f',dim:'#344d54'};
const TAU=Math.PI*2,clip=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clip(x);return x*x*(3-2*x)};
function path(c,ps,color=C.cyan,w=3){c.beginPath();ps.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.stroke()}
function box(c,x,y,w,h,fill=C.dim,stroke=null,r=8){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}}
function dot(c,x,y,r,fill=C.gold){c.beginPath();c.arc(x,y,r,0,TAU);c.fillStyle=fill;c.fill()}
function txt(c,s,x,y,size=24,col=C.ivory,align='center'){c.font=`${size}px "Noto Sans CJK SC", sans-serif`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=col;c.fillText(s,x,y)}
function polygon(c,ps,fill){c.beginPath();ps.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill()}
function arrow(c,x,y,x2,y2,color=C.cyan){path(c,[[x,y],[x2,y2]],color,3);const a=Math.atan2(y2-y,x2-x);polygon(c,[[x2,y2],[x2-Math.cos(a-.5)*13,y2-Math.sin(a-.5)*13],[x2-Math.cos(a+.5)*13,y2-Math.sin(a+.5)*13]],color)}
function wheel(c,x,y,r,a,col=C.gold){c.save();c.translate(x,y);c.rotate(a);c.strokeStyle=col;c.lineWidth=7;c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();for(let i=0;i<8;i++){const th=i/8*TAU;path(c,[[0,0],[Math.cos(th)*r,Math.sin(th)*r]],col,5)}dot(c,0,0,11,col);c.restore()}
function person(c,x,y,color=C.ivory,s=1){c.save();c.translate(x,y);c.scale(s,s);dot(c,0,-44,8,color);path(c,[[0,-33],[0,-5]],color,11);path(c,[[-16,-12],[0,-30],[16,-12]],color,5);path(c,[[-12,16],[0,-6],[12,16]],color,5);c.restore()}
function book(c,x,y,s=1,col=C.ivory){c.save();c.translate(x,y);c.scale(s,s);polygon(c,[[-55,-42],[0,-34],[55,-42],[55,42],[0,50],[-55,42]],col);path(c,[[0,-34],[0,50]],C.dim,2);for(let i=0;i<5;i++){path(c,[[-43,-23+i*12],[-10,-17+i*12]],'#66766b',2);path(c,[[10,-17+i*12],[43,-23+i*12]],'#66766b',2)}c.restore()}
function footer(c,s){txt(c,s,1050,806,20,C.cyan)}
function panel(c){c.fillStyle=C.bg;c.fillRect(414,312,1260,475);c.strokeStyle='#486269';c.lineWidth=1;c.strokeRect(414,312,1260,475)}
function irrigation(c,t,p){
 panel(c);path(c,[[485,350],[570,430],[520,525],[575,620],[515,750]],'#277a90',49);
 for(let j=0;j<3;j++){const y=425+j*118;path(c,[[550,y],[790,y],[965,y+35]],'#3d9ca9',12);
 for(let n=0;n<6;n++){const x=570+((t*.18+n/6)%1)*350;dot(c,x,y,3,C.cyan)}
 for(let k=0;k<3;k++){const x=815+k*104;box(c,x,y+16,84,65,'#536944','#8a9a60');for(let n=0;n<5;n++){const xx=x+12+n*14,grow=ease(p*2-j*.15-k*.08);path(c,[[xx,y+70],[xx,y+70-grow*40]],C.gold,2);path(c,[[xx-6,y+56],[xx,y+63],[xx+6,y+54]],C.gold,2)}}}
 arrow(c,1150,560,1240,560,C.gold);const h=140*ease(p*2);box(c,1280,700-h,280,h,'#957c55',C.gold);polygon(c,[[1260,700-h],[1420,640-h],[1580,700-h]],'#c9b082');
 for(let i=0;i<4;i++)box(c,1310+i*61,668-h,35,30,'#baa478');
 const q=(t*.22)%1;box(c,1170+q*98,620,25,30,C.gold);person(c,1235,725,C.ivory,.8);
 txt(c,'河水',500,365,25,C.cyan);txt(c,'引水 · 农田',1000,360,27,C.gold);txt(c,'储粮 · 聚居',1420,747,27,C.gold);
 footer(c,'灌溉、储存与协作相互促进 · 工序示意');
}
function print(c,t,p,wood){
 panel(c);const phase=(t*.5)%1,down=Math.sin(phase*Math.PI)**4*90;
 box(c,820,710,560,32,'#756348',C.gold);box(c,860,350,28,360,'#9e8561');box(c,1310,350,28,360,'#9e8561');box(c,830,347,535,28,'#b29b70');
 path(c,[[1100,375],[1100,475+down]],C.gold,15);for(let i=0;i<12;i++)path(c,[[1086,390+i*7],[1113,400+i*7]],'#655a46',2);
 box(c,915,482+down,370,35,'#8f7756',C.gold);box(c,921,630,355,35,'#4c635d',C.gold);
 if(wood){for(let i=0;i<18;i++){const x=945+i%9*35,y=642+Math.floor(i/9)*10;path(c,[[x,y],[x+19,y]],C.ivory,3)}}
 else for(let i=0;i<18;i++){box(c,939+i%9*35,622+Math.floor(i/9)*15,27,14,'#9ea394');}
 let sheet=phase<.5?phase*2:1;box(c,530+sheet*400,603,335,23,C.ivory);if(phase>.6)for(let i=0;i<9;i++)path(c,[[955+i*31,610],[955+i*31,620]],'#56615c',3);
 for(let i=0;i<5;i++){const q=(t*.15+i*.2)%1;box(c,1390+q*160,650-q*130,145,80,'#ded4b7');for(let j=0;j<5;j++)path(c,[[1405+q*160,666-q*130+j*10],[1517+q*160,666-q*130+j*10]],'#7e806c',1)}
 if(!wood){['排字','上墨','压印'].forEach((s,i)=>{txt(c,s,630,410+i*65,27,C.gold);if(i<2)arrow(c,630,430+i*65,630,448+i*65,C.cyan)});}txt(c,'纸张进入',640,747,23);txt(c,'复制与传播',1470,747,23,C.cyan);
 footer(c,wood?'雕版工序概念示意 · 非机械压印设备复原':'欧洲印刷工序概念示意 · 并非印刷术的唯一发展路径');
 if(wood){ // A rubbing pad, not a European screw press, describes East Asian printing.
  c.fillStyle=C.bg;c.fillRect(810,330,560,280);box(c,865,530,480,75,'#665d47',C.gold);for(let i=0;i<24;i++){let x=888+i%12*37,y=548+Math.floor(i/12)*26;path(c,[[x,y],[x+17,y+4],[x+8,y+13]],C.ivory,2)}
  box(c,875,phase<.5?430+phase*190:525,465,45,C.ivory);box(c,905+Math.sin(t*2)*110+120,489,105,30,'#a48b60',C.gold);txt(c,'刻版 → 上墨 → 铺纸刷印',1050,395,26,C.gold);
 }
}
function translation(c,t,p){
 panel(c);const nodes=[[600,450,'不同语言的文献'],[1050,390,'翻译与讨论'],[1500,450,'数学与医学']];
 nodes.forEach(([x,y,s],i)=>{book(c,x,y,1.45,i===2?'#b8d2c9':C.ivory);txt(c,s,x,y+115,25,i===1?C.cyan:C.gold)});
 arrow(c,705,450,920,400);arrow(c,1170,400,1390,450);
 for(let k=0;k<7;k++){const q=(t*.12+k/7)%1,x=700+q*700;txt(c,['数','文','医','理','知'][k%5],x,625+Math.sin(q*TAU)*25,30,C.cyan)}
 txt(c,'阅读 → 比较 → 计算 → 新的问题',1050,735,31,C.gold);footer(c,'交流中的研究与创新 · 不是单向传递知识');
}
function crop(c,x,y,kind){c.save();c.translate(x,y);if(kind===0){c.fillStyle=C.gold;c.beginPath();c.ellipse(0,0,14,30,0,0,TAU);c.fill();for(let i=0;i<5;i++)path(c,[[-10,-20+i*10],[10,-20+i*10]],'#80673d',2);path(c,[[-18,25],[0,40],[18,8]],'#97b37f',5)}else if(kind===1){c.fillStyle='#b99a78';c.beginPath();c.ellipse(0,0,26,18,-.4,0,TAU);c.fill();for(let i=0;i<4;i++)dot(c,-13+i*8,Math.sin(i*2)*7,2,'#755b45')}else{box(c,-22,-8,46,22,C.ivory);path(c,[[16,-8],[25,-34],[41,-29]],C.ivory,10);path(c,[[-16,12],[-20,36]],C.ivory,5);path(c,[[15,12],[22,36]],C.ivory,5);path(c,[[-22,-4],[-35,10]],C.ivory,4)}c.restore()}
function exchange(c,t,p){
 panel(c);txt(c,'美 洲',610,380,40,C.gold);txt(c,'欧 洲 · 非 洲 · 亚 洲',1410,380,31,C.cyan);
 const rows=[['玉米',465,0],['马铃薯',575,1],['马',700,2]];
 for(const [name,y,kind] of rows){let right=kind<2;arrow(c,right?710:1390,y,right?1390:710,y,right?C.gold:C.cyan);for(let k=0;k<3;k++){const q=(t*.1+k/3)%1;crop(c,right?735+q*630:1365-q*630,y,kind)}txt(c,name,right?600:1510,y,26)}
 footer(c,'物种传播方向概略示意 · 疾病与强迫迁移另以严肃地图呈现');
}
function astronomy(c,t,p,telescope){
 panel(c);const cx=telescope?1230:1050,cy=550;
 if(telescope){c.save();c.translate(690,570);c.rotate(-.48);box(c,-170,-38,330,76,'#6b827f',C.gold);box(c,145,-52,32,104,'#d1c1a0');box(c,-190,-21,30,42,'#d1c1a0');path(c,[[180,-30],[420,-90]],C.cyan,2);path(c,[[180,30],[420,90]],C.cyan,2);c.restore();path(c,[[690,560],[640,730]],C.gold,9);path(c,[[690,560],[760,730]],C.gold,9);txt(c,'望远镜观测',675,770,25,C.cyan)}
 const scale=telescope?.61:1;
 c.save();c.translate(cx,cy);c.scale(scale,scale);
 for(let i=0;i<4;i++){const rx=130+i*95,ex=telescope?rx*.43:0,ry=rx*(telescope?Math.sqrt(1-.43**2)*.58:.5);c.strokeStyle='#688b8d';c.lineWidth=2;c.beginPath();c.ellipse(-ex,0,rx,ry,0,0,TAU);c.stroke();const a=t*(.45-i*.075)+i*1.5;dot(c,-ex+Math.cos(a)*rx,Math.sin(a)*ry,8+i*2,[C.gold,C.ivory,C.cyan,C.red][i]);}
 dot(c,0,0,31,C.gold);c.restore();
 txt(c,telescope?'观测资料 → 数学模型':'日心体系：重新安排天体的位置',1080,365,29,C.gold);
 footer(c,telescope?'太阳位于椭圆焦点 · 尺度与速度为示意':'科学模型仍须接受证据检验 · 轨道图为示意');
}
function rights(c,t,p){
 panel(c);box(c,865,362,360,385,'#dcd3b8','#f3ead5');txt(c,'公共讨论',1045,415,34,'#49564d');
 for(let i=0;i<10;i++)path(c,[[905,455+i*22],[905+245*ease(p*2-i*.035),455+i*22]],'#8a8c77',3);
 const nodes=[[595,430,'权利'],[590,670,'主权'],[1480,430,'法律'],[1485,670,'理性']];
 for(let i=0;i<nodes.length;i++){const [x,y,s]=nodes[i];c.strokeStyle=C.cyan;c.lineWidth=2;c.beginPath();c.arc(x,y,66+Math.sin(t+i)*3,0,TAU);c.stroke();txt(c,s,x,y,33,C.gold);const target=x<1000?865:1225;path(c,[[x+(x<1000?70:-70),y],[target,560]],'#5c8d90',2);let q=(t*.16+i*.2)%1;dot(c,x+(target-x)*q,y+(560-y)*q,5,C.cyan)}
 footer(c,'这些概念受到不同解释；政治参与并未立即向所有人开放');
}
function loom(c,t,p){
 panel(c);const a=t*1.6;wheel(c,610,555,132,a,C.cyan);for(let i=0;i<12;i++){const th=i/12*TAU+a;dot(c,610+Math.cos(th)*145,555+Math.sin(th)*145,7,'#86b7b5')}
 path(c,[[630,422],[1020,414]],C.gold,7);path(c,[[630,688],[1020,685]],C.gold,7);wheel(c,1020,550,135,a,C.gold);
 box(c,1210,390,375,322,'#344d50',C.gold);for(let i=0;i<23;i++){const x=1225+i*15;path(c,[[x,410],[x,690]],i%2?C.ivory:'#9e957c',2)}
 const yy=535+Math.sin(t*3)*30;box(c,1222,yy,350,20,'#6d796d',C.gold);const shuttle=1240+(Math.sin(t*5)+1)*145;box(c,shuttle,yy+24,45,13,C.orange);path(c,[[1223,yy+30],[shuttle+20,yy+30]],C.cyan,3);
 for(let i=0;i<17;i++){const y=600+((i*5+t*12)%85);path(c,[[1228,y],[1575,y]],'#d5bf8a',2)}
 arrow(c,803,555,850,555,C.gold);arrow(c,1155,555,1193,555,C.gold);txt(c,'水力',610,746,28,C.cyan);txt(c,'传动',1020,746,28,C.gold);txt(c,'织造',1400,746,28,C.orange);footer(c,'动力、传动与织造联动 · 纺织工序概念示意');
}
function urban(c,t,p){
 panel(c);for(let i=0;i<15;i++){const x=452+i*77,h=(85+(i*53)%230)*(.4+.6*ease(p*1.8-i*.035));box(c,x,699-h,61,h,i<7?'#546962':'#3b4e50','#829185',1);for(let r=0;r<Math.floor(h/40);r++)for(let k=0;k<2;k++)box(c,x+10+k*25,719-h+r*38,12,18,(i+r)%3?C.gold+'90':'#122b36',null,1)}
 for(let i=0;i<3;i++){const x=1210+i*147;box(c,x,360,25,339,'#485c5d');for(let j=0;j<6;j++){const q=(t*.11+j/6)%1;dot(c,x+10+q*140,345-q*120,8+q*28,'#a5b4ae'+Math.round((1-q)*45).toString(16).padStart(2,'0'))}}
 for(let i=0;i<23;i++){const q=(t*.045+i/23)%1;person(c,470+q*1120,746,i%3?C.ivory:'#9db6af',.45)}
 txt(c,'人口聚集',700,350,28,C.gold);txt(c,'城市增长，也带来新的压力',1080,775,25,C.ivory);footer(c,'房屋与人口为概念示意 · 不代表统计数量');
}
function ideas(c,t,p,analysis){
 panel(c);const titles=analysis?['历史变化','理论分析','政治主张']:['工业社会','研究与合作','1848 · 出版'];
 const desc=analysis?[['生产与劳动改变','工人组织和运动'],['生产关系','阶级与社会矛盾'],['《共产党宣言》','后世解释与争论']]:[['劳动条件','改革与社会主义方案'],['马克思 · 恩格斯','1840年代'],['《共产党宣言》','伦敦']];
 for(let i=0;i<3;i++){const x=470+i*405,u=ease(p*2.5-i*.2);c.save();c.globalAlpha=.25+.75*u;box(c,x,410,350,284,'#253d46',[C.cyan,C.gold,C.red][i]);txt(c,titles[i],x+175,455,31,[C.cyan,C.gold,C.red][i]);desc[i].forEach((s,j)=>txt(c,s,x+175,535+j*48,23));if(!analysis&&i===2)book(c,x+175,656,.47);c.restore();if(i<2){arrow(c,x+357,552,x+397,552,C.gold);dot(c,x+358+((t*.45+i*.2)%1)*35,552,5,C.ivory)}}
 txt(c,analysis?'事实、解释与主张，需要区分':'社会问题推动研究，也催生不同的政治方案',1050,755,28,C.ivory);
 footer(c,analysis?'这些思想持续产生影响，也存在不同理解与争论':'关系图为叙事概括 · 并非单一原因决定历史');
}
export const visualStoryKinds=['irrigation','woodprint','translation','press','exchange','heliocentric','telescope','rights','loom','urban','ideas','analysis'];
export function drawVisualStory(c,kind,t,p){if(!visualStoryKinds.includes(kind))return false;c.save();c.lineJoin='round';c.lineCap='round';switch(kind){case'irrigation':irrigation(c,t,p);break;case'woodprint':print(c,t,p,true);break;case'press':print(c,t,p,false);break;case'translation':translation(c,t,p);break;case'exchange':exchange(c,t,p);break;case'heliocentric':astronomy(c,t,p,false);break;case'telescope':astronomy(c,t,p,true);break;case'rights':rights(c,t,p);break;case'loom':loom(c,t,p);break;case'urban':urban(c,t,p);break;case'ideas':ideas(c,t,p,false);break;case'analysis':ideas(c,t,p,true);break;}c.restore();return true}
