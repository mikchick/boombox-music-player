/* ════════════════════════════════════════════
   DATA
════════════════════════════════════════════ */
const ARTISTS=[
  // 60s
  {n:'Miles Davis',e:'60s',wiki:'Miles_Davis'},
  {n:'Aretha Franklin',e:'60s',wiki:'Aretha_Franklin'},
  {n:'Nina Simone',e:'60s',wiki:'Nina_Simone'},
  {n:'Thelonious Monk',e:'60s',wiki:'Thelonious_Monk'},
  {n:'John Coltrane',e:'60s',wiki:'John_Coltrane'},
  {n:'Jimi Hendrix',e:'60s',wiki:'Jimi_Hendrix'},
  {n:'The Beatles',e:'60s',wiki:'The_Beatles'},
  {n:'Otis Redding',e:'60s',wiki:'Otis_Redding'},
  {n:'James Brown',e:'60s',wiki:'James_Brown'},
  {n:'Marvin Gaye',e:'60s',wiki:'Marvin_Gaye'},
  {n:'Joni Mitchell',e:'60s',wiki:'Joni_Mitchell'},
  {n:'The Doors',e:'60s',wiki:'The_Doors'},
  // 70s
  {n:'David Bowie',e:'70s',wiki:'David_Bowie'},
  {n:'The Clash',e:'70s',wiki:'The_Clash'},
  {n:'Bob Marley',e:'70s',wiki:'Bob_Marley'},
  {n:'Stevie Wonder',e:'70s',wiki:'Stevie_Wonder'},
  {n:'Led Zeppelin',e:'70s',wiki:'Led_Zeppelin'},
  {n:'Pink Floyd',e:'70s',wiki:'Pink_Floyd'},
  {n:'Fleetwood Mac',e:'70s',wiki:'Fleetwood_Mac'},
  {n:'Patti Smith',e:'70s',wiki:'Patti_Smith'},
  {n:'Elton John',e:'70s',wiki:'Elton_John'},
  {n:'Parliament',e:'70s',wiki:'Parliament_(band)'},
  {n:'Television',e:'70s',wiki:'Television_(band)'},
  // 80s
  {n:'Kraftwerk',e:'80s',wiki:'Kraftwerk'},
  {n:'Prince',e:'80s',wiki:'Prince_(musician)'},
  {n:'Sade',e:'80s',wiki:'Sade_(singer)'},
  {n:'Kate Bush',e:'80s',wiki:'Kate_Bush'},
  {n:'The Cure',e:'80s',wiki:'The_Cure'},
  {n:'Michael Jackson',e:'80s',wiki:'Michael_Jackson'},
  {n:'Madonna',e:'80s',wiki:'Madonna'},
  {n:'New Order',e:'80s',wiki:'New_Order'},
  {n:'Talking Heads',e:'80s',wiki:'Talking_Heads'},
  {n:'Depeche Mode',e:'80s',wiki:'Depeche_Mode'},
  {n:'The Smiths',e:'80s',wiki:'The_Smiths'},
  {n:'Run-DMC',e:'80s',wiki:'Run-DMC'},
  // 90s
  {n:'Radiohead',e:'90s',wiki:'Radiohead'},
  {n:'Björk',e:'90s',wiki:'Björk'},
  {n:'Nirvana',e:'90s',wiki:'Nirvana_(band)'},
  {n:'Massive Attack',e:'90s',wiki:'Massive_Attack'},
  {n:'Portishead',e:'90s',wiki:'Portishead_(band)'},
  {n:'Lauryn Hill',e:'90s',wiki:'Lauryn_Hill'},
  {n:'Jeff Buckley',e:'90s',wiki:'Jeff_Buckley'},
  {n:'Tupac',e:'90s',wiki:'2Pac'},
  {n:'Wu-Tang Clan',e:'90s',wiki:'Wu-Tang_Clan'},
  {n:'Smashing Pumpkins',e:'90s',wiki:'The_Smashing_Pumpkins'},
  {n:'Pearl Jam',e:'90s',wiki:'Pearl_Jam'},
  {n:'Blur',e:'90s',wiki:'Blur_(band)'},
  // 00s
  {n:'Daft Punk',e:'00s',wiki:'Daft_Punk'},
  {n:'Amy Winehouse',e:'00s',wiki:'Amy_Winehouse'},
  {n:'OutKast',e:'00s',wiki:'OutKast'},
  {n:'Erykah Badu',e:'00s',wiki:'Erykah_Badu'},
  {n:'Kanye West',e:'00s',wiki:'Kanye_West'},
  {n:'The Strokes',e:'00s',wiki:'The_Strokes'},
  {n:'LCD Soundsystem',e:'00s',wiki:'LCD_Soundsystem'},
  {n:'Arcade Fire',e:'00s',wiki:'Arcade_Fire'},
  {n:'The White Stripes',e:'00s',wiki:'The_White_Stripes'},
  {n:'Gorillaz',e:'00s',wiki:'Gorillaz'},
  {n:'M.I.A.',e:'00s',wiki:'M.I.A._(rapper)'},
  {n:'Interpol',e:'00s',wiki:'Interpol_(band)'},
  // 10s
  {n:'Kendrick Lamar',e:'10s',wiki:'Kendrick_Lamar'},
  {n:'Frank Ocean',e:'10s',wiki:'Frank_Ocean'},
  {n:'Solange',e:'10s',wiki:'Solange_Knowles'},
  {n:'James Blake',e:'10s',wiki:'James_Blake_(musician)'},
  {n:'FKA Twigs',e:'10s',wiki:'FKA_Twigs'},
  {n:'Tyler the Creator',e:'10s',wiki:'Tyler,_the_Creator'},
  {n:'Blood Orange',e:'10s',wiki:'Dev_Hynes'},
  {n:'Bon Iver',e:'10s',wiki:'Bon_Iver'},
];

/* Image cache — fetched from Wikipedia REST API */
const IMG={};
async function fetchImg(wiki){
  if(IMG[wiki]!==undefined)return IMG[wiki];
  IMG[wiki]=null; // mark in-flight
  try{
    const r=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`);
    const d=await r.json();
    IMG[wiki]=d.thumbnail?.source||null;
  }catch(e){IMG[wiki]=null;}
  return IMG[wiki];
}
async function preloadImgs(){
  await Promise.all(ARTISTS.map(a=>fetchImg(a.wiki)));
  renderAG(); // re-render with real photos
}

/* Album art cache — same API, keyed by Wikipedia article */
const ART={};
async function fetchArt(wiki){
  if(ART[wiki]!==undefined)return ART[wiki];
  ART[wiki]=null;
  try{
    const r=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`);
    const d=await r.json();
    ART[wiki]=d.originalimage?.source||d.thumbnail?.source||null;
  }catch(e){ART[wiki]=null;}
  return ART[wiki];
}

const GENRES=['Soul','Jazz','Blues','Funk','Hip-Hop','R&B','Rock','Punk','Post-Punk',
  'Indie','Electronic','House','Techno','Ambient','Folk','Reggae','Classical',
  'Bossa Nova','City Pop','Synthwave','Metal','Grunge','Disco'];

const REGIONS={
  'Americas':['🇺🇸|USA','🇧🇷|Brazil','🇨🇺|Cuba','🇯🇲|Jamaica','🇲🇽|Mexico','🇦🇷|Argentina'],
  'Europe':['🇬🇧|UK','🇩🇪|Germany','🇫🇷|France','🇮🇹|Italy','🇸🇪|Sweden','🇵🇹|Portugal'],
  'Asia':['🇯🇵|Japan','🇰🇷|Korea','🇮🇳|India','🇨🇳|China','🇹🇭|Thailand','🇻🇳|Vietnam'],
  'Africa':['🇬🇭|Ghana','🇳🇬|Nigeria','🇲🇦|Morocco','🇿🇦|South Africa','🇪🇹|Ethiopia'],
};

