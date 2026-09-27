const $ = (s) => document.querySelector(s);

const mischiefPool = [
  {id:'pudding', emoji:'🍮', name:'冷蔵庫のプリンを食べる', text:'「ひとくちだけ」が成立したことはない。', fun:22, mess:7, risk:9, evidence:['空のプリン容器'], forbiddenKey:'冷蔵庫', log:'プリンを発見。これは……仕方ない。'},
  {id:'bed', emoji:'🛏️', name:'ベッドで全力ジャンプ', text:'天井に届くまでやる。届かない。', fun:18, mess:12, risk:7, evidence:['ぐしゃぐしゃの布団'], forbiddenKey:'ベッド', log:'ベッドがトランポリンになった。'},
  {id:'drawer', emoji:'🗄️', name:'秘密の引き出しを開ける', text:'「開けちゃダメ」は、ほぼ招待状。', fun:16, mess:5, risk:16, evidence:['開いたままの引き出し'], forbiddenKey:'引き出し', log:'知らない紙がいっぱい。難しいので閉じ……てない。'},
  {id:'garden', emoji:'🪏', name:'庭にでっかい穴を掘る', text:'理由はない。穴は掘るもの。', fun:24, mess:23, risk:12, evidence:['泥の足跡','庭の大穴'], forbiddenKey:'庭', log:'すごく良い穴ができた。用途はない。'},
  {id:'button', emoji:'🔴', name:'知らないボタンを押す', text:'押すなと言われてはいない。', fun:27, mess:8, risk:22, evidence:['点滅する謎のランプ'], forbiddenKey:'ボタン', log:'ボタンを押した。何かがウィーンっていった。'},
  {id:'closet', emoji:'📦', name:'押し入れ探検隊を結成', text:'隊員は1名。隊長もちびねも。', fun:20, mess:20, risk:10, evidence:['散乱した箱'], forbiddenKey:'押し入れ', log:'押し入れの奥は、新大陸だった。'},
  {id:'bath', emoji:'🛁', name:'お風呂を泡だらけにする', text:'泡は多いほど偉い。たぶん。', fun:25, mess:19, risk:15, evidence:['廊下まで来た泡'], forbiddenKey:'お風呂', log:'泡が増えた。さらに増えた。止まらない。'},
  {id:'snack', emoji:'🍘', name:'おやつ全種類を味見', text:'比較検証なので、これは研究。', fun:20, mess:9, risk:11, evidence:['大量のお菓子袋'], forbiddenKey:'おやつ', log:'味見の結果、全部おいしい。'},
  {id:'paint', emoji:'🖍️', name:'壁に超大作を描く', text:'題名「ねもちゃんとちびねも」。壁紙込み。', fun:30, mess:28, risk:28, evidence:['壁いっぱいの絵'], forbiddenKey:'クレヨン', log:'傑作が完成した。壁に。'},
  {id:'costume', emoji:'👗', name:'ねもちゃんの服で変身', text:'ちょっと大きい。でも似合う。', fun:17, mess:15, risk:8, evidence:['床に散らばった服'], forbiddenKey:'クローゼット', log:'ファッションショー開幕。観客0名。'},
  {id:'plant', emoji:'🪴', name:'観葉植物にたっぷり水やり', text:'愛情は量。水も量。', fun:14, mess:17, risk:10, evidence:['びしょびしょの床'], forbiddenKey:'植物', log:'植物が喜んでいる気がする。床も潤った。'},
  {id:'fish', emoji:'🐟', name:'金魚とお茶会をする', text:'金魚側の同意は取っていない。', fun:26, mess:15, risk:20, evidence:['机の上の金魚鉢','濡れたタオル'], forbiddenKey:'金魚鉢', log:'金魚は無口だけど良いお客さんだった。'},
  {id:'selfie', emoji:'📱', name:'ねもちゃんのスマホで100枚自撮り', text:'同じ顔に見えて全部ちがう。本人談。', fun:23, mess:4, risk:18, evidence:['謎の自撮り100枚'], forbiddenKey:'スマホ', log:'スマホの写真フォルダがちびねもで埋まった。'},
  {id:'clock', emoji:'⏰', name:'家じゅうの時計を5分ずらす', text:'意味はない。だからこそやる。', fun:18, mess:3, risk:14, evidence:['5分ずれた時計'], forbiddenKey:'時計', log:'全部の時計が少しだけ嘘をつく家になった。'},
  {id:'freezer', emoji:'🧸', name:'ぬいぐるみを冷凍庫で冷やす', text:'ひんやりしたら喜ぶと思った。', fun:21, mess:8, risk:17, evidence:['冷たいぬいぐるみ'], forbiddenKey:'冷凍庫', log:'ぬいぐるみが、つめたい。理由は聞かないでほしい。'},
  {id:'bun', emoji:'🥟', name:'肉まんを限界まで温める', text:'あと10秒。さらに10秒。もう10秒。', fun:25, mess:14, risk:20, evidence:['熱すぎる肉まん','電子レンジのにおい'], forbiddenKey:'電子レンジ', log:'肉まんが太陽みたいになった。'},
  {id:'remote', emoji:'📺', name:'リモコン全部に肉球シールを貼る', text:'押す場所が分からなくなるまで貼る。', fun:19, mess:10, risk:13, evidence:['肉球まみれのリモコン'], forbiddenKey:'リモコン', log:'リモコンがかわいくなった。操作性は死んだ。'},
  {id:'fort', emoji:'🏰', name:'クッションで秘密基地を作る', text:'居間の通行機能は一時停止。', fun:28, mess:24, risk:12, evidence:['巨大クッション城'], forbiddenKey:'クッション', log:'王国が建国された。人口1名。'},
  {id:'paper', emoji:'✈️', name:'大事そうな紙で紙飛行機', text:'よく飛ぶ紙ほど大事そうに見える。', fun:24, mess:16, risk:24, evidence:['紙飛行機の大編隊'], forbiddenKey:'書類', log:'書類が空を飛んだ。すごく飛んだ。'},
  {id:'music', emoji:'🎵', name:'スピーカーで大音量ライブ', text:'観客0名。アンコールは自分でやる。', fun:29, mess:7, risk:26, evidence:['最大音量のスピーカー'], forbiddenKey:'スピーカー', log:'ちびねもワンマンライブ開催。近所には内緒。'}
];

