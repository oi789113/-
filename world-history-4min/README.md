# 四分钟，看世界如何连接

从约公元前3500年的两河流域，到1848年《共产党宣言》发表。**240秒、1920×1080、60FPS、14,400帧；没有背景音乐、配音或任何音轨。**

[下载完整视频](https://github.com/oi789113/-/releases/download/world-history-4min-v3/world-history-4min-1080p60.mp4) · [全部资源](https://github.com/oi789113/-/releases/tag/world-history-4min-v3)

这次重新编排为40个5—7秒的镜头，删去重复展开的书页、重复齿轮和重复的大幅帆船段落。25种场景构图与15个地理构图交错：灌溉聚落、泥板记账、金字塔、青铜器与石雕、剧场、水渠、反刻雕版、天文仪器、季风航船、透视绘画、活字压印、天体轨道、工厂传动、蒸汽机构、铁路、城市、工人诉求及思想研究。

全部画面由新版代码重新绘制，没有导入旧版视频片段。海岸线改用Natural Earth 1∶5000万自然地理数据。字幕按新节奏重新撰写，每镜两行，最快约5.5个汉字/数字每秒；叙事不依赖旁白。最后一册展开的书籍用于1848年的结尾，其他文献采用不同的场景动作和构图。

## 文件

- `world-history-4min-1080p60.mp4`：完整H.264母片，字幕已烧录，另含默认关闭的中文软字幕轨，无音轨。
- `history-preview.mp4`：完整4分钟的640×360、30FPS预览，无音轨。
- `map-preview.mp4`：地图与场景切换的短片。
- `storyboard.png` / `timeline.png`：40镜总览与240秒时间轴。
- `subtitles.srt` / `captions.md`：新字幕与阅读脚本。
- `world-history-4min-source.zip`：可复现代码、地图和历史数据。
- `world-history-4min-project.zip`：源码、视频、预览、分镜与验收报告。

## 运行

需要Node.js 22+、Python 3.11+、FFmpeg/FFprobe和Noto Sans/Serif CJK SC字体。

```bash
npm ci --ignore-scripts
python scripts/story.py
node scripts/sync-public.mjs
npm run studio
```

Remotion选择 `WorldHistoryFourMinutes`。浏览器与原生渲染共用 `src/film.mjs`、`src/scenes.mjs` 和 `src/map.mjs`。没有任何音频组件。

完整渲染：

```bash
node scripts/frames.mjs
node scripts/render-all.mjs
node scripts/finalize.mjs
python scripts/package.py
```

`render-all.mjs` 使用两个工作进程按12章输出，再按绝对帧编号拼接。缓存检查绘图代码与镜头数据摘要。修改地图原始数据、渲染脚本或字体后，请清除 `output/parts/` 旧缓存。`--chapter 10` 可仅重绘第10章，适用于修改确实只影响该章的情况；首次完整渲染不能用它跳过其他章节。

快速测试：

```bash
node scripts/render.mjs --shot steam --width 640 --fps 30 --output output/steam-test.mp4
node scripts/render.mjs --still 205 --width 960 --output output/steam.png
npm run validate
```

## 数据与质量检查

`data/story.json` 决定40镜的时间、构图、字幕、历史事件和来源。每个镜头只显示选定的事件，不再累积整章的历史标记。`data/events.json`、`routes.json`、`empire-regions.json` 保留有来源的资料库；没有伪造精确的古代国界。镜头对应的来源见 `story.json`，资料索引见 [HISTORY_SOURCES.md](HISTORY_SOURCES.md)。

地理底图仅作位置背景，不复原古海岸线。所有历史范围与路线均为概略联系；建筑、器物和机械为原创概念场景，不是考古复原。蒙古节点按资料中的阶段出现，黑死病示意使用已有资料中的港口节点，铁路插图按利物浦—曼彻斯特的实际经纬度定位。

验收检查实际文件的分辨率、时长、帧数、帧率及**音轨数量为零**；对40镜各采两帧，排除标题和字幕后检查画面运动、重复图像和相邻构图差异。完整视频通过一次全片解码生成预览。这些检查不等于对艺术审美或历史解释的学术审定。

旧版世界史与吸盘作品均保留在同一GitHub仓库。