const TRIPS=[
  {era:1982,flag:'🇯🇲',loc:'Kingston',country:'Jamaica',genres:['Reggae'],icon:'🌴',
   bg:'linear-gradient(135deg,#0a1a0a,#1a1a0a)',
   tracks:[{t:'Pass the Dutchie',a:'Musical Youth',d:'3:22'}]},
  {era:1979,flag:'🇯🇵',loc:'Tokyo',country:'Japan',genres:['City Pop','J-Pop'],icon:'🌸',
   artWiki:'Plastic_Love',
   bg:'linear-gradient(135deg,#1a0a2e,#16213e)',
   tracks:[{t:'Plastic Love',a:'Mariya Takeuchi',d:'6:02'},{t:'Ride on Time',a:'Tatsuro Yamashita',d:'5:15'},{t:'September',a:'Hiroshi Sato',d:'4:43'}]},
  {era:1991,flag:'🇺🇸',loc:'Seattle',country:'USA',genres:['Grunge','Alternative'],icon:'🌧',
   artWiki:'Ten_(Pearl_Jam_album)',
   bg:'linear-gradient(135deg,#0d1f0d,#0a1512)',
   tracks:[{t:'Black',a:'Pearl Jam',d:'5:44'},{t:'Heart-Shaped Box',a:'Nirvana',d:'4:41'}]},
  {era:1977,flag:'🇬🇧',loc:'London',country:'UK',genres:['Punk','Post-Punk'],icon:'⚡',
   artWiki:'London_Calling',
   bg:'linear-gradient(135deg,#1f0d0d,#120808)',
   tracks:[{t:'London Calling',a:'The Clash',d:'3:19'},{t:'God Save the Queen',a:'Sex Pistols',d:'3:18'},{t:'Anarchy in the UK',a:'Sex Pistols',d:'3:32'}]},
  {era:1988,flag:'🇺🇸',loc:'Chicago',country:'USA',genres:['House','Electronic'],icon:'🎛',
   artWiki:'Move_Your_Body_(Marshall_Jefferson_song)',
   bg:'linear-gradient(135deg,#0a0a1f,#0d0d1a)',
   tracks:[{t:'Move Your Body',a:'Marshall Jefferson',d:'7:12'},{t:'Can You Feel It',a:'Larry Heard',d:'8:01'},{t:'Mystery of Love',a:'Frankie Knuckles',d:'6:44'}]},
  {era:1973,flag:'🇺🇸',loc:'New York',country:'USA',genres:['Jazz','Funk'],icon:'🎷',
   bg:'linear-gradient(135deg,#1f1a0a,#16130a)',
   tracks:[{t:'Head Hunters',a:'Herbie Hancock',d:'13:41'},{t:'Compared to What',a:'Les McCann',d:'5:42'},{t:'Chameleon',a:'Herbie Hancock',d:'15:44'}]},
  {era:1983,flag:'🇩🇪',loc:'Berlin',country:'Germany',genres:['Electronic','Synthwave'],icon:'🔲',
   bg:'linear-gradient(135deg,#0d0d0d,#1a1a1a)',
   tracks:[{t:'Tour de France',a:'Kraftwerk',d:'3:42'},{t:'Computer World',a:'Kraftwerk',d:'5:01'},{t:'Numbers',a:'Kraftwerk',d:'5:05'}]},
  {era:1967,flag:'🇺🇸',loc:'San Francisco',country:'USA',genres:['Psychedelic','Rock'],icon:'🌀',
   bg:'linear-gradient(135deg,#0f1a2e,#1a0f2e)',
   tracks:[{t:'White Rabbit',a:'Jefferson Airplane',d:'2:32'},{t:'Purple Haze',a:'Jimi Hendrix',d:'2:50'},{t:'Somebody to Love',a:'Jefferson Airplane',d:'2:57'}]},
  {era:1995,flag:'🇺🇸',loc:'Detroit',country:'USA',genres:['Techno','Electronic'],icon:'⚙',
   bg:'linear-gradient(135deg,#0a0a14,#14140a)',
   tracks:[{t:'Strings of Life',a:'Derrick May',d:'7:04'},{t:'Big Fun',a:'Inner City',d:'8:12'},{t:'Good Life',a:'Inner City',d:'5:44'}]},
  {era:2020,flag:'🇺🇸',loc:'Los Angeles',country:'USA',genres:['Jazz','Indie'],icon:'🌙',
   bg:'linear-gradient(135deg,#0d1520,#1a0d28)',
   tracks:[{t:'Gloom',a:'Velvet Lune',d:'3:45'},{t:'Surface',a:'Velvet Lune',d:'3:30'},{t:'Moon Undah Water',a:'Puma Blue',d:'4:12'},{t:'Motion Sickness',a:'Phoebe Bridgers',d:'3:51'},{t:'Pink in the Night',a:'Mitski',d:'3:02'}]},
  {era:2010,flag:'🇬🇧',loc:'London',country:'UK',genres:['Dance','Indie','Electronic'],icon:'💿',
   bg:'linear-gradient(135deg,#0a0a1a,#1a0a14)',
   tracks:[{t:'Latch',a:'Disclosure',d:'5:09'},{t:'Tennis Court',a:'Lorde (Flume Remix)',d:'3:53'},{t:'The Spins',a:'Mac Miller',d:'3:58'}]},
  {era:2010,flag:'🇺🇸',loc:'Pittsburgh',country:'USA',genres:['Hip-Hop','Indie'],icon:'🌀',
   bg:'linear-gradient(135deg,#140a1f,#0a0f1a)',
   tracks:[{t:'The Spins',a:'Mac Miller',d:'3:58'}]},
];

const DECADES=[];
for(let d=1920;d<=2020;d+=10)DECADES.push(d);

/* ════════════════════════════════════════════
   STATE
════════════════════════════════════════════ */
/* Audio source map — keyed by track title */
const AUDIO_SRC = {
  'Plastic Love': 'audio/plastic-love.mp3',
  'Gloom': 'audio/gloom.m4a',
  'Surface': 'audio/surface.m4a',
  'The Spins': 'audio/the-spins.mp3',
};
/* YouTube video IDs — keyed by track title */
const YT_SRC={
  'Khlorine':'dbv1O3jV_Hk',
};
let ytPlayer=null,ytReady=false;
window.onYouTubeIframeAPIReady=function(){
  ytReady=true;
  ytPlayer=new YT.Player('yt-player',{
    videoId:'',
    playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,rel:0},
    events:{
      onStateChange:e=>{if(e.data===YT.PlayerState.ENDED&&S.hasYTAudio)nextTr();}
    }
  });
};
/* Track start offsets in seconds — keyed by track title */
const TRACK_START={
  'Ride on Time':4,
};
/* Album art map — local images keyed by track title */
const ART_SRC={
  'Pass the Dutchie':'images/Musical Youth.jpg',
  'Ride on Time':'images/Rideontime_tatsyamashita.jpg',
  'Gloom':'images/Velvet Lune.png',
  'Surface':'images/Velvet Lune.png',
  'Moon Undah Water':'images/Puma Blue.png',
  'Latch':'images/Latch.png',
  'Tennis Court':'images/tennis court flume.png',
  'Heart-Shaped Box':'images/Nirvana.png',
  'The Spins':'images/Mac Miller.png',
};

const S={
  ob:{artists:[],genres:[]},
  activeTab:'home',
  dial:{era:null,country:null,flag:null,genres:[],region:'Americas'},
  playing:null,trackIdx:0,
  isPlaying:false,
  library:[],history:[],favorites:[],
  timer:null,progSec:0,totalSec:263,
  hasRealAudio:false,
  hasYTAudio:false,
  comments:{}, // trackKey → [{id,user,timestamp,text,reaction,createdAt}]
};

