"""Build the 4:54, silent textbook edition from original Chinese editorial data.
The photographed contents (lessons 1–21) determine scope. No Silk Road section.
Dates follow historical BCE/CE numbering: year zero is never generated.
"""
from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1]
CHAPTERS={1:'文明的产生与古代亚非文明',2:'古代欧洲文明',3:'封建时代的欧洲',4:'中古时期的亚洲、非洲和美洲',5:'走向近代',6:'资本主义制度的初步确立',7:'工业革命、马克思主义与工人运动'}
LESSONS={1:'从原始社会到奴隶社会',2:'古代两河流域',3:'古代埃及',4:'古代印度',5:'古代希腊',6:'古代罗马',7:'法兰克王国和西欧封建制度',8:'西欧的城市和大学',9:'拜占庭帝国',10:'封建时代的日本',11:'阿拉伯帝国',12:'中古时期的非洲和美洲',13:'西欧经济社会发展与文艺复兴运动',14:'探寻新航路',15:'早期殖民掠夺',16:'英国资产阶级革命',17:'美国的独立',18:'法国大革命和拿破仑帝国',19:'第一次工业革命',20:'马克思主义的诞生',21:'第一国际和巴黎公社'}
# key, unit, lesson, title, date, historical start/end, caption, focus/zoom,
# source ids, type. Every composition has an independent visual key.
S=[
('uruk',1,1,'河流之间，城市出现','约公元前3500年',-3500,-3200,'乌鲁克逐渐成长为早期城市。|农业剩余，让分工与城市生活成为可能。',[44.7,32.5],7,['uruk'],'文明诞生'),
('irrigation',1,1,'从协作，到社会分化','约公元前3500年起',-3500,-3000,'财富和权力分化，早期国家形成。|奴隶制逐渐发展，各地经历并不相同。',[44,32],6,['uruk','bronze'],'社会变化'),
('tablet',1,2,'把数量，刻进泥板','约公元前3300年',-3300,-3000,'两河流域出现早期楔形文字。|记录物资，让管理超越个人记忆。',[45.64,31.32],6,['writing'],'文化成就'),
('hammurabi',1,2,'法律，被公开刻在石上','约公元前1750年',-1750,-1750,'《汉谟拉比法典》汇集法律判例。|作为早期法律遗存，它体现王权与等级。',[44.42,32.54],6,['hammurabi'],'法典'),
('pyramid',1,3,'尼罗河畔，国家与工程','约公元前3100—前2500年',-3100,-2500,'埃及走向统一，后来建起金字塔。|大型工程体现王权和国家组织能力。',[31,27],4,['earlyEgypt','egypt'],'国家形成'),
('egypt_calendar',1,3,'观察天象，记录时间','公元前第三千纪起',-3000,-2000,'埃及人发展文字、历法与测量。|知识帮助安排农事，也服务国家管理。',[31.2,29.9],4,['egyptCalendar','egyptWriting'],'文化成就'),
('harappa',1,4,'城市之下，还有排水系统','约公元前2600—前1900年',-2600,-1900,'印度河城市有街区和排水设施。|规划与公共工程，反映复杂社会组织。',[69,28],4.7,['indus'],'城市兴起'),
('caste',1,4,'等级，被写进社会秩序','约公元前第一千纪',-1000,-500,'古印度逐渐形成种姓等级秩序。|出身限制身份与交往，并非社会平等。',[80.5,26.8],3,['varna'],'社会制度'),
('buddhism',1,4,'苦难，能否得到解脱？','约公元前6—前5世纪',-600,-400,'佛教兴起，强调修行与解脱。|它挑战祭祀特权，影响亚洲思想文化。',[85,25],3,['buddhism'],'宗教思想'),
('agora',2,5,'谁能在城邦中发言？','公元前5世纪',-500,-400,'雅典成年男性公民参与政治。|民主具有开创性，也排除妇女与奴隶。',[23.73,37.98],5,['greece','athens'],'政治制度'),
('alexander',2,5,'征服，打开希腊化时代','公元前334—前323年',-334,-323,'亚历山大东征，建立庞大帝国。|战争带来破坏，也推动跨地区文化交融。',[45,32],2.7,['greece','persia'],'战争'),
('roman_republic',2,6,'从君王，到共和国','传统纪年：公元前509年',-509,-509,'传统记载中，罗马从王政转向共和国。|贵族与平民斗争，推动公民政治发展。',[12.48,41.89],4,['romanRepublic','rome'],'政治制度'),
('twelve_tables',2,6,'让规则，不再只被少数人掌握','公元前451—前450年',-451,-450,'《十二铜表法》把法律公开成文。|它限制任意解释，仍保留身份不平等。',[12.48,41.89],4,['twelveTables'],'法典'),
('rome',2,6,'共和国，走向帝国','公元前27年—公元2世纪',-27,200,'罗马进入帝国时期，兴建道路与水渠。|法律和工程影响后世，扩张依赖征服。',[12,42],4,['rome'],'国家更替'),
('rome_split',2,6,'西部终结，东部延续','395年 / 476年',395,476,'罗马东西分治；476年西部帝位终结。|东罗马延续，古代制度并未同时消失。',[20,39],3.4,['byzantium'],'国家更替'),
('frankish',3,7,'西欧，形成新的王国','481年起 / 800年',481,800,'法兰克王国扩展，查理曼加冕称帝。|王权与教会合作，重塑西欧政治秩序。',[5,48],3,['franks','charlemagne'],'国家形成'),
('feudal',3,7,'土地与义务，层层相连','约8—11世纪',700,1100,'封君封臣以土地和义务建立联系。|庄园劳动支撑领主，农民承担沉重负担。',[3,48],3,['feudal'],'社会制度'),
('town_charter',3,8,'城市，争取自己的规则','约10—13世纪',900,1300,'西欧城市复兴，部分取得自治权。|市民和商业成长，改变庄园之外的生活。',[2.5,49],3,['townCharter'],'社会变化'),
('university',3,8,'学问，形成新的共同体','约11—13世纪',1088,1300,'大学逐渐兴起，师生形成共同体。|教学与辩论，推动知识传承和专业教育。',[11.34,44.49],5,['bologna'],'文化成就'),
('justinian',3,9,'把罗马法，整理成体系','529—534年及以后',529,534,'《罗马民法大全》系统整理罗马法律。|它成为后世大陆法发展的重要源头。',[28.98,41.01],5,['justinian'],'法典'),
('byzantium',3,9,'延续千年，留下文化遗产','330—1453年',330,1453,'拜占庭延续罗马传统，保存古典知识。|1453年覆亡，法律与文化影响仍在。',[28.98,41.01],4,['byzantium'],'文化传承'),
('taika',4,10,'改革，向中央集权推进','645年起',645,700,'日本大化改新，借鉴唐朝等制度。|改革逐步加强中央权力，并非一朝完成。',[135.8,34.5],6,['taika'],'政治改革'),
('shogunate',4,10,'武士与将军，掌握政治力量','1185年起 / 1192年',1185,1192,'源赖朝建立镰仓政权，后获将军称号。|幕府时代开启，天皇与武家权力并存。',[139.55,35.32],6,['kamakura','yoritomo'],'政治制度'),
('arabia',4,11,'信仰与政权，在半岛兴起','7—8世纪',610,750,'伊斯兰教兴起，阿拉伯政权向外扩展。|新的政治与文化共同体逐渐形成。',[43,28],2.5,['islam','umayyad'],'宗教与国家'),
('astrolabe',4,11,'翻译之后，继续研究','8—13世纪',750,1258,'阿拉伯世界学者翻译并发展多地知识。|数学、医学与天文学影响后来世界。',[44.36,33.31],3,['abbasid','translation'],'科学文化'),
('mali',4,12,'非洲，拥有自己的国家与城市','约13—15世纪',1200,1500,'马里与大津巴布韦等社会发展。|国家、城市和建筑展现非洲多样历史。',[8,0],1.5,['mali','zimbabwe'],'文明发展'),
('americas',4,12,'大洋彼岸，文明独立生长','约3—16世纪',250,1533,'玛雅发展文字历法；阿兹特克、印加兴起。|美洲早有复杂社会，绝非等待发现的空地。',[-89,8],1.9,['maya','america'],'文明发展'),
('perspective',5,13,'重新观看人，与现实世界','14—16世纪',1300,1600,'文艺复兴重研古典文化，强调人的价值。|人文主义推动艺术、思想与文化革新。',[12,43],3,['renaissance'],'思想文化'),
('manufactory',5,13,'生产，开始换一种组织方式','约14—16世纪',1300,1600,'租地农场与手工工场逐渐发展。|雇佣劳动和经营扩大，积累近代社会条件。',[2,50],3,['domestic','capitalism'],'生产组织'),
('voyages',5,14,'跨越海洋，新的航路出现','1492年 / 1498年 / 1519—1522年',1492,1522,'横渡大西洋、绕非洲与首次环球航行。|新航路加强全球联系，也打开殖民通道。',[10,10],1,['columbus','gama','magellan','elcano'],'航海'),
('conquest',5,15,'航路之后，是殖民征服','1521年 / 1532—1533年',1521,1533,'阿兹特克、印加的统治中心遭征服。|战争、疾病与强迫劳动造成深重灾难。',[-88,3],2,['conquest','exchange'],'殖民征服'),
('slavery',5,15,'财富积累，伴随被迫迁移','16—19世纪',1500,1800,'奴隶贸易迫使数百万人离开非洲。|殖民掠夺积累财富，也留下长期创伤。',[-35,0],1.7,['slavery'],'殖民掠夺'),
('english_revolution',6,16,'国王，也要面对议会','1640年 / 1649年 / 1688年',1640,1688,'英国经历革命、共和国和王政复辟。|1688年政变后，议会力量进一步扩大。',[-.12,51.5],4,['civilWar','gloriousRevolution'],'革命'),
('bill_rights',6,16,'权力，受到法律约束','1689年',1689,1689,'《权利法案》限制王权，保障议会权利。|英国君主立宪制逐步确立和发展。',[-.12,51.5],4,['billRights'],'法典与制度'),
('american_war',6,17,'十三个殖民地，走向独立','1775—1783年',1775,1783,'1783年，英国承认美国独立。|反殖民战争，为新国家奠定基础。',[-76,40],4,['americanWar','parisTreaty'],'革命'),
('independence',6,17,'宣布独立，也提出权利原则','1776年7月4日',1776,1776,'《独立宣言》提出平等与人民主权。|独立并未同时消除奴隶制和性别排斥。',[-75.16,39.95],4,['declaration'],'政治文献'),
('constitution',6,17,'共和国，怎样分配权力？','1787年',1787,1787,'美国宪法确立联邦制与分权制衡。|新制度限制权力，却保留奴隶制妥协。',[-75.16,39.95],4,['constitution','constitutionText'],'宪法'),
('bastille',6,18,'旧秩序，被革命撼动','1789年7月14日',1789,1789,'巴黎民众攻占巴士底狱，革命深入。|法国革命冲击封建特权与君主专制。',[2.37,48.85],4,['france'],'革命'),
('rights_man',6,18,'把自由与平等，写成权利','1789年8月',1789,1789,'《人权宣言》主张自由和法律面前平等。|这些原则影响深远，实践仍有排斥与冲突。',[2.35,48.86],4,['humanRights'],'政治文献'),
('napoleon_code',6,18,'革命后的秩序，写进民法','1804年',1804,1804,'《拿破仑法典》统一民法、保障财产权。|它巩固革命成果，也保留对妇女的限制。',[2.35,48.86],4,['napoleonicCode','napoleonicWomen'],'法典'),
('napoleon',6,18,'改革与征服，交织在一起','1804—1815年',1804,1815,'拿破仑建立帝国，战争席卷欧洲。|制度改革传播，征服也激起反抗并终告失败。',[18,50],2.6,['napoleon','waterloo'],'战争'),
('textile',7,19,'工场，变成机器工厂','18世纪后半叶起',1760,1800,'英国纺织业机械化，工厂制度发展。|能源、资本与劳动组织共同推动工业化。',[-2.24,53.48],5,['derwent','industrial'],'工业革命'),
('steam',7,19,'蒸汽，让动力摆脱水流限制','1769年及以后',1769,1830,'瓦特等人改进蒸汽机，扩大动力应用。|生产不再只依赖水力，机器进入更多行业。',[-2,53],4,['watt','steam','engine'],'技术成就'),
('rail',7,19,'铁路，改变距离与速度','1830年',1830,1830,'利物浦—曼彻斯特铁路开通。|铁路加速运输，推动工业城市与市场扩展。',[-2.6,53.45],14,['rail'],'交通技术'),
('workers',7,20,'工业增长，也带来社会问题','1830—1840年代',1830,1849,'工人面对长工时和危险劳动，组织抗争。|工人运动推动改革，也提出新的社会问题。',[-1,53],4,['factory','chartist'],'工人运动'),
('marx',7,20,'从工业社会，提出新的分析','1844—1847年',1844,1847,'马克思与恩格斯合作，研究资本主义。|他们从生产关系和阶级矛盾提出理论。',[6,50],3,['marx','engels'],'思想形成'),
('manifesto',7,20,'《共产党宣言》，公开发表','1848年2月 · 伦敦',1848,1848,'《共产党宣言》发表，阐述新的政治主张。|通常以此作为马克思主义诞生的标志。',[-.12,51.5],1,['manifesto','iish','marx'],'理论与政治主张'),
('international',7,21,'跨越国界，联合工人组织','1864年 · 伦敦',1864,1864,'第一国际成立，联合多国工人组织。|它促进国际合作，内部也存在路线分歧。',[-.12,51.5],3,['international','internationalCertificate'],'工人运动'),
('commune',7,21,'巴黎公社，短暂的政治尝试','1871年3—5月',1871,1871,'巴黎公社短暂执政，随后遭到镇压。|它成为工人政权探索的重要历史经验。',[2.35,48.86],4,['commune'],'革命')
]
source_db={s['id']:s for s in json.loads((R/'data/sources.json').read_text())}
mapkeys={'uruk','harappa','alexander','rome_split','byzantium','arabia','mali','voyages','conquest','slavery','american_war','napoleon'}
routeids={'alexander':['alex-west-asia','alex-east'],'voyages':['columbus-1492','dagama-1498','magellan-1519'],'slavery':['forced-angola-brazil','forced-guinea-caribbean'],'rail':['liverpool-manchester']}
# Multi-point events require distinct geographic anchors, never invented polygons.
extra={
'uruk':[('uruk','乌鲁克',-3500,-3200,[45.64,31.32])],
'rome_split': [('rome-division','罗马东西分治',395,395,[12.48,41.89]),('west-rome','西罗马帝位终结',476,476,[12.48,41.89]),('east-rome','君士坦丁堡',330,1453,[28.98,41.01])],
'mali':[('mali','马里',1235,1500,[-8.0,12.6]),('zimbabwe','大津巴布韦',1100,1450,[30.93,-20.27])],
'conquest':[('aztec-conquest','特诺奇蒂特兰',1521,1521,[-99.13,19.43]),('inca-conquest','库斯科',1533,1533,[-71.97,-13.52])],
'american_war':[('lexington','列克星敦',1775,1775,[-71.23,42.45]),('yorktown','约克镇',1781,1781,[-76.51,37.24])],
'napoleon':[('napoleon-wars','奥斯特里茨',1805,1805,[16.76,49.13]),('waterloo','滑铁卢',1815,1815,[4.4,50.68])]
}
shots=[];events=[];frame=0
for i,(key,ch,lesson,title,date,year,endyear,cap,focus,zoom,ids,typ) in enumerate(S):
 lines=cap.split('|');duration=6
 rate=len(re.sub(r'[^\u4e00-\u9fff0-9]','',cap))/duration
 assert len(lines)==2 and max(map(len,lines))<=24,(key,lines)
 assert rate<=6.5,(key,rate)
 assert year and endyear,(key,'year0')
 urls=[source_db[s]['url'] for s in ids]
 es=[]
 for eid,name,ey,ee,coord in extra.get(key,[(key,title,year,endyear,focus)]):
  e=dict(id=eid,name=name,mapLabel=name if len(name)<=12 else LESSONS[lesson],startYear=ey,endYear=ee,region=LESSONS[lesson],coordinates=coord,chapter=ch,lesson=lesson,type=typ,explanation=''.join(lines),visual=f'{key}：独立场景构图；概念示意，非遗址复原',sources=urls,sourceIds=ids,dateDisputed=('约' in date or '传统' in date or '世纪' in date),approximateMap=True,sourceNotes='坐标为代表性地点。底图为现代自然地理；不绘制现代国界或冒充精确古代疆域。历史意义为综合解释；理论主张单独归属。')
  events.append(e);es.append(eid)
 shot=dict(id=f's{i+1:02}',key=key,chapter=ch,chapterTitle=CHAPTERS[ch],lesson=lesson,lessonTitle=LESSONS[lesson],startFrame=frame,endFrame=frame+duration*60,start=frame/60,end=frame/60+duration,duration=duration,mode='map' if key in mapkeys else 'scene',title=title,date=date,historicalYear=year,endHistoricalYear=endyear,caption=lines,significance=lines[-1],focus=focus,zoom=zoom,events=es,routes=routeids.get(key,[]),sources=urls,transition=['travel','iris','match','rise'][i%4],readingRate=round(rate,2),approximateMap=True)
 frame+=duration*60;shots.append(shot)