const forbiddenRules = [
  {key:'冷蔵庫', text:'「冷蔵庫のプリン、食べちゃダメだよ」'},
  {key:'庭', text:'「今日は庭で泥遊びしないでね」'},
  {key:'引き出し', text:'「机の引き出しは開けないこと」'},
  {key:'お風呂', text:'「ひとりでお風呂遊びはダメ」'},
  {key:'クレヨン', text:'「クレヨンは紙に描いてね」'},
  {key:'金魚鉢', text:'「金魚鉢は動かさないでね」'},
  {key:'ボタン', text:'「赤いボタンには触らないで」'},
  {key:'スマホ', text:'「スマホは勝手に触らないでね」'},
  {key:'時計', text:'「時計で遊ばないこと」'},
  {key:'冷凍庫', text:'「冷凍庫に変なもの入れないでね」'},
  {key:'電子レンジ', text:'「電子レンジはひとりで使わないでね」'},
  {key:'リモコン', text:'「リモコンにシール貼らないでね」'}
];

const randomEvents = [
  {icon:'📱', title:'ねもちゃんからメッセージ', text:'「いい子にしてる？」――ちびねもは0.3秒で「してる！」と返信した。', risk:4, mess:0},
  {icon:'💨', title:'窓から強い風！', text:'紙が何枚か飛んだ。……まあ、元からこうだったことにしよう。', risk:0, mess:6, evidence:'飛び散った紙'},
  {icon:'🔔', title:'ピンポーン！', text:'宅配便だった。居留守をした。なぜかちょっとドキドキした。', risk:7, mess:0},
  {icon:'🐾', title:'謎の足音', text:'廊下で音がした。誰もいない。ちびねもは5秒だけ反省した。', risk:-3, mess:0},
  {icon:'✨', title:'奇跡の偶然', text:'さっき散らかしたものが、なぜかちょうどいい位置に落ちた。', risk:-4, mess:-5},
  {icon:'🍬', title:'棚の奥から飴を発見', text:'これはいたずらではない。発掘である。', fun:7, risk:0, mess:1}
];

const rareEvents = [
  {id:'vacuum', icon:'🤖', title:'レアイベント：ロボ掃除機、覚醒', text:'勝手に走り出して、証拠をひとつ吸い込んだ。ちびねもは敬礼した。', apply:(s)=>{ if(s.evidence.length){s.evidence.splice(Math.floor(Math.random()*s.evidence.length),1);} s.mess=clamp(s.mess-12,0,130); }},
  {id:'blackout', icon:'🌙', title:'レアイベント：まさかの停電', text:'部屋が真っ暗になった。バレそうな空気だけは少し薄れた。', apply:(s)=>{s.risk=clamp(s.risk-10,0,130);s.fun=clamp(s.fun+5,0,130);}},
  {id:'delivery', icon:'📦', title:'レアイベント：巨大な宅配便', text:'玄関に大きな箱が増えた。これは……元からあったことにできる？', apply:(s)=>{s.mess=clamp(s.mess+6,0,130);addEvidence(['玄関の大きな箱']);}},
  {id:'neighbor', icon:'☎️', title:'レアイベント：お隣さんから電話', text:'「さっき大きな音しなかった？」――ちびねも「テレビです！」テレビはついていない。', apply:(s)=>{s.risk=clamp(s.risk+9,0,130);}}
];