/* ════════════════════════════════════════════
   UTILS
════════════════════════════════════════════ */
const $=id=>document.getElementById(id);
const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
const fmt=s=>`${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

/* ════════════════════════════════════════════
   ONBOARDING
════════════════════════════════════════════ */
function showOB(id){
  document.querySelectorAll('.ob-screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
}

function renderAG(era='All',q=''){
  const g=$('agrid');
  const list=ARTISTS.filter(a=>(era==='All'||a.e===era)&&(!q||a.n.toLowerCase().includes(q.toLowerCase())));
  const trimQ=q.trim();
  const exactInList=trimQ&&list.some(a=>a.n.toLowerCase()===trimQ.toLowerCase());
  const customSelected=trimQ&&!exactInList&&S.ob.artists.some(n=>n.toLowerCase()===trimQ.toLowerCase());
  const showAdd=trimQ&&!exactInList;
  const addIsOn=customSelected;
  const safeAddName=showAdd?trimQ.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):'';
  const safeAddAttr=showAdd?trimQ.replace(/"/g,'&quot;'):'';
  g.innerHTML=list.map(a=>`
    <div class="atile${S.ob.artists.includes(a.n)?' on':''}" data-n="${a.n}">
      <div class="av">${IMG[a.wiki]?`<img src="${IMG[a.wiki]}" alt="${a.n}" loading="lazy">`:'<span style="font-size:26px;color:var(--t3)">◈</span>'}</div>
      <div class="ag-grad"></div>
      <div class="nm">${a.n}</div>
      <div class="atile-check"><svg viewBox="0 0 13 13" fill="none" stroke="hsl(0 0% 5%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,7 5,10 11,3"/></svg></div>
    </div>`).join('')+(showAdd?`
    <div class="atile atile-add${addIsOn?' on':''}" data-n="${safeAddAttr}">
      <div class="av">${addIsOn?'':'<span style="font-size:32px;color:hsl(152 60% 52%)">+</span>'}</div>
      <div class="ag-grad"></div>
      <div class="nm">${safeAddName}</div>
      <div class="atile-check"><svg viewBox="0 0 13 13" fill="none" stroke="hsl(0 0% 5%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,7 5,10 11,3"/></svg></div>
    </div>`:'');
  g.querySelectorAll('.atile').forEach(t=>t.addEventListener('click',()=>togArtist(t.dataset.n)));
}

function togArtist(n){
  const i=S.ob.artists.indexOf(n);
  if(i>-1)S.ob.artists.splice(i,1);
  else{if(S.ob.artists.length>=3)return;S.ob.artists.push(n);vib(10);}
  const done=S.ob.artists.length===3;
  $('actr').textContent=`${S.ob.artists.length} / 3`;
  $('actr').classList.toggle('done',done);
  $('acont').classList.toggle('rdy',done);
  if(done)vib([10,50,20]);
  renderAG(document.querySelector('.era-ch.on')?.dataset.era||'All',$('asearch').value);
}

function renderGG(){
  $('ggrid').innerHTML=GENRES.map(g=>`<div class="gch${S.ob.genres.includes(g)?' on':''}" data-g="${g}">${g}</div>`).join('');
  $('ggrid').querySelectorAll('.gch').forEach(c=>c.addEventListener('click',()=>togOBGenre(c.dataset.g)));
}

function togOBGenre(g){
  const i=S.ob.genres.indexOf(g);
  if(i>-1)S.ob.genres.splice(i,1);
  else{if(S.ob.genres.length>=3)return;S.ob.genres.push(g);vib(10);}
  const done=S.ob.genres.length===3;
  $('gctr').textContent=`${S.ob.genres.length} / 3`;
  $('gctr').classList.toggle('done',done);
  $('gcont').classList.toggle('rdy',done);
  if(done)vib([10,50,20]);
  renderGG();
}

function startBuild(){
  showOB('ob-bld');
  const steps=[
    {t:'Building your<br>time machine…',s:''},
    {t:'Scanning the archive…',s:'Connecting 100 years of music'},
    {t:'Calibrating the dial…',s:'Mapping your taste profile'},
    {t:'Ready to travel.',s:''},
  ];
  let i=0;
  function next(){
    if(i>=steps.length){setTimeout(()=>launchApp(),700);return;}
    const el=$('bld-txt'),su=$('bld-sub');
    el.style.transition='none';el.style.opacity='0';
    setTimeout(()=>{
      el.innerHTML=steps[i].t;su.textContent=steps[i].s;
      el.style.transition='opacity 400ms';el.style.opacity='1';
      i++;setTimeout(next,i===steps.length?900:650);
    },200);
  }
  next();
}

function launchApp(){
  const ob=$('onboarding'),app=$('main-app');
  ob.style.transition='opacity 500ms';ob.style.opacity='0';
  setTimeout(()=>{
    ob.style.display='none';
    app.style.display='flex';
    initApp();
  },500);
}

// Onboarding events
$('ob-start').addEventListener('click',()=>{renderAG();showOB('ob-artists');vib(15);preloadImgs();});
$('erow').addEventListener('click',e=>{
  const c=e.target.closest('.era-ch');if(!c||$('erow')._dragged)return;
  document.querySelectorAll('.era-ch').forEach(x=>x.classList.remove('on'));
  c.classList.add('on');renderAG(c.dataset.era,$('asearch').value);
});
(()=>{const er=$('erow');let mdx=0,msl=0,mdown=false;
  er.addEventListener('mousedown',e=>{mdown=true;er._dragged=false;mdx=e.pageX;msl=er.scrollLeft;e.preventDefault();});
  window.addEventListener('mousemove',e=>{if(!mdown)return;const dx=e.pageX-mdx;if(Math.abs(dx)>4)er._dragged=true;er.scrollLeft=msl-dx;});
  window.addEventListener('mouseup',()=>{mdown=false;});
})();
$('asearch').addEventListener('input',e=>renderAG(document.querySelector('.era-ch.on')?.dataset.era||'All',e.target.value));
$('acont').addEventListener('click',()=>{if(S.ob.artists.length<3)return;renderGG();showOB('ob-genres');vib(15)});
$('gcont').addEventListener('click',()=>{if(S.ob.genres.length<3)return;startBuild()});

/* ════════════════════════════════════════════
   DIAL COMPONENT
════════════════════════════════════════════ */
function makeDial(wrapId,trackId,initDecade,onChange){
  const wrap=$(wrapId),track=$(trackId);
  track.innerHTML=DECADES.map((d,i)=>`
    <div class="ddec${d===initDecade?' on':''}" data-d="${d}">
      <div class="dtick"></div><div class="dyr">${d}s</div>
    </div>`).join('');

  const W=80;
  let idx=DECADES.indexOf(initDecade);
  let off=-idx*W,drag=false,sx=0,so=0,cur=idx;

  function setIdx(i,snap=true){
    cur=Math.max(0,Math.min(DECADES.length-1,i));
    off=-cur*W;
    if(snap){track.classList.add('snap');track.style.transform=`translateX(${off}px)`;setTimeout(()=>track.classList.remove('snap'),160);}
    else{track.style.transform=`translateX(${off}px)`;}
    track.querySelectorAll('.ddec').forEach((el,j)=>el.classList.toggle('on',j===cur));
    onChange(DECADES[cur]);
  }

  function onS(e){drag=true;sx=e.type==='touchstart'?e.touches[0].clientX:e.clientX;so=off;track.classList.remove('snap')}
  function onM(e){
    if(!drag)return;
    const x=e.type==='touchmove'?e.touches[0].clientX:e.clientX;
    const no=Math.max(-(DECADES.length-1)*W,Math.min(0,so+(x-sx)));
    off=no;track.style.transform=`translateX(${off}px)`;
    const ni=Math.max(0,Math.min(DECADES.length-1,Math.round(-off/W)));
    if(ni!==cur){cur=ni;track.querySelectorAll('.ddec').forEach((el,j)=>el.classList.toggle('on',j===cur));onChange(DECADES[cur]);vib(8);}
  }
  function onE(){if(!drag)return;drag=false;setIdx(cur,true);}

  wrap.addEventListener('mousedown',onS);
  wrap.addEventListener('touchstart',onS,{passive:true});
  window.addEventListener('mousemove',onM);
  window.addEventListener('touchmove',onM,{passive:true});
  window.addEventListener('mouseup',onE);
  window.addEventListener('touchend',onE);
  setIdx(idx,false);
}

/* ════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════ */
function initApp(){
  let homeEra=1990;
  makeDial('hdial-wrap','hdial',1990,d=>{
    $('h-era').textContent=`${d}s`;
    homeEra=d;
    const wrap=$('home-portal-wrap');
    if(wrap.style.maxHeight==='0px'||!wrap.style.maxHeight){
      wrap.style.maxHeight='80px';wrap.style.marginBottom='0px';
    }
  });
  $('home-portal-btn').addEventListener('click',()=>{
    const match=TRIPS.find(t=>t.era>=homeEra&&t.era<homeEra+10)||TRIPS.find(t=>Math.abs(t.era-homeEra)<15);
    if(match)openPortal(match,true);else vib([20,30]);
  });
  makeDial('cdial-wrap','cdial',1990,d=>{
    S.dial.era=d;$('dial-val').textContent=`${d}s`;updatePreview();updatePBtn();
  });
  renderRecs();renderRegions();renderGsGrid();renderLib();
  initTabs();initPBtn();initNP();initHomeActions();
  switchTab('home');
}

// Each entry: [gradientCSS, glowColor]
const CARD_PALETTE={
  '1979-Tokyo':    ['linear-gradient(145deg,#F869D5 0%,#9c5cd8 50%,#5650DE 100%)','#F869D5'],
  '2020-Los Angeles':['linear-gradient(145deg,#FF9897 0%,#f570cc 50%,#F650A0 100%)','#FF9897'],
  '1991-Seattle':  ['linear-gradient(145deg,#6EE2F5 0%,#6898f4 50%,#6454F0 100%)','#6EE2F5'],
  '2010-London':   ['linear-gradient(145deg,#FF5894 0%,#c04aac 50%,#8441A4 100%)','#FF5894'],
  '1977-London':   ['linear-gradient(145deg,#FFA62E 0%,#f07030 50%,#EA4D2C 100%)','#FFA62E'],
};
const CARD_FALLBACK=[
  ['linear-gradient(145deg,#FF6CAB 0%,#bc68d8 50%,#7366FF 100%)','#FF6CAB'], // pink → violet
  ['linear-gradient(145deg,#B65EBA 0%,#7274ce 50%,#2E8DE1 100%)','#B65EBA'], // purple → blue
  ['linear-gradient(145deg,#64E8DE 0%,#78a4e8 50%,#8A64EB 100%)','#64E8DE'], // teal → purple
  ['linear-gradient(145deg,#FFCF1B 0%,#ffac18 50%,#FF8818 100%)','#FFCF1B'], // yellow → orange
  ['linear-gradient(145deg,#78F2E9 0%,#98d4d0 50%,#B65EBA 100%)','#78F2E9'], // aqua → purple
  ['linear-gradient(145deg,#FF9482 0%,#cc88d4 50%,#7D77FF 100%)','#FF9482'], // salmon → periwinkle
  ['linear-gradient(145deg,#F00B51 0%,#b00055 50%,#73005C 100%)','#F00B51'], // crimson → maroon
  ['linear-gradient(145deg,#00FFED 0%,#00c8d0 50%,#0088BA 100%)','#00FFED'], // cyan → teal
  ['linear-gradient(145deg,#3499FF 0%,#3868cc 50%,#3A3985 100%)','#3499FF'], // blue → navy
];
const IATA_MAP={
  'Tokyo':'TYO','Los Angeles':'LAX','Seattle':'SEA','London':'LHR',
  'New York':'JFK','Paris':'CDG','Berlin':'BER','Chicago':'ORD',
  'Detroit':'DTW','Nashville':'BNA','Lagos':'LOS','Kingston':'KIN',
  'Havana':'HAV','Buenos Aires':'EZE','São Paulo':'GRU','Mexico City':'MEX',
  'Toronto':'YYZ','Manchester':'MAN','Dublin':'DUB','San Francisco':'SFO',
  'Miami':'MIA','Atlanta':'ATL','New Orleans':'MSY','Minneapolis':'MSP',
  'Houston':'IAH','Compton':'LAX','Brooklyn':'JFK','Bronx':'JFK',
  'Rio de Janeiro':'GIG','Johannesburg':'JNB','Amsterdam':'AMS',
  'Stockholm':'ARN','Oslo':'OSL','Vienna':'VIE','Lisbon':'LIS',
  'Madrid':'MAD','Milan':'MXP','Rome':'FCO','Istanbul':'IST',
  'Mumbai':'BOM','Seoul':'ICN','Osaka':'KIX','Shanghai':'PVG',
  'Sydney':'SYD','Auckland':'AKL','Glasgow':'GLA','Liverpool':'LPL',
};
function tripCardHTML(t,i,cls='rcard'){
  const cols=CARD_PALETTE[`${t.era}-${t.loc}`]||CARD_FALLBACK[i%CARD_FALLBACK.length];
  const iata=IATA_MAP[t.loc]||t.loc.slice(0,3).toUpperCase();
  const cityShort=t.loc.length>9?t.loc.split(' ')[0]:t.loc;
  return `<div class="${cls}" data-era="${t.era}" data-loc="${t.loc}" style="--rc-grad:${cols[0]};--rc2:${cols[1]}">
    <div class="rc-bg"></div><div class="rc-shine"></div>
    <div class="rc-content">
      <div>
        <div class="rc-year">${t.era}</div>
        <div class="rc-loc">${t.flag} ${t.loc}</div>
      </div>
      <div class="rc-genres">${t.genres.slice(0,2).map(g=>`<span class="rgenre">${g}</span>`).join('')}</div>
    </div>
    <div class="rc-pass"><div class="rc-pass-inner">
      <div class="rc-pass-top">
        <span class="rc-pass-flag">${t.flag}</span>
        <span class="rc-pass-iata">${iata}</span>
      </div>
      <div class="rc-pass-perf"></div>
      <div class="rc-pass-city">${cityShort.toUpperCase()}</div>
      <div class="rc-pass-yr">✈ ${t.era}</div>
    </div></div>
  </div>`;
}

function renderRecs(){
  const ORDER=[{era:2020,loc:'Los Angeles'},{era:1982,loc:'Kingston'},{era:1979,loc:'Tokyo'},{era:1991,loc:'Seattle'},{era:2010,loc:'London'},{era:1977,loc:'London'}];
  const sorted=ORDER.map(o=>TRIPS.find(t=>t.era===o.era&&t.loc===o.loc)).filter(Boolean);
  $('rscroll').innerHTML=sorted.map((t,i)=>tripCardHTML(t,i,'rcard')).join('');
  const rs=$('rscroll');
  rs.querySelectorAll('.rcard').forEach(c=>{
    c.addEventListener('click',()=>{
      if(rs._dragged)return;
      const trip=sorted.find(t=>t.era==c.dataset.era&&t.loc==c.dataset.loc);
      if(trip)openPortal(trip);
    });
  });
  // Mouse drag-to-scroll for desktop
  let mdx=0,msl=0,mdown=false;
  rs.addEventListener('mousedown',e=>{mdown=true;rs._dragged=false;mdx=e.pageX;msl=rs.scrollLeft;rs.style.cursor='grabbing';e.preventDefault();});
  window.addEventListener('mousemove',e=>{if(!mdown)return;const dx=e.pageX-mdx;if(Math.abs(dx)>4)rs._dragged=true;rs.scrollLeft=msl-dx;});
  window.addEventListener('mouseup',()=>{mdown=false;rs.style.cursor='';});
}

function renderRegions(){
  const rnames=Object.keys(REGIONS);
  $('regrow').innerHTML=rnames.map((r,i)=>`<div class="reg-ch${i===0?' on':''}" data-r="${r}">${r}</div>`).join('');
  $('regrow').querySelectorAll('.reg-ch').forEach(c=>c.addEventListener('click',()=>{
    $('regrow').querySelectorAll('.reg-ch').forEach(x=>x.classList.remove('on'));
    c.classList.add('on');S.dial.region=c.dataset.r;renderCountries(c.dataset.r);
  }));
  renderCountries(rnames[0]);
}

function renderCountries(region){
  const list=REGIONS[region]||[];
  $('cgrid').innerHTML=list.map(c=>{
    const[flag,...np]=c.split('|');const name=np.join('|');
    return `<div class="citem${S.dial.country===name?' on':''}" data-c="${name}" data-f="${flag}">
      <span class="cflag">${flag}</span><span class="cname">${name}</span></div>`;
  }).join('');
  $('cgrid').querySelectorAll('.citem').forEach(it=>it.addEventListener('click',()=>{
    S.dial.country=it.dataset.c;S.dial.flag=it.dataset.f;
    $('cgrid').querySelectorAll('.citem').forEach(x=>x.classList.remove('on'));
    it.classList.add('on');vib(10);updatePreview();updatePBtn();
  }));
}

function renderGsGrid(){
  $('gsgrid').innerHTML=GENRES.map(g=>`<div class="gsc${S.dial.genres.includes(g)?' on':''}" data-g="${g}">${g}</div>`).join('');
  $('gsgrid').querySelectorAll('.gsc').forEach(c=>c.addEventListener('click',()=>{
    const g=c.dataset.g,i=S.dial.genres.indexOf(g);
    if(i>-1){S.dial.genres.splice(i,1);c.classList.remove('on');}
    else{
      if(S.dial.genres.length>=3){
        const rm=S.dial.genres.shift();
        $('gsgrid').querySelector(`[data-g="${rm}"]`)?.classList.remove('on');
      }
      S.dial.genres.push(g);c.classList.add('on');vib(10);
    }
    updatePreview();updatePBtn();
  }));
}

function getTrip(){
  if(!S.dial.era)return null;
  return TRIPS.find(t=>{
    const em=Math.abs(t.era-S.dial.era)<=10;
    const cm=!S.dial.country||t.country===S.dial.country;
    const gm=S.dial.genres.length===0||S.dial.genres.some(g=>t.genres.includes(g));
    return em&&cm&&gm;
  })||TRIPS.find(t=>Math.abs(t.era-S.dial.era)<=15)||TRIPS[0];
}

function updatePreview(){
  const trip=getTrip();
  const rdy=S.dial.era&&S.dial.country&&S.dial.genres.length>0;
  $('pcard').classList.toggle('rdy',rdy&&!!trip);
  $('part').classList.toggle('lit',!!trip);
  if(trip){
    $('part').textContent=trip.icon;
    $('pt').textContent=trip.tracks[0].t;
    $('pa').textContent=trip.tracks[0].a;
    $('pm').textContent=`${trip.era} · ${trip.loc} · ${trip.genres[0]}`;
  }else if(S.dial.era){
    $('part').textContent='◎';$('pt').textContent=`Searching ${S.dial.era}s archive…`;
    $('pa').textContent=S.dial.country||'Select a location';$('pm').textContent='';
  }else{
    $('part').textContent='◎';$('pt').textContent='Select an era to begin';$('pa').textContent='';$('pm').textContent='';
  }
}

function updatePBtn(){
  const btn=$('pbtn');
  const hasEra=!!S.dial.era,hasAll=hasEra&&S.dial.country&&S.dial.genres.length>0;
  btn.classList.remove('part','rdy');
  if(hasAll)btn.classList.add('rdy');
  else if(hasEra)btn.classList.add('part');
}

/* ════════════════════════════════════════════
   PORTAL
════════════════════════════════════════════ */
function initPBtn(){
  $('pbtn').addEventListener('click',()=>{
    const trip=getTrip()||TRIPS[Math.floor(Math.random()*TRIPS.length)];
    openPortal(trip,true);
  });
}

const PORTAL_CAPTIONS=[
  'Aligning the groove coordinates...',
  'Bear with us... time travel in progress...',
  'Warping to the next vibe...',
];
let _plTimer=null,_plCapIdx=0;

function showPortalLoader(){
  const cap=$('pl-caption');
  _plCapIdx=0;
  cap.style.opacity='1';
  cap.textContent=PORTAL_CAPTIONS[_plCapIdx];
  $('portal-loader').classList.add('visible');
  _plTimer=setInterval(()=>{
    cap.style.opacity='0';
    setTimeout(()=>{
      _plCapIdx=(_plCapIdx+1)%PORTAL_CAPTIONS.length;
      cap.textContent=PORTAL_CAPTIONS[_plCapIdx];
      cap.style.opacity='1';
    },300);
  },2500);
}

function hidePortalLoader(cb){
  clearInterval(_plTimer);_plTimer=null;
  const el=$('portal-loader');
  el.classList.remove('visible');
  setTimeout(cb,280);
}

function openPortal(trip,withLoader=false){
  hideMiniPlayer();
  vib([15,30,25]);
  loadNPContent(trip,0);

  // Start audio immediately within the user gesture context
  S.playing=trip;S.trackIdx=0;S.isPlaying=true;S.progSec=0;
  startProg();
  S.history.unshift({track:trip.tracks[0].t,artist:trip.tracks[0].a,trip});
  renderHistory();

  const btn=$('pbtn');
  const rect=btn.getBoundingClientRect();
  const cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;

  const reveal=()=>{
    const np=$('np');
    np.style.clipPath=`circle(0% at ${cx}px ${cy}px)`;
    np.style.display='flex';
    np.style.transition='none';
    const fl=$('flash');
    fl.style.transition='opacity 80ms';
    fl.style.opacity='1';
    setTimeout(()=>{
      fl.style.opacity='0';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        np.style.transition='clip-path 450ms cubic-bezier(.4,0,.2,1)';
        np.style.clipPath=`circle(150% at ${cx}px ${cy}px)`;
      }));
      $('cplay').innerHTML='<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
      $('npart').classList.add('glow');
    },100);
  };

  if(withLoader){
    showPortalLoader();
    setTimeout(()=>hidePortalLoader(reveal),2800);
  }else{
    reveal();
  }
}

function loadNPContent(trip,idx){
  const tr=trip.tracks[idx];
  $('nptera').textContent=`${trip.era} · ${trip.loc.toUpperCase()}`;
  $('nptloc').textContent=trip.genres.join(' · ');
  $('nptitle').textContent=tr.t;$('npartist').textContent=tr.a;
  $('npmeta').textContent=`${trip.era} · ${trip.loc} · ${trip.genres[0]}`;
  $('ttot').textContent=tr.d;
  $('npblur').style.background=trip.bg;
  const _tripIdx=TRIPS.indexOf(trip);
  const _npeGrad=(CARD_PALETTE[`${trip.era}-${trip.loc}`]||CARD_FALLBACK[_tripIdx%CARD_FALLBACK.length])[0];
  $('np-extra').style.setProperty('--npe-grad',_npeGrad);
  const p=tr.d.split(':');S.totalSec=parseInt(p[0])*60+parseInt(p[1]);
  S.progSec=0;updateProg();
  // Real audio
  // Real audio / YouTube audio
const aud = $('aud');
const src = AUDIO_SRC[tr.t] || null;
const ytId = YT_SRC[tr.t] || null;

// reset audio first
aud.pause();
aud.currentTime = 0;
aud.src = '';
aud.muted = false;
aud.volume = 1.0;

if (src) {
  S.hasYTAudio = false;
  S.hasRealAudio = true;

  aud.src = src.split('/').map(encodeURIComponent).join('/');
  aud.muted = false;
  aud.volume = 1;
  aud.preload = "auto";

  aud.load();

  aud.addEventListener("canplay", () => {
    if (S.isPlaying) {
      aud.play().catch(err => console.error("audio play failed:", err));
    }
  }, { once: true });
}

  const offset = TRACK_START[tr.t] || 0;
  if (offset) {
    aud.addEventListener('canplay', function seek() {
      aud.currentTime = offset;
      aud.removeEventListener('canplay', seek);
    }, { once: true });
  }

} else if (ytId) {
  S.hasYTAudio = true;
  S.hasRealAudio = false;

  if (ytReady && ytPlayer) ytPlayer.loadVideoById(ytId);

} else {
  S.hasYTAudio = false;
  S.hasRealAudio = false;
}
  // Album art
  const artDiv=$('npart');
  const icon=$('npart-icon');
  const artImg=$('npart-img');
  artDiv.style.backgroundImage='';
  artImg.src='';artImg.style.display='none';
  const localArt=ART_SRC[tr.t]||null;
  if(localArt){
    icon.textContent='';
    artImg.src=localArt.split('/').map(encodeURIComponent).join('/');
    artImg.style.display='block';
  } else if(trip.artWiki){
    icon.textContent='';
    fetchArt(trip.artWiki).then(url=>{
      if(url){
        artDiv.style.backgroundImage=`url(${url})`;
        artDiv.style.backgroundSize='cover';
        artDiv.style.backgroundPosition='center';
      } else {
        icon.textContent=trip.icon;
      }
    });
  } else {
    icon.textContent=trip.icon;
  }
  fetchArtistInfo(tr.a);
  syncHeartBtn();
  // Reset comment state for new track
  Object.keys(_activeBubbles).forEach(id=>hideCmtBubble(id,true));
  _lastCmtSec=-1;
  if($('mini-player').classList.contains('visible'))syncMiniPlayer();
}

const ARTIST_BIO_OVERRIDE={
  'Velvet Lune':'Velvet Lune is a Southern California-based singer, songwriter, producer, and multi-instrumentalist crafting a sultry mix of R&B, soul, indie rock, and experimental jazz-fusion. Known for emotional, often dark, and introspective songwriting, the artist gained attention with projects like The Abyss (2021) and the single "Gloom".',
};

async function fetchArtistInfo(artistRaw){
  // Strip feat./remix credits: "Lorde (Flume Remix)" → "Lorde"
  const artist=artistRaw.replace(/\s*[\(\[].*/,'').trim();
  const title=artist.replace(/ /g,'_');
  const bio=$('np-bio');
  const rel=$('np-rel');
  const relSec=$('np-rel-sec');

  // Local override — skip Wikipedia fetch
  if(ARTIST_BIO_OVERRIDE[artist]){
    bio.textContent=ARTIST_BIO_OVERRIDE[artist];
    rel.innerHTML='';
    relSec.style.display='none';
    return;
  }

  // Skeleton while loading
  bio.innerHTML='<span class="npe-sk"></span><span class="npe-sk" style="width:80%"></span><span class="npe-sk" style="width:55%"></span>';
  rel.innerHTML='';
  relSec.style.display='';

  try{
    const [sumRes,relRes]=await Promise.allSettled([
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`),
      fetch(`https://en.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(title)}`)
    ]);

    // Bio — first 3 sentences of Wikipedia extract
    if(sumRes.status==='fulfilled'&&sumRes.value.ok){
      const d=await sumRes.value.json();
      const sentences=(d.extract||'').match(/[^.!?]+[.!?]+/g)||[];
      bio.textContent=sentences.slice(0,3).join(' ')||d.extract?.slice(0,300)||'';
    } else {
      bio.textContent='';
    }

    // Related artists — Wikipedia related pages
    if(relRes.status==='fulfilled'&&relRes.value.ok){
      const d=await relRes.value.json();
      const pages=(d.pages||[]).filter(p=>p.titles?.normalized||p.titles?.canonical).slice(0,8);
      if(pages.length){
        rel.innerHTML=pages.map(p=>{
          const name=p.titles?.normalized||p.titles?.canonical||'';
          const img=p.thumbnail?.source||'';
          return `<div class="npe-rpill">${img?`<img src="${img}" alt="${name}" loading="lazy">`:''}${name}</div>`;
        }).join('');
      } else {
        relSec.style.display='none';
      }
    } else {
      relSec.style.display='none';
    }
  } catch(e){
    bio.textContent='';
    relSec.style.display='none';
  }
}

