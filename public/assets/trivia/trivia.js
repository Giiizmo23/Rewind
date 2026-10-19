(function(){"use strict";
var COLS=[19.65,34.83,50.01,65.19,80.37],HEADS=[42.3,49.3,56.12,62.94,72.05,81.86],SHOW=0.78;
var SEATS=[[0,0],[0,1],[0,3],[1,4],[1,2],[1,1],[2,0],[2,2],[2,3],[3,2],[3,3],[3,4],[4,4],[4,2],[4,1],[5,0],[5,1],[5,2],[5,3],[5,4]];
var ASPECT={detective:0.507,orlok:0.399,phantom:0.543,rebel:0.463,kid:0.401,glamour:0.301};
var FIT={detective:1.55,orlok:1.55,phantom:1.45,rebel:1.6,kid:1.6,glamour:1.75};
var BOARD_AR=972/1792;
var PIECES=[{id:"detective",name:"The Detective",cut:1},{id:"orlok",name:"Count Orlok",cut:1},{id:"phantom",name:"The Phantom",cut:1},{id:"rebel",name:"The Rebel",cut:1},{id:"kid",name:"The Kid",cut:1},{id:"glamour",name:"The Glamour Girl",female:1,cut:1}];
var PROMOS=["trailer_bill","trailer_adam","cable_bill","cable_adam","radio_bill","radio_adam","noir_bill","noir_adam"];
var PROMO_EVERY=7,STRIKES=3,BASE="/assets/trivia/";
var bank=[],st=null,actx=null;
var $=function(s){return document.querySelector(s)},screen=$("#screen"),pieceEl=$("#piece");
var ls={get:function(k,d){try{var v=localStorage.getItem("ndt."+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem("ndt."+k,JSON.stringify(v))}catch(e){}}};
var voice=null;
function hush(){if(voice){try{voice.pause()}catch(e){} voice=null}}
function narratorName(){try{var fmt=new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",weekday:"short",year:"numeric",month:"numeric",day:"numeric"});var parts={};fmt.formatToParts(new Date()).forEach(function(p){parts[p.type]=p.value});var idx=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(parts.weekday);var back=(idx-5+7)%7;var friday=new Date(Date.UTC(+parts.year,+parts.month-1,+parts.day));friday.setUTCDate(friday.getUTCDate()-back);return friday.getUTCDate()%2===1?"adam":"bill"}catch(e){return"adam"}}
function speak(q){hush();if(!q||!q.id)return;voice=new Audio(BASE+"narration/"+narratorName()+"/"+q.id+".mp3?nd139");var p=voice.play();if(p&&p.catch)p.catch(function(){})}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.random()*(i+1)|0,t=a[i];a[i]=a[j];a[j]=t}return a}
function ac(){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==="suspended")actx.resume()}catch(e){}return actx}
function tone(seq,type){var c=ac();if(!c)return;var t=c.currentTime;seq.forEach(function(n){var o=c.createOscillator(),g=c.createGain();o.type=type||"sine";o.frequency.setValueAtTime(n[0],t+n[1]);if(n[3])o.frequency.linearRampToValueAtTime(n[3],t+n[1]+n[2]);g.gain.setValueAtTime(0.0001,t+n[1]);g.gain.exponentialRampToValueAtTime(.25,t+n[1]+.02);g.gain.exponentialRampToValueAtTime(.0001,t+n[1]+n[2]);o.connect(g).connect(c.destination);o.start(t+n[1]);o.stop(t+n[1]+n[2]+.05)})}
function clip(src){try{var a=new Audio(src);var p=a.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
function hopSound(){var c=ac();if(!c)return;var t=c.currentTime;var o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.setValueAtTime(640,t);o.frequency.exponentialRampToValueAtTime(160,t+.11);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.2,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+.14);o.connect(g).connect(c.destination);o.start(t);o.stop(t+.16);var o2=c.createOscillator(),g2=c.createGain();o2.type="triangle";o2.frequency.setValueAtTime(220,t+.07);g2.gain.setValueAtTime(.0001,t+.07);g2.gain.exponentialRampToValueAtTime(.16,t+.09);g2.gain.exponentialRampToValueAtTime(.0001,t+.2);o2.connect(g2).connect(c.destination);o2.start(t+.07);o2.stop(t+.22)}
var sfx={right:function(){clip(BASE+"sounds/right.wav");hopSound()},
 wrong:function(){var p=st&&st.piece;clip(BASE+"sounds/"+(p&&p.female?"wrong_f.wav":"wrong_m.wav")+"?nd28")},
 darn:function(){},
 win:function(){}};
function seatPos(i){return i<0?SEATS[0]:SEATS[Math.max(0,Math.min(SEATS.length-1,i))]}
function placePiece(i,hop){var cell=seatPos(i),seat=document.querySelector('.seat[data-r="'+cell[0]+'"][data-c="'+cell[1]+'"]');if(!seat)return;if(pieceEl.parentNode!==seat)seat.appendChild(pieceEl);pieceEl.hidden=false;var ar=(cur&&ASPECT[cur.id])||0.66,sc=(cur&&FIT[cur.id])||1,front=cell[0]===5,seatAr=front?(cell[1]===4?0.653:0.604):0.723,base=front?70:96,floor=front?30:0,h=base*sc,bottom=floor+base-h;pieceEl.style.height=h+"%";pieceEl.style.width=(h*ar/seatAr).toFixed(2)+"%";pieceEl.style.bottom=bottom+"%";if(hop){pieceEl.classList.remove("hop");void pieceEl.offsetWidth;pieceEl.classList.add("hop")}}
var cur=null;function showPiece(p){cur=p;pieceEl.hidden=false;pieceEl.className="piece cut seated";pieceEl.querySelector("img").src=BASE+"pieces/"+p.id+".png?nd142";pieceEl.querySelector("img").alt=p.name}
function freshDeck(){var seen=ls.get("seen",[]),skip={};seen.forEach(function(id){skip[id]=1});var pool=bank.filter(function(q){return !skip[q.id]});if(pool.length<SEATS.length){var keep=seen.slice(-30),hold={};keep.forEach(function(id){hold[id]=1});pool=bank.filter(function(q){return !hold[q.id]});seen=keep}shuffle(pool);var movie={},deck=[],rest=[];pool.forEach(function(q){var m=q.movie||q.id;if(!movie[m]){movie[m]=1;deck.push(q)}else rest.push(q)});return {deck:deck.concat(shuffle(rest)),seen:seen}}
function nextQuestion(){if(!st.deck||!st.deck.length){var d=freshDeck();st.deck=d.deck;st.seen=d.seen}var q=st.deck.shift();st.asked.push(q.id);st.seen.push(q.id);ls.set("seen",st.seen.slice(-240));var order=shuffle([0,1,2]);return {q:q,choices:order.map(function(i){return q.choices[i]}),answer:order.indexOf(q.answer_index)}}
function flashX(){var x=$("#xflash");if(!x)return;x.classList.remove("on");void x.offsetWidth;x.classList.add("on")}
var LIMIT=24,clock=null;
function clearClock(){if(clock){clearInterval(clock);clock=null}}
function armClock(){clearClock();var left=LIMIT,el=$("#tick"),bar=$("#timebar");if(!el)return;el.textContent=left;if(bar)bar.style.transform="scaleX(1)";clock=setInterval(function(){left--;if(el)el.textContent=Math.max(left,0);if(bar)bar.style.transform="scaleX("+Math.max(left,0)/LIMIT+")";if(left<=5&&el)el.classList.add("hot");if(left<=0){clearClock();answer(st&&st.pick!=null?st.pick:-1)}},1000)}
function renderPick(){clearClock();screen.classList.remove("is-away");screen.classList.remove("asking");var chosen=ls.get("piece","detective"),idx=PIECES.findIndex(function(p){return p.id===chosen});if(idx<0)idx=0;
 screen.innerHTML='<div class="cue pick"><p class="q">Pick a piece</p><div class="reelwrap"><button type="button" class="step" id="prev" aria-label="Previous piece">‹</button><div class="reel" id="reel">'+PIECES.map(function(p){return'<button type="button" class="pc'+(p.cut?" cut":"")+'" data-id="'+p.id+'"><img src="'+BASE+"pieces/"+p.id+".png?nd142\" alt=\"\">"+esc(p.name)+'</button>'}).join("")+'</div><button type="button" class="step" id="nextp" aria-label="Next piece">›</button></div><p class="dots" id="dots">'+PIECES.map(function(_,i){return'<i'+(i===idx?' class="on"':'')+'></i>'}).join("")+'</p><button class="next" id="go">Play</button></div>';
 var reel=$("#reel"),slides=[].slice.call(reel.querySelectorAll(".pc")),dots=[].slice.call($("#dots").querySelectorAll("i"));
 function go(i){i=(i+slides.length)%slides.length;reel.scrollTo({left:i*reel.clientWidth,behavior:"smooth"});pick(i)}
 function pick(i){slides.forEach(function(b,n){b.setAttribute("aria-pressed",n===i)});dots.forEach(function(d,n){d.className=n===i?"on":""});var id=slides[i].dataset.id;ls.set("piece",id);showPiece(PIECES.find(function(p){return p.id===id}));placePiece(-1)}
 var tick=null;reel.addEventListener("scroll",function(){clearTimeout(tick);tick=setTimeout(function(){var i=Math.round(reel.scrollLeft/Math.max(1,reel.clientWidth));pick(Math.max(0,Math.min(slides.length-1,i)))},60)});
 $("#prev").onclick=function(){go(Math.round(reel.scrollLeft/Math.max(1,reel.clientWidth))-1)};
 $("#nextp").onclick=function(){go(Math.round(reel.scrollLeft/Math.max(1,reel.clientWidth))+1)};
 requestAnimationFrame(function(){reel.scrollLeft=idx*reel.clientWidth;pick(idx)});
 $("#go").onclick=function(){ac();start(ls.get("piece","detective"))}}
function start(id){var deck=freshDeck();st={piece:PIECES.find(function(p){return p.id===id})||PIECES[0],seat:0,strikes:0,n:0,right:0,asked:[],stubs:0,deck:deck.deck,seen:deck.seen};showPiece(st.piece);placePiece(0);screen.classList.add("asking");screen.classList.add("is-away");setTimeout(renderQ,900)}
function renderQ(){screen.classList.remove("is-away");screen.classList.add("asking");var c=st.cur=nextQuestion();st.n++;st.locked=false;st.pick=null;
 screen.innerHTML='<div class="cue"><p class="qmeta"><span>Q'+st.n+' · seat '+(st.seat+1)+'/'+SEATS.length+'</span><b id="tick">24</b></p><div class="time"><i id="timebar"></i></div><p class="q">'+esc(c.q.question)+'</p><div class="choices">'+c.choices.map(function(t,i){return'<button class="ch" data-i="'+i+'"><b>'+"ABC"[i]+'</b><span>'+esc(t)+'</span></button>'}).join("")+'</div><div class="lockrow"><button class="next" id="lock" hidden>Lock it in</button></div></div>';
 screen.querySelectorAll(".ch").forEach(function(b){b.onclick=function(){if(st.locked)return;st.pick=+b.dataset.i;screen.querySelectorAll(".ch").forEach(function(x){x.classList.remove("picked")});b.classList.add("picked");var lock=$("#lock");if(lock)lock.hidden=false}});
 $("#lock").onclick=function(){if(st.pick==null)return;answer(st.pick)};speak(c.q);armClock()}
function answer(i){if(!st||st.locked)return;st.locked=true;clearClock();hush();var c=st.cur,btns=screen.querySelectorAll(".ch"),ok=i===c.answer;btns.forEach(function(b){b.disabled=true});if(btns[c.answer])btns[c.answer].classList.add("right");
 function goOn(){if(st.strikes>=STRIKES)return lose();renderQ()}
 if(ok){st.right++;st.stubs++;sfx.right();screen.classList.add("is-away");if(st.seat>=SEATS.length-1){placePiece(st.seat,true);setTimeout(win,350)}else{st.seat++;placePiece(st.seat,true);setTimeout(function(){goOn()},1200)}}
 else{if(btns[i])btns[i].classList.add("wrong");st.strikes++;sfx.wrong();flashX();setTimeout(goOn,1900)}}
function award(bonus){var total=ls.get("stubs",0)+st.stubs+bonus;ls.set("stubs",total);return total}
function showScore(total,perfect){screen.classList.remove("is-away");screen.classList.remove("asking");screen.innerHTML='<div class="cue center"><p class="q">You made the golden seat.</p><p class="note">'+st.right+' right'+(perfect?" · perfect run":"")+'</p><p class="note">Stubs '+total+'</p><button class="next" id="again">Play again</button></div>';$("#again").onclick=renderPick}
function win(){var perfect=st.strikes===0,total=award(10+(perfect?5:0));var w=document.createElement("div");w.id="win";var skip=document.createElement("button");skip.className="skip";skip.textContent="Skip ▸";w.appendChild(winVid);w.appendChild(skip);document.body.appendChild(w);var done=function(){if(!w.parentNode)return;w.remove();showScore(total,perfect)};winVid.onended=done;winVid.onerror=done;skip.onclick=done;try{winVid.currentTime=0}catch(e){}var p=winVid.play();if(p&&p.catch)p.catch(function(){winVid.controls=true})}
function lose(){screen.classList.remove("is-away");screen.classList.remove("asking");var total=award(0);screen.innerHTML='<div class="cue center"><p class="q">Three strikes.</p><p class="note">Seat '+(st.seat+1)+' of '+SEATS.length+' · stubs '+total+'</p><button class="next" id="again">Play again</button></div>';$("#again").onclick=renderPick}
function promo(done){var SPOTS=["trailer","cable","radio","noir"],state=ls.get("promoDeck",{});if(!state||typeof state!=="object")state={};var deck=state.deck;if(!deck||!deck.length){deck=SPOTS.slice();shuffle(deck);if(deck[0]===state.last)deck.push(deck.shift())}var spot=deck.shift(),voice=Math.random()<.5?"bill":"adam";if(voice===state.voice)voice=voice==="bill"?"adam":"bill";ls.set("promoDeck",{deck:deck,last:spot,voice:voice});var d=document.createElement("div");d.id="promo";d.innerHTML='<video playsinline autoplay src="'+BASE+"promo/"+spot+"_"+voice+'.mp4?nd34"></video><button class="skip">Skip ▸</button>';document.body.appendChild(d);
 var fin=function(){if(!d.parentNode)return;d.remove();done()};d.querySelector(".skip").onclick=fin;var vid=d.querySelector("video");vid.onended=fin;vid.onerror=fin;var p=vid.play();if(p&&p.catch)p.catch(function(){})}
function leaveTheater(){
  if($("#depart"))return;
  clearClock();
  var ask=$("#ask");if(ask)ask.remove();
  hush();
  var calm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var go=function(){try{sessionStorage.setItem("rw-nd-return",String(Date.now()))}catch(e){}if(history.length>1){history.back();return}location.href="/swipe"};
  if(calm)return go();
  var d=document.createElement("div");d.id="depart";d.setAttribute("aria-hidden","true");
  d.innerHTML='<div class="wash"></div><div class="rod"></div><div class="c l"></div><div class="c r"></div>';
  document.body.appendChild(d);
  requestAnimationFrame(function(){d.classList.add("is-lit");setTimeout(function(){d.classList.add("is-shut");setTimeout(go,1100)},720)});
}
function askExit(){if($("#ask")||$("#depart"))return;if(!st)return leaveTheater();var d=document.createElement("div");d.id="ask";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.innerHTML='<div class="cue center"><p class="q">Leave the theater?</p><p class="note">This run will end.</p><div class="row"><button class="btn2" id="stay">Stay</button><button class="next" id="leave">Leave</button></div></div>';document.body.appendChild(d);$("#stay").onclick=function(){d.remove()};$("#leave").onclick=leaveTheater;$("#stay").focus()}
$("#exitBtn").onclick=askExit;
function buildHouse(){var rows=document.getElementById("rows");if(!rows||rows.childElementCount)return;var CROWD={"0,2":"yellow","0,4":"fruit","1,0":"tiedye","1,3":"popcorn","2,1":"rollers","2,4":"cardigan","3,0":"sailor","3,1":"tophat","4,0":"green","4,3":"blazer"};var r,c,row,s,key,who;for(r=0;r<6;r++){row=document.createElement("div");row.className="row";for(c=0;c<5;c++){key=r+","+c;s=document.createElement("div");s.className="seat"+(key==="5,4"?" gold":"");s.dataset.r=r;s.dataset.c=c;who=CROWD[key];s.innerHTML='<img class="chair" alt="" src="'+BASE+"cast/"+(r<5?"back":(key==="5,4"?"goldseat":"seat"))+'.png?nd142">'+(who?'<img class="who" alt="" src="'+BASE+"cast/"+who+'.png?nd142">':"");row.appendChild(s)}rows.appendChild(row)}}
buildHouse();
function filmGate(){if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.createElement("div");d.id="gate";d.setAttribute("aria-hidden","true");d.innerHTML='<span class="scratch a"></span><span class="scratch b"></span><span class="scratch c"></span>';document.body.appendChild(d);setTimeout(function(){if(d.parentNode)d.remove()},1200)}
function arrive(){var how="";try{how=sessionStorage.getItem("ndt.enter")||"";sessionStorage.removeItem("ndt.enter")}catch(e){}
 if(how!=="1"){filmGate();return}
 var d=document.createElement("div");d.id="arrive";d.setAttribute("aria-hidden","true");d.innerHTML='<div class="rod"></div><div class="c l"></div><div class="c r"></div>';document.body.appendChild(d);
 var kill=function(){if(d.parentNode)d.remove()};
 setTimeout(kill,1300);
 requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add("is-open")})})}
function fitBoard(){var b=document.querySelector(".board");if(!b)return;b.style.width="100%";b.style.height="100%"}
addEventListener("resize",fitBoard);
addEventListener("orientationchange",fitBoard);
addEventListener("pageshow",fitBoard);
if(window.visualViewport)visualViewport.addEventListener("resize",fitBoard);
fitBoard();
requestAnimationFrame(fitBoard);
arrive();
var winVid=document.createElement("video");winVid.setAttribute("playsinline","");winVid.preload="auto";winVid.src=BASE+"win/youwin.mp4?nd140";winVid.load();
fetch(BASE+"bank.json?nd145").then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(b){bank=b.filter(function(q){return q.choices&&q.choices.length===3});var u=new URL(location.href);if(u.searchParams.get("demo")){start(u.searchParams.get("piece")||"detective");st.seat=+u.searchParams.get("seat")||-1;placePiece(st.seat)}else renderPick()}).catch(function(){screen.innerHTML='<div class="panel">The trivia reel didn\u2019t load. Try again.</div>'});
window.__ndt={askExit:askExit,lose:function(){lose()},answer:answer,state:function(){return st}};
})();