const cleanupActions = [
  {emoji:'🧹', name:'全力で片付ける', text:'一番目立つ証拠を1つ消す。散らかりも大きく減る。', clear:1, mess:-18, risk:-4},
  {emoji:'🗑️', name:'証拠をゴミ箱の底へ', text:'証拠を1つ消す。ただし見つかったら逆に怪しい。', clear:1, mess:-6, risk:2},
  {emoji:'🧽', name:'床をぴかぴかに拭く', text:'泥・水・泡に強い。散らかりをかなり減らす。', clearWet:true, mess:-22, risk:-2},
  {emoji:'🛋️', name:'クッションの下に隠す', text:'証拠を1つ隠す。バレ度はちょっと上がる。', clear:1, mess:-8, risk:5},
  {emoji:'😇', name:'何もなかった顔の練習', text:'証拠は消えない。でも顔だけは完璧。', clear:0, mess:0, risk:-12},
  {emoji:'🎀', name:'かわいさで部屋を整える', text:'見た目だけなんとなく整う。散らかりを少し減らす。', clear:0, mess:-12, risk:-4}
];

const excusePool = [
  {id:'unknown', text:'「しらない。」', risk:5, special:()=>false, note:'潔い。潔すぎる。'},
  {id:'wind', text:'「かぜがやった。」', risk:-5, special:(s)=>s.evidence.some(e=>e.includes('紙')||e.includes('床')||e.includes('泡')), note:'風は万能ではない。'},
  {id:'cleaning', text:'「おそうじ、してたの！」', risk:-8, special:(s)=>s.cleanupCount>=2 && s.mess<35, note:'散らかりが少ないと説得力が出る。'},
  {id:'gift', text:'「ねもちゃんによろこんでほしくて！」', risk:-4, special:(s)=>s.fun>=80, note:'善意という最強カード。'},
  {id:'confess', text:'「……ちょっとだけ、やった。」', risk:-15, special:()=>true, note:'正直。ただし“ちょっと”かは怪しい。'}
];