assert frame==len(S)*360
(R/'data/story.json').write_text(json.dumps(shots,ensure_ascii=False,indent=2)+'\n')
(R/'data/events.json').write_text(json.dumps(events,ensure_ascii=False,indent=2)+'\n')
def stamp(t):
 n=round(t*1000);return f'{n//3600000:02}:{n//60000%60:02}:{n//1000%60:02},{n%1000:03}'
(R/'subtitles.srt').write_text('\n\n'.join(str(i+1)+'\n'+stamp(s['start'])+' --> '+stamp(s['end'])+'\n'+'\n'.join(s['caption']) for i,s in enumerate(shots))+'\n')
lines=['# 教材目录版 · 字幕阅读脚本','','范围：约公元前3500年至'+str(shots[-1]['historicalYear'])+'年。无配音、无音乐、无音轨。日期与历史意义随镜头呈现。','']
for s in shots:lines.extend([f'## {s["start"]:.0f}—{s["end"]:.0f}s · 第{s["lesson"]}课 · {s["title"]}',s['date'],'','  \n'.join(s['caption']),''])
(R/'captions.md').write_text('\n'.join(lines))
print(json.dumps({'seconds':frame/60,'shots':len(shots),'chapters':len(set(s['chapter'] for s in shots)),'lessons':len(set(s['lesson'] for s in shots)),'uniqueCompositions':len(set(s['key'] for s in shots)),'maxReadingRate':max(s['readingRate'] for s in shots),'maxLineLength':max(len(l) for s in shots for l in s['caption'])},ensure_ascii=False))
