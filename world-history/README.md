# 《600秒，看懂5000年世界历史》

GitHub下载：[视频与工程Release](https://github.com/oi789113/-/releases/tag/world-history-v1)。快速运行推荐下载 `world-history-source.zip`（含混音）或全量工程包；Git仓库中的源码不包含大型导出媒体。

原创数据驱动历史地图动画工程。主题：**The World Is Changing / 世界从未停止变化**。

影片以两河流域早期城市为起点，经过多中心文明、贸易与帝国、宗教、跨洋联系、科学、革命与工业社会，抵达1848年伦敦出版的《共产党宣言》。这是高度压缩的知识叙事，不是穷尽世界史的宣称。

## 交付文件

| 文件 | 内容 |
|---|---|
| `output/world-history-1080p60.mp4` | 高分辨率导出目标：原生1920×1080，60FPS，36000帧，600秒，H.264；最终是否完成请看 `output/validation.json` |
| `output/history-preview.mp4` | 全片低分辨率有声预览，640×360、**30FPS**，600秒，绝不冒充60FPS |
| `output/map-preview.mp4` | 10秒有声地图测试，640×360、30FPS，取全片25–35秒 |
| `output/storyboard.png` | 72镜分镜总览 |
| `output/timeline.png` | 600秒、12章时间轴 |
| `output/keyframes/` | 每个镜头的中段关键帧；各章开始、高潮和结尾均有实际场景样本 |
| `output/mix.m4a` | 600秒旁白、原创音乐及音效最终混音 |
| `output/narration.wav` | 72段真实中文语音，已按导演时槽时间匹配 |
| `subtitles.srt` | 根据实际语音服务词边界生成的简体中文字幕 |
| `narration.md` | 全部12章完整旁白 |
| `HISTORY_SOURCES.md` | 93事件、67来源及历史解释、地理精度的限制 |
| `docs/DIRECTOR.md` | 镜头与章节设计 |
| `docs/VOICEOVER.md` | 中文神经语音、实际字幕时间与原创音频生成流程 |
| `docs/QA.md`、`output/validation.json` | 自动验收结果与仍需人工审阅的范围 |

尚未生成的文件不会因出现在表格中而被视为已完成。验收脚本直接检查真实媒体，不信任命名或规格声明。

## 启动

Node.js 22+、FFmpeg 7+、Python 3.11+；Linux需安装 Noto CJK 字体。首次执行：

```bash
npm ci
node scripts/sync-public.mjs
npm run studio
```

Remotion Studio 里的 `WorldHistory` 与原生导出使用同一 `src/engine.mjs`、`src/scenes.mjs`，逐帧按全局时间求值。浏览器不是用来播放预先录制的地图截图。Studio使用 `public/audio/mix.m4a`；若更换音频/数据，请重跑 `sync-public.mjs`。可用本地 Chromium，不依赖远程浏览器。

```bash
npm run typecheck
node scripts/frames.mjs
node scripts/render.mjs --start 25 --end 35 --width 640 --fps 30 --preset preview --output output/map-preview-silent.mp4
node scripts/render.mjs --preset preview --width 640 --fps 30 --output output/history-preview-silent.mp4
node scripts/assemble.mjs --preview
```

完整1080p60分章渲染：

```bash
node scripts/render-chapters.mjs
# 两核可选：node scripts/render-parallel.mjs
npm run validate
```

每章调用独立Node进程，释放原生Canvas缓存；使用统一60FPS全局帧号和半开区间，章末不重复下一章首帧。拼接复制视频码流，最后一次性加入完整600秒音轨，避免音频重复或压缩边界缝隙。最终MP4还有12章导航和可选中文文本字幕轨，画面本身也烧录中文。

`render-chapters.mjs 6` 可从第6章继续；已有正常结束且时长、帧数正确的章文件可复用。修改引擎后，应删除受影响章文件重新渲染。

单章/单帧：

```bash
node scripts/render.mjs --chapter 11 --width 1920 --fps 60 --output output/chapter-11.mp4
node scripts/render.mjs --still 521 --width 1920 --output output/steam.png
```

标准Remotion导出替代路径（速度较慢）：

```bash
node scripts/sync-public.mjs
npx remotion render src/index.tsx WorldHistory output/remotion-1080p60.mp4 --concurrency=2
```

## 地图和动画架构

- `WorldMapEngine`：d3-geo Natural Earth投影、陆地、河流、地形区域、经纬网；没有现代政治国界。
- `HistoricalTimeline`：每镜历史时间和公元前/后标注，不显示公元0年。章节间存在明确的同时代回看，并非单调逐年年表。
- `CivilizationLayer`：真实事件坐标、渐亮城市、脉冲、避让标签。
- `EmpireExpansion`：资料支持的**核心城市网络**逐点亮起与局部墨晕。没有获得可靠许可的古代精确国界，所以没有伪造疆域多边形。它不能用于计算帝国面积。
- `WarAnimation`：有依据的战场位置与概略节点路线；不虚构战斗过程。
- `TradeRoutes`：36条多段网络，地中海、丝路、季风海域、撒哈拉、大西洋和铁路等分层显示；跨日期变更线安全拆分。强迫迁移、灾难不使用欢快货物图标。
- `CivilizationAchievements`、`HistoricalScene`：13类程序化场景，含罗马/两河城市变体、泥板、金字塔、青铜器、叶片手稿、书、帆船、行星、齿轮、织机、蒸汽连杆、火车、工人和小册子。
- `CameraRig`：每镜全球/地区平移缩放与持续推进；地图进入场景时主体从地理中心展开。
- `TransitionEngine`：知识线条、航海流线、建筑升起、战争交叉线、文明扩散、机械转轮等转场，与镜头变焦和物件放大组合。
- `VoiceoverTimeline`：实际配音cue字幕，单一全片音轨精确定位。

球形地球使用正射投影和光照式渐变，具有球面视觉但不是Three.js实体模型。场景是原创Canvas矢量微缩动画，并非写实三维重建。地图地形为概略物理区域与河流，不是高分辨率数字高程模型。不能把本工程称为已通过专业历史学者和影院发行级制作的最终审片。

## 数据编辑

`data/shots.json` 是72个镜头的最终导演数据；`startFrame/endFrame` 为60FPS半开区间，`start/end` 秒与配音时槽一致。`events.json` 有93个事件与不确定性字段；`routes.json` 有来源和近似说明；`empire-regions.json` 明确为MultiPoint城市网络而非多边形。历史注释见 `HISTORY_SOURCES.md`。

## 音频重建

```bash
python -m pip install -r requirements-audio.txt
python scripts/audio.py
python scripts/voiceover.py
```

需要在线语音服务可用；没有可用服务时不得把文字计划稿说成已完成旁白。本次使用 `zh-CN-YunxiNeural` 实际生成全部语音，保留词边界与语音片段。具体参数与再配音方式见 `docs/VOICEOVER.md`。词边界来自合成服务，尚未逐句人工听审，不声称采样级声学强制对齐。

## 许可与质量边界

Natural Earth物理数据为公共领域；源链接、下载校验值见 `ASSET_LICENSES.md`。程序化插画、音乐与音效为本项目原创；不借用影视配乐。神经语音来自外部服务，使用仍应遵守该服务条款。代码依赖各自许可证见锁文件及各依赖的LICENSE。CJK字体由系统Noto提供。

自动验收会检查600秒、36000帧、60FPS、H.264、音轨、章节、字幕、无0年、地理坐标、来源和镜头内部像素变化。它不能替代逐帧电影语言判断、专家对每条史实的审稿和整片人工听审；相关项目明确标为人工检查，不伪报通过。
