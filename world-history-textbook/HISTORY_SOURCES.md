# 教材目录版历史资料与地图约定

本版依用户提供的课本目录编排，范围为**约公元前3500年的两河流域早期城市至1871年巴黎公社**。成片为294秒、49个镜头、七个单元，覆盖第1—21课。它是教材主线的概览，不能替代完整课程。字幕为中文原创综合表述，没有复制现代著作长篇文字，没有虚构人物对话或战斗细节。

## 数据与范围

- `scripts/story.py` 是本版编辑数据的唯一生成入口。运行后写出 `data/story.json`、`data/events.json`、`captions.md`、`subtitles.srt`。
- `data/story.json`：49镜，含课次、单元、播放时间、历史年代、两行字幕、历史意义、坐标、所用事件与来源。
- `data/events.json`：55条本版使用的事件或地点记录，含来源链接、年代不确定标记与地图近似标记。
- `data/sources.json`：74条本版实际使用的来源。资料库已移除丝路等未采用的旧版扩展资料；实际采用的引用以每镜 `sources` 与每事件 `sourceIds` 为准。
- 第1—21课的覆盖与删减见 [CURRICULUM.md](docs/CURRICULUM.md)。第22课为演唱活动，不属于本片无音轨历史叙事。
- 年份负数表示公元前，正数表示公元后，不设公元0年。时期近似值仅用于选取叙事窗口，画面使用“约”“世纪”“传统纪年”等限定。

## 法典、革命与历史解释的核查

- 《汉谟拉比法典》石碑约刻于公元前1750年。卢浮宫说明它是古代判例和司法规定的汇集，并非现代法典；影片既呈现其法律史价值，也呈现身份差异，不宣称它是最早法律。
- 《十二铜表法》传统定年为公元前451—450年。Yale Avalon的导言与传世条文用于公开成文法及不平等制度的说明；影片不把示意铜表刻痕当作原文。
- 《罗马民法大全》的核心编纂发生于529—534年，后续《新律》仍继续形成。画面年代因此写作“529—534年及以后”；各册图像为现代概念设计。
- 大化改新从645年的政治变化及后续改革讲起，不表示所有土地与行政制度于同一年完成。镰仓政权的形成与1192年源赖朝获将军称号分开标注。
- 英国革命的1640、1649、1660、1688是不同节点；1689年《权利法案》是限制王权与保障议会的重要文献，君主立宪制此后继续发展。
- 美国独立战争的1775—1783年、1776年《独立宣言》与1787年宪法分别呈现。宪法的分权与联邦安排和奴隶制妥协同时说明，不将“平等”宣称误写成所有人当时已获平等权利。
- 法国1789年的政治变化、《人权宣言》、1804年民法典与拿破仑战争分别呈现。法典统一民法、保障财产权，同时保留妇女地位限制；没有把对外征服等同于自由传播。
- 《共产党宣言》1848年发表为事件；“通常以此作为马克思主义诞生的标志”为教材与思想史中的分期概括。马克思、恩格斯的生产关系和阶级分析明确归属他们的理论，不当作自然科学定律。
- 第一国际1864年在伦敦成立，其国际合作和内部路线分歧有组织档案与博物馆藏品支持。巴黎公社1871年3—5月的短暂执政与镇压为史实；“工人政权探索的重要历史经验”为工人运动史中的历史评价，不能据此假定公社政治成员或后世解释完全一致。

## 本轮实际阅读记录

2026-11-08通过网页工具重新打开并阅读：卢浮宫法典说明、Yale十二铜表导言、英国议会《权利法案》藏品说明、美国国家档案馆1787年宪法说明、UNESCO环球航行档案说明、俄亥俄州立大学航行史、Bishopsgate第一国际会议记录藏品说明、人民历史博物馆国际工人协会证书、法国国民议会巴黎公社说明。独立历史复核还阅读了哥伦比亚大学大化改新、怀俄明大学法学院查士丁尼《新律》、George Mason大学拿破仑法典、美国国会图书馆妇女与拿破仑时代专题。

