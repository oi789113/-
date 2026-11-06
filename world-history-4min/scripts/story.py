from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1]
# Every key selects its own composition and action. No reused movie frames.
spec=[
('uruk',5,1,'河流之间，城市亮起','约前3500年','两河之间，乌鲁克逐渐成长。|我们的旅程，从早期城市出发。',[44.7,32.5],7,['uruk'],[]),
('irrigation',6,2,'水，变成粮食','约前3500年','引水、储粮与协作相互促进。|人们聚居，劳动开始更加分化。',[44,32],6,['uruk'],[]),
('tablet',5,2,'粮食，变成账目','约前3300年','物资越来越多，记忆不够用了。|泥板上的符号，把交换留下记录。',[45.64,31.32],6,['writing'],[]),
('pyramid',6,2,'河谷，组织起国家','前3100—前2500年','尼罗河农业与国家组织，|支撑埃及城市和大型建筑工程。',[31,27],4,['egypt-state','pyramids'],[]),
('origins',7,2,'文明拥有多个起点','前3千纪—前2千纪','印度河、黄河与安第斯地区，|也在不同年代形成复杂社会。',[30,15],1,['harappa','early-china','caral'],[]),
('mediterranean',6,3,'海港像珠子，被航线串起','约前1500—前500年','铜、锡与货物连接地中海港口。|腓尼基商人也传播书写和技术。',[22,35],3.4,['late-bronze','phoenician'],['bronze-copper','phoenician-east','phoenician-west']),
('persia',6,3,'更大的国家，怎样运转？','约前6世纪','亚述、新巴比伦之后，波斯兴起。|道路与行政，连接多种语言和文化。',[43,32],3,['assyria','babylon','persia'],[]),
('bronze_stone',6,3,'不同大陆，不同的创造','约前1200—前500年','中国商周发展青铜器与礼制。|美洲奥尔梅克社会也在成长。',[10,20],1,['zhou','olmec'],[]),
('theatre',6,4,'城邦之间，思想与冲突','约前5世纪','希腊城邦交流，也彼此竞争。|哲学、戏剧与战争共同留下影响。',[24,38],5,['greek-poleis','persian-wars','peloponnesian'],[]),
('alexander',5,4,'征服，让文化相遇','前334—前323年','亚历山大向东征服。|希腊化世界在交融与统治中展开。',[45,32],2.7,['alexander'],['alex-west-asia','alex-east']),
('rome',6,4,'路，穿过城市','前1世纪—公元2世纪','罗马从共和国走向帝国。|道路维系统治，也依赖征税和奴隶劳动。',[12,42],4,['roman-change','roman-roads'],[]),
('asia_states',6,4,'把镜头转向东方','前3世纪—公元2世纪','南亚孔雀王朝与中国秦汉，|在不同阶段组织庞大的国家。',[89,31],2.1,['maurya','qin','han-networks'],[]),
('silk',7,4,'丝绸之路，是接力网','约前2世纪—公元2世纪','货物与知识经过多次转手。|中亚和西亚，是连接远方的重要中介。',[68,34],1.9,['han-networks'],['silk-east','silk-north','silk-south','silk-central','silk-west','silk-india']),
('rome_split',6,5,'帝国更替，城市延续','395—476年及以后','西罗马的统治结构走向终结。|东罗马延续，制度并未同时消失。',[20,39],3.4,['rome-division','west-rome','east-rome'],[]),
('faith',7,5,'信仰，越过政权的边界','约3—7世纪','佛教、基督教与伊斯兰教，|在不同阶段建立跨地区的联系。',[57,29],1.8,['buddhist-networks','christianity','early-islam','sui-tang'],['christian-mediterranean','buddhist-land','buddhist-sea']),
('woodblock',6,6,'一张纸，留下更多知识','唐宋时期','造纸、印刷与火药技术不断积累。|城市和市场，让经验更快流动。',[112,33],2.8,['tang-song','diamond-sutra'],[]),
('astrolabe',6,6,'翻译之后，继续追问','约8—13世纪','阿拔斯时期，学者翻译并研究知识。|数学与医学在交流中发展。',[44.36,33.31],3,['abbasid'],[]),
('monsoon',6,6,'风，推动海上网络','约7—14世纪','印度洋季风推动航船。|东非、南亚与东南亚港口彼此相连。',[65,8],1.9,['indian-ocean','kilwa','southeast-asia'],['indian-west','indian-arabia','indian-east']),
('three_worlds',7,6,'同时代的世界，不止一个中心','约10—14世纪','马里参与贸易，玛雅发展城市与历法。|欧洲的城市、大学和商业也在成长。',[-20,20],1,['mali','maya','europe-towns'],['sahara-west']),
('mongols',5,6,'征服重组欧亚联系','13世纪','蒙古扩张历经数代，带来巨大破坏。|统治下的通道，也促进了往来。',[75,38],1.8,['mongol'],['silk-medieval']),
('plague',5,6,'联系，也传播灾难','14世纪','黑死病沿跨区域联系蔓延。|无数人的生命与生活被改变。',[22,41],2.6,['black-death'],['plague-blacksea']),
('perspective',5,7,'重新观看人与世界','14—16世纪','文艺复兴重新研究古典知识。|艺术与人文主义带来新的表达。',[12,43],3,['renaissance'],[]),
('press',6,7,'文字，获得新的速度','15—16世纪','欧洲金属活字扩大文字传播。|知识与宗教争论走向更多读者。',[8,50],3,['gutenberg','reformation','china-print-context'],[]),
('voyages',7,7,'海洋成为新的通道','1405—1498年','郑和远航；欧洲船队跨越大洋。|美洲早已有众多人群与复杂社会。',[10,10],1,['zheng-he','columbus-1492','gama-1498'],['zheng-main','dagama-1498','columbus-1492']),
('conquest',6,8,'相遇，也成为征服','16世纪','阿兹特克与印加的政治中心遭征服。|疾病、战争和强迫劳动酿成人口灾难。',[-88,3],2,['aztec-conquest','inca-conquest','disease-americas'],[]),
('exchange',5,8,'跨洋交换，改变日常生活','16世纪起','玉米、马铃薯走向其他大陆。|物种与白银，让全球联系更加紧密。',[-28,14],1.1,['crops','global-silver'],['exchange-crops','exchange-livestock','silver-pacific','silver-asia']),
('slavery',6,8,'这些航线，意味着强迫迁移','16世纪起，延续更久','奴隶贸易强迫数百万人离开非洲。|被奴役者的劳动与抵抗改变大西洋世界。',[-35,0],1.7,['atlantic-slavery'],['forced-angola-brazil','forced-guinea-caribbean']),
('astronomy',7,9,'观测，改变宇宙图景','1543—1619年','哥白尼提出新体系；伽利略观测天空。|开普勒以椭圆轨道描述行星运动。',[15,48],2,['copernicus','galileo','kepler'],[]),
('newton',6,9,'地上与天上，共用数学语言','1687年','牛顿以运动和引力连接不同现象。|证据、仪器与交流，让知识持续修正。',[-.12,51.5],3,['newton-1687','science-networks'],[]),
('enlightenment',5,10,'旧秩序，受到新的质问','18世纪','启蒙思想家争论权利、主权和法律。|谁能决定共同生活的规则？',[2.35,48.86],3,['enlightenment'],[]),
('revolutions',7,10,'宣言，走进政治现实','1776 / 1789年','北美独立与法国革命冲击旧制度。|平等的承诺，并未立即属于所有人。',[-32,42],1.8,['declaration-1776','american-war','france-1789'],[]),
('haiti',6,10,'被奴役者，为自由而斗争','1791—1804年','海地革命将自由诉求推向被奴役者。|1804年独立，留下反奴隶制的重要节点。',[-72.3,18.55],7,['haitian'],[]),
('napoleon',5,10,'战争，改变欧洲格局','1805—1815年','拿破仑的扩张最终失败。|制度变化的背后，是沉重伤亡。',[18,50],2.6,['napoleon-wars','waterloo'],[]),
('textile',7,11,'从手工，走进机械化生产','18世纪后半叶起','水力推动纺织机器，蒸汽随后扩展。|能源、资本与生产组织共同推动工业化。',[-2.24,53.48],5,['textiles','coal'],[]),
('steam',6,11,'让往复运动，变成持续转动','18世纪后半叶—19世纪','活塞、连杆与飞轮传递动力。|工人、设备与工时也被集中组织起来。',[-2,53],4,['watt-patent','rotary-engine'],[]),
('rail',6,11,'车轮，把工业网络拉长','1830年及以后','铁路连接工厂、港口与市场。|工业化向欧洲大陆和北美部分地区扩展。',[-2.6,53.45],14,['railway-1830','industrial-diffusion'],['liverpool-manchester']),
('city',6,11,'机器改变生产，也改变生活','19世纪前半叶','城市扩张，财富增长。|拥挤、污染与危险劳动，也随之加剧。',[-2.24,53.48],4,['urban-labour','factory-life'],[]),
('workers',6,12,'工人，开始组织自己的诉求','1830—1840年代','结社、罢工、宪章运动与改革，|回应工资、工时和政治权利问题。',[-1,53],4,['chartism','factory-act','socialisms'],[]),
('marx',7,12,'从工业社会，走向新的理论','1840年代','马克思与恩格斯合作，研究资本主义。|他们从生产关系与阶级矛盾提出分析。',[6,50],3,['marx-engels-1844','german-ideology'],[]),
('manifesto',6,12,'1848：新的思想，新的争论','1848年 · 伦敦','《共产党宣言》发表，提出政治主张。|历史仍在继续，这些思想也持续受到讨论。',[-.12,51.5],1,['manifesto-1848','communist-league','interpretation'],[])
]
# Keep a four-minute programme while giving dense comparisons an extra beat.
assert len(spec)==40
total=sum(s[1] for s in spec)
if total!=240:
 idx=next(i for i,s in enumerate(spec) if s[0]=='origins');s=list(spec[idx]);s[1]+=240-total;spec[idx]=tuple(s)