const SVG_HEART_FILLED='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
const SVG_HEART_OUTLINE='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

function syncHeartBtn(){
  const tr=S.playing?.tracks[S.trackIdx];
  const btn=$('npheart');
  const on=!!tr&&S.favorites.some(f=>f.track===tr.t&&f.artist===tr.a);
  btn.classList.toggle('on',on);
  btn.innerHTML=on?SVG_HEART_FILLED:SVG_HEART_OUTLINE;
}

/* ════════════════════════════════════════════
   NOW PLAYING
════════════════════════════════════════════ */
function initNP(){
  $('npclose').addEventListener('click',closeNP);
  $('mp-open').addEventListener('click',reopenNP);
  $('mp-play').addEventListener('click',togPlay);
  $('npheart').addEventListener('click',()=>{
    const tr=S.playing?.tracks[S.trackIdx];
    if(!tr)return;
    const idx=S.favorites.findIndex(f=>f.track===tr.t&&f.artist===tr.a);
    if(idx>=0){S.favorites.splice(idx,1);}
    else{S.favorites.push({track:tr.t,artist:tr.a,trip:S.playing});}
    syncHeartBtn();
    vib(8);
  });
  $('cplay').addEventListener('click',togPlay);
  $('cnext').addEventListener('click',nextTr);
  $('cprev').addEventListener('click',prevTr);
  $('pbar-outer').addEventListener('click',e=>{
    const pct=e.offsetX/e.currentTarget.offsetWidth;
    if(S.hasRealAudio){
      const aud=$('aud');if(isFinite(aud.duration))aud.currentTime=pct*aud.duration;
    } else {
      S.progSec=Math.floor(pct*S.totalSec);updateProg();
    }
  });
  // Real audio events
  const aud=$('aud');
  aud.addEventListener('timeupdate',()=>{
    if(!S.hasRealAudio)return;
    S.progSec=Math.floor(aud.currentTime);
    if(isFinite(aud.duration)){S.totalSec=Math.floor(aud.duration);$('ttot').textContent=fmt(S.totalSec);}
    updateProg();
  });
  aud.addEventListener('ended',()=>{if(S.hasRealAudio)nextTr();});
  $('npbb').addEventListener('click',()=>{
    const a=$('nbbA');
    if(a.textContent==='Send'){a.textContent='Playing ●';a.style.color='var(--accent)';vib([15,30]);}
    else{a.textContent='Send';a.style.color='';}
  });
  let ty=0;
  $('np').addEventListener('touchstart',e=>{ty=e.touches[0].clientY},{passive:true});
  $('np').addEventListener('touchend',e=>{if(e.changedTouches[0].clientY-ty>80)closeNP()},{passive:true});
}