部分新来源保留了上一轮2026-11-07的HTTP或阅读记录；这些字段说明当次访问，不保证链接今后持续可达。复核时若页面限制访问，使用大学、档案馆或博物馆的可读替代来源，并更新本版链接。网页可访问性检查不等于历史学术争议已经消失。

## 地图与动画的证据边界

- 底图采用Natural Earth 1∶5000万公共领域自然地理轮廓，河流与地形为定位背景。不绘制现代国家边界，也不宣称重建各时期古海岸线。
- 所有历史坐标是代表性地点。光点、光晕和关注区域不表示人口、死亡人数、行政控制率或宗教比例。
- 本版没有用现代国界或人为闭合的城市节点绘制精确古代疆域。`empire-regions.json` 保留空数组以兼容引擎。
- 亚历山大行动、新航路、强迫迁移与1830年铁路只采用有来源的主要方向或节点。跨洋航行按概略航向绘制，经过反经线时须分段；不是精密历史航迹。
- 麦哲伦远征于1519年出发，他于1521年死于菲律宾；埃尔卡诺率返航船于1522年完成环球航行。字幕与资料不把全程归给麦哲伦个人。
- 殖民暴力、奴隶贸易与镇压使用克制表达；不把苦难转为滑稽动画，也不使用未经核实的死亡数字。
- 建筑、泥板、法典、服饰、机构、人物与机器为原创概念场景，不是考古复原、真实肖像或文献原件扫描。古代刻痕和页面装饰没有伪造可读法律引文。

## 逐课来源索引

同一来源可用于多镜。下表提供本版引用的直接页面，不引用搜索结果页。