events={e['id']:e for e in json.loads((R/'data/events.json').read_text())}
shots=[];frame=0
mapkeys={'uruk','origins','mediterranean','persia','alexander','asia_states','silk','rome_split','faith','mongols','plague','voyages','conquest','slavery','napoleon'}
for i,(key,duration,ch,title,date,cap,focus,zoom,ids,routes) in enumerate(spec):
 rate=len(re.sub(r'[^\u4e00-\u9fff0-9]','',cap))/duration
 assert rate<=7.2,(key,rate)
 shot=dict(id=f's{i+1:02}',key=key,chapter=ch,startFrame=frame,endFrame=frame+duration*60,start=frame/60,end=frame/60+duration,duration=duration,mode='map' if key in mapkeys else 'scene',title=title,date=date,caption=cap.split('|'),focus=focus,zoom=zoom,events=ids,routes=routes,sources=sorted(set(u for eid in ids for u in events[eid]['sources'])),transition=['travel','iris','match','rise'][i%4],readingRate=round(rate,2),approximateMap=True)
 frame+=duration*60;shots.append(shot)
assert frame==14400
(R/'data/story.json').write_text(json.dumps(shots,ensure_ascii=False,indent=2)+'\n')
def stamp(t):
 n=round(t*1000);return f'{n//3600000:02}:{n//60000%60:02}:{n//1000%60:02},{n%1000:03}'
(R/'subtitles.srt').write_text('\n\n'.join(str(i+1)+'\n'+stamp(s['start'])+' --> '+stamp(s['end'])+'\n'+'\n'.join(s['caption']) for i,s in enumerate(shots))+'\n')
lines=['# 四分钟世界历史 · 字幕阅读脚本','','从约前3500年两河流域到1848年。无配音、无背景音乐、无音轨。','']
for s in shots:lines.extend([f'## {s["start"]:.0f}—{s["end"]:.0f}s · {s["title"]}',s['date'],'','  \n'.join(s['caption']),''])
(R/'captions.md').write_text('\n'.join(lines))
print(json.dumps({'seconds':frame/60,'shots':len(shots),'uniqueCompositions':len(set(s['key'] for s in shots)),'maxReadingRate':max(s['readingRate'] for s in shots),'durations':[s['duration'] for s in shots]},ensure_ascii=False))
