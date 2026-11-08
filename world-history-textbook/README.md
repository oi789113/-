# 世界历史 · 教材脉络版

按用户提供的课本目录，梳理第1—21课：从约公元前3500年两河流域到1871年巴黎公社。**4分54秒、1920×1080、60FPS、17,640帧；无音乐、无配音、无任何音轨。**

[下载完整视频](https://github.com/oi789113/-/releases/download/world-history-textbook-v4/world-history-textbook-1080p60.mp4) · [预览与全部工程](https://github.com/oi789113/-/releases/tag/world-history-textbook-v4)

49个六秒镜头按教材七个单元组织。删除丝绸之路和贸易网络的专题段落，保留目录中的新航路与殖民掠夺。增加法典、封建制度、城市与大学、日本、阿拉伯帝国、非洲和美洲，以及英国革命、美国独立、法国大革命、第一国际和巴黎公社。逐课对应见 [CURRICULUM.md](docs/CURRICULUM.md)。

每镜右上方始终标明历史年代，底部固定两行分别说明“事件”和“意义”。字幕统一40像素，最长20字/行、最快5.5个汉字或数字每秒。MP4只保留一套烧录字幕，不含软字幕轨，避免播放器开启字幕后叠出两层。SRT单独提供；播放带烧录字幕的MP4时无需再加载。

法典依次采用石碑、公开铜表、法学文献汇编、议会制约王权、分权机构和民法场景。革命、排水系统、庄园、城市大学、武家政治和工厂等使用不同构图与动作；共37个独立历史场景及12个地图构图。画面由本版代码逐帧绘制，没有加速拼接旧版视频。

## 输出

- `world-history-textbook-1080p60.mp4`：完整H.264视频，294秒、60FPS，无音轨。
- `history-preview.mp4`：完整294秒的640×360、30FPS小预览，明确区别于60FPS母片。
- `map-preview.mp4`：14秒地图及场景转场样片。
- `storyboard.png` / `timeline.png`：49镜分镜与七单元时间轴。
- `subtitles.srt` / `captions.md`：与画面同步的字幕及带历史年代的阅读脚本。
- `world-history-textbook-source.zip`：代码、地理数据、历史资料和运行说明。
- `world-history-textbook-project.zip`：源码、成片、预览、关键帧及验证报告。

## 运行与渲染

需要Node.js 22+、Python 3.11+、FFmpeg/FFprobe，以及Noto Sans CJK SC和Noto Serif CJK SC字体。Remotion还需要Chromium，配置中默认使用`/usr/bin/chromium`；其他平台可调整`remotion.config.ts`。

```bash
npm ci --ignore-scripts
python scripts/story.py
node scripts/sync-public.mjs
npm run studio
```

Remotion选择`WorldHistoryTextbook`。预览和原生渲染共用`src/film.mjs`、`src/map.mjs`、`src/scenes.mjs`、`src/law-scenes.mjs`、`src/culture-scenes.mjs`。没有音频组件。预览前必须同步`public/`；浏览器若加载失败会明确报错，不输出空白成片。

完整制作：

```bash
node scripts/frames.mjs
node scripts/validate.mjs --preflight
node scripts/render-all.mjs
node scripts/finalize.mjs
python scripts/package.py
```

两个工作进程按七单元分段渲染，统一使用全局帧编号。各段校验帧数和时长后拼接，再用H.264压缩母片并解码全片生成预览。绘图代码、历史数据及地图资产的摘要控制缓存；修改字体或渲染脚本后应清理`output/parts/`。若只改一章，可用`--chapter 6`，首次必须完整渲染。

快速验证：

```bash
node scripts/render.mjs --shot hammurabi --width 960 --fps 30 --output output/law-test.mp4
node scripts/render.mjs --still 38 --width 960 --output output/harappa.png
npx remotion still src/index.tsx WorldHistoryTextbook output/browser.png --frame=1230 --scale=0.5
npm run typecheck
npm run validate
```

## 历史与地图

`data/story.json`定义49镜的课次、字幕、年代、历史意义和来源；`data/events.json`含55条本版事件或地点，`data/sources.json`列74条实际采用的资料。来源与争议说明见 [HISTORY_SOURCES.md](HISTORY_SOURCES.md)，重点复核记录见 [HISTORY_REVIEW.md](docs/HISTORY_REVIEW.md)。

不把法典误写成普遍平等，也不把政治革命等同于所有人立即获权。马克思与恩格斯的理论和政治主张明确归属他们，与可证实的出版、组织和运动事实区分。世界各地区的变化不被假设为同时发生或遵循完全一致的路径。

Natural Earth公共领域数据提供自然地理背景，不绘制现代国界，不冒充古代海岸线或精确帝国疆界。航海、军事、强迫迁移和铁路采用有来源的概略方向或节点；建筑、文物、人物和机构是原创概念场景。

自动验收检查实际时长、帧数、分辨率、帧率、编码、零音轨和零软字幕轨；核对49条SRT边界和文字，检查字幕实际字体宽度、21课覆盖、年代及来源，并排除标题字幕后比较各镜运动和相邻构图。49张关键帧另经人工式视觉复核；这些工程检查不等于艺术质量或学术争议的认证。

旧版世界史及吸盘作品保留在同一GitHub仓库。
