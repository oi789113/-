import fs from 'node:fs';
fs.mkdirSync('public/audio',{recursive:true});
for(const name of ['assets','data']){fs.rmSync('public/'+name,{recursive:true,force:true});fs.cpSync(name,'public/'+name,{recursive:true});}
if(fs.existsSync('output/mix.m4a'))fs.copyFileSync('output/mix.m4a','public/audio/mix.m4a');
