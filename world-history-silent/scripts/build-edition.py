"""Build the no-voice edition from editorial captions, never speech timings."""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1]
captions='''五千多年的历史，压缩成600秒。|人类如何一步步连接世界？
让城市灯光熄灭，时间向后奔跑。|旅程从两河流域开始。
越过机器、航船和帝国，|回到早期城市正在生长的时代。
约公元前3500年，两河之间，|乌鲁克等城市逐渐扩大。
粮食、劳动与交换聚集起来，|陌生人开始共同生活。
两河流域，城市点亮地图。|旅程由此开始。
河水被引入农田，粮食得以储存。|更多人聚居，也更需要组织与协作。
有人耕种，有人制作器物，|还有人组织劳作、祭祀和交换。
物资越来越多，记忆不够用了。|泥板上的符号，把交易变成记录。
埃及约前3100年形成统一王国。|尼罗河农业与国家组织，支撑大型工程。
印度河城市发展规划与排水设施。|黄河流域也逐步形成早期国家与青铜文明。
安第斯地区同样发展出复杂社会。|文明拥有多个起点，各地道路并不相同。
铜、锡、木材和粮食穿行远方。|青铜时代晚期，东地中海已密切相连。
战乱、迁徙与环境压力交织，|旧网络断裂；铁器随后逐渐推广。
腓尼基航海者连接地中海港口。|货物在流动，书写方式与技术也在传播。
亚述扩张，衰落后新巴比伦兴起。|征服扩大统治，也造成破坏与被迫迁移。
前6世纪，波斯阿契美尼德帝国崛起。|道路、行省与行政，帮助治理辽阔地区。
中国经历商周更替与政治分化。|美洲奥尔梅克社会也在发展。
希腊城邦交流，也相互竞争。|战争改变格局，哲学与戏剧留下长久影响。
亚历山大东征后，希腊化世界展开。|文化交融伴随着征服与统治。
罗马从共和国走向帝国。|道路连接城市，统治也依赖征税与奴隶劳动。
南亚的孔雀王朝统治大片地区。|阿育王支持佛教，信仰后来沿陆海网络传播。
欧亚东端，秦统一中国，汉继续发展。|中亚商人与多个政权接力连接远方。
丝绸之路是一张网，不是一条大道。|货物与知识经多次转手，才能抵达远方。
罗马的政治中心与统治结构多次调整。|东西两部分，逐渐走向不同命运。
476年常被视作西罗马终结的标志。|东罗马延续，城市与制度并未同时消失。
基督教通过社群、传教与政治支持传播。|信仰联系越过疆界，范围并不整齐。
笈多时代，南亚文学、数学与天文学发展。|佛教也经中亚和海路，向更多地区传播。
中国经历长期分合，走向隋唐。|迁徙、贸易与宗教，持续连接不同地区。
7世纪，伊斯兰教在阿拉伯半岛兴起。|阿拉伯政权扩张，重组政治与文化联系。
中世纪并非整个世界的停顿。|唐宋城市发展，印刷等技术不断积累。
阿拔斯时期，翻译带来不同来源的知识。|学者继续研究，推进数学与医学。
季风推动印度洋航船，港口彼此相连。|黄金与盐，也穿行于跨撒哈拉贸易网络。
马里参与贸易；玛雅发展文字、历法与城市。|欧洲的城市、大学和商业也在成长。
蒙古扩张历经数代，战争造成巨大损失。|帝国统治下的通道，也促进欧亚往来。
14世纪，黑死病跨区域蔓延。|相连的世界，分享机会，也承受灾难。
14世纪起，欧洲一些城市兴起文艺复兴。|重新研究古典文献，带来新的艺术与思想。
欧洲金属活字印刷扩大文字传播。|中国更早已有雕版与活字，发展背景不同。
1405—1433年，郑和船队多次远航。|印度洋原有的成熟网络，建立了新的联系。
葡萄牙航海者沿非洲海岸南下。|1498年，达·伽马抵达印度。
1492年，哥伦布航抵加勒比地区。|美洲早已有众多人群与复杂社会。
新的远洋航线，把更多地区连接起来。|殖民扩张，也沿这些通道展开。
西班牙征服阿兹特克与印加政治中心。|武力、当地盟友与社会矛盾共同影响战局。
疾病、战争与强迫劳动交织，|美洲原住民遭遇严重的人口灾难。
玉米、马铃薯走向其他大陆，马进入美洲。|跨洋交换，改变了生态与日常生活。
奴隶贸易强迫数百万人离开非洲。|被奴役者的劳动与抵抗，深刻改变大西洋世界。
美洲白银跨越大西洋与太平洋。|欧洲与亚洲市场，越来越受远方变化影响。
欧洲宗教改革重组信仰与政治关系。|新的联系与机会，也伴随着冲突和不平等。
观察、数学、实验与出版相互推动。|研究自然，逐渐形成新的知识网络。
1543年，哥白尼的著作出版。|日心体系提出新框架，也留下待解的问题。
伽利略借望远镜观察天空。|开普勒分析资料，以椭圆描述行星轨道。
1687年，牛顿出版《数学原理》。|运动与引力，将地上和天上的现象联系起来。
仪器、通信与学术机构让知识共享。|结论可以被讨论、检验和修正。
科学拓宽了理解自然的方式。|工业化还需要能源、劳动、资本与生产组织。
启蒙思想家争论理性、权利与主权。|印刷和公共讨论，让旧秩序受到更多质疑。
1776年，北美《独立宣言》提出平等与权利。|独立战争持续，奴隶制却仍然存在。
1789年，法国大革命冲击旧制度。|公民、财产与政治参与，成为激烈争论。
海地革命将自由的诉求推向被奴役者。|1804年独立，成为反奴隶制的重要节点。
拿破仑战争重塑欧洲，最终走向失败。|制度变动的背后，是沉重伤亡与社会代价。
革命留下的问题，并未一次解决。|谁享有权利？工厂时代又将怎样回答？
回到18世纪后半叶的英国。|煤、纺织业、市场与资本，共同推动生产变化。
纺纱与织布逐渐机械化。|水力先推动许多工厂，蒸汽随后扩大应用。
活塞、连杆与飞轮，把动力传给机器。|工人、设备与工时，也被集中组织起来。
煤矿、运河和铁路相互连接，运输成本下降。|工业化逐渐扩展到欧洲大陆与北美部分地区。
原料与海外市场，把工业和殖民体系相连。|增长的财富，并没有被平均分配。
人口涌向工业城市，工厂不断扩张。|拥挤、污染与危险劳动，也改变人的生活。
工人通过结社、罢工和改革诉求争取权利。|宪章运动等回应工业社会的矛盾。
社会主义出现不同方案。|1840年代，马克思与恩格斯合作研究社会。
1848年，《共产党宣言》在伦敦出版。|马克思、恩格斯受共产主义者同盟委托起草。
他们从生产关系与阶级冲突分析资本主义。|这些理论和政治主张，后来产生不同解释与争论。
从河流边的城市，到机器轰鸣的时代，|联系不断扩大，冲突与苦难也始终存在。
历史没有在1848年结束。|人、技术、思想与选择，仍将改变世界。'''.splitlines()
shots=json.loads((ROOT/'data/shots.json').read_text())
assert len(shots)==len(captions)==72
newscenes={'c02-s01':'irrigation','c06-s01':'woodprint','c06-s02':'translation','c07-s02':'press','c08-s03':'exchange','c09-s02':'heliocentric','c09-s03':'telescope','c10-s01':'rights','c11-s02':'loom','c11-s06':'urban','c12-s02':'ideas','c12-s04':'analysis'}
richroutes={'c04-s06','c07-s04','c07-s05','c11-s05'}
revised=[]
for s in shots:
 if s['id'] in newscenes:s.update(kind='scene',sceneKind=newscenes[s['id']],climax=True);revised.append(s['id'])
 if s['id'] in richroutes:s['richRoutes']=True;revised.append(s['id'])
 if s['id']=='c04-s06':s['kicker']='事件地点为本章回顾 · 不表示各政权同时存在'
 if s['id']=='c06-s01':s['kicker']='雕版印刷工序示意 · 非特定作坊复原'
 if s['id']=='c07-s02':s['kicker']='欧洲金属活字印刷 · 工序概念示意'
 if s['id']=='c09-s02':s['kicker']='日心体系概念图 · 非比例模型'
 if s['id']=='c09-s03':s['kicker']='观测、资料与数学模型相互推动'
 if s['id']=='c12-s04':s['kicker']='历史事实、理论解释与政治主张需要区分'