function closeNP(){
  const np=$('np');
  np.style.transition='clip-path 350ms cubic-bezier(.4,0,.2,1)';
  np.style.clipPath='circle(0% at 50% 100%)';
  setTimeout(()=>{np.style.display='none';np.style.transition='';showMiniPlayer();},360);
}
function reopenNP(){
  if(!S.playing)return;
  hideMiniPlayer();
  const np=$('np');
  np.style.clipPath='circle(0% at 50% 100%)';
  np.style.display='flex';
  np.style.transition='none';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    np.style.transition='clip-path 450ms cubic-bezier(.4,0,.2,1)';
    np.style.clipPath='circle(150% at 50% 100%)';
  }));
}
function showMiniPlayer(){
  if(!S.playing)return;
  syncMiniPlayer();
  $('mini-player').classList.add('visible');
  const mpH=$('mini-player').offsetHeight||62;
  const pbw=$('pbwrap');
  if(pbw)pbw.style.bottom=`calc(max(env(safe-area-inset-bottom),0px) + ${84+mpH}px)`;
}
function hideMiniPlayer(){
  $('mini-player').classList.remove('visible');
  const pbw=$('pbwrap');
  if(pbw)pbw.style.bottom='';
}
/* ── MINI PLAYER GRADIENT ────────────────────── */
const _mpGradCache={};
function _rgbStr(r,g,b){return`rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`}
function _extractImgColors(img){
  try{
    const c=document.createElement('canvas');c.width=c.height=20;
    const ctx=c.getContext('2d');ctx.drawImage(img,0,0,20,20);
    const d=ctx.getImageData(0,0,20,20).data;
    function px(x,y){const i=(y*20+x)*4;return[d[i],d[i+1],d[i+2]];}
    return[px(3,3),px(9,9),px(16,16)];
  }catch(e){return null;}
}
function _parseTripColors(trip){
  const m=(trip.bg||'').match(/#([0-9a-fA-F]{6})/g);
  if(!m||m.length<2)return null;
  const h2r=h=>{const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255];};
  const cols=m.slice(0,3).map(h2r);
  if(cols.length<3)cols.push(cols[cols.length-1]);
  return cols;
}
function _applyMPGrad(rgb,fade=true){
  const el=$('mp-grad');if(!el)return;
  const f=0.48;
  const d=rgb.map(([r,g,b])=>_rgbStr(r*f,g*f,b*f));
  const g=`linear-gradient(135deg,${d[0]} 0%,${d[1]} 50%,${d[2]} 100%)`;
  if(fade){
    el.style.transition='opacity 0.5s ease';
    el.style.opacity='0';
    setTimeout(()=>{el.style.backgroundImage=g;el.style.transition='opacity 1.2s ease';el.style.opacity='1';},350);
  }else{
    el.style.backgroundImage=g;el.style.opacity='1';
  }
}
function refreshMPGradient(){
  if(!S.playing)return;
  const tr=S.playing.tracks[S.trackIdx];
  const key=tr.t+'|'+S.trackIdx;
  if(_mpGradCache[key]){_applyMPGrad(_mpGradCache[key]);return;}
  function tryImg(){
    for(const id of['npart-img','mp-art-img']){
      const img=$(id);
      if(img&&img.complete&&img.naturalWidth>0&&img.style.display!=='none'){
        const cols=_extractImgColors(img);
        if(cols){_mpGradCache[key]=cols;_applyMPGrad(cols);return true;}
      }
    }
    return false;
  }
  if(!tryImg()){
    setTimeout(()=>{
      if(!tryImg()){
        const cols=_parseTripColors(S.playing)||[[18,32,58],[14,24,44],[10,18,36]];
        _mpGradCache[key]=cols;_applyMPGrad(cols,false);
      }
    },450);
  }
}

