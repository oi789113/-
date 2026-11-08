# 素材与许可

本版没有音频素材、配音、TTS调用或背景音乐。

## 地理数据

Natural Earth自然地理数据为公共领域数据：<https://www.naturalearthdata.com/about/terms-of-use/>。

- `ne_50m_land.geojson`：1∶5000万陆地轮廓，来自Natural Earth维护者仓库 <https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_land.geojson>。
- `ne_110m_land.geojson`、`ne_110m_rivers_lake_centerlines.geojson`、`ne_110m_geography_regions_polys.geojson`：原项目保留的自然地理数据；本版主要陆地绘制使用50m版本。
- `ancient-rivers.geojson`：从Natural Earth河流数据中提取的两河、尼罗河、印度河等定位参考。文件名不表示古代河道的考古复原。

自然地理轮廓不用于冒充古代国家疆界。政治影响与传播联系只通过有来源的代表性节点、路线和注释表达。

## 绘图、文字与字体

所有场景、镜头、字幕和程序化动画均在本项目中编写，没有使用影视片段、博物馆图片或第三方插画。历史器物、文献和建筑的形态是概念化设计，不是特定文物的精确复刻。

字体使用系统Noto Sans CJK SC / Noto Serif CJK SC，适用SIL Open Font License；字体文件未打包，运行者须安装相应字体。

React、Remotion、d3-geo、Canvas绑定和FFmpeg遵循各自许可证；依赖版本固定在 `package-lock.json`。第三方历史资料仅作为事实与解释的参考，出处列于 `HISTORY_SOURCES.md`，未复制其图像或大段正文。
