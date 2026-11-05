from pathlib import Path
import zipfile,hashlib,json,shutil
ROOT=Path(__file__).resolve().parents[1]
shutil.copy2(ROOT/'captions.md',ROOT/'output/captions.md')
source=['package.json','package-lock.json','tsconfig.json','remotion.config.ts','requirements-audio.txt','README.md','HISTORY_SOURCES.md','ASSET_LICENSES.md','narration.md','captions.md','subtitles.srt','src','scripts','data','docs','assets','output/soundtrack.m4a','output/audio-provenance.json']
artifacts=['world-history-no-voice-1080p60.mp4','history-preview.mp4','map-preview.mp4','storyboard.png','timeline.png','validation.json','decode-validation.json','audio-provenance.json','render-plan.json','part-validation.json','keyframes']
def package(output,names):
 with zipfile.ZipFile(ROOT/'output'/output,'w') as z:
  for name in names:
   p=ROOT/name
   if not p.exists():raise FileNotFoundError(p)
   for f in ([p] if p.is_file() else sorted(p.rglob('*'))):
    if not f.is_file() or '__pycache__' in f.parts:continue
    if '/voice/' in str(f) or f.name in ('mix.m4a','narration.wav'):raise ValueError('Voice asset forbidden')
    compression=zipfile.ZIP_STORED if f.suffix in ('.mp4','.m4a','.png') else zipfile.ZIP_DEFLATED
    z.write(f,'world-history-silent/'+str(f.relative_to(ROOT)),compress_type=compression,compresslevel=1)
package('world-history-no-voice-source.zip',source)
package('world-history-no-voice-project.zip',source+['output/'+a for a in artifacts if a!='audio-provenance.json'])
files=['captions.md','world-history-no-voice-1080p60.mp4','history-preview.mp4','map-preview.mp4','storyboard.png','timeline.png','subtitles.srt','validation.json','decode-validation.json','audio-provenance.json','world-history-no-voice-source.zip','world-history-no-voice-project.zip']
lines=[]
for f in files:
 p=ROOT/'output'/f
 with p.open('rb') as stream:
  h=hashlib.file_digest(stream,'sha256').hexdigest()
 lines.append(f'{h}  {f}')
(ROOT/'output/SHA256SUMS.txt').write_text('\n'.join(lines)+'\n')
print(json.dumps({f:(ROOT/'output'/f).stat().st_size for f in files},indent=2))