function syncMiniPlayer(){
  if(!S.playing)return;
  const tr=S.playing.tracks[S.trackIdx];
  $('mp-title').textContent=tr.t;
  $('mp-artist').textContent=tr.a;
  const mpImg=$('mp-art-img'),mpIcon=$('mp-art-icon');
  const localArt=typeof ART_SRC!=='undefined'?ART_SRC[tr.t]||null:null;
  if(localArt){
    mpImg.src=localArt.split('/').map(encodeURIComponent).join('/');
    mpImg.style.display='block';mpIcon.textContent='';
  } else {
    mpImg.style.display='none';mpImg.src='';
    mpIcon.textContent=S.playing.icon||'🎵';
  }
  syncMPBtn();
  refreshMPGradient();
}
function syncMPBtn(){
  const btn=$('mp-play');if(!btn)return;
  btn.innerHTML=S.isPlaying
    ?'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
    :'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
}

function togPlay(){
  S.isPlaying=!S.isPlaying;
  $('cplay').innerHTML=S.isPlaying?'<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>':'<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  if(S.hasYTAudio){
    if(ytReady&&ytPlayer){S.isPlaying?ytPlayer.playVideo():ytPlayer.pauseVideo();}
    S.isPlaying?startProg():stopProg();
  } else if(S.hasRealAudio){
    const aud=$('aud');
    S.isPlaying?aud.play().catch(()=>{}):aud.pause();
  } else {
    S.isPlaying?startProg():stopProg();
  }
  vib(10);
  syncMPBtn();
}

