import fs from 'node:fs';
import {createCanvas} from '@napi-rs/canvas';
import {makeEngine,read} from './render.mjs';
const engine=makeEngine(),shots=read('data/shots.json');
fs.mkdirSync('output/keyframes',{recursive:true});
const canvas=createCanvas(960,540),ctx=canvas.getContext('2d');
const contact=createCanvas(1920,Math.ceil(shots.length/4)*304),cc=contact.getContext('2d');cc.fillStyle='#06111e';cc.fillRect(0,0,contact.width,contact.height);
for(let i=0;i<shots.length;i++){const s=shots[i],t=s.start+(s.end-s.start)*.57;ctx.save();ctx.scale(.5,.5);engine.render(ctx,t);ctx.restore();fs.writeFileSync(`output/keyframes/${s.id}.png`,canvas.toBuffer('image/png'));let x=i%4*480,y=Math.floor(i/4)*304;cc.drawImage(canvas,x,y,480,270);cc.fillStyle='#e9c47d';cc.font='16px sans-serif';cc.fillText(`${s.id}  ${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}  ${s.title}`,x+8,y+291);}
fs.writeFileSync('output/storyboard.png',contact.toBuffer('image/png'));
const timeline=createCanvas(1920,1080),c=timeline.getContext('2d');c.fillStyle='#071521';c.fillRect(0,0,1920,1080);c.fillStyle='#f3ead5';c.font='48px "Noto Serif CJK SC"';c.fillText('600秒，看懂5000年世界历史',90,110);c.font='22px sans-serif';c.fillStyle='#69c9cd';c.fillText('600 SECONDS  /  36,000 FRAMES  /  12 CHAPTERS  /  72 SHOTS',90,165);
for(let ch=1;ch<=12;ch++){const ss=shots.filter(s=>s.chapter===ch),y=218+(ch-1)*64,start=ss[0].start,end=ss.at(-1).end;c.fillStyle=ch>=11?'#de9153':'#e9c47d';c.font='20px "Noto Sans CJK SC"';c.fillText(`${String(ch).padStart(2,'0')}  ${ss[0].title}`,90,y+16);c.fillStyle='#203b46';c.fillRect(580,y,1240,28);c.fillStyle=ch>=11?'#de9153':'#69c9cd';c.fillRect(580+start/600*1240,y,(end-start)/600*1240,28);c.font='16px sans-serif';c.fillStyle='#f3ead5';c.fillText(`${start}s — ${end}s`,580+start/600*1240,y-8);}
fs.writeFileSync('output/timeline.png',timeline.toBuffer('image/png'));console.log('72 keyframes + storyboard + timeline generated');
