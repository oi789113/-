import fs from 'node:fs';fs.mkdirSync('public',{recursive:true});for(const n of['data','assets']){fs.rmSync('public/'+n,{recursive:true,force:true});fs.cpSync(n,'public/'+n,{recursive:true})}