function nextTr(){
  if(!S.playing)return;
  S.trackIdx=(S.trackIdx+1)%S.playing.tracks.length;
  loadNPContent(S.playing,S.trackIdx);
  stopProg();if(S.isPlaying)startProg();vib(10);
}
function prevTr(){
  if(!S.playing)return;
  S.trackIdx=(S.trackIdx-1+S.playing.tracks.length)%S.playing.tracks.length;
  loadNPContent(S.playing,S.trackIdx);
  stopProg();if(S.isPlaying)startProg();vib(10);
}

function startProg(){
  stopProg();
  if(S.hasYTAudio){
    if(ytReady&&ytPlayer)ytPlayer.playVideo();
    S.timer=setInterval(()=>{
      if(!ytReady||!ytPlayer)return;
      S.progSec=Math.floor(ytPlayer.getCurrentTime()||0);
      const dur=ytPlayer.getDuration()||0;
      if(dur>0){S.totalSec=Math.floor(dur);$('ttot').textContent=fmt(S.totalSec);}
      updateProg();
    },500);
  } else if(S.hasRealAudio){$('aud').play().catch(()=>{});}
  else{
    S.timer=setInterval(()=>{
      S.progSec++;
      if(S.progSec>=S.totalSec){S.progSec=0;nextTr();}
      else updateProg();
    },1000);
  }
}
function stopProg(){
  if(S.timer){clearInterval(S.timer);S.timer=null;}
  if(S.hasYTAudio&&ytReady&&ytPlayer){try{ytPlayer.pauseVideo();}catch(e){}}
  const aud=$('aud');if(!aud.paused)aud.pause();
}
function updateProg(){
  const pct=(S.progSec/S.totalSec)*100;
  $('pfill').style.width=pct+'%';
  $('pdot').style.setProperty('--pct',pct+'%');
  $('tcur').textContent=fmt(S.progSec);
  checkCmtTriggers(S.progSec);
  const mpf=$('mp-prog-fill');if(mpf)mpf.style.width=pct+'%';
}

/* ════════════════════════════════════════════
   COMMENTS
════════════════════════════════════════════ */
let _cmtPendingTs=0,_activeBubbles={},_lastCmtSec=-1;