| 课次 | 采用的资料 |
| --- | --- |
| 1 | [The Met — Uruk: The First City](https://www.metmuseum.org/essays/uruk-the-first-city)<br>[The Met — Art of the First Cities](https://www.metmuseum.org/essays/art-of-the-first-cities-in-the-third-millennium-b-c) |
| 2 | [The Met — The Origins of Writing](https://www.metmuseum.org/essays/the-origins-of-writing)<br>[Musée du Louvre — The Code of Hammurabi](https://www.louvre.fr/en/the-code-of-hammurabi) |
| 3 | [Egyptian Ministry of Tourism and Antiquities — Early Dynastic Period](https://egymonuments.gov.eg/en/historical-periods/early-dynastic-period)<br>[UNESCO — Memphis and its Necropolis](https://whc.unesco.org/en/list/86/)<br>[Britannica — Egyptian calendar](https://www.britannica.com/science/Egyptian-calendar)<br>[The Metropolitan Museum of Art — The Art of Ancient Egypt: A Resource for Educators](https://resources.metmuseum.org/resources/metpublications/pdf/The_Art_of_Ancient_Egypt_A_Resource_for_Educators.pdf) |
| 4 | [The Met — South Asia, 8000–2000 BCE](https://www.metmuseum.org/toah/ht/02/ssa.html)<br>[Britannica — Varna: social classifications and their historical complexity](https://www.britannica.com/topic/varna-Hinduism)<br>[The Met — Buddhism and Buddhist Art](https://www.metmuseum.org/essays/buddhism-and-buddhist-art) |
| 5 | [The Met — Art of Classical Greece](https://www.metmuseum.org/essays/the-art-of-classical-greece-ca-480-323-b-c)<br>[Britannica — Ancient Greek civilization: Cleisthenes and democracy](https://www.britannica.com/place/ancient-Greece/The-reforms-of-Cleisthenes)<br>[The Met — The Achaemenid Persian Empire](https://www.metmuseum.org/essays/the-achaemenid-persian-empire-550-330-b-c) |
| 6 | [Britannica — Ancient Rome: the early Republic](https://www.britannica.com/place/ancient-Rome/The-early-Republic-509-280-bce)<br>[The Met — Roman Art: A Resource for Educators](https://resources.metmuseum.org/resources/metpublications/pdf/Roman_Art_A_Resource_for_Educators.pdf)<br>[Yale Law School, Avalon Project — The Twelve Tables](https://avalon.law.yale.edu/ancient/twelve_tables.asp)<br>[The Met — Byzantium ca.330–1453](https://www.metmuseum.org/essays/byzantium-ca-330-1453) |
| 7 | [Britannica — Clovis I](https://www.britannica.com/biography/Clovis-I)<br>[Britannica — Charlemagne](https://www.britannica.com/biography/Charlemagne)<br>[Britannica — Feudalism](https://www.britannica.com/topic/feudalism) |
| 8 | [Durham University — Cities in History: Governing](https://dur.ac.uk/research/institutes-and-centres/medieval-early-modern-studies/research/cities-in-history-archives-and-traces-1100-1700/governing/)<br>[University of Bologna — Our History](https://www.unibo.it/en/university/who-we-are/our-history) |
| 9 | [University of Wyoming Law Library — The Novels of Justinian](https://www.uwyo.edu/lawlib/blume-justinian/ajc-edition-2/novels/novels.html)<br>[The Met — Byzantium ca.330–1453](https://www.metmuseum.org/essays/byzantium-ca-330-1453) |
| 10 | [Columbia University, Asia for Educators — The Taika Reforms](https://afe.easia.columbia.edu/main_pop/ps/ps_japan-taika.htm)<br>[The Metropolitan Museum of Art — Kamakura and Nanbokucho Periods (1185–1392)](https://www.metmuseum.org/essays/kamakura-and-nanbokucho-periods-1185-1392)<br>[Britannica — Minamoto Yoritomo](https://www.britannica.com/biography/Minamoto-Yoritomo) |
| 11 | [The Met — Byzantium and Islam: Age of Transition](https://www.metmuseum.org/exhibitions/listings/2012/byzantium-and-islam)<br>[The Metropolitan Museum of Art — The Art of the Umayyad Period (661–750)](https://www.metmuseum.org/essays/the-art-of-the-umayyad-period-661-750)<br>[The Met — Art of the Abbasid Period](https://www.metmuseum.org/essays/the-art-of-the-abbasid-period-750-1258)<br>[Isis — Mobilities of Science: Era of Translation into Arabic](https://doi.org/10.1086/698236) |
| 12 | [The Met — Trans-Saharan Gold Trade](https://www.metmuseum.org/essays/the-trans-saharan-gold-trade-7th-14th-century)<br>[UNESCO — Great Zimbabwe National Monument](https://whc.unesco.org/en/list/364/)<br>[University of California Santa Barbara — Classic Period Maya](https://www.marc.ucsb.edu/research/maya/ancient-maya-civilization/classic-period)<br>[Library of Congress — What Came to Be Called America](https://www.loc.gov/exhibits/1492/america.html) |
| 13 | [University of Toronto — Renaissance in Print](https://crrs.library.utoronto.ca/exhibits/show/vic449/vic449exhibit)<br>[Britannica — Domestic system](https://www.britannica.com/topic/domestic-system)<br>[Britannica — The emergence of modern Europe, 1500–1648](https://www.britannica.com/topic/history-of-Europe/The-emergence-of-modern-Europe-1500-1648) |
| 14 | [Library of Congress — 1492: An Ongoing Voyage](https://www.loc.gov/exhibits/1492/)<br>[Portuguese Parliament — Vasco da Gama](https://www.parlamento.pt/VisitaParlamento/Paginas/BiogVascodaGama.aspx)<br>[UNESCO — First Voyage of Circumnavigation by Magellan and Elcano (1519–1522)](https://www.unesco.org/en/memory-world/first-voyage-circumnavigation-fernao-de-magalhaes-and-juan-sebastian-elcano-1519-1522)<br>[Ohio State University, Origins — Magellan’s Circumnavigation of the Earth](https://origins.osu.edu/milestones/magellan-circumnavigation-earth) |
| 15 | [Library of Congress — Europe Claims America](https://www.loc.gov/exhibits/1492/eurocla.html)<br>[Nunn and Qian — The Columbian Exchange](https://www.aeaweb.org/articles?id=10.1257/jep.24.2.163)<br>[SlaveVoyages — Methodology](https://legacy.slavevoyages.org/blog/methodology-trans-atlantic) |
| 16 | [UK Parliament — The Civil War](https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/civilwar/)<br>[UK Parliament — The Glorious Revolution](https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/)<br>[UK Parliament — Bill of Rights 1689](https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/collections1/collections-glorious-revolution/billofrights/) |
| 17 | [Library of Congress — American Revolution](https://www.loc.gov/classroom-materials/american-revolution/)<br>[US National Archives — Treaty of Paris (1783)](https://www.archives.gov/milestone-documents/treaty-of-paris)<br>[US National Archives — Declaration of Independence](https://www.archives.gov/milestone-documents/declaration-of-independence)<br>[US National Archives — Constitution of the United States (1787)](https://www.archives.gov/milestone-documents/constitution)<br>[US National Archives — The Constitution: A Transcription](https://www.archives.gov/founding-docs/constitution-transcript) |
| 18 | [Larousse — Révolution française](https://www.larousse.fr/encyclopedie/divers/R%C3%A9volution_fran%C3%A7aise/184321)<br>[French Presidency — Declaration of the Rights of Man and of the Citizen](https://www.elysee.fr/en/french-presidency/the-declaration-of-the-rights-of-man-and-of-the-citizen)<br>[George Mason University, Roy Rosenzweig Center — The Napoleonic Code](https://revolution.chnm.org/exhibits/show/liberty--equality--fraternity/item/358)<br>[Library of Congress — Women in Napoleonic France](https://guides.loc.gov/feminism-french-women-history/women-napoleonic-france)<br>[Fondation Napoléon — Timeline](https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/)<br>[National Army Museum — Battle of Waterloo](https://www.nam.ac.uk/explore/battle-waterloo) |
| 19 | [UNESCO — Derwent Valley Mills](https://whc.unesco.org/en/list/1030/)<br>[Science Museum — Steaming through the Centuries](https://blog.sciencemuseum.org.uk/steaming-through-the-centuries/)<br>[Historic Environment Scotland — James Watt](https://www.historicenvironment.scot/about-us/our-work/commemorative-plaques/explore/james-watt/)<br>[National Museums Scotland — Newcomen Engine](https://www.nms.ac.uk/discover-catalogue/the-newcomen-engine-and-its-role-in-britains-industrial-revolution)<br>[Science Museum Group — Rotative Steam Engine 1788](https://collection.sciencemuseumgroup.org.uk/objects/co50948/rotative-steam-engine-by-boulton-and-watt-1788)<br>[Science Museum Group — Liverpool and Manchester Railway](https://collection.sciencemuseumgroup.org.uk/people/ap48/liverpool-manchester-railway-co) |
| 20 | [UK Parliament — 1833 Factory Act](https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/)<br>[UK National Archives — What Was Chartism?](https://www.nationalarchives.gov.uk/education/teaching-resources/what-was-chartism/)<br>[Stanford Encyclopedia of Philosophy — Karl Marx](https://plato.stanford.edu/entries/marx/)<br>[Stanford Encyclopedia of Philosophy — Friedrich Engels](https://plato.stanford.edu/entries/engels/)<br>[Marx/Engels — Manifesto of the Communist Party, 1848](https://www.marxists.org/archive/marx/works/1848/communist-manifesto/)<br>[UNESCO — Marx-Engels documents, Memory of the World](https://www.unesco.org/en/memory-world/manifest-der-kommunistischen-partei-draft-manuscript-page-and-das-kapital-erster-band-karl-marxs) |
| 21 | [Bishopsgate Institute — Minute Book of the General Council of the International Workingmen’s Association](https://www.bishopsgate.org.uk/archives/our-archives-online-2/first-international-minute-book/)<br>[People’s History Museum — IWMA affiliation certificate NMLH.1992.37](https://phm.org.uk/collections-display/?irn=1677)<br>[Assemblée nationale — La Commune de Paris](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/troisieme-republique/la-commune-de-paris) |

## 完整来源清单

- `derwent` — [UNESCO — Derwent Valley Mills](https://whc.unesco.org/en/list/1030/)
- `earlyEgypt` — [Egyptian Ministry of Tourism and Antiquities — Early Dynastic Period](https://egymonuments.gov.eg/en/historical-periods/early-dynastic-period)
- `bologna` — [University of Bologna — Our History](https://www.unibo.it/en/university/who-we-are/our-history)
- `americanWar` — [Library of Congress — American Revolution](https://www.loc.gov/classroom-materials/american-revolution/)
- `uruk` — [The Met — Uruk: The First City](https://www.metmuseum.org/essays/uruk-the-first-city)
- `writing` — [The Met — The Origins of Writing](https://www.metmuseum.org/essays/the-origins-of-writing)
- `egypt` — [UNESCO — Memphis and its Necropolis](https://whc.unesco.org/en/list/86/)
- `indus` — [The Met — South Asia, 8000–2000 BCE](https://www.metmuseum.org/toah/ht/02/ssa.html)
- `bronze` — [The Met — Art of the First Cities](https://www.metmuseum.org/essays/art-of-the-first-cities-in-the-third-millennium-b-c)
- `persia` — [The Met — The Achaemenid Persian Empire](https://www.metmuseum.org/essays/the-achaemenid-persian-empire-550-330-b-c)
- `greece` — [The Met — Art of Classical Greece](https://www.metmuseum.org/essays/the-art-of-classical-greece-ca-480-323-b-c)
- `rome` — [The Met — Roman Art: A Resource for Educators](https://resources.metmuseum.org/resources/metpublications/pdf/Roman_Art_A_Resource_for_Educators.pdf)
- `buddhism` — [The Met — Buddhism and Buddhist Art](https://www.metmuseum.org/essays/buddhism-and-buddhist-art)
- `byzantium` — [The Met — Byzantium ca.330–1453](https://www.metmuseum.org/essays/byzantium-ca-330-1453)
- `islam` — [The Met — Byzantium and Islam: Age of Transition](https://www.metmuseum.org/exhibitions/listings/2012/byzantium-and-islam)
- `abbasid` — [The Met — Art of the Abbasid Period](https://www.metmuseum.org/essays/the-art-of-the-abbasid-period-750-1258)
- `translation` — [Isis — Mobilities of Science: Era of Translation into Arabic](https://doi.org/10.1086/698236)
- `mali` — [The Met — Trans-Saharan Gold Trade](https://www.metmuseum.org/essays/the-trans-saharan-gold-trade-7th-14th-century)
- `maya` — [University of California Santa Barbara — Classic Period Maya](https://www.marc.ucsb.edu/research/maya/ancient-maya-civilization/classic-period)
- `renaissance` — [University of Toronto — Renaissance in Print](https://crrs.library.utoronto.ca/exhibits/show/vic449/vic449exhibit)
- `columbus` — [Library of Congress — 1492: An Ongoing Voyage](https://www.loc.gov/exhibits/1492/)
- `gama` — [Portuguese Parliament — Vasco da Gama](https://www.parlamento.pt/VisitaParlamento/Paginas/BiogVascodaGama.aspx)
- `conquest` — [Library of Congress — Europe Claims America](https://www.loc.gov/exhibits/1492/eurocla.html)
- `america` — [Library of Congress — What Came to Be Called America](https://www.loc.gov/exhibits/1492/america.html)
- `exchange` — [Nunn and Qian — The Columbian Exchange](https://www.aeaweb.org/articles?id=10.1257/jep.24.2.163)
- `slavery` — [SlaveVoyages — Methodology](https://legacy.slavevoyages.org/blog/methodology-trans-atlantic)
- `declaration` — [US National Archives — Declaration of Independence](https://www.archives.gov/milestone-documents/declaration-of-independence)
- `france` — [Larousse — Révolution française](https://www.larousse.fr/encyclopedie/divers/R%C3%A9volution_fran%C3%A7aise/184321)
- `napoleon` — [Fondation Napoléon — Timeline](https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/)
- `waterloo` — [National Army Museum — Battle of Waterloo](https://www.nam.ac.uk/explore/battle-waterloo)
- `steam` — [National Museums Scotland — Newcomen Engine](https://www.nms.ac.uk/discover-catalogue/the-newcomen-engine-and-its-role-in-britains-industrial-revolution)
- `watt` — [Historic Environment Scotland — James Watt](https://www.historicenvironment.scot/about-us/our-work/commemorative-plaques/explore/james-watt/)
- `engine` — [Science Museum Group — Rotative Steam Engine 1788](https://collection.sciencemuseumgroup.org.uk/objects/co50948/rotative-steam-engine-by-boulton-and-watt-1788)
- `rail` — [Science Museum Group — Liverpool and Manchester Railway](https://collection.sciencemuseumgroup.org.uk/people/ap48/liverpool-manchester-railway-co)
- `industrial` — [Science Museum — Steaming through the Centuries](https://blog.sciencemuseum.org.uk/steaming-through-the-centuries/)
- `factory` — [UK Parliament — 1833 Factory Act](https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/)
- `chartist` — [UK National Archives — What Was Chartism?](https://www.nationalarchives.gov.uk/education/teaching-resources/what-was-chartism/)
- `marx` — [Stanford Encyclopedia of Philosophy — Karl Marx](https://plato.stanford.edu/entries/marx/)
- `engels` — [Stanford Encyclopedia of Philosophy — Friedrich Engels](https://plato.stanford.edu/entries/engels/)
- `manifesto` — [Marx/Engels — Manifesto of the Communist Party, 1848](https://www.marxists.org/archive/marx/works/1848/communist-manifesto/)
- `iish` — [UNESCO — Marx-Engels documents, Memory of the World](https://www.unesco.org/en/memory-world/manifest-der-kommunistischen-partei-draft-manuscript-page-and-das-kapital-erster-band-karl-marxs)
- `egyptCalendar` — [Britannica — Egyptian calendar](https://www.britannica.com/science/Egyptian-calendar)
- `egyptWriting` — [The Metropolitan Museum of Art — The Art of Ancient Egypt: A Resource for Educators](https://resources.metmuseum.org/resources/metpublications/pdf/The_Art_of_Ancient_Egypt_A_Resource_for_Educators.pdf)
- `varna` — [Britannica — Varna: social classifications and their historical complexity](https://www.britannica.com/topic/varna-Hinduism)
- `athens` — [Britannica — Ancient Greek civilization: Cleisthenes and democracy](https://www.britannica.com/place/ancient-Greece/The-reforms-of-Cleisthenes)
- `romanRepublic` — [Britannica — Ancient Rome: the early Republic](https://www.britannica.com/place/ancient-Rome/The-early-Republic-509-280-bce)
- `twelveTables` — [Yale Law School, Avalon Project — The Twelve Tables](https://avalon.law.yale.edu/ancient/twelve_tables.asp)
- `franks` — [Britannica — Clovis I](https://www.britannica.com/biography/Clovis-I)
- `charlemagne` — [Britannica — Charlemagne](https://www.britannica.com/biography/Charlemagne)
- `feudal` — [Britannica — Feudalism](https://www.britannica.com/topic/feudalism)
- `justinian` — [University of Wyoming Law Library — The Novels of Justinian](https://www.uwyo.edu/lawlib/blume-justinian/ajc-edition-2/novels/novels.html)
- `taika` — [Columbia University, Asia for Educators — The Taika Reforms](https://afe.easia.columbia.edu/main_pop/ps/ps_japan-taika.htm)
- `kamakura` — [The Metropolitan Museum of Art — Kamakura and Nanbokucho Periods (1185–1392)](https://www.metmuseum.org/essays/kamakura-and-nanbokucho-periods-1185-1392)
- `yoritomo` — [Britannica — Minamoto Yoritomo](https://www.britannica.com/biography/Minamoto-Yoritomo)
- `umayyad` — [The Metropolitan Museum of Art — The Art of the Umayyad Period (661–750)](https://www.metmuseum.org/essays/the-art-of-the-umayyad-period-661-750)
- `zimbabwe` — [UNESCO — Great Zimbabwe National Monument](https://whc.unesco.org/en/list/364/)
- `domestic` — [Britannica — Domestic system](https://www.britannica.com/topic/domestic-system)
- `capitalism` — [Britannica — The emergence of modern Europe, 1500–1648](https://www.britannica.com/topic/history-of-Europe/The-emergence-of-modern-Europe-1500-1648)
- `civilWar` — [UK Parliament — The Civil War](https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/civilwar/)
- `gloriousRevolution` — [UK Parliament — The Glorious Revolution](https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/)
- `billRights` — [UK Parliament — Bill of Rights 1689](https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/collections1/collections-glorious-revolution/billofrights/)
- `parisTreaty` — [US National Archives — Treaty of Paris (1783)](https://www.archives.gov/milestone-documents/treaty-of-paris)
- `constitution` — [US National Archives — Constitution of the United States (1787)](https://www.archives.gov/milestone-documents/constitution)
- `constitutionText` — [US National Archives — The Constitution: A Transcription](https://www.archives.gov/founding-docs/constitution-transcript)
- `humanRights` — [French Presidency — Declaration of the Rights of Man and of the Citizen](https://www.elysee.fr/en/french-presidency/the-declaration-of-the-rights-of-man-and-of-the-citizen)
- `napoleonicCode` — [George Mason University, Roy Rosenzweig Center — The Napoleonic Code](https://revolution.chnm.org/exhibits/show/liberty--equality--fraternity/item/358)
- `international` — [Bishopsgate Institute — Minute Book of the General Council of the International Workingmen’s Association](https://www.bishopsgate.org.uk/archives/our-archives-online-2/first-international-minute-book/)
- `commune` — [Assemblée nationale — La Commune de Paris](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/troisieme-republique/la-commune-de-paris)
- `magellan` — [UNESCO — First Voyage of Circumnavigation by Magellan and Elcano (1519–1522)](https://www.unesco.org/en/memory-world/first-voyage-circumnavigation-fernao-de-magalhaes-and-juan-sebastian-elcano-1519-1522)
- `elcano` — [Ohio State University, Origins — Magellan’s Circumnavigation of the Earth](https://origins.osu.edu/milestones/magellan-circumnavigation-earth)
- `hammurabi` — [Musée du Louvre — The Code of Hammurabi](https://www.louvre.fr/en/the-code-of-hammurabi)
- `townCharter` — [Durham University — Cities in History: Governing](https://dur.ac.uk/research/institutes-and-centres/medieval-early-modern-studies/research/cities-in-history-archives-and-traces-1100-1700/governing/)
- `internationalCertificate` — [People’s History Museum — IWMA affiliation certificate NMLH.1992.37](https://phm.org.uk/collections-display/?irn=1677)
- `napoleonicWomen` — [Library of Congress — Women in Napoleonic France](https://guides.loc.gov/feminism-french-women-history/women-napoleonic-france)
