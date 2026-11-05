# 素材与许可

## 地理底图

Natural Earth 物理地理数据为公共领域。许可说明：https://www.naturalearthdata.com/about/terms-of-use/ 。本工程不使用现代国家行政边界。地形区域和河流为底图地理概略，不能当作古代河道与海岸线的精确复原。

|本地文件|来源|SHA-256|
|---|---|---|
|`assets/ancient-rivers.geojson`|https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_rivers_lake_centerlines.geojson|`64a0c6712f15762f47c38f2ece71a2a9871865ad4271cfcc4e4f53409c337039`|
|`assets/ne_110m_geography_regions_polys.geojson`|https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_geography_regions_polys.geojson|`4182af773bcc891f8ddbf4b34ac02e87f17b35456269695e07258cf0b4877ec9`|
|`assets/ne_110m_land.geojson`|https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson|`9e0729ee253ca7d7a5c4ae9395fb1902264c5377c52e224d13dd85010e2835d9`|
|`assets/ne_110m_rivers_lake_centerlines.geojson`|https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_rivers_lake_centerlines.geojson|`55aa4497405afc07cdc931b7fbe062c4d6693ba2a550c0d24899953f5d507c8d`|

`ancient-rivers.geojson` 为50m河流数据中按河名选出的幼发拉底河、底格里斯河、尼罗河、印度河、恒河等子集。原始数据的名称和坐标保留。下载日期：2026-11-04。线上master可能变化，请以随项目保存的文件及校验值为准。

## 插画、音乐与声音

`src/scenes.mjs` 中的矢量微缩场景、地图图形、`scripts/audio.py` 的配乐与音效为本项目程序化原创；未使用影视素材或音乐库。
中文语音使用实际外部神经语音服务合成，详见 `docs/VOICEOVER.md`；其服务条款仍适用，不声称语音模型本身归本项目所有。

## 字体和代码依赖

Noto Sans/Serif CJK 为系统字体，SIL Open Font License；https://github.com/notofonts/noto-cjk 。npm依赖许可以包内LICENSE为准，使用的Natural Earth数据与原创动画不改变依赖自身的许可。
## 无人声版更新

本版不包含配音、语音服务输出或旧混音。新增的 `src/visual-stories.mjs` 为本项目原创程序化动画。音乐与音效由 `scripts/audio.py` 的数学信号合成。
