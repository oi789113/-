# 历史资料、地图约定与核查记录

本项目把约前3500年至1848年的若干主线压缩为600秒，不宣称覆盖完整世界史。资料核对日期：2026-11-04。叙述为中文原创综合表述，没有复制博物馆长篇文字、现代史学著作或历史人物虚构对话。

## 数据与证据的用途

- `data/events.json`：93条事件；每条含年代、代表性坐标、章节、类别、解释、动画意图、来源、年代不确定标记和地图近似标记。
- `data/sources.json`：来源标题与原始链接；`data/build_events.py`可重建这两个文件。
- `data/empire-regions.json`：9组有依据的核心城市节点。**虽然文件名沿用引擎接口的 regions，geometryType 均为 MultiPoint，不是历史疆界。不能将 points 闭合成多边形。**
- 年份采用历史纪年：负数为公元前，正数为公元后，不设0年。跨越前1年到公元1年时必须跳过0。
- `dateDisputed=true`包括约略定年、过程性年代和有争议的时期划分，并非断言每一项都有两派针锋相对的学术争议。事件范围可以是本片讨论的时间窗口，不一定是整个政权或过程的全部存在年代。
- 所有 `approximateMap=true`：点为取整的代表性位置；光晕表示叙事关注区域。不得把半径、密度或光晕边缘解释为人口、行政控制、宗教占比或精确疆界。
- 史实（例如1687年出版）与解释（例如工业化的多种条件）、理论主张（例如《宣言》的阶级分析）分别陈述；不把理论当作自然科学定律。

## 历史地图的证据边界