cues=[]
for s,txt in zip(shots,captions):
 lines=txt.split('|');rate=len(re.sub(r'[^\u4e00-\u9fff0-9]','',txt))/(s['end']-s['start'])
 assert rate<=6.2,(s['id'],rate)
 assert max(map(len,lines))<=29,(s['id'],lines)
 cues.append(dict(id=s['id'],chapter=s['chapter'],start=s['start'],end=s['end'],text='\n'.join(lines),readingCharactersPerSecond=round(rate,2),timingBasis='editorial shot duration; no speech'))
def write(name,obj): (ROOT/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
write('data/shots.json',shots);write('data/subtitles.json',cues);write('data/narration.json',cues)
write('data/edition.json',dict(name='world-history-no-voice-v2',seconds=600,fps=60,voice=False,audio='original procedural music and SFX only',revisedShots=revised,captionCount=len(cues),maxReadingCharactersPerSecond=max(c['readingCharactersPerSecond'] for c in cues)))
def ms(t):
 n=round(t*1000);return f'{n//3600000:02}:{n//60000%60:02}:{n//1000%60:02},{n%1000:03}'
srt='\n\n'.join(f'{i+1}\n{ms(c["start"])} --> {ms(c["end"])}\n{c["text"]}' for i,c in enumerate(cues))+'\n'
(ROOT/'subtitles.srt').write_text(srt);(ROOT/'output/subtitles.srt').write_text(srt)
md=['# 600秒，看懂5000年世界历史 · 无人声字幕版','','从约公元前3500年两河流域到1848年。以下为画面叙事字幕，不录制旁白。配乐与音效均为程序合成。','']
for c,s in zip(cues,shots):md.extend([f'## {s["id"]} · {ms(c["start"])}—{ms(c["end"])} · {s["title"]}','',c['text'].replace('\n','  \n'),''])
(ROOT/'narration.md').write_text('\n'.join(md));(ROOT/'captions.md').write_text('\n'.join(md))
# ASS is used by the incremental renderer. Centisecond boundary rounding is
# below one output frame; independent SRT/JSON retain millisecond/frame timing.
def ast(t):
 n=round(t*100);return f'{n//360000}:{n//6000%60:02}:{n//100%60:02}.{n%100:02}'
ass='''[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Narrative,Noto Sans CJK SC,50,&H00D5EAF3,&H00D5EAF3,&H00211507,&H00211507,0,0,0,0,100,100,0,0,1,0,0,5,100,100,0,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
'''
for c in cues:
 txt=c['text'].replace('\n','\\N');tail='\\fad(0,100)' if c is cues[-1] else ''
 ass+=f'Dialogue: 0,{ast(c["start"])},{ast(c["end"])},Narrative,,0,0,0,,{{\\pos(960,931){tail}}}{txt}\n'
(ROOT/'data/captions.ass').write_text(ass)
print(json.dumps(json.loads((ROOT/'data/edition.json').read_text()),ensure_ascii=False,indent=2))
