"""Research ledger compiler; coordinates are representative centres, never borders."""
import json
from pathlib import Path

S={
'derwent':('UNESCO — Derwent Valley Mills','https://whc.unesco.org/en/list/1030/'),
'earlyEgypt':('Egyptian Ministry of Tourism and Antiquities — Early Dynastic Period','https://egymonuments.gov.eg/en/historical-periods/early-dynastic-period'),
'uluburun':('Institute of Nautical Archaeology — Uluburun Shipwreck','https://nauticalarch.org/projects/uluburun-late-bronze-age-shipwreck-excavation/'),
'bologna':('University of Bologna — Our History','https://www.unibo.it/en/university/who-we-are/our-history'),
'sixdynasties':('The Met — China 1–500 CE','https://www.metmuseum.org/toah/ht/05/eac/'),
'suitang':('The Met — China 500–1000 CE','https://www.metmuseum.org/toah/ht/06/eac.html'),
'americanWar':('Library of Congress — American Revolution','https://www.loc.gov/classroom-materials/american-revolution/'),
'uruk':('The Met — Uruk: The First City','https://www.metmuseum.org/essays/uruk-the-first-city'),
'writing':('The Met — The Origins of Writing','https://www.metmuseum.org/essays/the-origins-of-writing'),
'egypt':('UNESCO — Memphis and its Necropolis','https://whc.unesco.org/en/list/86/'),
'indus':('The Met — South Asia, 8000–2000 BCE','https://www.metmuseum.org/toah/ht/02/ssa.html'),
'shang':('The Met — Shang and Zhou Dynasties','https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china'),
'caral':('UNESCO — Sacred City of Caral-Supe','https://whc.unesco.org/en/list/1269/'),
'bronze':('The Met — Art of the First Cities','https://www.metmuseum.org/essays/art-of-the-first-cities-in-the-third-millennium-b-c'),
'phoenicia':('The Met — Eastern Mediterranean and Syria 1000 BCE–1 CE','https://www.metmuseum.org/toah/ht/04/wae.html'),
'assyria':('Encyclopaedia Iranica — Assyria','https://www.iranicaonline.org/articles/assyria-i/'),
'babylon':('The Met — Mesopotamia 1000 BCE–1 CE','https://www.metmuseum.org/toah/ht/04/wam.html'),
'persia':('The Met — The Achaemenid Persian Empire','https://www.metmuseum.org/essays/the-achaemenid-persian-empire-550-330-b-c'),
'olmec':('The Met — Olmec Art','https://www.metmuseum.org/essays/olmec-art'),
'greece':('The Met — Art of Classical Greece','https://www.metmuseum.org/essays/the-art-of-classical-greece-ca-480-323-b-c'),
'rome':('The Met — Roman Art: A Resource for Educators','https://resources.metmuseum.org/resources/metpublications/pdf/Roman_Art_A_Resource_for_Educators.pdf'),
'maurya':('The Met — Mauryan Empire','https://www.metmuseum.org/essays/mauryan-empire-ca-323-185-b-c'),
'han':('University of Washington — Han Empire','https://depts.washington.edu/silkroad/exhibit/han/essay.html'),
'silk':('UNESCO — About the Silk Roads','https://www.unesco.org/en/silk-roads/about-silk-roads'),
'buddhism':('The Met — Buddhism and Buddhist Art','https://www.metmuseum.org/essays/buddhism-and-buddhist-art'),
'byzantium':('The Met — Byzantium ca.330–1453','https://www.metmuseum.org/essays/byzantium-ca-330-1453'),
'gupta':('Columbia University — South Asia 300–600 CE','https://afe.easia.columbia.edu/tps/300ce_sa.htm'),
'islam':('The Met — Byzantium and Islam: Age of Transition','https://www.metmuseum.org/exhibitions/listings/2012/byzantium-and-islam'),
'china':('Columbia University — China 1000 CE','https://afe.easia.columbia.edu/songdynasty-module/index.html'),
'abbasid':('The Met — Art of the Abbasid Period','https://www.metmuseum.org/essays/the-art-of-the-abbasid-period-750-1258'),
'translation':('Isis — Mobilities of Science: Era of Translation into Arabic','https://doi.org/10.1086/698236'),
'print':('British Library IDP — Diamond Sutra','https://idp.bl.uk/discover/learning/buddhism-on-the-silk-roads/articles/buddhism-on-the-ground/buddhist-texts-the-diamond-sutra/'),
'mali':('The Met — Trans-Saharan Gold Trade','https://www.metmuseum.org/essays/the-trans-saharan-gold-trade-7th-14th-century'),
'kilwa':('UNESCO — Kilwa Kisiwani and Songo Mnara','https://whc.unesco.org/en/list/144/'),
'maya':('University of California Santa Barbara — Classic Period Maya','https://www.marc.ucsb.edu/research/maya/ancient-maya-civilization/classic-period'),
'mongol':('The Met — Art of the Ilkhanid Period','https://www.metmuseum.org/essays/the-art-of-the-ilkhanid-period-1256-1353'),
'plague':('OpenStax / Rice University — Black Death from East to West','https://openstax.org/books/world-history-volume-1/pages/16-3-the-black-death-from-east-to-west'),
'plagueDebate':('Medical History — Plague history and Mongol history','https://pmc.ncbi.nlm.nih.gov/articles/PMC11949646/'),
'renaissance':('University of Toronto — Renaissance in Print','https://crrs.library.utoronto.ca/exhibits/show/vic449/vic449exhibit'),
'zheng':('Columbia University — Ming Voyages','https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'),
'columbus':('Library of Congress — 1492: An Ongoing Voyage','https://www.loc.gov/exhibits/1492/'),
'gama':('Portuguese Parliament — Vasco da Gama','https://www.parlamento.pt/VisitaParlamento/Paginas/BiogVascodaGama.aspx'),
'conquest':('Library of Congress — Europe Claims America','https://www.loc.gov/exhibits/1492/eurocla.html'),
'america':('Library of Congress — What Came to Be Called America','https://www.loc.gov/exhibits/1492/america.html'),
'exchange':('Nunn and Qian — The Columbian Exchange','https://www.aeaweb.org/articles?id=10.1257/jep.24.2.163'),
'slavery':('SlaveVoyages — Methodology','https://legacy.slavevoyages.org/blog/methodology-trans-atlantic'),
'silver':('The Met — Manila Galleon Trade','https://www.metmuseum.org/essays/the-manila-galleon-trade-1565-1815'),
'reform':('The Met — Central Europe 1400–1600','https://www.metmuseum.org/toah/ht/08/euwc.html'),
'science':('NASA — Planetary Motion','https://science.nasa.gov/earth/earth-observatory/planetary-motion/'),
'newton':('Oxford University — Newton Project Texts','https://newtonproject.ox.ac.uk/texts/introduction'),
'enlighten':('Stanford Encyclopedia of Philosophy — Enlightenment','https://plato.stanford.edu/entries/enlightenment/'),
'declaration':('US National Archives — Declaration of Independence','https://www.archives.gov/milestone-documents/declaration-of-independence'),
'france':('Larousse — Révolution française','https://www.larousse.fr/encyclopedie/divers/R%C3%A9volution_fran%C3%A7aise/184321'),
'haiti':('US Office of the Historian — Haitian Revolution','https://history.state.gov/milestones/1784-1800/haitian-rev'),
'napoleon':('Fondation Napoléon — Timeline','https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'),
'waterloo':('National Army Museum — Battle of Waterloo','https://www.nam.ac.uk/explore/battle-waterloo'),
'steam':('National Museums Scotland — Newcomen Engine','https://www.nms.ac.uk/discover-catalogue/the-newcomen-engine-and-its-role-in-britains-industrial-revolution'),
'watt':('Historic Environment Scotland — James Watt','https://www.historicenvironment.scot/about-us/our-work/commemorative-plaques/explore/james-watt/'),
'engine':('Science Museum Group — Rotative Steam Engine 1788','https://collection.sciencemuseumgroup.org.uk/objects/co50948/rotative-steam-engine-by-boulton-and-watt-1788'),
'rail':('Science Museum Group — Liverpool and Manchester Railway','https://collection.sciencemuseumgroup.org.uk/people/ap48/liverpool-manchester-railway-co'),
'industrial':('Science Museum — Steaming through the Centuries','https://blog.sciencemuseum.org.uk/steaming-through-the-centuries/'),
'factory':('UK Parliament — 1833 Factory Act','https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/'),
'chartist':('UK National Archives — What Was Chartism?','https://www.nationalarchives.gov.uk/education/teaching-resources/what-was-chartism/'),
'marx':('Stanford Encyclopedia of Philosophy — Karl Marx','https://plato.stanford.edu/entries/marx/'),
'engels':('Stanford Encyclopedia of Philosophy — Friedrich Engels','https://plato.stanford.edu/entries/engels/'),
'manifesto':('Marx/Engels — Manifesto of the Communist Party, 1848','https://www.marxists.org/archive/marx/works/1848/communist-manifesto/'),
'iish':('UNESCO — Marx-Engels documents, Memory of the World','https://www.unesco.org/en/memory-world/manifest-der-kommunistischen-partei-draft-manuscript-page-and-das-kapital-erster-band-karl-marxs'),
}

