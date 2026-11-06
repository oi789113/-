from pathlib import Path
import zipfile,hashlib,json,shutil
R=Path(__file__).resolve().parents[1]
for n in ['subtitles.srt','captions.md']:shutil.copy2(R/n,R/'output'/n)
source=['package.json','package-lock.json','tsconfig.json','remotion.config.ts','README.md','HISTORY_SOURCES.md','ASSET_LICENSES.md','captions.md','subtitles.srt','src','scripts','data','docs','assets']
media=['world-history-4min-1080p60.mp4','history-preview.mp4','map-preview.mp4','storyboard.png','timeline.png','validation.json','decode-validation.json','render-report.json','keyframes']
def pack(name,inputs):
 with zipfile.ZipFile(R/'output'/name,'w') as z:
  for name in inputs:
   p=R/name
   if not p.exists():raise FileNotFoundError(p)
   for f in ([p] if p.is_file() else sorted(p.rglob('*'))):
    if not f.is_file() or '__pycache__' in f.parts:continue
    if f.suffix.lower() in ['.wav','.mp3','.m4a','.ogg','.flac']:raise ValueError('Audio asset forbidden')
    z.write(f,'world-history-4min/'+str(f.relative_to(R)),compress_type=zipfile.ZIP_STORED if f.suffix in ['.mp4','.png'] else zipfile.ZIP_DEFLATED,compresslevel=1)
pack('world-history-4min-source.zip',source);pack('world-history-4min-project.zip',source+['output/'+n for n in media])
names=media[:-1]+['subtitles.srt','captions.md','world-history-4min-source.zip','world-history-4min-project.zip'];lines=[]
for n in names:
 with (R/'output'/n).open('rb') as f:h=hashlib.file_digest(f,'sha256').hexdigest()
 lines.append(f'{h}  {n}')
(R/'output/SHA256SUMS.txt').write_text('\n'.join(lines)+'\n');print(json.dumps({n:(R/'output'/n).stat().st_size for n in names},indent=2))
