# 600秒，看懂5000年世界历史 · 无人声版

从约公元前3500年的两河流域早期城市，到1848年《共产党宣言》出版。完整12章、72个镜头、600秒、1920×1080、60FPS、36,000帧。

**本版没有旁白、对白、歌声或其他人声。** 叙事依靠动态地图、历史场景和72段重新编辑的两行中文字幕。音轨仅含原创程序化音乐与音效。

[GitHub 下载页面](https://github.com/oi789113/-/releases/tag/world-history-no-voice-v2) · [完整视频](https://github.com/oi789113/-/releases/download/world-history-no-voice-v2/world-history-no-voice-1080p60.mp4)

## 本版变化

- 保留完整历史跨度，没有缩减成近代史节选。
- 字幕按镜头完整呈现，不使用旧版语音的逐词断句；最快一段约每秒5.6个汉字/数字。
- 12类新增解释动画：灌溉、雕版、翻译研究、活字印刷、跨洋物种交换、日心体系、望远镜观测、启蒙讨论、织机传动、工业城市、思想形成、事实与理论的区分。
- 4个地图镜头增加沿已注明来源的路线运动的货包、帆船和列车图形。苦难与强迫迁移仍使用克制的地图语言。
- 移除旧版配音文件、语音合成脚本和人声混音。

## 下载内容

- `world-history-no-voice-1080p60.mp4`：完整视频，字幕已烧录；另附默认关闭的可选字幕轨。
- `history-preview.mp4`：640×360、30FPS全片预览，明确与60FPS母版区分。
- `world-history-no-voice-source.zip`：完整源码、数据和配乐文件。
- `world-history-no-voice-project.zip`：源码、完整视频、预览、分镜、字幕及验收报告。
- `subtitles.srt`、`captions.md`、`storyboard.png`、`timeline.png`、历史来源与许可文档。

## 本地运行

需要 Node.js 20+、Python 3、FFmpeg/FFprobe（含 libx264 和 libass）、Noto Sans/Serif CJK SC 字体。Linux示例：

```bash
npm ci --ignore-scripts
python scripts/build-edition.py
node scripts/sync-public.mjs
npm run studio
```

源码ZIP已附合成配乐；从Git仓库克隆者，请先运行下方的音频合成命令。

Remotion 中选择 `WorldHistoryNoVoice`。浏览器和命令行渲染共享 `src/engine.mjs` 与程序化场景模块。所有音频引用均指向 `soundtrack.m4a`。

完全重新渲染，不依赖旧版视频：

```bash
# 源码包已有 soundtrack.m4a；需要重新合成时运行：
pip install -r requirements-audio.txt
python scripts/audio.py
ffmpeg -y -i output/soundtrack.wav -af loudnorm=I=-20:TP=-2:LRA=9 -ar 48000 -c:a aac -b:a 192k -t 600 output/soundtrack.m4a
node scripts/render-edition.mjs
node scripts/finalize-edition.mjs
npm run validate
```

低成本测试：

```bash
node scripts/render.mjs --start 504.466667 --end 514.583333 --width 640 --fps 30 --preset preview --output output/loom-test.mp4
node scripts/frames.mjs
```

修改绘图代码或镜头数据后，先移除 `output/parts/` 旧渲染缓存；只改字幕时可继续复用画面段。

可选增量渲染：`node scripts/render-edition.mjs --reuse /path/to/original-master.mp4`。仅重用旧版中视觉未变的区间，16个修订镜头重新绘制。旧音轨从不导入输出；字幕带会完全重绘。每段按全片60FPS绝对帧编号截取，校验实际帧数后拼接。最终只映射独立合成配乐，字幕始终来自新版数据。

## 数据与验收

`data/events.json` 含93个有来源的历史事件；`shots.json` 驱动镜头；`routes.json` 与 `empire-regions.json` 驱动路线、城市及势力联系。`data/subtitles.json`、SRT与阅读脚本由 `scripts/build-edition.py` 同步生成。

验收核对分辨率、编码、真实帧率、36,000帧、600秒、12章、字幕覆盖与阅读速度，以及音乐来源。画面变化检查排除标题和字幕区域，防止仅换字冒充动画。最终转码同时执行全片视频解码；音轨另行解码并与纯配乐源比较。

Natural Earth 仅用于公共领域自然地理底图。历史影响范围采用带注释的城市联系与概略晕染，不宣称精确古代疆界。建筑、机器与场景都是程序化概念示意，不是考古复原；运动速度和物件数量不代表统计数据。历史取舍与视觉审美仍需要人工判断，自动检查不等于学术审定。

来源见 [HISTORY_SOURCES.md](HISTORY_SOURCES.md)，素材许可见 [ASSET_LICENSES.md](ASSET_LICENSES.md)，字幕叙事见 [captions.md](captions.md)。旧版世界史视频和吸盘项目保留在同一仓库。