# chapter|id|name|start|end|region|lon|lat|type|explanation|visual|source keys|date disputed
rows='''
1|rewind-uruk|乌鲁克：时间旅程的起点|-3500|-3200|两河流域|45.64|31.32|文明诞生|约前四千纪后期城市规模与管理方式发生变化。|城市星光与地球展开|uruk|1
1|rewind-egypt|尼罗河文明锚点|-3100|-2600|尼罗河谷|31.22|29.87|文明诞生|古埃及国家形成与后来的古王国建筑并非同一瞬间。|倒带光点|egypt|1
1|rewind-indus|印度河文明锚点|-2600|-1900|印度河流域|68.14|27.33|城市兴起|成熟哈拉帕城市文化形成独立区域网络。|倒带光点|indus|1
1|rewind-han|欧亚交流锚点|-130|220|长安与中亚|108.94|34.26|贸易|丝路是多条陆海交流网络的后世统称。|网络闪回|silk,han|1
1|rewind-industry|工业城市锚点|1760|1848|英国|−2.24|53.48|工业化|工业化是数代人的社会与生产变化。|城市灯光熄灭|industrial|1
1|rewind-1848|1848年的出版锚点|1848|1848|伦敦|−0.13|51.51|思想形成|《共产党宣言》于1848年2月在伦敦以德文出版。|书页化为地图|manifesto,iish|0
2|uruk|乌鲁克的城市化|-3500|-3200|美索不达米亚南部|45.64|31.32|城市兴起|灌溉农业、劳动分工与管理机构共同推动城市发展。|河流农田与城市点亮|uruk|1
2|writing|早期记账与文字|-3400|-3000|乌鲁克|45.64|31.32|科学成就|早期泥板记录物资与数量，逐渐发展出文字系统。|泥板压痕特写|writing|1
2|egypt-state|古埃及早期国家|-3100|-3000|尼罗河流域|31.22|29.87|文明诞生|通常把约前3100年视为早期统一国家形成的标志。|尼罗河聚落连接|earlyEgypt,egypt|1
2|pyramids|吉萨金字塔|-2600|-2500|吉萨|31.13|29.98|文化传播|古王国大型建筑体现国家组织与大量劳动投入。|地标转建筑剖面|egypt|1
2|harappa|成熟哈拉帕城市|-2600|-1900|印度河流域|68.14|27.33|城市兴起|摩亨佐达罗等城市拥有街区与排水设施。|街道排水剖面|indus|1
2|early-china|黄河流域早期商代与青铜|-1600|-1500|黄河流域|113.65|34.75|文明诞生|早商国家与青铜文明在此时期发展，起始年代为约数。|青铜纹样与中心光点|shang|1
2|caral|卡拉尔—苏佩复杂社会|-3000|-1800|安第斯中部海岸|−77.52|−10.89|文明诞生|美洲的早期复杂社会独立发展，不能提前放入后来的印加帝国。|太平洋两岸双地图|caral|1
3|late-bronze|晚期青铜时代交流|-1500|-1200|东地中海|33.5|35.0|贸易|宫廷、港口与金属原料网络跨越多个地区。|港口与货物路径|uluburun,phoenicia|1
3|iron|铁器逐步推广|-1200|-600|西亚与东地中海|35.5|37.0|科学成就|铁器应用渐增，不是某年全世界同时进入铁器时代。|金属纹理转工具|phoenicia|1
3|phoenician|腓尼基航海贸易|-1000|-600|地中海|35.20|33.27|贸易|黎凡特港口与地中海多地建立贸易和殖民据点。|海上多节点路线|phoenicia|1
3|assyria|新亚述扩张|-911|-609|两河流域北部|43.15|36.36|帝国扩张|扩张分阶段进行，军事强制、贡赋与行政机构相互配合。|分期概略墨染区域|assyria,babylon|1
3|babylon|新巴比伦王国|-626|-539|巴比伦|44.42|32.54|国家更替|新巴比伦兴起并参与消灭亚述，前539年被波斯征服。|城市与政权阶段变化|babylon,persia|0
3|persia|阿契美尼德波斯兴起|-550|-500|伊朗至西亚|52.89|29.94|帝国扩张|居鲁士及继承者扩张，行省与道路支持跨地区统治。|概略扩展与驿路|persia|1
3|zhou|商周政治与礼制|-1600|-500|黄河与长江流域|114.35|36.10|国家更替|商代青铜礼器与西周政治网络经历长期演变。|青铜器变关系网络|shang|1
3|olmec|奥尔梅克文化|-1500|-400|墨西哥湾沿岸|−94.77|17.76|文明诞生|圣洛伦索与拉文塔等中心在不同阶段兴盛。|石雕地标与聚落|olmec|1
4|greek-poleis|希腊城邦与思想|-500|-323|爱琴海|23.73|37.98|文化传播|城邦制度、哲学与艺术在竞争和交流中发展。|爱琴海城邦群点|greece|1
4|persian-wars|希波战争|-490|-479|希腊与爱琴海|23.97|38.15|战争|马拉松与萨拉米斯等战役发生于不同年份。|已知战场定位与结果|greece,persia|0
4|peloponnesian|伯罗奔尼撒战争|-431|-404|希腊|22.43|37.08|战争|雅典与斯巴达及各自盟邦之间的战争削弱城邦体系。|盟邦连线与战区|greece|0
4|alexander|亚历山大东征|-334|-323|东地中海至印度河|44.42|32.54|战争|征服带来政权变化，也扩大希腊化时期的人员文化交流。|分阶段主要地点方向|greece,persia|0
4|roman-change|罗马共和国转向帝制|-100|-27|地中海|12.50|41.90|国家更替|长期战争、社会冲突与内战后，奥古斯都确立元首制。|罗马道路汇聚|rome|1
4|roman-roads|罗马道路与城市|-27|220|地中海世界|12.50|41.90|城市兴起|道路服务军事、行政与贸易，不等于现代国家交通网。|道路生长与城市|rome|1
4|maurya|孔雀王朝与阿育王|-322|-185|南亚|85.14|25.61|帝国扩张|孔雀王朝统治南亚广大地区，阿育王支持佛教。|概略区域与石柱|maurya|1
4|qin|秦统一|-221|-206|中国|108.71|34.33|国家更替|秦统一六国并推行行政与制度整合。|区域聚合与道路|han|0
4|han-networks|汉代与中亚交流|-130|220|长安—河西—中亚|108.94|34.26|贸易|多段贸易依赖中亚等地中介，并有并行海路。|分叉丝路与物件移动|han,silk|1
5|rome-division|罗马帝国的分治|284|395|地中海|28.98|41.01|国家更替|三世纪以来多次分治，395年后的东西政治格局逐渐持续。|分层区域缓慢变化|byzantium|1
5|west-rome|西罗马统治结构终结|476|476|意大利|12.20|44.42|国家更替|476年是常用标志，西部罗马制度和文化并未突然消失。|权力中心变暗与延续线|byzantium|0
5|east-rome|东罗马延续|330|650|君士坦丁堡与东地中海|28.98|41.01|国家更替|东罗马自视为罗马帝国的延续。|建筑与城市再聚焦|byzantium|1
5|christianity|基督教的发展与传播|250|650|地中海及周边|35.23|31.78|宗教传播|宗教传播、政治支持与教义争论是不同层次的过程。|开放网络与地区辉光|byzantium|1
5|gupta|笈多时代文化科学|320|550|南亚|82.97|25.32|科学成就|数学、天文学、文学与艺术经多人多地积累发展。|数位与寺院网络|gupta,buddhism|1
5|buddhist-networks|佛教沿陆海网络传播|220|650|南亚、中亚与东亚|80.18|37.11|宗教传播|商人、僧侣、译经与地方社会共同参与传播。|多路经卷移动|buddhism,silk|1
5|sui-tang|分裂后的隋唐政权|220|618|中国|108.94|34.26|国家更替|魏晋南北朝历经多个政权，隋589年统一，唐618年建立。|多中心连接与运河|sixdynasties,suitang|0
5|early-islam|伊斯兰教兴起与早期扩展|610|650|阿拉伯半岛及西亚|39.61|24.47|宗教传播|7世纪宗教兴起与阿拉伯政权扩展，政治控制不等于立即皈依。|半岛聚焦后概略外扩|islam|1
6|tang-song|唐宋城市与技术|650|1279|中国|114.31|30.60|科学成就|城市商业、造纸、印刷与火药技术在不同阶段发展。|城市星群与工艺剖面|china|1
6|diamond-sutra|868年《金刚经》印本|868|868|敦煌出土文物|94.81|40.04|科学成就|现存有明确纪年的早期完整印本；不是印刷技术发明时刻。|木版与纸张压印|print|0
6|abbasid|阿拔斯学术与翻译|750|1000|巴格达|44.37|33.31|科学成就|跨语言学者整理、翻译并创新数学医学等知识。|书页—知识网络|abbasid,translation|1
6|indian-ocean|印度洋贸易网络|650|1400|印度洋|75.78|11.26|贸易|季风帮助多方向航行，沿海社会长期参与交流。|季风弧线与帆船|silk,kilwa|1
6|southeast-asia|东南亚港口与信仰|700|1300|苏门答腊及海峡|104.75|−2.99|贸易|港口联系南亚与东亚，宗教和文化由本地社会重新塑造。|港口网络与建筑|silk|1
6|mali|马里与跨撒哈拉贸易|1230|1400|西非萨赫勒|−3.01|16.77|贸易|黄金、盐与其他物资交换支撑西非城市和政治力量。|陆上虚线与商队|mali|1
6|kilwa|基尔瓦与斯瓦希里海岸|1200|1400|东非海岸|39.52|−8.96|城市兴起|非洲沿海商人连接腹地、阿拉伯、印度与中国。|海港转印度洋地图|kilwa|1
6|maya|玛雅城市、文字与历法|250|900|中美洲|−89.62|17.22|科学成就|玛雅社会拥有复杂文字与历法，城市兴衰各不相同。|阶梯建筑与天文盘|maya|1
6|europe-towns|欧洲城市与大学|1100|1400|西欧|11.34|44.49|文化传播|城市商业及大学制度发展，学习包括跨文化知识交流。|城市与书籍连线|bologna,renaissance|1
6|mongol|蒙古扩张与欧亚联系|1206|1279|蒙古及欧亚大陆|102.82|47.20|帝国扩张|多代扩张伴随毁灭和人口迁移，也重组跨区域交通。|分代墨染与驿站|mongol,silk|0
6|black-death|黑死病|1347|1353|地中海、欧洲、西亚及北非|15.09|37.50|灾难|瘟疫造成灾难性死亡；早期起源和传播细节仍有研究争论。|肃穆灰红扩散示意|plague,plagueDebate|1
7|renaissance|文艺复兴与人文主义|1350|1550|意大利及欧洲|11.26|43.77|文化传播|城市、赞助和古典文献研究推动文化变化。|建筑透视与书页|renaissance|1
7|china-print-context|东亚印刷的不同背景|868|1400|东亚|114.31|30.60|科学成就|欧洲印刷之前，东亚雕版和活字已有长期发展。|双时段印刷对照|print,china|1
7|gutenberg|欧洲金属活字印刷|1450|1500|美因茨及欧洲|8.27|50.00|科学成就|15世纪中叶欧洲印刷系统推广，加快文本复制。|字模排列与压印|renaissance|1
7|zheng-he|郑和下西洋|1405|1433|南海与印度洋|118.80|32.06|航海|七次航行依托早已存在的印度洋交通网络。|分段港口航线|zheng|0
7|portugal-africa|葡萄牙沿非洲航行|1415|1488|非洲西岸至好望角|18.48|−34.36|航海|逐步探航改变海路，也伴随暴力、殖民与奴役。|沿海分阶段路线|gama,columbus|1
7|columbus-1492|1492年跨大西洋航行|1492|1492|加那利至加勒比|−74.50|24.06|航海|欧洲人与长期存在的美洲社会建立持续而不平等的联系。|大西洋航线跟随|columbus,america|0
7|gama-1498|达·伽马抵达印度|1497|1498|好望角至卡利卡特|75.78|11.26|航海|船队经非洲南端进入印度洋，利用区域航海知识抵达印度。|绕非洲再进入季风区|gama|0
8|aztec-conquest|墨西加帝国遭征服|1519|1521|特诺奇蒂特兰|−99.13|19.43|战争|西班牙军与原住民盟友、地方冲突和疫病共同影响结果。|城市、围困与断裂|conquest,america|0
8|inca-conquest|印加政权遭征服|1532|1533|安第斯|−78.52|−7.16|战争|西班牙征服利用内战局势，安第斯抵抗此后仍延续。|卡哈马卡定位与扩散|conquest|0
8|crops|哥伦布大交换：作物|1500|1700|跨大西洋及全球|−30|10|贸易|玉米、马铃薯等与小麦、牲畜等跨洋迁移，影响饮食与生态。|作物双向移动|exchange|1
8|disease-americas|疾病、强制劳动与人口灾难|1500|1700|美洲|−85|10|灾难|疫病与殖民暴力、剥削相互作用，造成严重人口灾难。|克制的聚落熄灭|exchange,conquest|1
8|atlantic-slavery|大西洋奴隶贸易|1500|1700|非洲至美洲|−1.24|5.10|强迫迁移|被奴役者遭强迫跨洋，贸易在本章后仍长期延续。|无娱乐货物图标的强迫迁移线|slavery|1
8|global-silver|美洲白银与亚洲商品|1565|1700|阿卡普尔科—马尼拉|120.98|14.60|贸易|白银、丝绸与瓷器把太平洋与更广阔市场连接起来。|跨太平洋分段网络|silver|1
8|reformation|欧洲宗教改革|1517|1648|欧洲|12.64|51.87|宗教传播|改革、反改革及政治冲突重塑欧洲社会，不能简化为单一战争。|文本网络分叉|reform|1
9|copernicus|哥白尼著作出版|1543|1543|纽伦堡|11.08|49.45|科学成就|《天体运行论》提出以太阳为中心安排天体的模型。|地图变天体运行图|science|0
9|galileo|伽利略观测与实验|1609|1638|帕多瓦与佛罗伦萨|11.88|45.41|科学成就|望远镜观测与运动研究提供新证据，并引发争论。|透镜、木星卫星与落体|science|1
9|kepler|开普勒行星运动研究|1609|1619|布拉格等地|14.42|50.08|科学成就|利用第谷的观测数据发展行星运动定律。|椭圆轨道与等面积扇区|science|0
9|science-networks|知识传播与共同检验|1550|1720|欧洲及跨区域网络|2.35|48.86|文化传播|仪器、印刷、通信与研究共同体改变知识生产。|观测点和书信网络|renaissance,newton|1
9|newton-1687|《自然哲学的数学原理》|1687|1687|伦敦|−0.13|51.51|科学成就|牛顿以数学体系联系地面运动与天体运动。|公式线转机械曲线|newton,science|0
9|science-limits|从科学到工业的多重条件|1687|1760|英国及欧洲|−1.90|52.49|工业化|工业变革还依赖工匠技能、能源、制度、资本和劳动组织。|轨道齿轮连接能源与劳动|industrial,watt|1
10|enlightenment|启蒙思想与公共讨论|1700|1789|欧洲及大西洋世界|2.35|48.86|思想形成|理性、权利、主权与法律的讨论包含多种相互冲突立场。|出版、咖啡馆与文字网络|enlighten|1
10|american-war|美国独立战争|1775|1783|北美东部|−71.35|42.45|战争|殖民地独立牵涉帝国、地方利益及国际战争。|列克星敦与约克镇定位|americanWar,declaration|0
10|declaration-1776|《独立宣言》通过|1776|1776|费城|−75.15|39.95|革命|1776年7月4日大陆会议通过宣言，不应称所有代表当天签字。|纸页与政治节点|declaration|0
10|france-1789|法国大革命的1789年|1789|1789|巴黎与凡尔赛|2.35|48.86|革命|财政危机、社会矛盾及政治动员推动制度激变。|三级会议—巴士底狱—权利宣言|france|0
10|haitian|海地革命|1791|1804|圣多明各／海地|−72.21|19.76|革命|被奴役者争取自由，经过复杂战争建立独立国家。|加勒比聚焦与解放网络|haiti|0
10|napoleon-wars|拿破仑战争|1803|1815|欧洲|16.76|49.13|战争|征服、改革与抵抗改变欧洲，给许多地区带来沉重伤亡。|奥斯特里茨等真实战场|napoleon|0
10|waterloo|滑铁卢战役|1815|1815|比利时|4.41|50.68|战争|1815年6月18日拿破仑战败，其帝国统治最终结束。|战场位置与结果|waterloo|0
11|coal|煤矿与能源变化|1760|1848|英国|−1.62|54.97|工业化|煤炭扩大可用能量，同时矿业与动力技术相互促进。|地层剖面到矿井|steam,industrial|1
11|textiles|纺织机械与工厂制|1760|1800|兰开夏等地|−2.24|53.48|工业化|纺纱、织造、水力与劳动组织一起变化，并非一步由手工变蒸汽。|手工—水轮—机械纺织|derwent,industrial|1
11|watt-patent|瓦特分离冷凝器专利|1769|1769|英国|−4.25|55.86|科学成就|瓦特在已有蒸汽机基础上改进效率，后来与博尔顿合作推广。|活塞与冷凝器运动|watt,steam|0
11|rotary-engine|蒸汽动力的旋转应用|1780|1800|伯明翰等地|−1.90|52.49|工业化|连杆和传动把往复运动用于工厂机械，水力仍长期重要。|活塞—曲柄—飞轮|engine|1
11|canals|运河、原料与市场|1760|1830|英国工业区|−2.25|53.38|贸易|运河降低运输成本，原料供应又与殖民和强迫劳动相关。|运河船与供应网络|derwent,industrial,slavery|1
11|railway-1830|利物浦—曼彻斯特铁路|1830|1830|英国西北部|−2.61|53.45|工业化|1830年线路开通，铁路促进货物与人员流动。|列车轮接地图线路|rail|0
11|industrial-diffusion|工业化向其他地区扩展|1800|1848|欧洲大陆与北美部分地区|4.35|50.85|工业化|各地的工业化节奏、行业与制度条件并不相同。|多区域渐次增长|industrial|1
11|urban-labour|工业城市与劳动关系|1800|1848|曼彻斯特等地|−2.24|53.48|城市兴起|工厂集中生产，城市扩大，劳动条件和社会保障成为争论焦点。|橙色工厂转冷灰城市|factory,engels|1
12|factory-life|工业社会中的工人生活|1800|1848|英国与欧洲工业区|−2.24|53.48|工业化|长工时、童工、住房和卫生问题引发抗争和改革。|工厂内景与生活剖面|factory,engels|1
12|factory-act|1833年工厂法|1833|1833|英国|−0.13|51.51|社会运动|法律限制部分纺织厂儿童劳动并引入检查，但执行与覆盖有限。|时间尺与检查文书|factory|0
12|chartism|宪章运动|1838|1848|英国|−0.13|51.51|社会运动|工人等群体要求扩大政治权利，并在1839、1842、1848年请愿。|请愿签名汇入伦敦|chartist|0
12|socialisms|早期社会主义的多种主张|1820|1848|英国、法国与德语地区|2.35|48.86|思想形成|欧文、圣西门、傅立叶等提出不同改革与社会重组方案。|多种书页并行|marx,engels|1
12|marx-engels-1844|马克思与恩格斯合作|1844|1844|巴黎|2.35|48.86|思想形成|1844年在巴黎深入交流后开始长期合作。|巴黎—曼彻斯特—布鲁塞尔|marx,engels|0
12|german-ideology|1845—1846年思想探索|1845|1846|布鲁塞尔|4.35|50.85|思想形成|共同手稿研究历史与社会，其后来的编辑出版不能倒置为当时公开影响。|手稿与概念关系图|marx,engels|0
12|communist-league|共产主义者同盟委托|1847|1847|伦敦|−0.13|51.51|社会运动|同盟于1847年委托马克思、恩格斯起草政治纲领。|欧洲联系汇入书稿|manifesto|0
12|manifesto-1848|《共产党宣言》发表|1848|1848|伦敦|−0.13|51.51|思想形成|1848年2月德文小册子出版，提出资本主义、阶级关系的分析和政治主张。|书册展开再回世界|manifesto,iish|0
12|interpretation|理论、历史事实与后续争论|1848|1848|欧洲与全球后续影响|−0.13|51.51|思想形成|该理论是历史性的分析与政治主张，后世理解和争论不能呈现为自然定律。|书页化成未封闭的全球网络|marx,engels|1
'''
events=[]
for line in rows.strip().splitlines():
    p=line.replace('−','-').split('|')
    ch,id,name,start,end,region,lon,lat,typ,explanation,visual,keys,disputed=p
    events.append(dict(id=id,name=name,startYear=int(start),endYear=int(end),region=region,coordinates=[float(lon),float(lat)],chapter=int(ch),type=typ,explanation=explanation,visual=visual,sources=[S[k][1] for k in keys.split(',')],dateDisputed=bool(int(disputed)),approximateMap=True,sourceNotes='坐标为代表性中心点；所有空间影响区域与连线均为概略示意，不是精确疆界、普遍宗教边界或完整真实行程。',sourceIds=keys.split(',')))
root=Path(__file__).resolve().parent
(root/'events.json').write_text(json.dumps(events,ensure_ascii=False,indent=2)+'\n')
(root/'sources.json').write_text(json.dumps([dict(id=k,title=v[0],url=v[1]) for k,v in S.items()],ensure_ascii=False,indent=2)+'\n')
print(f'{len(events)} events; chapter counts: '+str({c:sum(e['chapter']==c for e in events) for c in range(1,13)}))
