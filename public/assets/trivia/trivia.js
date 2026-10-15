(function(){"use strict";
var SEATS=[[12.21,41.21],[21.37,41.21],[42.12,40.78],[50.06,40.78],[57.39,40.78],[12.21,52.06],[31.14,52.06],[40.9,52.06],[50.06,52.06],[72.04,52.06],[21.37,70.5],[31.14,70.5],[40.9,70.5],[50.06,70.5],[59.83,70.5],[83.03,70.5],[40.29,87.85],[51.28,87.85],[61.05,87.85],[81.81,87.85],[93.41,87.85]];
var START=[5,96];// aisle, front-left edge, before seat 1
var PIECES=[{id:"detective",name:"The Detective",cut:1,w:157},{id:"orlok",name:"Count Orlok",cut:1,w:141},{id:"phantom",name:"The Phantom",cut:1,w:153},{id:"rebel",name:"The Rebel",cut:1,w:170},{id:"kid",name:"The Kid",cut:1,w:100},{id:"glamour",name:"The Glamour Girl",female:1,cut:1,w:142}];
var PROMOS=["trailer_bill","trailer_adam","cable_bill","cable_adam","radio_bill","radio_adam","noir_bill","noir_adam"];
var PROMO_EVERY=7,STRIKES=3,BASE="/assets/trivia/";
var $=function(s){return document.querySelector(s)},screen=$("#screen"),pieceEl=$("#piece");
var ls={get:function(k,d){try{var v=localStorage.getItem("ndt."+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem("ndt."+k,JSON.stringify(v))}catch(e){}}};
var bank=[],st=null,actx=null;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.random()*(i+1)|0,t=a[i];a[i]=a[j];a[j]=t}return a}
function ac(){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==="suspended")actx.resume()}catch(e){}return actx}
function tone(seq,type){var c=ac();if(!c)return;var t=c.currentTime;seq.forEach(function(n){var o=c.createOscillator(),g=c.createGain();o.type=type||"sine";o.frequency.setValueAtTime(n[0],t+n[1]);if(n[3])o.frequency.linearRampToValueAtTime(n[3],t+n[1]+n[2]);g.gain.setValueAtTime(0.0001,t+n[1]);g.gain.exponentialRampToValueAtTime(.25,t+n[1]+.02);g.gain.exponentialRampToValueAtTime(.0001,t+n[1]+n[2]);o.connect(g).connect(c.destination);o.start(t+n[1]);o.stop(t+n[1]+n[2]+.05)})}
var sfx={right:function(){tone([[880,0,.25],[1320,.08,.4],[1760,.16,.5]],"triangle")},wrong:function(){tone([[180,0,.45,150],[185,0,.45,140]],"sawtooth")},
 darn:function(){try{if(!window.speechSynthesis)return;var u=new SpeechSynthesisUtterance("Darn!"),p=st&&st.piece,vs=speechSynthesis.getVoices();if(p&&p.female){var f=vs.find(function(v){return/female|samantha|victoria|zira|karen/i.test(v.name)});if(f)u.voice=f;u.pitch=1.4}else u.pitch=.8;speechSynthesis.speak(u)}catch(e){}},
 win:function(){tone([[523,0,.2],[659,.18,.2],[784,.36,.2],[1047,.54,.6]],"square")}};
