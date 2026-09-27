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
  {id:'fish', emoji:'🐟', name:'金魚とお茶会をする', text:'金魚側の同意は取っていない。', fun:26, mess:15, risk:20, evidence:['机の上の金魚鉢','濡れたタオル'], forbiddenKey:'金魚鉢', log:'金魚は無口だけど良いお客さんだった。'}
];

const forbiddenRules = [
  {key:'冷蔵庫', text:'「冷蔵庫のプリン、食べちゃダメだよ」'},
  {key:'庭', text:'「今日は庭で泥遊びしないでね」'},
  {key:'引き出し', text:'「机の引き出しは開けないこと」'},
  {key:'お風呂', text:'「ひとりでお風呂遊びはダメ」'},
  {key:'クレヨン', text:'「クレヨンは紙に描いてね」'},
  {key:'金魚鉢', text:'「金魚鉢は動かさないでね」'},
  {key:'ボタン', text:'「赤いボタンには触らないで」'}
];

const randomEvents = [
  {icon:'📱', title:'ねもちゃんからメッセージ', text:'「いい子にしてる？」――ちびねもは0.3秒で「してる！」と返信した。', risk:4, mess:0},
  {icon:'💨', title:'窓から強い風！', text:'紙が何枚か飛んだ。……まあ、元からこうだったことにしよう。', risk:0, mess:6, evidence:'飛び散った紙'},
  {icon:'🔔', title:'ピンポーン！', text:'宅配便だった。居留守をした。なぜかちょっとドキドキした。', risk:7, mess:0},
  {icon:'🐾', title:'謎の足音', text:'廊下で音がした。誰もいない。ちびねもは5秒だけ反省した。', risk:-3, mess:0},
  {icon:'✨', title:'奇跡の偶然', text:'さっき散らかしたものが、なぜかちょうどいい位置に落ちた。', risk:-4, mess:-5},
  {icon:'🍬', title:'棚の奥から飴を発見', text:'これはいたずらではない。発掘である。', fun:7, risk:0, mess:1}
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

let state = {};
let soundOn = true;

function resetState(){
  const rule = forbiddenRules[Math.floor(Math.random()*forbiddenRules.length)];
  state = {
    time: 17*60,
    phase:'mischief',
    turn:0,
    maxTurns:5,
    fun:0,
    mess:0,
    risk:0,
    evidence:[],
    logs:[],
    rule,
    touchedForbidden:false,
    cleanupCount:0,
    cleanupTurns:3,
    cleanedEvidence:0,
    currentActions: sample(mischiefPool,5),
    result:null
  };
}

function sample(arr,n){ return [...arr].sort(()=>Math.random()-.5).slice(0,n); }
function clamp(n,min=0,max=100){ return Math.max(min,Math.min(max,n)); }
function fmtTime(m){ return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`; }
function addLog(text){ state.logs.unshift({time:fmtTime(state.time),text}); state.logs=state.logs.slice(0,10); }
function addEvidence(items){ items.filter(Boolean).forEach(e=>{ if(!state.evidence.includes(e)) state.evidence.push(e); }); }
function beep(freq=520,dur=.06){
  if(!soundOn) return;
  try{
    const AC=window.AudioContext||window.webkitAudioContext; const ctx=new AC(); const o=ctx.createOscillator(); const g=ctx.createGain();
    o.frequency.value=freq; o.type='sine'; g.gain.setValueAtTime(.035,ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+dur); o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur);
  }catch(e){}
}

function showScreen(id){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); $(id).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
function renderRecord(){
  const plays=Number(localStorage.getItem('chibiNemoPlays')||0); const best=Number(localStorage.getItem('chibiNemoBestFun')||0);
  $('#recordText').textContent = plays ? `おるすばん記録：${plays}回　／　最高たのしさ ${best}` : '初めてのおるすばん。たぶん大丈夫。';
}

function renderMood(){
  const card = $('#portraitPanel');
  const comment = $('#statusComment');
  if(!card || !comment) return;
  card.classList.remove('warning','danger');
  let text = '「まだまだ遊べるよ！」';
  if(state.phase==='cleanup'){
    text = '「ぜったいバレないようにしないと…！」';
    card.classList.add('warning');
  } else if(state.risk >= 70 || state.evidence.length >= 4){
    text = '「ちょっとやばいかも……でも、しらない。」';
    card.classList.add('danger');
  } else if(state.mess >= 50){
    text = '「ちらかってきた…？ まだいけるよね？」';
    card.classList.add('warning');
  } else if(state.fun >= 70){
    text = '「今日は大当たりの日かも！」';
  }
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
    $('#turnLabel').textContent=`${state.turn+1} / ${state.maxTurns}`;
    renderMischiefActions();
  }else if(state.phase==='cleanup'){
    $('#phaseKicker').textContent='② しょうこいんめつフェーズ'; $('#phaseTitle').textContent='あわてず、しょうこをかくそう！'; $('#phaseDesc').textContent='あと30分。3回だけ片付けられる。全部は無理かもしれない。';
    $('#turnLabel').textContent=`残り ${state.cleanupTurns-state.cleanupCount} 手`;
    renderCleanupActions();
  }
}

function renderMischiefActions(){
  const list = sample(mischiefPool.filter(a=>!state.currentActions.some(c=>c.id===a.id)),2).concat(state.currentActions.slice(0,3));
  state.currentActions = sample(list,Math.min(5,list.length));
  $('#actions').innerHTML=state.currentActions.map(a=>{
    const forbidden=a.forbiddenKey===state.rule.key;
    const risk = a.risk + (forbidden?15:0);
    return `<button class="action-btn ${forbidden?'forbidden':''}" data-action="${a.id}">
      <div class="action-main"><div class="action-emoji">${a.emoji}</div><div class="action-copy"><b>${a.name}</b><small>${a.text}</small>${forbidden?'<span class="forbidden-tag">⚠️ 今日の約束に反している</span>':''}</div></div>
      <div class="action-stats"><span class="stat-chip">🎉 +${a.fun}</span><span class="stat-chip">🧹 +${a.mess}</span><span class="stat-chip risk">👀 +${risk}</span></div>
    </button>`;
  }).join('');
  document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>doMischief(btn.dataset.action)));
}

function doMischief(id){
  const a=mischiefPool.find(x=>x.id===id); if(!a)return;
  const forbidden=a.forbiddenKey===state.rule.key;
  state.fun=clamp(state.fun+a.fun,0,130); state.mess=clamp(state.mess+a.mess,0,130); state.risk=clamp(state.risk+a.risk+(forbidden?15:0),0,130);
  addEvidence(a.evidence); if(forbidden){state.touchedForbidden=true; addLog(`【約束やぶり】${a.log}`);} else addLog(a.log);
  state.time+=30; state.turn++;
  beep(forbidden?220:620,.08);
  if(state.turn>=state.maxTurns){ beginCleanup(); return; }
  if(Math.random()<.48){ triggerRandomEvent(); } else { state.currentActions=sample(mischiefPool,5); render(); }
}

function triggerRandomEvent(){
  const e={...randomEvents[Math.floor(Math.random()*randomEvents.length)]};
  if(e.fun) state.fun=clamp(state.fun+e.fun,0,130); if(e.mess) state.mess=clamp(state.mess+e.mess,0,130); if(e.risk) state.risk=clamp(state.risk+e.risk,0,130); if(e.evidence)addEvidence([e.evidence]);
  addLog(e.title+'。'+e.text);
  $('#eventIcon').textContent=e.icon; $('#eventTitle').textContent=e.title; $('#eventText').textContent=e.text;
  $('#eventModal').classList.add('open'); $('#eventModal').setAttribute('aria-hidden','false'); render();
}

function beginCleanup(){
  state.phase='cleanup'; state.time=19*60+30; addLog('ねもちゃんから「もうすぐ帰るね」の連絡。まずい。');
  $('#eventIcon').textContent='🚨'; $('#eventTitle').textContent='ねもちゃん、あと30分で帰宅！'; $('#eventText').textContent='さあ、ここからが本番。証拠を消せるのは3回だけ。';
  $('#eventModal').classList.add('open'); $('#eventModal').setAttribute('aria-hidden','false'); render();
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
  if(a.clearWet){
    const idx=state.evidence.findIndex(e=>/泥|濡|泡|床/.test(e)); if(idx>=0){state.evidence.splice(idx,1);cleared=1;}
  }else if(a.clear && state.evidence.length){
    state.evidence.splice(Math.floor(Math.random()*state.evidence.length),1); cleared=1;
  }
  state.cleanedEvidence+=cleared; state.mess=clamp(state.mess+a.mess,0,130); state.risk=clamp(state.risk+a.risk,0,130); state.cleanupCount++; state.time+=10;
  addLog(`${a.name}。${cleared?'証拠を1つ消した！':'とにかく見た目は少しマシ。'}`); beep(760,.06);
  if(state.cleanupCount>=state.cleanupTurns){ beginJudgement(); } else render();
}

function beginJudgement(){
  state.time=20*60; render(); showScreen('#judgementScreen');
  const available=excusePool.filter(e=>e.id==='unknown'||e.id==='confess'||e.special(state));
  $('#excuses').innerHTML=available.map(e=>`<button class="excuse-btn" data-excuse="${e.id}">${e.text}<br><small>${e.note}</small></button>`).join('');
  document.querySelectorAll('[data-excuse]').forEach(btn=>btn.addEventListener('click',()=>finishGame(btn.dataset.excuse)));
}

function finishGame(excuseId){
  const ex=excusePool.find(e=>e.id===excuseId); if(ex) state.risk=clamp(state.risk+ex.risk,0,130);
  const ev=state.evidence.length;
  let ending;
  if(state.touchedForbidden && (state.risk>=85 || ev>=4 || state.mess>=85)) ending='disaster';
  else if(ev===0 && state.risk<35 && state.mess<28) ending='perfect';
  else if(excuseId==='cleaning' && state.cleanupCount>=2 && state.mess<30 && state.risk<55) ending='reverse';
  else if(ev<=1 && state.risk<62) ending='suspicion';
  else ending='caught';
  state.result=ending;
  saveRecord(); renderResult(ending); showScreen('#resultScreen'); beep(ending==='perfect'?880:ending==='caught'||ending==='disaster'?180:520,.14);
}

function renderResult(type){
  const data={
    perfect:{icon:'😎',badge:'ENDING 01',title:'完全犯罪',quote:'「……今日は、いい子だった？」',story:'ねもちゃんは部屋を見回した。ちびねもはまばたきひとつしない。証拠はない。証言者もいない。<br><br><strong>ちびねも「ずっといい子だったよ。」</strong><br>――事件は迷宮入りした。',hint:'証拠をゼロにして、バレ度と散らかりを低く抑えると到達しやすい。'},
    suspicion:{icon:'🤨',badge:'ENDING 02',title:'ちょっとバレた',quote:'「……なんか、変じゃない？」',story:'決定的な証拠はない。でも、ねもちゃんの目が細い。<br><br>ちびねもは知らないふりを続けた。たぶん今日は逃げ切った。<br><strong>たぶん。</strong>',hint:'証拠が少ないと「疑惑」で済む。次は片付け方を変えると完全犯罪が見えるかも。'},
    caught:{icon:'🚓',badge:'ENDING 03',title:'全部バレた',quote:'ねもちゃん「……ちびねも。」',story:'プリン。泥。散らかった服。どう考えても同一犯。<br><br>ちびねもは3秒考えて、こう答えた。<br><strong>「……ごめんなさい。」</strong><br>なお、反省時間は推定7分。',hint:'遊びすぎると片付け3手では足りない。どの証拠を消すかが大事。'},
    reverse:{icon:'🌟',badge:'SECRET ENDING',title:'なぜか褒められた',quote:'「お掃除してくれたの？ えらいね」',story:'ねもちゃんは、きれいになった床を見てにっこりした。<br><br>ちびねもは一瞬だけ良心と相談した。<br><strong>ちびねも「……うん！」</strong><br>真実はクッションの下に眠っている。',hint:'片付けをしっかりして「おそうじ、してたの！」を選ぶと起きることがある。'},
    disaster:{icon:'💥',badge:'CHAOS ENDING',title:'大惨事',quote:'「どうしてこうなったの！？」',story:'今日の約束。それは、守られるためにあった。<br>しかし、ちびねもにとっては「面白そう」の看板だった。<br><br><strong>ちびねも「……でも、たのしかった！」</strong><br>ねもちゃんは頭を抱えた。',hint:'今日の約束を破ったうえで派手に遊ぶと発生しやすい。これはこれで、ちびねもらしい。'}
  }[type];
  $('#resultIcon').textContent=data.icon; $('#resultBadge').textContent=data.badge; $('#resultTitle').textContent=data.title; $('#resultQuote').textContent=data.quote; $('#resultStory').innerHTML=data.story; $('#resultHint').textContent=data.hint;
  $('#finalFun').textContent=state.fun; $('#finalMess').textContent=state.mess; $('#finalRisk').textContent=state.risk; $('#finalEvidence').textContent=state.evidence.length;
}

function saveRecord(){
  const plays=Number(localStorage.getItem('chibiNemoPlays')||0)+1; localStorage.setItem('chibiNemoPlays',plays);
  const best=Math.max(Number(localStorage.getItem('chibiNemoBestFun')||0),state.fun); localStorage.setItem('chibiNemoBestFun',best);
  const endings=JSON.parse(localStorage.getItem('chibiNemoEndings')||'{}'); endings[state.result]=(endings[state.result]||0)+1; localStorage.setItem('chibiNemoEndings',JSON.stringify(endings));
}

$('#startBtn').addEventListener('click',()=>{ resetState(); addLog('ねもちゃん出発。「いい子にしててね」'); showScreen('#gameScreen'); render(); beep(620,.07); });
$('#eventCloseBtn').addEventListener('click',()=>{ $('#eventModal').classList.remove('open'); $('#eventModal').setAttribute('aria-hidden','true'); if(state.phase==='mischief') state.currentActions=sample(mischiefPool,5); render(); });
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
    $('#eventModal').classList.remove('open');
    $('#eventModal').setAttribute('aria-hidden','true');
    closeHowModal();
  }
});

renderRecord();