底图只用于海岸、大陆、河流等自然地理。Natural Earth现代海岸/河流不能提供古代帝国边界；历史时期河道和海岸也可能变化。底图许可与下载版本由项目资产清单记录，Natural Earth总许可为[公共领域](https://www.naturalearthdata.com/about/terms-of-use/)。

本项目没有引入经逐年核实且许可明确的精确历史疆界矢量数据库。因此帝国层采用**已知受统治城市/行政中心的节点、克制的核心光晕及分阶段点亮**；标为「核心节点 · 概略示意」，不冒充疆域。节点间细线代表空间联系关系，不能冒充已证实的完整道路或军事行军轨迹。战争使用已核实战场点和有文献支持的大方向；资料不足时不画具体军队路线。贸易网络只表达主要港口/中转地区与方向，不表示一位商人从起点直达终点或统一固定道路。

城市坐标通常取已知遗址或现代城市邻近中心，精度为本片观看比例下的定位示意，不用于考古测绘。宗教传播是路线与交流区域，不能与政治边界等同。蒙古扩张分1206—1227、后继征服至1260、元1279等阶段，不合并成1206年瞬间取得的版图。

## 重要取舍与已修正的常见错误

1. 乌鲁克的城市化约前四千纪后期；泥板文字并非前3500年某一天完整发明。印度河成熟城市时期约前2600—1900年；中国早商约前1600年起；按不同时段出现。
2. 卡拉尔—苏佩作为早期美洲复杂社会例子；前3500—1500年画面不出现后来的印加帝国或古典玛雅城市。
3. 新巴比伦王国通常前626—539年；前612年是尼尼微陷落和地区霸权变化的标志，不能用作所有资料下无争议的建国年。
4. 波斯阿契美尼德时期约前550—330年；“从印度到希腊”是概括，不能据此沿现代国境造多边形。
5. 希波战争前490—479、伯罗奔尼撒战争前431—404；亚历山大前334年开始东征。罗马前27年为元首制标志，不暗示共和制度当天完全消失。
6. 汉代丝路为多段、多中介并有海路的网络；“丝绸之路”是后世术语，不画成中国直接到罗马的一条路。
7. 395年不是罗马首次分治；476年是西部皇帝统治结构结束的惯用标志，东罗马继续存在。
8. 650年大马士革是政治节点；成为倭马亚首都在661年，不能提前。政治征服不等于当地人口立即改宗。
9. 868年《金刚经》是现存有明确纪年的早期完整印本，不是印刷技术的最初发明。造纸西传不归因于怛罗斯战役后某一刻“突然获得秘密”。
10. 黑死病14世纪造成跨区域灾难；不将早期起源、具体路线和中国疫病身份全部定为已证实。没有采用争议较大的卡法“投尸导致欧洲瘟疫”作确定因果。
11. 郑和1405—1433年七次航行使用已有海上网络；1492年不是“发现无人知晓的大陆”。达·伽马只标1498年抵达印度，避免不一致的具体到达日。
12. 墨西加征服1519—1521涉及大量原住民盟友；印加皇帝1532年被俘与1533年进占库斯科是不同事件，抵抗延续更久。
13. 奴隶贸易用“强迫迁移”而非把人画成商品图标。SlaveVoyages全时段估计约1250万人登船、约1070万人抵达；该统计延续到19世纪，**不能放在1500—1700年的画面当作该两百年的小计**。本片不使用未经核对的区域人口损失精确数。
14. 马尼拉大帆船通常1565—1815年；本章取其至1700年的窗口，不能标为1700年结束。
15. 哥白尼1543、开普勒1609/1619、伽利略1609年后观测、牛顿1687；科学革命包含多人、仪器、通信与跨文化知识背景，不作为工业革命的单因解释。
16. 《独立宣言》1776年7月4日通过；不能说所有代表当天签字。海地革命1791—1804突出被奴役者的自主行动。
17. 瓦特1769年取得关键改进专利，蒸汽机此前已有；纺织机械、水力、工厂组织、能源、资本、原料与劳动关系共同变化。1830年利物浦—曼彻斯特铁路不称为世界第一条任何形式的铁路。
18. 工人生活和早期运动以议会/档案馆证据与当时观察互相参照。恩格斯著作具有明确立场，不能把单份观察无差别推广到全世界所有工厂。
19. 1844合作、1845—1846手稿、1847同盟委托、1848年2月伦敦德文初版相区分；《德意志意识形态》等后世发表不能倒置为当时已经公开传播。采用2月，不宣称存在完全无争议的精确出版日。
20. 《宣言》的分析、政治目标与后来各流派解释分开；工业资本主义的变化与工人运动不被描述为某一个理论自动实现的证明。

## 核心参考书（综合叙述背景）

- J. M. Roberts / Odd Arne Westad, *The History of the World*, Penguin：跨区域综合史。
- Peter N. Stearns et al., *World Civilizations: The Global Experience*：相互联系及多中心叙述。
- Jerry H. Bentley, Herbert F. Ziegler et al., *Traditions & Encounters*：跨文化贸易、宗教和交流网络。
- Robert C. Allen, *The British Industrial Revolution in Global Perspective*, Cambridge University Press, 2009：工业化多因素与全球背景。
- David McLellan, *Karl Marx: A Biography*；Stanford Encyclopedia条目：思想形成与解释争论。

以上是进一步校阅的出版物背景，不声称本次从云端读取了这些书的全文。下列在线机构/学术资料用于本次日期与重要事实核对。

## 在线资料索引

- **derwent** — [UNESCO — Derwent Valley Mills](https://whc.unesco.org/en/list/1030/)
- **earlyEgypt** — [Egyptian Ministry of Tourism and Antiquities — Early Dynastic Period](https://egymonuments.gov.eg/en/historical-periods/early-dynastic-period)
- **uluburun** — [Institute of Nautical Archaeology — Uluburun Shipwreck](https://nauticalarch.org/projects/uluburun-late-bronze-age-shipwreck-excavation/)
- **bologna** — [University of Bologna — Our History](https://www.unibo.it/en/university/who-we-are/our-history)
- **sixdynasties** — [The Met — China 1–500 CE](https://www.metmuseum.org/toah/ht/05/eac/)
- **suitang** — [The Met — China 500–1000 CE](https://www.metmuseum.org/toah/ht/06/eac.html)
- **americanWar** — [Library of Congress — American Revolution](https://www.loc.gov/classroom-materials/american-revolution/)
- **uruk** — [The Met — Uruk: The First City](https://www.metmuseum.org/essays/uruk-the-first-city)
- **writing** — [The Met — The Origins of Writing](https://www.metmuseum.org/essays/the-origins-of-writing)
- **egypt** — [UNESCO — Memphis and its Necropolis](https://whc.unesco.org/en/list/86/)
- **indus** — [The Met — South Asia, 8000–2000 BCE](https://www.metmuseum.org/toah/ht/02/ssa.html)
- **shang** — [The Met — Shang and Zhou Dynasties](https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china)
- **caral** — [UNESCO — Sacred City of Caral-Supe](https://whc.unesco.org/en/list/1269/)
- **bronze** — [The Met — Art of the First Cities](https://www.metmuseum.org/essays/art-of-the-first-cities-in-the-third-millennium-b-c)
- **phoenicia** — [The Met — Eastern Mediterranean and Syria 1000 BCE–1 CE](https://www.metmuseum.org/toah/ht/04/wae.html)
- **assyria** — [Encyclopaedia Iranica — Assyria](https://www.iranicaonline.org/articles/assyria-i/)
- **babylon** — [The Met — Mesopotamia 1000 BCE–1 CE](https://www.metmuseum.org/toah/ht/04/wam.html)
- **persia** — [The Met — The Achaemenid Persian Empire](https://www.metmuseum.org/essays/the-achaemenid-persian-empire-550-330-b-c)
- **olmec** — [The Met — Olmec Art](https://www.metmuseum.org/essays/olmec-art)
- **greece** — [The Met — Art of Classical Greece](https://www.metmuseum.org/essays/the-art-of-classical-greece-ca-480-323-b-c)
- **rome** — [The Met — Roman Art: A Resource for Educators](https://resources.metmuseum.org/resources/metpublications/pdf/Roman_Art_A_Resource_for_Educators.pdf)
- **maurya** — [The Met — Mauryan Empire](https://www.metmuseum.org/essays/mauryan-empire-ca-323-185-b-c)
- **han** — [University of Washington — Han Empire](https://depts.washington.edu/silkroad/exhibit/han/essay.html)
- **silk** — [UNESCO — About the Silk Roads](https://www.unesco.org/en/silk-roads/about-silk-roads)
- **buddhism** — [The Met — Buddhism and Buddhist Art](https://www.metmuseum.org/essays/buddhism-and-buddhist-art)
- **byzantium** — [The Met — Byzantium ca.330–1453](https://www.metmuseum.org/essays/byzantium-ca-330-1453)
- **gupta** — [Columbia University — South Asia 300–600 CE](https://afe.easia.columbia.edu/tps/300ce_sa.htm)
- **islam** — [The Met — Byzantium and Islam: Age of Transition](https://www.metmuseum.org/exhibitions/listings/2012/byzantium-and-islam)
- **china** — [Columbia University — China 1000 CE](https://afe.easia.columbia.edu/songdynasty-module/index.html)
- **abbasid** — [The Met — Art of the Abbasid Period](https://www.metmuseum.org/essays/the-art-of-the-abbasid-period-750-1258)
- **translation** — [Isis — Mobilities of Science: Era of Translation into Arabic](https://doi.org/10.1086/698236)
- **print** — [British Library IDP — Diamond Sutra](https://idp.bl.uk/discover/learning/buddhism-on-the-silk-roads/articles/buddhism-on-the-ground/buddhist-texts-the-diamond-sutra/)
- **mali** — [The Met — Trans-Saharan Gold Trade](https://www.metmuseum.org/essays/the-trans-saharan-gold-trade-7th-14th-century)
- **kilwa** — [UNESCO — Kilwa Kisiwani and Songo Mnara](https://whc.unesco.org/en/list/144/)
- **maya** — [University of California Santa Barbara — Classic Period Maya](https://www.marc.ucsb.edu/research/maya/ancient-maya-civilization/classic-period)
- **mongol** — [The Met — Art of the Ilkhanid Period](https://www.metmuseum.org/essays/the-art-of-the-ilkhanid-period-1256-1353)
- **plague** — [OpenStax / Rice University — Black Death from East to West](https://openstax.org/books/world-history-volume-1/pages/16-3-the-black-death-from-east-to-west)
- **plagueDebate** — [Medical History — Plague history and Mongol history](https://pmc.ncbi.nlm.nih.gov/articles/PMC11949646/)
- **renaissance** — [University of Toronto — Renaissance in Print](https://crrs.library.utoronto.ca/exhibits/show/vic449/vic449exhibit)
- **zheng** — [Columbia University — Ming Voyages](https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm)
- **columbus** — [Library of Congress — 1492: An Ongoing Voyage](https://www.loc.gov/exhibits/1492/)
- **gama** — [Portuguese Parliament — Vasco da Gama](https://www.parlamento.pt/VisitaParlamento/Paginas/BiogVascodaGama.aspx)
- **conquest** — [Library of Congress — Europe Claims America](https://www.loc.gov/exhibits/1492/eurocla.html)
- **america** — [Library of Congress — What Came to Be Called America](https://www.loc.gov/exhibits/1492/america.html)
- **exchange** — [Nunn and Qian — The Columbian Exchange](https://www.aeaweb.org/articles?id=10.1257/jep.24.2.163)
- **slavery** — [SlaveVoyages — Methodology](https://legacy.slavevoyages.org/blog/methodology-trans-atlantic)
- **silver** — [The Met — Manila Galleon Trade](https://www.metmuseum.org/essays/the-manila-galleon-trade-1565-1815)
- **reform** — [The Met — Central Europe 1400–1600](https://www.metmuseum.org/toah/ht/08/euwc.html)
- **science** — [NASA — Planetary Motion](https://science.nasa.gov/earth/earth-observatory/planetary-motion/)
- **newton** — [Oxford University — Newton Project Texts](https://newtonproject.ox.ac.uk/texts/introduction)
- **enlighten** — [Stanford Encyclopedia of Philosophy — Enlightenment](https://plato.stanford.edu/entries/enlightenment/)
- **declaration** — [US National Archives — Declaration of Independence](https://www.archives.gov/milestone-documents/declaration-of-independence)
- **france** — [Larousse — Révolution française](https://www.larousse.fr/encyclopedie/divers/R%C3%A9volution_fran%C3%A7aise/184321)
- **haiti** — [US Office of the Historian — Haitian Revolution](https://history.state.gov/milestones/1784-1800/haitian-rev)
- **napoleon** — [Fondation Napoléon — Timeline](https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/)
- **waterloo** — [National Army Museum — Battle of Waterloo](https://www.nam.ac.uk/explore/battle-waterloo)
- **steam** — [National Museums Scotland — Newcomen Engine](https://www.nms.ac.uk/discover-catalogue/the-newcomen-engine-and-its-role-in-britains-industrial-revolution)
- **watt** — [Historic Environment Scotland — James Watt](https://www.historicenvironment.scot/about-us/our-work/commemorative-plaques/explore/james-watt/)
- **engine** — [Science Museum Group — Rotative Steam Engine 1788](https://collection.sciencemuseumgroup.org.uk/objects/co50948/rotative-steam-engine-by-boulton-and-watt-1788)
- **rail** — [Science Museum Group — Liverpool and Manchester Railway](https://collection.sciencemuseumgroup.org.uk/people/ap48/liverpool-manchester-railway-co)
- **industrial** — [Science Museum — Steaming through the Centuries](https://blog.sciencemuseum.org.uk/steaming-through-the-centuries/)
- **factory** — [UK Parliament — 1833 Factory Act](https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/)
- **chartist** — [UK National Archives — What Was Chartism?](https://www.nationalarchives.gov.uk/education/teaching-resources/what-was-chartism/)
- **marx** — [Stanford Encyclopedia of Philosophy — Karl Marx](https://plato.stanford.edu/entries/marx/)
- **engels** — [Stanford Encyclopedia of Philosophy — Friedrich Engels](https://plato.stanford.edu/entries/engels/)
- **manifesto** — [Marx/Engels — Manifesto of the Communist Party, 1848](https://www.marxists.org/archive/marx/works/1848/communist-manifesto/)
- **iish** — [UNESCO — Marx-Engels documents, Memory of the World](https://www.unesco.org/en/memory-world/manifest-der-kommunistischen-partei-draft-manuscript-page-and-das-kapital-erster-band-karl-marxs)

## 事件—年代—来源对照

| 章节 | ID / 事件 | 本片年代 | 依据 |
|---|---|---|---|
| 01 | `rewind-uruk` 乌鲁克：时间旅程的起点 | 前3500—前3200 | uruk |
| 01 | `rewind-egypt` 尼罗河文明锚点 | 前3100—前2600 | egypt |
| 01 | `rewind-indus` 印度河文明锚点 | 前2600—前1900 | indus |
| 01 | `rewind-han` 欧亚交流锚点 | 前130—220 | silk、han |
| 01 | `rewind-industry` 工业城市锚点 | 1760—1848 | industrial |
| 01 | `rewind-1848` 1848年的出版锚点 | 1848 | manifesto、iish |
| 02 | `uruk` 乌鲁克的城市化 | 前3500—前3200 | uruk |
| 02 | `writing` 早期记账与文字 | 前3400—前3000 | writing |
| 02 | `egypt-state` 古埃及早期国家 | 前3100—前3000 | earlyEgypt、egypt |
| 02 | `pyramids` 吉萨金字塔 | 前2600—前2500 | egypt |
| 02 | `harappa` 成熟哈拉帕城市 | 前2600—前1900 | indus |
| 02 | `early-china` 黄河流域早期商代与青铜 | 前1600—前1500 | shang |
| 02 | `caral` 卡拉尔—苏佩复杂社会 | 前3000—前1800 | caral |
| 03 | `late-bronze` 晚期青铜时代交流 | 前1500—前1200 | uluburun、phoenicia |
| 03 | `iron` 铁器逐步推广 | 前1200—前600 | phoenicia |
| 03 | `phoenician` 腓尼基航海贸易 | 前1000—前600 | phoenicia |
| 03 | `assyria` 新亚述扩张 | 前911—前609 | assyria、babylon |
| 03 | `babylon` 新巴比伦王国 | 前626—前539 | babylon、persia |
| 03 | `persia` 阿契美尼德波斯兴起 | 前550—前500 | persia |
| 03 | `zhou` 商周政治与礼制 | 前1600—前500 | shang |
| 03 | `olmec` 奥尔梅克文化 | 前1500—前400 | olmec |
| 04 | `greek-poleis` 希腊城邦与思想 | 前500—前323 | greece |
| 04 | `persian-wars` 希波战争 | 前490—前479 | greece、persia |
| 04 | `peloponnesian` 伯罗奔尼撒战争 | 前431—前404 | greece |
| 04 | `alexander` 亚历山大东征 | 前334—前323 | greece、persia |
| 04 | `roman-change` 罗马共和国转向帝制 | 前100—前27 | rome |
| 04 | `roman-roads` 罗马道路与城市 | 前27—220 | rome |
| 04 | `maurya` 孔雀王朝与阿育王 | 前322—前185 | maurya |
| 04 | `qin` 秦统一 | 前221—前206 | han |
| 04 | `han-networks` 汉代与中亚交流 | 前130—220 | han、silk |
| 05 | `rome-division` 罗马帝国的分治 | 284—395 | byzantium |
| 05 | `west-rome` 西罗马统治结构终结 | 476 | byzantium |
| 05 | `east-rome` 东罗马延续 | 330—650 | byzantium |
| 05 | `christianity` 基督教的发展与传播 | 250—650 | byzantium |
| 05 | `gupta` 笈多时代文化科学 | 320—550 | gupta、buddhism |
| 05 | `buddhist-networks` 佛教沿陆海网络传播 | 220—650 | buddhism、silk |
| 05 | `sui-tang` 分裂后的隋唐政权 | 220—618 | sixdynasties、suitang |
| 05 | `early-islam` 伊斯兰教兴起与早期扩展 | 610—650 | islam |
| 06 | `tang-song` 唐宋城市与技术 | 650—1279 | china |
| 06 | `diamond-sutra` 868年《金刚经》印本 | 868 | print |
| 06 | `abbasid` 阿拔斯学术与翻译 | 750—1000 | abbasid、translation |
| 06 | `indian-ocean` 印度洋贸易网络 | 650—1400 | silk、kilwa |
| 06 | `southeast-asia` 东南亚港口与信仰 | 700—1300 | silk |
| 06 | `mali` 马里与跨撒哈拉贸易 | 1230—1400 | mali |
| 06 | `kilwa` 基尔瓦与斯瓦希里海岸 | 1200—1400 | kilwa |
| 06 | `maya` 玛雅城市、文字与历法 | 250—900 | maya |
| 06 | `europe-towns` 欧洲城市与大学 | 1100—1400 | bologna、renaissance |
| 06 | `mongol` 蒙古扩张与欧亚联系 | 1206—1279 | mongol、silk |
| 06 | `black-death` 黑死病 | 1347—1353 | plague、plagueDebate |
| 07 | `renaissance` 文艺复兴与人文主义 | 1350—1550 | renaissance |
| 07 | `china-print-context` 东亚印刷的不同背景 | 868—1400 | print、china |
| 07 | `gutenberg` 欧洲金属活字印刷 | 1450—1500 | renaissance |
| 07 | `zheng-he` 郑和下西洋 | 1405—1433 | zheng |
| 07 | `portugal-africa` 葡萄牙沿非洲航行 | 1415—1488 | gama、columbus |
| 07 | `columbus-1492` 1492年跨大西洋航行 | 1492 | columbus、america |
| 07 | `gama-1498` 达·伽马抵达印度 | 1497—1498 | gama |
| 08 | `aztec-conquest` 墨西加帝国遭征服 | 1519—1521 | conquest、america |
| 08 | `inca-conquest` 印加政权遭征服 | 1532—1533 | conquest |
| 08 | `crops` 哥伦布大交换：作物 | 1500—1700 | exchange |
| 08 | `disease-americas` 疾病、强制劳动与人口灾难 | 1500—1700 | exchange、conquest |
| 08 | `atlantic-slavery` 大西洋奴隶贸易 | 1500—1700 | slavery |
| 08 | `global-silver` 美洲白银与亚洲商品 | 1565—1700 | silver |
| 08 | `reformation` 欧洲宗教改革 | 1517—1648 | reform |
| 09 | `copernicus` 哥白尼著作出版 | 1543 | science |
| 09 | `galileo` 伽利略观测与实验 | 1609—1638 | science |
| 09 | `kepler` 开普勒行星运动研究 | 1609—1619 | science |
| 09 | `science-networks` 知识传播与共同检验 | 1550—1720 | renaissance、newton |
| 09 | `newton-1687` 《自然哲学的数学原理》 | 1687 | newton、science |
| 09 | `science-limits` 从科学到工业的多重条件 | 1687—1760 | industrial、watt |
| 10 | `enlightenment` 启蒙思想与公共讨论 | 1700—1789 | enlighten |
| 10 | `american-war` 美国独立战争 | 1775—1783 | americanWar、declaration |
| 10 | `declaration-1776` 《独立宣言》通过 | 1776 | declaration |
| 10 | `france-1789` 法国大革命的1789年 | 1789 | france |
| 10 | `haitian` 海地革命 | 1791—1804 | haiti |
| 10 | `napoleon-wars` 拿破仑战争 | 1803—1815 | napoleon |
| 10 | `waterloo` 滑铁卢战役 | 1815 | waterloo |
| 11 | `coal` 煤矿与能源变化 | 1760—1848 | steam、industrial |
| 11 | `textiles` 纺织机械与工厂制 | 1760—1800 | derwent、industrial |
| 11 | `watt-patent` 瓦特分离冷凝器专利 | 1769 | watt、steam |
| 11 | `rotary-engine` 蒸汽动力的旋转应用 | 1780—1800 | engine |
| 11 | `canals` 运河、原料与市场 | 1760—1830 | derwent、industrial、slavery |
| 11 | `railway-1830` 利物浦—曼彻斯特铁路 | 1830 | rail |
| 11 | `industrial-diffusion` 工业化向其他地区扩展 | 1800—1848 | industrial |
| 11 | `urban-labour` 工业城市与劳动关系 | 1800—1848 | factory、engels |
| 12 | `factory-life` 工业社会中的工人生活 | 1800—1848 | factory、engels |
| 12 | `factory-act` 1833年工厂法 | 1833 | factory |
| 12 | `chartism` 宪章运动 | 1838—1848 | chartist |
| 12 | `socialisms` 早期社会主义的多种主张 | 1820—1848 | marx、engels |
| 12 | `marx-engels-1844` 马克思与恩格斯合作 | 1844 | marx、engels |
| 12 | `german-ideology` 1845—1846年思想探索 | 1845—1846 | marx、engels |
| 12 | `communist-league` 共产主义者同盟委托 | 1847 | manifesto |
| 12 | `manifesto-1848` 《共产党宣言》发表 | 1848 | manifesto、iish |
| 12 | `interpretation` 理论、历史事实与后续争论 | 1848 | marx、engels |

## 核心城市网络依据

### 新亚述统治的主要城市，约前650年

尼尼微；尼姆鲁德；亚述城；大马士革；撒马利亚。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。展示本土中心与已被征服的黎凡特城市；没有将埃及在更早年份的短期占领延续到此前650年截面。

- https://www.metmuseum.org/toah/ht/04/wam.html
- https://www.metmuseum.org/toah/ht/04/wae.html
- https://www.iranicaonline.org/articles/assyria-i/

### 阿契美尼德行政中心，约前500年

苏萨；波斯波利斯；巴比伦；埃克巴坦那；萨迪斯；孟菲斯。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。节点来自主要王室驻地及行省行政中心。

- https://www.iranicaonline.org/articles/capital-cities/
- https://www.metmuseum.org/essays/the-achaemenid-persian-empire-550-330-b-c

### 秦统一后的核心城市，前221年

咸阳；邯郸；临淄；大梁。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。前221年已完成对六国的征服；仅展示都城及被征服国家的若干旧都，不能据此推断边界，也未把前214年的岭南扩张提前。

- https://ajaonline.org/online-museum-review/369/
- https://asia.si.edu/education/educator-resources/teaching-china-with-the-smithsonian/explore-by-dynasty/

### 东汉的若干主要城市，约100年

洛阳；长安；成都；南阳；彭城。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。首都为洛阳；长安保留为旧都与重要城市。不把西汉、东汉及西域都护控制变化合并成同一精确边界。

- https://www.metmuseum.org/essays/han-dynasty-206-b-c-220-a-d
- https://depts.washington.edu/silkroad/exhibit/han/essay.html

### 罗马城市体系，约117年

罗马；伦丁尼乌姆；卢格杜努姆；迦太基；亚历山大；安条克；以弗所。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。选取持续受罗马统治的已知城市；117年东方新占领地区控制短暂且变化迅速，因此不外推整个极盛版图。

- https://resources.metmuseum.org/resources/metpublications/pdf/Roman_Art_A_Resource_for_Educators.pdf
- https://www.metmuseum.org/essays/the-roman-empire-27-b-c-393-a-d

### 早期阿拉伯政权主要节点，约650年

麦地那；麦加；大马士革；耶路撒冷；亚历山大；库法；泰西封。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。这是650年前后政治节点而非宗教信仰分布；大马士革成为倭马亚首都是661年，不能提前标成650年的首都。

- https://www.metmuseum.org/exhibitions/listings/2012/byzantium-and-islam
- https://www.metmuseum.org/essays/ctesiphon
- https://antiquities.bibalex.org/Collection/Index.aspx?collection=41&lang=en

### 蒙古扩张第一阶段，至1227年

蒙古高原核心；中都；不花剌；撒马尔罕；玉龙杰赤。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。蒙古高原标记为区域核心而非已核实1206年首都；中都1215年、河中主要城市1220—1221年陆续被攻陷。动画须按阶段点亮，不能在1206年全部亮起。

- https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/the%20mongol%20empire%20in%20the%20thirteenth%20and%20fourteenth%20centuries.pdf
- https://www.iranicaonline.org/articles/bukhara-iii/

### 蒙古诸部统治节点，至1260年

哈剌和林；中都；撒马尔罕；不花剌；巴格达；大不里士。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。巴格达1258年才被攻陷。1260年前后汗国分立加深；不表示从1206年到1279年始终单一统一国家。

- https://www.metmuseum.org/essays/the-art-of-the-ilkhanid-period-1256-1353
- https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/the%20mongol%20empire%20in%20the%20thirteenth%20and%20fourteenth%20centuries.pdf

### 元朝在中国的主要城市，1279年

大都；杭州；成都；长安；泉州。核心城市节点示意；不是疆界多边形。节点间联系线不代表逐段实际道路或进军路线。1279年南宋结束；元朝是蒙古诸政权之一，不把所有汗国涂成统一元朝。节点不扩及未被征服的日本或越南。

- https://www.metmuseum.org/essays/yuan-dynasty-1271-1368
- https://afe.easia.columbia.edu/songdynasty-module/index.html
- https://www.metmuseum.org/toah/ht/07/eac.html

## 资料使用权限

本项目仅采用机构文字中的事实进行原创概括，没有下载/复刻馆藏照片、商业历史地图或扫描插图。机构网页可引用的事实不意味着其中图片可自由复制；若后续加入实物图，必须另行记录单件许可证。程序化模型为示意复原，不声称是考古级建筑重建。