const endingData = {
  perfect:{icon:'😎',badge:'ENDING 01',title:'完全犯罪',quote:'「……今日は、いい子だった？」',story:'ねもちゃんは部屋を見回した。ちびねもはまばたきひとつしない。証拠はない。証言者もいない。<br><br><strong>ちびねも「ずっといい子だったよ。」</strong><br>――事件は迷宮入りした。',hint:'証拠ゼロ＋低リスクで到達。'},
  suspicion:{icon:'🤨',badge:'ENDING 02',title:'ちょっとバレた',quote:'「……なんか、変じゃない？」',story:'決定的な証拠はない。でも、ねもちゃんの目が細い。<br><br>ちびねもは知らないふりを続けた。たぶん今日は逃げ切った。<br><strong>たぶん。</strong>',hint:'証拠を少なく残して帰宅を迎える。'},
  caught:{icon:'🚓',badge:'ENDING 03',title:'全部バレた',quote:'ねもちゃん「……ちびねも。」',story:'プリン。泥。散らかった服。どう考えても同一犯。<br><br>ちびねもは3秒考えて、こう答えた。<br><strong>「……ごめんなさい。」</strong><br>なお、反省時間は推定7分。',hint:'証拠とバレ度が多いと到達。'},
  reverse:{icon:'🌟',badge:'ENDING 04',title:'なぜか褒められた',quote:'「お掃除してくれたの？ えらいね」',story:'ねもちゃんは、きれいになった床を見てにっこりした。<br><br>ちびねもは一瞬だけ良心と相談した。<br><strong>ちびねも「……うん！」</strong><br>真実はクッションの下に眠っている。',hint:'片付けて「おそうじ、してたの！」。'},
  disaster:{icon:'💥',badge:'ENDING 05',title:'大惨事',quote:'「どうしてこうなったの！？」',story:'今日の約束。それは、守られるためにあった。<br>しかし、ちびねもにとっては「面白そう」の看板だった。<br><br><strong>ちびねも「……でも、たのしかった！」</strong><br>ねもちゃんは頭を抱えた。',hint:'約束を破って派手に遊ぶ。'},
  early:{icon:'🚪',badge:'ENDING 06',title:'予定外の帰宅',quote:'「あれ？ もう帰ってきたの？」',story:'ねもちゃんの予定が早く終わった。ちびねもの予定は終わっていない。<br><br>玄関が開く。証拠はまだある。<br><strong>ちびねも「これは……ちがうの。」</strong>',hint:'5%の早期帰宅でピンチになると発生。'},
  honest:{icon:'🥺',badge:'ENDING 07',title:'正直えらい……？',quote:'「……ちょっとだけ、やった。」',story:'ちびねもは観念して、少しだけ本当のことを話した。<br><br>ねもちゃんはため息をついたあと、頭をなでた。<br><strong>ただし説教はある。</strong>',hint:'証拠が少ない状態で正直に白状する。'},
  puddingCase:{icon:'🍮',badge:'ENDING 08',title:'消えたプリン事件',quote:'「プリン……知らない？」',story:'プリンは消えた。容器も消えた。証拠もない。<br><br>しかし、ちびねもの口元にはごく小さなカラメル。<br><strong>本人は気づいていない。</strong>',hint:'プリンを食べて容器を消し、低リスクで帰宅。'},
  promiseKeeper:{icon:'🎀',badge:'ENDING 09',title:'約束だけは守った',quote:'「今日はちゃんと約束守ったね」',story:'部屋はちょっと怪しい。でも今日の約束だけは守った。<br><br><strong>ちびねも「えらい？」</strong><br>評価基準が独特である。',hint:'たくさん遊びつつ、今日の約束は破らない。'},
  miracle:{icon:'✨',badge:'ENDING 10',title:'奇跡の無罪',quote:'「絶対何かした顔なんだけど……」',story:'バレ度は高い。挙動も怪しい。なのに決定的な証拠だけが、ない。<br><br><strong>疑わしきは、ちびねもの利益に。</strong>',hint:'高リスクなのに証拠ゼロで帰宅。'},
  legend:{icon:'👑',badge:'ENDING 11',title:'伝説のおるすばん',quote:'「今日、何してたの……？」',story:'たのしさは限界。部屋も限界。ねもちゃんの理解も限界。<br><br><strong>ちびねも「ぜんぶ！」</strong><br>――この日のおるすばんは、後世まで語り継がれた。',hint:'たのしさ125以上＋ちらかり95以上。'},
  fishTea:{icon:'🐟',badge:'ENDING 12',title:'金魚は何も語らない',quote:'「金魚鉢、動いてない？」',story:'金魚はすべてを見ていた。<br>しかし金魚はしゃべらない。<br><br><strong>最強の共犯者である。</strong>',hint:'金魚とお茶会して、関連証拠をきれいに消す。'}
};

let state = {};
let soundOn = true;

function resetState(){
  const rule = forbiddenRules[Math.floor(Math.random()*forbiddenRules.length)];
  const earlyReturnScheduled = Math.random() < 0.05;
  const rareScheduled = Math.random() < 0.28;
  state = {
    time: 17*60,
    phase:'mischief',
    turn:0,
    maxTurns:5,
    fun:0,
    mess:0,
    peakMess:0,
    risk:0,
    evidence:[],
    logs:[],
    rule,
    touchedForbidden:false,
    cleanupCount:0,
    cleanupTurns:3,
    cleanedEvidence:0,
    currentActions: sample(mischiefPool,5),
    actionHistory:[],
    result:null,
    earlyReturnScheduled,
    earlyReturnTurn: earlyReturnScheduled ? (Math.random()<.5 ? 3 : 4) : null,
    earlyReturnTriggered:false,
    rareScheduled,
    rareEventTurn: rareScheduled ? (2 + Math.floor(Math.random()*3)) : null,
    rareEventTriggered:false,
    rareEventId:null
  };
}

