# 导演设计与地图证据边界

片名《600秒，看懂5000年世界历史》；主题 The World Is Changing / 世界从未停止变化。

影片把文明之间日渐扩大的联系作为叙事线索：河流支持城市；分工、记录和治理让更多人协作；帝国、宗教与商路连接远方；跨洋交流同时造成创造与灾难；工业生产重组劳动与生活，由此引出19世纪的社会运动与思想争论。每次地图缩放都应回答“哪里”“与谁相连”“为什么此时发生变化”。标题是画面的解释，不能代替事件动画。

## 数据与时间契约

- `data/shots.json`：72个镜头，12章每章6镜。每个镜头使用独立构图、地区焦点、比例与动画类型。`startFrame` 包含，`endFrame` 不包含；最后一镜结束于36000。最终成片的最后一帧编号为35999。
- `start` / `end` 是帧值除以60的秒数，制作与剪辑以整数帧为准。不会累计浮点误差。
- 25秒开场的6个短镜建立速度；全部镜头沿用已完成的72镜时间结构，本版字幕按完整镜头重新编辑，时长约3.02—10.70秒，开场后约6.23—10.70秒。72镜的整体平均为8.33秒。复杂事件允许在同一镜中分阶段展开。
- `yearStart` / `yearEnd` 是历史年代，不等同于影片时间。负数是公元前，正数是公元后；没有公元0年。当前年份插值在显示端跳过0年；它是压缩叙事的年代指示器，不是按连续日历精度重建的天文年序。
- 第7章回到14—16世纪，且以航路主题先讲1498年达·伽马、再回看1492年哥伦布；第9章与第8章并行，第11章与第10章并行。片头年份倒退与末尾时间总览属于明确的叙事回望。年份不会假装全片始终单调递增。
- `layers` 驱动地图层，`kind` 选择地图、地球或物件场景；`sceneKind` 连接程序化历史模型。`cameraMotion` 是运镜意图，`climax` 标记章节高潮候选。

## 十二章的视觉重心

| 章 | 时段 | 构图与高潮 | 概念连接 |
|---|---|---|---|
| 01 | 00:00—00:25 | 三维地球灯光熄灭、倒行数字、两河金色光点、城市钻入 | 五千年不是孤立年表 |
| 02 | 00:25—01:20 | 两河近景→农田与城市→泥板微距→金字塔→河流文明多点点亮 | 文明有多个起点 |
| 03 | 01:20—02:10 | 青铜贸易地图→旧网络断裂与铁器推广→腓尼基帆船→亚述及新巴比伦区域→波斯道路与治理→商周及奥尔梅克的全球对照 | 交换、征服与治理重组区域联系 |
| 04 | 02:10—03:05 | 希腊战场定位→亚历山大节点行进→罗马城市→孔雀王朝→秦汉→多分支欧亚网络 | 同时代有多个文明中心 |
| 05 | 03:05—04:00 | 罗马政治变化→476年西部统治结构终结→基督教联系地图→南亚知识与佛教陆海网络→中国分合→7世纪阿拉伯地区 | 政治边界变化，文化与信仰继续流动 |
| 06 | 04:00—04:55 | 唐宋城市→巴格达书页→印度洋帆船→全球多中心→多阶段蒙古区域→严肃疾病扩散 | 中世纪同样充满活动与代价 |
| 07 | 04:55—05:45 | 文艺复兴书页→印刷多中心→郑和帆船与港口网络→达·伽马绕非洲抵印度→哥伦布1492年大西洋航行→全球海路总览 | 航海连接既有社会，并为殖民扩张打开道路 |
| 08 | 05:45—06:35 | 美洲文明点→人口灾难→农作物交换→克制的强迫迁移路线→跨太平洋白银→宗教改革书页 | 交换具有创造性与破坏性 |
| 09 | 06:35—07:20 | 知识中心→哥白尼书页→行星轨道→数学规律→知识网络→机械齿轮 | 方法与制度共同改变知识 |
| 10 | 07:20—08:15 | 启蒙书页→北美东部→法国→海地→欧洲战役位置→机械化转场 | 权利承诺与制度争论 |
| 11 | 08:15—09:15 | 英国能源与交通→工厂剖面→活塞连杆飞轮→火车车轮→铁路网络→跨区域工业城市 | 机器改变生产与社会关系 |
| 12 | 09:15—10:00 | 工人生活场景→组织、改革与社会主义地图→1848伦敦《共产党宣言》→理论分析与争论书页→城市与工业时代回望地图→地球与1848结尾 | 从劳动关系变化引出社会运动，区分历史事实与理论主张 |

## 转场实施意图

1. **Time Rewind**：地球上城市灯光减弱，年代快速倒行，投影展开为平面地图。
2. **Map Dive**：摄像机连续向地理焦点推进，焦点转为建筑或模型的空间中心。
3. **Civilization Bloom**：按事件年代依次点亮文明中心；不把所有光点同时出现冒充同年。
4. **Empire Ink Spread**：区域分阶段显现，地理边缘保持软化并显示“概略示意”，不伪造测绘精度。
5. **Trade Route Follow**：画线进度、移动标记与摄影机沿已有节点链联动；多条丝路分支保留并行。
6. **Architecture Reveal**：地图城市节点放大为等距城市、金字塔或工厂剖面；返回时模型收束为地理光点。
7. **Battle Field Transition**：先定位有依据的战场，随后展开方向或位置关系；不能填充虚构战斗动作。
8. **Ocean Crossing**：船舶与地图航线共用位置方向；路线是概略航行方向，海面运动不能暗示现代航道。
9. **Knowledge Morph**：泥板纹、印刷块、书页与科学图形有连续几何展开，不靠全屏文字替换。
10. **Mechanical Transition**：轨道圆环进入齿轮，往复机构进入飞轮，再接到火车车轮。
11. **Industrial Expansion**：铁路依开通年代增加；城市工厂与灯光随后增长，保持地理位置逻辑。
12. **Book-to-World**：1848年书页文字散入地图网络，前3500年与1848年的点通过历史总览联系，灯光熄灭。

