import {createCanvas,GlobalFonts} from '@napi-rs/canvas';
import fs from 'node:fs';
import {drawHistoricalScene,sceneNames} from '../src/scenes.mjs';
GlobalFonts.registerFromPath('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc','Noto Sans CJK SC');
const out=createCanvas(1920,1080),c=out.getContext('2d');c.fillStyle='#071521';c.fillRect(0,0,out.width,out.height);
for(let i=0;i<sceneNames.length;i++){
  c.save();const x=(i%4)*480,y=Math.floor(i/4)*270;c.translate(x,y);c.scale(.25,.25);
  c.strokeStyle='#304852';c.strokeRect(0,0,1920,1080);
  drawHistoricalScene(c,{kind:sceneNames[i],t:3.3,p:.66});
  c.font='36px "Noto Sans CJK SC"';c.fillStyle='#f3ead5';c.fillText(sceneNames[i],82,130);
  c.font='25px "Noto Sans CJK SC"';c.fillText('镜头标题：历史进入空间',82,223);
  c.font='19px "Noto Sans CJK SC"';c.fillStyle='#9ba9ac';c.fillText('镜头 01 / 72',82,840);
  c.textAlign='right';c.fillText('地理底图：Natural Earth · 无现代国界',1825,840);
  c.textAlign='center';c.fillStyle='#06121e';c.fillRect(240,883,1440,70);c.fillStyle='#f3ead5';c.font='27px "Noto Sans CJK SC"';c.fillText('字幕安全区域：人类文明是一场不断扩大的连接。',960,926);
  c.restore();
}
fs.mkdirSync('output',{recursive:true});fs.writeFileSync('output/scene-contact.png',out.toBuffer('image/png'));
console.log('Rendered',sceneNames.length,'scenes with chrome / subtitle safety guides.');