function seatPos(i){return i<0?START:SEATS[i]}
var SEAT_DROP=11;// %: seated cutouts sink behind the seat back, matching theater_pieces_scaled.jpg
function placePiece(i,hop){var p=seatPos(i),r=st?st.piece:cur;pieceEl.style.left=p[0]+"%";pieceEl.style.top=(r&&r.w?Math.min(p[1]+SEAT_DROP,100):p[1])+"%";if(hop){pieceEl.classList.remove("hop");void pieceEl.offsetWidth;pieceEl.classList.add("hop")}}
var cur=null;function showPiece(p){cur=p;pieceEl.hidden=false;pieceEl.className="piece"+(p.cut?" cut":"")+(p.w?" seated":"");pieceEl.style.width=p.w?(p.w/1280*100)+"%":"";pieceEl.style.aspectRatio=p.w?"auto":"";pieceEl.querySelector("img").src=BASE+"pieces/"+p.id+".png?p4";pieceEl.querySelector("img").alt=p.name}
function nextQuestion(){var seen=ls.get("seen",[]),pool=bank.filter(function(q){return seen.indexOf(q.id)<0&&st.asked.indexOf(q.id)<0});
 if(pool.length<5){seen=[];ls.set("seen",seen);pool=bank.filter(function(q){return st.asked.indexOf(q.id)<0})}
 var q=pool[Math.random()*pool.length|0];st.asked.push(q.id);seen.push(q.id);ls.set("seen",seen.slice(-100));
 var order=shuffle([0,1,2]);return{q:q,choices:order.map(function(i){return q.choices[i]}),answer:order.indexOf(q.answer_index)}}