function cmtKey(){
  if(!S.playing)return null;
  return `${S.playing.era}-${S.playing.loc}-${S.trackIdx}`;
}
function getCmts(){
  const k=cmtKey();if(!k)return[];
  if(!S.comments[k])S.comments[k]=[];
  return S.comments[k];
}
function addCmt(ts,text,reaction){
  const k=cmtKey();if(!k)return;
  if(!S.comments[k])S.comments[k]=[];
  const c={
    id:Math.random().toString(36).slice(2),
    user:{id:'local',name:'You',avatar:'😊'},
    timestamp:Math.round(ts),
    text:text||'',
    reaction:reaction||null,
    createdAt:new Date().toISOString()
  };
  S.comments[k].push(c);
  showCmtBubble(c,true);
  return c;
}
function renderCmtMarkers(){}
function showCmtBubble(c,autoHide){
  const host=$('cmt-bubbles');
  if(!host||_activeBubbles[c.id])return;
  const pct=Math.min(88,Math.max(8,(c.timestamp/S.totalSec)*100));
  const el=document.createElement('div');
  el.className='cmt-bubble';
  el.style.left=pct+'%';
  const label=(c.reaction||'')+(c.text?(c.reaction?' '+c.text:c.text):'');
  el.innerHTML=`<div class="cmt-bubble-av">${c.user.avatar}</div><span class="cmt-bubble-txt">${label}</span>`;
  host.appendChild(el);
  _activeBubbles[c.id]=el;
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));
  if(autoHide)setTimeout(()=>hideCmtBubble(c.id),3500);
}
function hideCmtBubble(id,instant){
  const el=_activeBubbles[id];if(!el)return;
  if(instant){el.remove();delete _activeBubbles[id];return;}
  el.classList.remove('show');
  setTimeout(()=>{try{el.remove();}catch(e){}delete _activeBubbles[id];},280);
}
function checkCmtTriggers(sec){
  if(_lastCmtSec<0){_lastCmtSec=sec;return;}
  const prev=_lastCmtSec;_lastCmtSec=sec;
  if(sec<prev){return;} // backward seek — just update cursor, don't fire
  getCmts().forEach(c=>{if(c.timestamp>prev&&c.timestamp<=sec)triggerCmt(c);});
}
function triggerCmt(c){
  if(c.reaction&&!c.text){
    spawnPlaybackReaction(c.reaction);
  } else {
    showCmtBubble(c,true);
  }
}
function spawnPlaybackReaction(emoji){
  const layer=$('react-float-layer');
  const npRect=$('np').getBoundingClientRect();
  const dotEl=$('pdot');
  if(!layer||!dotEl)return;
  const dotRect=dotEl.getBoundingClientRect();
  const ox=dotRect.left+dotRect.width/2-npRect.left;
  const oy=dotRect.top+dotRect.height/2-npRect.top;
  const COUNT=2+Math.floor(Math.random()*2); // 2–3 particles
  for(let i=0;i<COUNT;i++){
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;left:${ox}px;top:${oy}px;font-size:18px;pointer-events:none;z-index:120;line-height:1;transform-origin:center;will-change:transform,opacity;`;
    el.textContent=emoji;
    layer.appendChild(el);
    const angle=(-100+Math.random()*200)*(Math.PI/180); // mostly upward spread
    const dist=40+Math.random()*50;
    const tx=Math.sin(angle)*dist;
    const ty=-Math.abs(Math.cos(angle))*dist-20;
    const delay=i*60;
    const dur=900+Math.random()*300;
    el.animate([
      {opacity:0,transform:'translate(0,0) scale(0.4)',offset:0},
      {opacity:1,transform:`translate(${tx*.4}px,${ty*.4}px) scale(1.1)`,offset:0.2},
      {opacity:1,transform:`translate(${tx}px,${ty}px) scale(0.9)`,offset:0.65},
      {opacity:0,transform:`translate(${tx*1.1}px,${ty*1.2}px) scale(0.3)`,offset:1},
    ],{duration:dur,delay,easing:'ease-out',fill:'forwards'})
    .onfinish=()=>el.remove();
  }
}
function openCmtSheet(ts){
  _cmtPendingTs=ts;
  $('cmt-ts-lbl').textContent='Comment at '+fmt(Math.floor(ts));
  $('cmt-input').value='';
  $('cmt-sheet').classList.add('open');
  setTimeout(()=>$('cmt-input').focus(),360);
}
function closeCmtSheet(){
  $('cmt-sheet').classList.remove('open');
  $('cmt-input').blur();
}
function spawnReactFloat(emoji, originEl){
  const layer=$('react-float-layer');
  if(!layer)return;
  const npRect=$('np').getBoundingClientRect();
  const btnRect=originEl.getBoundingClientRect();
  const pbarEl=$('pbar');
  const pbarRect=pbarEl.getBoundingClientRect();

  // Origin: center of the tapped button, relative to #np
  const cx=btnRect.left+btnRect.width/2 - npRect.left;
  const cy=btnRect.top+btnRect.height/2  - npRect.top;

  // Resolve target: the playhead's current position on the progress bar
  const pct=S.totalSec>0?S.progSec/S.totalSec:0;
  const rx=pbarRect.left+pct*pbarRect.width - npRect.left;
  const ry=pbarRect.top+pbarRect.height/2   - npRect.top;

  const COUNT=5+Math.floor(Math.random()*3); // 5–7

  for(let i=0;i<COUNT;i++){
    const half=13; // half of ~26px font
    // Slight spread around origin so they don't all start at the same pixel
    const sx=cx+(Math.random()-.5)*22 - half;
    const sy=cy+(Math.random()-.5)*10 - half;

    // Burst arc: upward fan, constrained so they don't go off-screen
    const angle=-Math.PI/2+(Math.random()-.5)*Math.PI*.9;
    const dist=48+Math.random()*64;
    const bx=Math.cos(angle)*dist;
    const by=Math.sin(angle)*dist;

    // Converge delta from start → resolve
    const tx=rx-half-sx;
    const ty=ry-half-sy;

    const el=document.createElement('span');
    el.textContent=emoji;
    el.style.cssText=`position:absolute;font-size:26px;line-height:1;`+
      `pointer-events:none;will-change:transform,opacity;`+
      `left:${sx}px;top:${sy}px;`;
    layer.appendChild(el);

    const dur=1100+Math.random()*250;
    const delay=i*55;

    el.animate([
      {opacity:0, transform:'translate(0,0) scale(0.25)',                              offset:0},
      {opacity:1, transform:`translate(${bx*.3}px,${by*.3}px) scale(1.3)`,            offset:0.13},
      {opacity:1, transform:`translate(${bx}px,${by}px) scale(1.05)`,                 offset:0.50},
      {opacity:.8,transform:`translate(${bx*.35+tx*.65}px,${by*.2+ty*.8}px) scale(.55)`,offset:0.80},
      {opacity:0, transform:`translate(${tx}px,${ty}px) scale(0.05)`,                 offset:1},
    ],{duration:dur,delay,easing:'cubic-bezier(.25,.46,.45,.94)',fill:'forwards'})
    .onfinish=()=>el.remove();
  }

  // Pulse the playhead dot when the last particle arrives
  const pulseDel=COUNT*55+1050;
  setTimeout(()=>{
    const dot=$('pdot');
    if(dot)dot.animate([
      {boxShadow:'0 0 0 2.5px hsl(220,20%,7%), 0 0 20px hsl(152,60%,48%)'},
      {boxShadow:'0 0 0 2.5px hsl(220,20%,7%), 0 0 6px hsl(152,60%,48%/.6)'},
    ],{duration:420,easing:'cubic-bezier(.34,1.56,.64,1)'});
  },pulseDel);
}
(()=>{
  // Reaction picker toggle
  const picker=$('react-picker');
  const reactBtn=$('react-btn');
  reactBtn.addEventListener('click',e=>{
    e.stopPropagation();
    picker.classList.toggle('open');
    reactBtn.classList.toggle('active',picker.classList.contains('open'));
  });
  document.addEventListener('click',e=>{
    if(!picker.contains(e.target)&&e.target.id!=='react-btn'){
      picker.classList.remove('open');
      reactBtn.classList.remove('active');
    }
  });
  // Reaction selection — store + ephemeral float animation
  document.querySelectorAll('.react-pick-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!S.playing)return;
      addCmt(S.progSec,'',btn.dataset.r);
      picker.classList.remove('open');
      reactBtn.classList.remove('active');
      spawnReactFloat(btn.dataset.r, btn); // burst
      vib(10);
    });
  });
  // Comment button
  $('cmt-write-btn').addEventListener('click',()=>{if(!S.playing)return;openCmtSheet(S.progSec);});
  // Long-press pbar-outer to comment at a specific moment
  (()=>{
    let pt=null;
    const po=$('pbar-outer');
    po.addEventListener('pointerdown',e=>{
      const pct=e.offsetX/po.offsetWidth;
      pt=setTimeout(()=>{pt=null;openCmtSheet(pct*S.totalSec);vib([10,20]);},500);
    });
    const cancel=()=>{if(pt){clearTimeout(pt);pt=null;}};
    po.addEventListener('pointerup',cancel);
    po.addEventListener('pointercancel',cancel);
    po.addEventListener('pointermove',e=>{if(Math.abs(e.movementX)>4||Math.abs(e.movementY)>4)cancel();});
  })();
  // Comment sheet
  $('cmt-backdrop').addEventListener('click',closeCmtSheet);
  $('cmt-submit-btn').addEventListener('click',()=>{
    const t=$('cmt-input').value.trim();if(!t)return;
    addCmt(_cmtPendingTs,t,null);closeCmtSheet();vib(10);
  });
  $('cmt-input').addEventListener('keydown',e=>{
    if(e.key!=='Enter')return;
    e.preventDefault();
    const t=e.target.value.trim();if(!t)return;
    addCmt(_cmtPendingTs,t,null);closeCmtSheet();vib(10);
  });
})();

/* ════════════════════════════════════════════
   TABS
════════════════════════════════════════════ */
function initTabs(){
  document.querySelectorAll('.tb').forEach(b=>b.addEventListener('click',()=>{switchTab(b.dataset.tab);vib(8);}));
}
function switchTab(tab){
  S.activeTab=tab;
  document.querySelectorAll('.tb').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
  document.querySelectorAll('.tc').forEach(c=>c.classList.toggle('on',c.id===`t-${tab.replace('library','lib').replace('device','dev')}`));
  // Correct tab content IDs
  document.querySelectorAll('.tc').forEach(c=>{
    const tid=c.id.replace('t-','');
    const match={home:'home',dial:'dial',lib:'library',dev:'device'}[tid];
    c.classList.toggle('on',match===tab);
  });
  $('pbwrap').style.display=tab==='dial'?'block':'none';
}

function initHomeActions(){
  $('q-random').addEventListener('click',()=>{
    const trip=TRIPS.find(t=>t.loc==='Pittsburgh'&&t.era===2010);
    if(trip)openPortal(trip);
  });
  $('q-new').addEventListener('click',()=>switchTab('dial'));
  $('q-lib').addEventListener('click',()=>switchTab('library'));
}

/* ════════════════════════════════════════════
   LIBRARY
════════════════════════════════════════════ */
function renderLib(){
  renderTGrid();renderHistory();renderFavs();
  const allSegs=[
    {id:'sg-trips',view:'lv-trips'},
    {id:'sg-favs', view:'lv-favs'},
    {id:'sg-hist', view:'lv-hist'},
  ];
  allSegs.forEach(({id,view})=>{
    $(id).addEventListener('click',()=>{
      allSegs.forEach(s=>{$(s.id).classList.remove('on');$(s.view).style.display='none';});
      $(id).classList.add('on');$(view).style.display='';
      if(id==='sg-favs')renderFavs();
    });
  });
}

function renderFavs(){
  const list=$('favlist');
  if(!S.favorites.length){
    list.innerHTML='<div class="elib">No favorites yet.<br>Tap ♥ while playing to save a song.</div>';
    return;
  }
  list.innerHTML=S.favorites.map((f,i)=>{
    const artSrc=ART_SRC[f.track]||null;
    const artEl=artSrc?`<img src="${artSrc.split('/').map(encodeURIComponent).join('/')}" alt="" loading="lazy">`:`<span>${f.trip.icon||'🎵'}</span>`;
    return `<div class="fitem">
      <div class="fart">${artEl}</div>
      <div class="finfo">
        <div class="ftitle">${f.track}</div>
        <div class="fartist">${f.artist}</div>
        <div class="fmeta">${f.trip.era} · ${f.trip.loc} · ${f.trip.genres[0]}</div>
      </div>
      <button class="fheart" data-idx="${i}">${SVG_HEART_FILLED}</button>
    </div>`;
  }).join('');
  list.querySelectorAll('.fheart').forEach(btn=>{
    btn.addEventListener('click',()=>{
      S.favorites.splice(+btn.dataset.idx,1);
      syncHeartBtn();
      renderFavs();
      vib(8);
    });
  });
}

function renderTGrid(){
  const all=[...TRIPS.slice(0,4),...S.library];
  $('tgrid').innerHTML=all.map((t,i)=>tripCardHTML(t,i,'tcard')).join('');
  $('tgrid').querySelectorAll('.tcard').forEach((c,i)=>{
    c.addEventListener('click',()=>{openPortal(all[i])});
  });
  $('elib').style.display=all.length?'none':'';
}

function renderHistory(){
  if(!S.history.length){$('hlist').innerHTML='<div class="elib">No listening history yet.</div>';return;}
  $('hlist').innerHTML=S.history.map((h,i)=>`
    <div class="hitem">
      ${i<S.history.length-1?'<div class="hline"></div>':''}
      <div class="hdot"></div>
      <div class="hcont">
        <div class="htitle">${h.track}</div>
        <div class="hartist">${h.artist}</div>
        <div class="hmeta">${h.trip.era} · ${h.trip.loc} · ${h.trip.genres[0]}</div>
      </div>
      <div class="htime">Just now</div>
    </div>`).join('');
}

/* ════════════════════════════════════════════
   EQ CHIPS
════════════════════════════════════════════ */
document.querySelectorAll('.eqch').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.eqch').forEach(x=>x.classList.remove('on'));
  c.classList.add('on');vib(8);
}));