function sample(arr,n){ return [...arr].sort(()=>Math.random()-.5).slice(0,n); }
function clamp(n,min=0,max=100){ return Math.max(min,Math.min(max,n)); }
function fmtTime(m){ return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`; }
function addLog(text){ state.logs.unshift({time:fmtTime(state.time),text}); state.logs=state.logs.slice(0,12); }
function addEvidence(items){ items.filter(Boolean).forEach(e=>{ if(!state.evidence.includes(e)) state.evidence.push(e); }); }
function beep(freq=520,dur=.06){
  if(!soundOn) return;
  try{
    const AC=window.AudioContext||window.webkitAudioContext; const ctx=new AC(); const o=ctx.createOscillator(); const g=ctx.createGain();
    o.frequency.value=freq; o.type='sine'; g.gain.setValueAtTime(.035,ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+dur); o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur);
  }catch(e){}
}

function showScreen(id){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); $(id).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
function getEndingProgress(){
  const endings=JSON.parse(localStorage.getItem('chibiNemoEndings')||'{}');
  return Object.keys(endingData).filter(k=>endings[k]).length;
}
function renderRecord(){
  const plays=Number(localStorage.getItem('chibiNemoPlays')||0); const best=Number(localStorage.getItem('chibiNemoBestFun')||0);
  const found=getEndingProgress();
  $('#recordText').textContent = plays ? `おるすばん記録：${plays}回 ／ 最高たのしさ ${best} ／ ENDING ${found}/12` : '初めてのおるすばん。たぶん大丈夫。';
}

function renderMood(){
  const card = $('#portraitPanel'); const comment = $('#statusComment');
  if(!card || !comment) return;
  card.classList.remove('warning','danger');
  let text = '「まだまだ遊べるよ！」';
  if(state.phase==='cleanup'){
    text = state.earlyReturnTriggered ? '「えっ、もう帰ってくるの！？」' : '「ぜったいバレないようにしないと…！」';
    card.classList.add('warning');
  } else if(state.risk >= 70 || state.evidence.length >= 4){
    text = '「ちょっとやばいかも……でも、しらない。」'; card.classList.add('danger');
  } else if(state.mess >= 50){
    text = '「ちらかってきた…？ まだいけるよね？」'; card.classList.add('warning');
  } else if(state.fun >= 70){ text = '「今日は大当たりの日かも！」'; }
  comment.textContent = text;
}

function render(){
  $('#clock').textContent=fmtTime(state.time);
  $('#funVal').textContent=state.fun; $('#messVal').textContent=state.mess; $('#riskVal').textContent=state.risk;
  $('#funBar').style.width=`${clamp(state.fun)}%`; $('#messBar').style.width=`${clamp(state.mess)}%`; $('#riskBar').style.width=`${clamp(state.risk)}%`;
  $('#forbiddenRule').innerHTML=`ねもちゃん：<br><strong>${state.rule.text}</strong>`;
  $('#evidenceList').innerHTML=state.evidence.length?state.evidence.map(e=>`<span class="evidence">${e}</span>`).join(''):'<span class="muted">きれい。今のところは。</span>';
  $('#log').innerHTML=state.logs.length?state.logs.map(l=>`<p><time>${l.time}</time>${l.text}</p>`).join(''):'<span class="muted">まだ静か。</span>';
  renderMood();

  if(state.phase==='mischief'){
    $('#phaseKicker').textContent='① いたずらフェーズ'; $('#phaseTitle').textContent='やりたいことをえらんで、いたずらしよう！'; $('#phaseDesc').textContent='1回の行動で30分。やりたいことを選ぼう。';
    $('#turnLabel').textContent=`${state.turn+1} / ${state.maxTurns}`; renderMischiefActions();
  }else if(state.phase==='cleanup'){
    $('#phaseKicker').textContent='② しょうこいんめつフェーズ';
    $('#phaseTitle').textContent=state.earlyReturnTriggered?'緊急！ねもちゃんが早く帰ってくる！':'あわてず、しょうこをかくそう！';
    $('#phaseDesc').textContent=state.earlyReturnTriggered?'残された手数は、たった1回。':'あと30分。3回だけ片付けられる。全部は無理かもしれない。';
    $('#turnLabel').textContent=`残り ${state.cleanupTurns-state.cleanupCount} 手`; renderCleanupActions();
  }
}

function renderMischiefActions(){
  state.currentActions = sample(mischiefPool,5);
  $('#actions').innerHTML=state.currentActions.map(a=>{
    const forbidden=a.forbiddenKey===state.rule.key; const risk = a.risk + (forbidden?15:0);
    return `<button class="action-btn ${forbidden?'forbidden':''}" data-action="${a.id}">
      <div class="action-main"><div class="action-emoji">${a.emoji}</div><div class="action-copy"><b>${a.name}</b><small>${a.text}</small>${forbidden?'<span class="forbidden-tag">⚠️ 今日の約束に反している</span>':''}</div></div>
      <div class="action-stats"><span class="stat-chip">🎉 +${a.fun}</span><span class="stat-chip">🧹 +${a.mess}</span><span class="stat-chip risk">👀 +${risk}</span></div>
    </button>`;
  }).join('');
  document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>doMischief(btn.dataset.action)));
}

function showEvent(icon,title,text){
  $('#eventIcon').textContent=icon; $('#eventTitle').textContent=title; $('#eventText').textContent=text;
  $('#eventModal').classList.add('open'); $('#eventModal').setAttribute('aria-hidden','false'); render();
}

function doMischief(id){
  const a=mischiefPool.find(x=>x.id===id); if(!a)return;
  const forbidden=a.forbiddenKey===state.rule.key;
  state.fun=clamp(state.fun+a.fun,0,130); state.mess=clamp(state.mess+a.mess,0,130); state.peakMess=Math.max(state.peakMess,state.mess); state.risk=clamp(state.risk+a.risk+(forbidden?15:0),0,130);
  addEvidence(a.evidence); state.actionHistory.push(a.id);
  if(forbidden){state.touchedForbidden=true; addLog(`【約束やぶり】${a.log}`);} else addLog(a.log);
  state.time+=30; state.turn++; beep(forbidden?220:620,.08);

  if(state.earlyReturnScheduled && !state.earlyReturnTriggered && state.turn===state.earlyReturnTurn){ beginEarlyReturn(); return; }
  if(state.rareScheduled && !state.rareEventTriggered && state.turn===state.rareEventTurn){ triggerRareEvent(); return; }
  if(state.turn>=state.maxTurns){ beginCleanup(); return; }
  if(Math.random()<.42){ triggerRandomEvent(); } else { render(); }
}

function triggerRandomEvent(){
  const e={...randomEvents[Math.floor(Math.random()*randomEvents.length)]};
  if(e.fun) state.fun=clamp(state.fun+e.fun,0,130); if(e.mess) state.mess=clamp(state.mess+e.mess,0,130); state.peakMess=Math.max(state.peakMess,state.mess); if(e.risk) state.risk=clamp(state.risk+e.risk,0,130); if(e.evidence)addEvidence([e.evidence]);
  addLog(e.title+'。'+e.text); showEvent(e.icon,e.title,e.text);
}

function triggerRareEvent(){
  const e=rareEvents[Math.floor(Math.random()*rareEvents.length)];
  state.rareEventTriggered=true; state.rareEventId=e.id; e.apply(state); state.peakMess=Math.max(state.peakMess,state.mess); addLog(`【レア】${e.title}。${e.text}`); showEvent(e.icon,e.title,e.text); beep(940,.11);
}

function beginEarlyReturn(){
  state.earlyReturnTriggered=true; state.phase='cleanup'; state.time=19*60; state.cleanupTurns=1; state.cleanupCount=0;
  addLog('【超レア】ねもちゃん「予定早く終わったから19:10に帰るね」――終わった。');
  showEvent('🚨','超レア：ねもちゃん、予定より早く帰宅！','「予定早く終わったから19:10に帰るね」――証拠隠滅できるのは、あと1回だけ。');
  beep(170,.18);
}

function beginCleanup(){
  state.phase='cleanup'; state.time=19*60+30; state.cleanupTurns=3; state.cleanupCount=0; addLog('ねもちゃんから「もうすぐ帰るね」の連絡。まずい。');
  showEvent('🚨','ねもちゃん、あと30分で帰宅！','さあ、ここからが本番。証拠を消せるのは3回だけ。');
}

function renderCleanupActions(){
  const options=sample(cleanupActions,4);
  $('#actions').innerHTML=options.map((a,i)=>`<button class="action-btn" data-clean="${i}">
    <div class="action-main"><div class="action-emoji">${a.emoji}</div><div class="action-copy"><b>${a.name}</b><small>${a.text}</small></div></div>
    <div class="action-stats"><span class="stat-chip good">片付け</span></div>
  </button>`).join('');
  document.querySelectorAll('[data-clean]').forEach((btn,i)=>btn.addEventListener('click',()=>doCleanup(options[i])));
}

function doCleanup(a){
  let cleared=0;
  if(a.clearWet){ const idx=state.evidence.findIndex(e=>/泥|濡|泡|床/.test(e)); if(idx>=0){state.evidence.splice(idx,1);cleared=1;} }
  else if(a.clear && state.evidence.length){ state.evidence.splice(Math.floor(Math.random()*state.evidence.length),1); cleared=1; }
  state.cleanedEvidence+=cleared; state.mess=clamp(state.mess+a.mess,0,130); state.risk=clamp(state.risk+a.risk,0,130); state.cleanupCount++; state.time+=10;
  addLog(`${a.name}。${cleared?'証拠を1つ消した！':'とにかく見た目は少しマシ。'}`); beep(760,.06);
  if(state.cleanupCount>=state.cleanupTurns){ beginJudgement(); } else render();
}

function beginJudgement(){
  if(!state.earlyReturnTriggered) state.time=20*60;
  const returnTime=document.querySelector('.return-time'); if(returnTime) returnTime.textContent=`${fmtTime(state.time)}　玄関`;
  render(); showScreen('#judgementScreen');
  const available=excusePool.filter(e=>e.id==='unknown'||e.id==='confess'||e.special(state));
  $('#excuses').innerHTML=available.map(e=>`<button class="excuse-btn" data-excuse="${e.id}">${e.text}<br><small>${e.note}</small></button>`).join('');
  document.querySelectorAll('[data-excuse]').forEach(btn=>btn.addEventListener('click',()=>finishGame(btn.dataset.excuse)));
}

function chooseEnding(excuseId){
  const ev=state.evidence.length;
  const did=(id)=>state.actionHistory.includes(id);
  const has=(rx)=>state.evidence.some(e=>rx.test(e));

  // ルート系エンディングを先に判定。狙って遊べばちゃんと到達できる設計。
  if(state.earlyReturnTriggered) return 'early';
  if(state.fun>=120 && state.peakMess>=80) return 'legend';
  if(did('pudding') && !has(/プリン/) && state.risk<70) return 'puddingCase';
  if(did('fish') && !has(/金魚鉢|濡れたタオル/) && state.risk<75) return 'fishTea';
  if(excuseId==='cleaning' && state.cleanupCount>=2 && state.mess<45 && state.risk<75) return 'reverse';
  if(excuseId==='confess' && state.risk<80) return 'honest';
  if(!state.touchedForbidden && state.fun>=85 && state.risk<75) return 'promiseKeeper';
  if(ev<=2 && state.risk>=65) return 'miracle';

  // 通常エンディング。証拠数の条件を現実的な範囲へ緩和。
  if(state.touchedForbidden && (state.risk>=80 || ev>=4 || state.peakMess>=90)) return 'disaster';
  if(ev<=2 && state.risk<55 && state.mess<50) return 'perfect';
  if(ev<=3 && state.risk<75) return 'suspicion';
  return 'caught';
}
function finishGame(excuseId){
  const ex=excusePool.find(e=>e.id===excuseId); if(ex) state.risk=clamp(state.risk+ex.risk,0,130);
  const ending=chooseEnding(excuseId); state.result=ending;
  saveRecord(); renderResult(ending); showScreen('#resultScreen'); beep(['perfect','promiseKeeper','miracle'].includes(ending)?880:['caught','disaster','early','legend'].includes(ending)?180:520,.14);
}

function renderResult(type){
  const data=endingData[type];
  $('#resultIcon').textContent=data.icon; $('#resultBadge').textContent=data.badge; $('#resultTitle').textContent=data.title; $('#resultQuote').textContent=data.quote; $('#resultStory').innerHTML=data.story; $('#resultHint').textContent=data.hint;
  $('#finalFun').textContent=state.fun; $('#finalMess').textContent=state.mess; $('#finalRisk').textContent=state.risk; $('#finalEvidence').textContent=state.evidence.length;
  renderDailyReport();
}

function renderDailyReport(){
  let card=$('#dailyReport');
  if(!card){
    card=document.createElement('div'); card.id='dailyReport'; card.className='daily-report';
    $('#resultHint').before(card);
  }
  const names=state.actionHistory.map(id=>mischiefPool.find(x=>x.id===id)?.name).filter(Boolean);
  card.innerHTML=`<strong>📋 今日のおるすばん</strong><span>いたずら ${state.actionHistory.length}回</span><span>消した証拠 ${state.cleanedEvidence}個</span><span>約束 ${state.touchedForbidden?'破った':'守った'}</span><span>${state.earlyReturnTriggered?'🚨 早期帰宅あり':'🏠 通常帰宅'}</span><small>${names.join(' ／ ')}</small>`;
}

function saveRecord(){
  const plays=Number(localStorage.getItem('chibiNemoPlays')||0)+1; localStorage.setItem('chibiNemoPlays',plays);
  const best=Math.max(Number(localStorage.getItem('chibiNemoBestFun')||0),state.fun); localStorage.setItem('chibiNemoBestFun',best);
  const endings=JSON.parse(localStorage.getItem('chibiNemoEndings')||'{}'); endings[state.result]=(endings[state.result]||0)+1; localStorage.setItem('chibiNemoEndings',JSON.stringify(endings));
}

function installGalleryUI(){
  const howBtn=$('#howBtn'); if(!howBtn || $('#galleryBtn')) return;
  const btn=document.createElement('button'); btn.id='galleryBtn'; btn.className='menu-btn gallery'; btn.type='button'; btn.innerHTML='<span>★</span> エンディング図鑑 <b>🐾</b>'; howBtn.after(btn);

  const modal=document.createElement('section'); modal.id='galleryModal'; modal.className='modal'; modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`<div class="modal-card gallery-card"><button id="galleryCloseBtn" class="close-btn" type="button">×</button><span class="pill">COLLECTION</span><h2>エンディング図鑑</h2><p class="gallery-lead">見つけた結末だけ記録されます。全12種類。</p><div id="galleryGrid" class="gallery-grid"></div></div>`;
  document.body.appendChild(modal);

  const style=document.createElement('style');
  style.textContent=`
    .menu-btn.gallery{color:#fff;background:linear-gradient(180deg,#d6b0ff,#b990ef);border:2px solid #a978e8}
    .gallery-card{max-width:820px;text-align:left;max-height:88vh;overflow:auto}
    .gallery-lead{font-size:12px;margin-top:0}
    .gallery-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:16px}
    .ending-tile{border:2px solid #f0d7e4;background:#fff9fc;border-radius:18px;padding:13px;min-height:120px;display:flex;flex-direction:column;gap:5px}
    .ending-tile.locked{background:#f7f3f6;color:#ad9ea8;filter:saturate(.25)}
    .ending-tile .ending-no{font-size:10px;font-weight:1000;color:#b27aa0}
    .ending-tile .ending-icon{font-size:26px}
    .ending-tile b{font-size:13px}
    .ending-tile small{font-size:10px;line-height:1.45;color:#90798a}
    .ending-tile .count{margin-top:auto;font-size:9px;font-weight:1000;color:#cf6f9a}
    .daily-report{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;background:#fff8fc;border:2px solid #f0d4e3;border-radius:18px;padding:14px;margin:14px 0;text-align:left}
    .daily-report strong,.daily-report small{grid-column:1/-1}.daily-report span{font-size:11px;font-weight:900;background:#fff;border-radius:999px;padding:7px 9px;text-align:center}.daily-report small{font-size:10px;line-height:1.6;color:#8b7384}
    @media(max-width:720px){.gallery-grid{grid-template-columns:repeat(2,1fr)}.daily-report{grid-template-columns:repeat(2,1fr)}}
  `;
  document.head.appendChild(style);

  btn.addEventListener('click',openGallery);
  $('#galleryCloseBtn').addEventListener('click',closeGallery);
  modal.addEventListener('click',(e)=>{if(e.target.id==='galleryModal')closeGallery();});
}

function renderGallery(){
  const endings=JSON.parse(localStorage.getItem('chibiNemoEndings')||'{}');
  $('#galleryGrid').innerHTML=Object.entries(endingData).map(([key,d])=>{
    const count=endings[key]||0; const unlocked=count>0;
    return `<div class="ending-tile ${unlocked?'':'locked'}"><span class="ending-no">${d.badge}</span><span class="ending-icon">${unlocked?d.icon:'❔'}</span><b>${unlocked?d.title:'？？？？？？'}</b><small>${unlocked?d.hint:`ヒント：${d.hint}`}</small><span class="count">${unlocked?`発見 ${count}回`:'未発見'}</span></div>`;
  }).join('');
}
function openGallery(){renderGallery();$('#galleryModal').classList.add('open');$('#galleryModal').setAttribute('aria-hidden','false');}
function closeGallery(){if(!$('#galleryModal'))return;$('#galleryModal').classList.remove('open');$('#galleryModal').setAttribute('aria-hidden','true');}

$('#startBtn').addEventListener('click',()=>{ resetState(); addLog('ねもちゃん出発。「いい子にしててね」'); showScreen('#gameScreen'); render(); beep(620,.07); });
$('#eventCloseBtn').addEventListener('click',()=>{ $('#eventModal').classList.remove('open'); $('#eventModal').setAttribute('aria-hidden','true'); render(); });
$('#retryBtn').addEventListener('click',()=>{ resetState(); addLog('またしても、ねもちゃんが外出した。'); showScreen('#gameScreen'); render(); });
$('#homeBtn').addEventListener('click',()=>{ renderRecord(); showScreen('#startScreen'); });
$('#soundBtn').addEventListener('click',()=>{ soundOn=!soundOn; $('#soundBtn').textContent=soundOn?'🔔 SE ON':'🔕 SE OFF'; $('#soundBtn').setAttribute('aria-pressed',String(soundOn)); });

function openHowModal(){ $('#howModal').classList.add('open'); $('#howModal').setAttribute('aria-hidden','false'); }
function closeHowModal(){ $('#howModal').classList.remove('open'); $('#howModal').setAttribute('aria-hidden','true'); }
$('#howBtn').addEventListener('click', openHowModal);
$('#howCloseBtn').addEventListener('click', closeHowModal);
$('#howModal').addEventListener('click', (e)=>{ if(e.target.id==='howModal') closeHowModal(); });

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    $('#eventModal').classList.remove('open'); $('#eventModal').setAttribute('aria-hidden','true'); closeHowModal(); closeGallery();
  }
});

installGalleryUI();
renderRecord();