转场名称是数据接口；是否达到完整空间连续性须以实际渲染验收，不能仅凭字段数宣称完成。

## 路线的历史含义

`data/routes.json` 提供36条概略线路，均附来源和局限。城市坐标是用于地图定位的中心近似值；节点间曲线是动画路径，不是GIS重建、航海日志或逐日行军轨迹。

- 丝绸之路有河西走廊、塔里木南北缘、中亚、西亚与南亚分支，明确呈现转运和中介市场。参考[UNESCO丝绸之路说明](https://www.unesco.org/en/silk-roads/about-silk-roads)与[长安—天山廊道路网](https://whc.unesco.org/en/list/1442/)。
- 青铜贸易以[塞浦路斯铜锭与乌鲁布伦沉船证据](https://www.metmuseum.org/art/collection/search/248493)表示区域联系；不得宣称已知沉船完整航程。腓尼基线路参考[大都会博物馆专题](https://www.metmuseum.org/essays/the-phoenicians-1500-300-b-c)。
- 亚历山大两条征服线仅连接有历史依据的主要经过节点，参考[Encyclopaedia Iranica](https://www.iranicaonline.org/articles/alexander-the-great-356-23-bc/)。路线颜色、出场年代与节点连线应区别于贸易；图中不制作未知的战术动作。
- 佛教陆海联系参考[史密森尼丝路视觉艺术专题](https://festival.si.edu/2002/the-silk-road/visual-arts-of-the-historical-silk-road/smithsonian)；信仰路线是网络示意，不能视作宗教人口边界。
- 印度洋路线参考[Kilwa UNESCO遗产说明](https://whc.unesco.org/en/list/144/)及[OER Project印度洋贸易专题](https://www.oerproject.com/OER-Materials/OER-Media/HTML-Articles/AP-World-History/Unit2/Indian-Ocean-Trade-Routes)。季风、港口兴衰与路线变化均不能浓缩为一条永恒航线。
- 跨撒哈拉路线参考[大都会博物馆专题](https://www.metmuseum.org/essays/the-trans-saharan-gold-trade-7th-14th-century)与[OpenStax区域说明](https://openstax.org/books/world-history-volume-1/pages/9-4-north-africas-mediterranean-and-trans-saharan-connections)。金与盐不是全部贸易内容。
- 黑死病联系参考[OpenStax跨区域传播说明](https://openstax.org/books/world-history-volume-1/pages/16-3-the-black-death-from-east-to-west)。路线只能显示有文献联系的区域，不能声称已精确复原全部早期传播机制。
- 郑和的路线叠合多次航行及分队联系，参考[哥伦比亚大学Asia for Educators](https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm)。不把所有港口都表述为郑和本人亲至。
- 哥伦布首航参考[美国国会图书馆“Columbus and the Taíno”](https://www.loc.gov/exhibits/exploring-the-early-americas/columbus-and-the-taino)。终点取巴哈马概略位置，首次登陆岛具体识别有争议；必须强调原住民社会已经存在。欧洲沿非洲与达·伽马路线参考[德国历史博物馆航海专题](https://www.dhm.de/archiv/ausstellungen/neue-welten/en/entdeckungsreisen.html)。
- 强迫迁移线路参考[SlaveVoyages数据库](https://www.slavevoyages.org/voyage/trans-atlantic)。没有采用虚构船次与人数；所有标记保持克制，不使用轻松跳动、金币奖励或人被当作货物的图标。
- 哥伦布大交换参考[DPLA原始资料集](https://www.dp.la/primary-source-sets/the-columbian-exchange)。不能把全部美洲人口下降归结为一个因素。
- 跨太平洋白银参考[大都会博物馆马尼拉大帆船贸易](https://www.metmuseum.org/essays/the-manila-galleon-trade-1565-1815)。`silver-pacific`跨日期变更线，绘制时须使用地理路径或拆分，避免179°到−179°反向扫过欧洲。大西洋白银的区域联系参考[PNAS银流通研究](https://pmc.ncbi.nlm.nih.gov/articles/PMC3107326/)。
- 铁路参考[Historic England斯托克顿—达灵顿研究](https://historicengland.org.uk/whats-new/research/a-brief-overview-of-the-stockton-and-darlington-railway/)、[科学博物馆利物浦—曼彻斯特档案](https://archives.sciencemuseumgroup.ac.uk/Details/archive/110016690)及[伦敦—伯明翰铁路公司藏品说明](https://collection.sciencemuseumgroup.ac.uk/people/ap108/london-birmingham-railway-co)。线路是城市节点示意，不是历史铁路测绘。

来源用于历史事实核实；未复制这些网站的地图图像、照片或文章文本。项目的海岸线许可及所有疆域来源另见 `HISTORY_SOURCES.md`。

## 必须通过的画面验收

在每章起点、高潮和结束前取样，共至少36张关键帧；总览不能只展示72个近似构图的地图缩略图。场景须可辨认泥板、帆船、工厂与机械；字幕安全区不能遮挡核心地域。战争、贸易、宗教、疾病和工业必须在颜色之外还有形态区别。音乐、字幕与画面使用同一个全局帧时间，分段拼接不重新归零。

镜头结构与路线数据的完整性不等于电影级美术质量已获保证。静态图、运动样片和完整预览都必须检查；没有实际输出的分辨率、帧率、音轨与转场不能在交付说明里宣称完成。
