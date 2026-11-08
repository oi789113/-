export const C={bg:'#07151e',deep:'#041018',sea:'#0d2836',land:'#31494b',gold:'#e9c47d',paper:'#efe4c9',cyan:'#76ced4',red:'#bc7068',orange:'#e5a065',green:'#839d79',muted:'#a9b6b2'};
export const TAU=Math.PI*2,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},lerp=(a,b,p)=>a+(b-a)*p;
const cache=new Map();
export function text(c,s,x,y,size=28,color=C.paper,align='left',serif=false){
 const font=`${size}px "Noto ${serif?'Serif':'Sans'} CJK SC", sans-serif`;c.font=font;c.textBaseline='middle';c.textAlign=align;c.fillStyle=color;
 if(typeof c.canvas?.data==='function'){
  let key=[s,font,color].join('|'),a=cache.get(key);
  if(!a){const width=c.measureText(s).width,cv=new c.canvas.constructor(Math.ceil(width+16),Math.ceil(size*1.7+12)),cc=cv.getContext('2d');cc.font=font;cc.textBaseline='middle';cc.fillStyle=color;cc.fillText(s,8,cv.height/2);const pix=cv.data(),rr=new c.canvas.constructor(cv.width,cv.height),rc=rr.getContext('2d'),im=rc.createImageData(cv.width,cv.height);im.data.set(pix);rc.putImageData(im,0,0);a={cv:rr,w:width};cache.set(key,a);if(cache.size>450)cache.delete(cache.keys().next().value)}
  c.drawImage(a.cv,x-8-(align==='center'?a.w/2:align==='right'?a.w:0),y-a.cv.height/2);return;
 }c.fillText(s,x,y);
}
export function line(c,pts,color=C.cyan,w=2){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.stroke()}
export function poly(c,pts,fill,stroke=null,w=1){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke()}}
export function rect(c,x,y,w,h,fill,stroke=null,r=0){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}}
export function circle(c,x,y,r,fill=null,stroke=null,w=2){c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke()}}
export function ellipse(c,x,y,rx,ry,fill,stroke=null){c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}}
export function arrow(c,a,b,color=C.cyan,w=3){line(c,[a,b],color,w);let th=Math.atan2(b[1]-a[1],b[0]-a[0]);poly(c,[b,[b[0]-15*Math.cos(th-.4),b[1]-15*Math.sin(th-.4)],[b[0]-15*Math.cos(th+.4),b[1]-15*Math.sin(th+.4)]],color)}
export function iso(c,x,y,w,d,h,colors=[C.gold,'#756446','#ab9162']){poly(c,[[x,y-h],[x+w,y-h-d*.4],[x+w+d*.65,y-h],[x+d*.65,y+d*.4-h]],colors[0]);poly(c,[[x,y-h],[x+d*.65,y+d*.4-h],[x+d*.65,y+d*.4],[x,y]],colors[1]);poly(c,[[x+d*.65,y+d*.4-h],[x+w+d*.65,y-h],[x+w+d*.65,y],[x+d*.65,y+d*.4]],colors[2]);}
export function person(c,x,y,scale=.6,color=C.paper,phase=0){c.save();c.translate(x,y);c.scale(scale,scale);circle(c,0,-43,8,color);line(c,[[0,-31],[0,-5]],color,11);line(c,[[-17,-8],[0,-28],[15,-8]],color,4);line(c,[[-10-Math.sin(phase)*5,20],[0,-6],[11+Math.sin(phase)*5,20]],color,5);c.restore()}
export function wheel(c,x,y,r,ang,col=C.gold,n=8){c.save();c.translate(x,y);c.rotate(ang);circle(c,0,0,r,C.deep,col,9);circle(c,0,0,r-10,null,col+'88',1);for(let i=0;i<n;i++){let a=i/n*TAU;line(c,[[0,0],[Math.cos(a)*(r-8),Math.sin(a)*(r-8)]],col,6)}circle(c,0,0,14,col);c.restore()}
export function shipIcon(c,x,y,scale=1,col=C.paper){c.save();c.translate(x,y);c.scale(scale,scale);poly(c,[[-19,6],[20,6],[12,15],[-12,15]],col);line(c,[[0,4],[0,-23]],col,2);poly(c,[[3,-22],[16,2],[3,2]],col);c.restore()}
export function grain(c,x,y,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);line(c,[[0,25],[0,-28]],C.gold,2);for(let i=0;i<5;i++){ellipse(c,-5,-24+i*9,6,3,C.gold);ellipse(c,5,-20+i*9,6,3,C.gold)}c.restore()}
export function foot(c,s,col=C.muted){text(c,s,960,833,18,col,'center')}
export function material(c,x,y,w,h,col,stroke=C.gold){rect(c,x,y,w,h,col,stroke,12);c.save();c.globalAlpha=.12;for(let i=0;i<75;i++){const px=x+((i*47)%101)/101*w,py=y+((i*37)%103)/103*h;line(c,[[px,py],[px+8,py+1]],stroke,1)}c.restore()}
