import {createCanvas,GlobalFonts} from '@napi-rs/canvas';
import {drawHistoricalScene,sceneNames} from '../src/scenes.mjs';
GlobalFonts.registerFromPath('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc','Noto Sans CJK SC');
const all=[];
for(const scale of [1,.5])for(const kind of sceneNames){const can=createCanvas(1920*scale,1080*scale),c=can.getContext('2d');c.scale(scale,scale);const start=performance.now();for(let i=0;i<30;i++){c.clearRect(0,0,1920,1080);drawHistoricalScene(c,{kind,t:3+i/60,p:.66});can.data()}const ms=(performance.now()-start)/30;all.push({kind,scale,ms:+ms.toFixed(1)});console.log(kind,scale,ms.toFixed(1),'ms/frame')}
console.log(JSON.stringify(all));