function stubsHtml(){var h="";for(var i=0;i<STRIKES;i++)h+='<i class="stub'+(i<st.strikes?" torn":"")+'" title="strike"></i>';return h}
function renderPick(){var chosen=ls.get("piece","detective");
 screen.innerHTML='<div class="marquee pick"><span class="plaque">TRIVIA NIGHT</span><div class="panel"><h2>Choose a game piece</h2><div class="grid">'+PIECES.map(function(p){return'<button class="pc'+(p.cut?" cut":"")+'" data-id="'+p.id+'" aria-pressed="'+(p.id===chosen)+'"><img src="'+BASE+"pieces/"+p.id+'.png?p4" alt="">'+esc(p.name)+'</button>'}).join("")+'</div><div class="row"><span class="muted">For-fun play · 21 seats to the golden seat · 3 strikes</span><button class="next" id="go">PLAY</button></div></div></div>';
 screen.querySelectorAll(".pc").forEach(function(b){b.onclick=function(){screen.querySelectorAll(".pc").forEach(function(x){x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");ls.set("piece",b.dataset.id);showPiece(PIECES.find(function(p){return p.id===b.dataset.id}));placePiece(-1)}});
 showPiece(PIECES.find(function(p){return p.id===chosen})||PIECES[0]);placePiece(-1);
 $("#go").onclick=function(){ac();start(ls.get("piece","detective"))}}
function start(id){st={piece:PIECES.find(function(p){return p.id===id})||PIECES[0],seat:-1,strikes:0,n:0,right:0,asked:[],stubs:0};showPiece(st.piece);placePiece(-1);renderQ()}
function renderQ(){var c=st.cur=nextQuestion();st.n++;
 screen.innerHTML='<div class="marquee"><span class="plaque">TRIVIA NIGHT</span><div class="panel"><div class="qmeta"><span>Question '+st.n+' · Seat '+(st.seat+1)+' of 21</span><span class="stubs">'+stubsHtml()+'</span></div><p class="q">'+esc(c.q.question)+'</p><div class="choices">'+c.choices.map(function(t,i){return'<button class="ch" data-i="'+i+'"><b>'+"ABC"[i]+'</b><span>'+esc(t)+'</span></button>'}).join("")+'</div><div class="row"><img class="mini" src="'+BASE+"pieces/"+st.piece.id+'.png?p4" alt=""><span class="verdict" id="verdict"></span><button class="next" id="next" hidden>NEXT</button></div></div></div>';
 screen.querySelectorAll(".ch").forEach(function(b){b.onclick=function(){answer(+b.dataset.i)}})}
function answer(i){var c=st.cur,btns=screen.querySelectorAll(".ch"),ok=i===c.answer,v=$("#verdict");btns.forEach(function(b){b.disabled=true});btns[c.answer].classList.add("right");
 if(ok){st.right++;st.stubs++;st.seat++;placePiece(st.seat,true);sfx.right();v.textContent="Right! Move up a seat."}else{btns[i].classList.add("wrong");st.strikes++;sfx.wrong();setTimeout(sfx.darn,450);v.textContent="Darn! Strike "+st.strikes+".";screen.querySelector(".stubs").innerHTML=stubsHtml()}
 var n=$("#next");n.hidden=false;n.focus();n.onclick=function(){if(st.seat>=20)return win();if(st.strikes>=STRIKES)return lose();if(st.n%PROMO_EVERY===0)return promo(renderQ);renderQ()}}
function award(bonus){var total=ls.get("stubs",0)+st.stubs+bonus;ls.set("stubs",total);return total}
function win(){var perfect=st.strikes===0,total=award(10+(perfect?5:0));sfx.win();var w=document.createElement("div");w.id="win";w.innerHTML="<h1>YOU WIN</h1>";document.body.appendChild(w);
 setTimeout(function(){w.remove();screen.innerHTML='<div class="marquee"><span class="plaque">TRIVIA NIGHT</span><div class="panel center"><h2>You made the golden seat!</h2><p>'+st.right+' right in '+st.n+' questions'+(perfect?" — a perfect run!":"")+'</p><p class="muted">Ticket stubs: '+total+'</p><div class="row"><span></span><button class="next" id="again">PLAY AGAIN</button></div></div></div>';$("#again").onclick=renderPick},3000)}
function lose(){var total=award(0);screen.innerHTML='<div class="marquee"><span class="plaque">TRIVIA NIGHT</span><div class="panel center"><h2>Three strikes — show\u2019s over.</h2><p>You reached seat '+(st.seat+1)+' of 21.</p><p class="muted">Ticket stubs: '+total+'</p><div class="row"><span></span><button class="next" id="again">PLAY AGAIN</button></div></div></div>';$("#again").onclick=renderPick}
function promo(done){var k=ls.get("promo",0)%PROMOS.length;ls.set("promo",k+1);var d=document.createElement("div");d.id="promo";d.innerHTML='<video playsinline autoplay src="'+BASE+"promo/"+PROMOS[k]+'.mp4"></video><button class="skip">Skip ▸</button>';document.body.appendChild(d);
 var fin=function(){if(!d.parentNode)return;d.remove();done()};d.querySelector(".skip").onclick=fin;var vid=d.querySelector("video");vid.onended=fin;vid.onerror=fin;var p=vid.play();if(p&&p.catch)p.catch(function(){})}
function askExit(){if(!st)return void(location.href="/");if($("#ask"))return;var d=document.createElement("div");d.id="ask";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.innerHTML='<div class="marquee"><span class="plaque">EXIT</span><div class="panel center"><h2>Leave the theater?</h2><p class="muted">This run will end.</p><div class="row"><button class="btn2" id="stay">Stay</button><button class="next" id="leave">Leave</button></div></div></div>';document.body.appendChild(d);$("#stay").onclick=function(){d.remove()};$("#leave").onclick=function(){location.href="/"};$("#stay").focus()}
$("#exitBtn").onclick=askExit;
var sl=document.getElementById("seats");SEATS.forEach(function(p,i){var s=document.createElement("i");s.className="s";s.style.left=p[0]+"%";s.style.top=p[1]+"%";s.dataset.seat=i+1;sl.appendChild(s)});
fetch(BASE+"bank.json?nd1").then(function(r){return r.json()}).then(function(b){bank=b.filter(function(q){return q.choices&&q.choices.length===3});var u=new URL(location.href);if(u.searchParams.get("demo")){start(u.searchParams.get("piece")||"detective");st.seat=+u.searchParams.get("seat")||-1;placePiece(st.seat)}else renderPick()}).catch(function(){screen.innerHTML='<div class="panel">The trivia reel didn\u2019t load. Try again.</div>'});
window.__ndt={askExit:askExit,lose:function(){lose()},answer:answer,state:function(){return st}};
})();
