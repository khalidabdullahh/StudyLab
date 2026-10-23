// Each lab: controls [id,label,min,max,value,step], draw(ctx,v), explain, quiz.
const W=640,H=360;let tm=0,parts=null;
const labs={
Physics:{title:'Projectile Motion',
 controls:[['a','Angle (°)',5,85,45,1],['s','Speed (m/s)',5,40,20,1],['g','Gravity (m/s²)',2,25,9.8,.1]],
 explain:'Horizontal speed stays constant while gravity pulls vertical speed down. Range R = v²·sin(2θ)/g, so 45° gives the longest range.',
 quiz:['Which angle gives maximum range (no air)?','45°'],
 draw(c,v){const r=Math.PI/180,vx=v.s*Math.cos(v.a*r),vy=v.s*Math.sin(v.a*r),T=2*vy/v.g,R=vx*T,sc=(W-60)/Math.max(R,40);
  c.strokeStyle='#4f46e5';c.lineWidth=3;c.beginPath();
  for(let i=0;i<=60;i++){const t=T*i/60,x=30+vx*t*sc,y=H-30-(vy*t-.5*v.g*t*t)*sc;i?c.lineTo(x,y):c.moveTo(x,y)}
  c.setLineDash([6,6]);c.stroke();c.setLineDash([]);c.fillStyle=c.strokeStyle;c.fillText('Range ≈ '+R.toFixed(1)+' m, time ≈ '+T.toFixed(2)+' s',20,20);const t=Math.min(tm%(T+1.2),T);c.beginPath();c.arc(30+vx*t*sc,H-30-(vy*t-.5*v.g*t*t)*sc,9,0,7);c.fill();c.fillStyle='#16a34a';c.fillRect(0,H-24,W,24)}},
Chemistry:{title:'Collision Theory: Reaction in a Beaker',
 controls:[['ea','Activation energy (kJ/mol)',20,120,50,1],['t','Heater temperature (K)',250,500,300,1]],
 explain:'Blue (A) and red (B) particles only react into green (C) when they collide with enough energy. Heating makes particles faster, so more collisions succeed. A high activation energy blocks most collisions. (Rates are scaled for visualization.)',
 quiz:['Why does heating speed up a reaction?','More particles collide with enough energy'],
 draw(c,v){
  if(!parts){parts=[];for(let i=0;i<70;i++)parts.push({x:210+Math.random()*220,y:90+Math.random()*200,a:Math.random()*6.28,k:i%2})}
  const sp=2*Math.sqrt(v.t/300),p=Math.exp(-3*(v.ea/50)*(300/v.t)),fh=(v.t-250)/250*30+8;
  c.fillStyle='#f97316';c.beginPath();c.moveTo(260,H-20);c.lineTo(320,H-20-fh*(.8+.2*Math.sin(tm*20)));c.lineTo(380,H-20);c.fill();
  c.fillStyle='#64748b';c.fillRect(220,H-20,200,12);
  c.fillStyle='rgba(56,189,248,.18)';c.fillRect(200,80,240,220);
  c.strokeStyle='#94a3b8';c.lineWidth=4;c.strokeRect(200,60,240,240);
  const cl=(x,a,b)=>Math.min(b,Math.max(a,x));
  parts.forEach(q=>{q.x+=Math.cos(q.a)*sp;q.y+=Math.sin(q.a)*sp;
   if(q.x<207||q.x>433){q.a=Math.PI-q.a;q.x=cl(q.x,207,433)}
   if(q.y<87||q.y>293){q.a=-q.a;q.y=cl(q.y,87,293)}});
  for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){const a=parts[i],b=parts[j];
   if(a.k+b.k==1&&Math.abs(a.x-b.x)<12&&Math.abs(a.y-b.y)<12&&Math.random()<p){a.k=b.k=2}}
  const col=['#3b82f6','#ef4444','#22c55e'],n=[0,0,0];
  parts.forEach(q=>{n[q.k]++;c.fillStyle=col[q.k];c.beginPath();c.arc(q.x,q.y,5,0,7);c.fill()});
  c.fillStyle=getComputedStyle(document.body).color;c.fillText('A: '+n[0]+'   B: '+n[1]+'   C (product): '+n[2],20,24)}},
Math:{title:'Function Grapher: y = a·sin(bx + c)',
 controls:[['a','Amplitude a',.5,3,1,.1],['b','Frequency b',.5,4,1,.1],['c','Phase c',-3,3,0,.1]],
 explain:'a stretches the wave vertically, b squeezes it horizontally (period = 2π/b), c shifts it left or right.',
 quiz:['What is the period when b = 2?','π'],
 draw(c,v){c.strokeStyle='#888';c.lineWidth=1;c.beginPath();c.moveTo(0,H/2);c.lineTo(W,H/2);c.moveTo(W/2,0);c.lineTo(W/2,H);c.stroke();
  c.strokeStyle='#059669';c.lineWidth=3;c.beginPath();
  for(let i=0;i<=W;i++){const x=(i-W/2)/50,y=H/2-v.a*Math.sin(v.b*x+v.c)*50;i?c.lineTo(i,y):c.moveTo(i,y)}c.stroke()}},
Biology:{title:'Genetics: Punnett Square (Aa × Aa style)',
 controls:[['p1','Parent 1 dominant alleles (A)',0,2,1,1],['p2','Parent 2 dominant alleles (A)',0,2,1,1]],
 explain:'Each parent passes one allele. 1 Aa × Aa gives 25% AA, 50% Aa, 25% aa, so a 3:1 dominant:recessive phenotype ratio.',
 quiz:['Aa × Aa: chance of aa offspring?','25%'],
 draw(c,v){const g=n=>[n>=1?'A':'a',n>=2?'A':'a'].map((x,i)=>i==0&&n==1?'A':(n==1?'a':x));
  const P1=g(v.p1),P2=g(v.p2);c.font='28px system-ui';c.textAlign='center';
  P1.forEach((a,i)=>c.fillText(a,230+i*90,60));P2.forEach((a,i)=>c.fillText(a,150,130+i*90));
  P2.forEach((b,j)=>P1.forEach((a,i)=>{const s=[a,b].sort().join('');c.strokeStyle='#888';c.strokeRect(190+i*90,90+j*90,80,80);c.fillStyle=s=='aa'?'#e11d48':'#4f46e5';c.fillText(s,230+i*90,140+j*90)}));c.textAlign='left'}},
Circuit:{controls:[['V','Voltage (V)',1,12,6,1],['R','Resistance (Ω)',1,20,10,1]],
 explain:'Higher voltage pushes more current; higher resistance reduces it. Ohm’s law: I = V/R. The bulb glows brighter with more current, and the blue electrons flow faster.',
 quiz:['If V = 6 V and R = 3 Ω, what is I?','2 A'],
 draw(c,v){const I=v.V/v.R,g=Math.min(1,I/1.2),fg=getComputedStyle(document.body).color;
  c.strokeStyle=fg;c.lineWidth=3;c.strokeRect(120,100,400,160);
  c.fillStyle='#fbbf24';c.fillRect(290,88,60,24);c.strokeRect(290,88,60,24);
  c.fillStyle='#22c55e';c.fillRect(108,160,24,40);c.fillStyle='#fff';c.fillText('+',114,176);c.fillText('−',114,194);
  c.save();c.shadowColor='#facc15';c.shadowBlur=40*g;c.fillStyle=`rgba(250,204,21,${.15+.85*g})`;c.beginPath();c.arc(520,180,24,0,7);c.fill();c.restore();
  c.strokeStyle=fg;c.beginPath();c.arc(520,180,24,0,7);c.stroke();
  c.fillStyle='#3b82f6';for(let i=0;i<24;i++){const d=(tm*I*40+i*1120/24)%1120;let x,y;
   if(d<400){x=120+d;y=100}else if(d<560){x=520;y=100+d-400}else if(d<960){x=520-(d-560);y=260}else{x=120;y=260-(d-960)}
   c.beginPath();c.arc(x,y,4,0,7);c.fill()}
  c.fillStyle=fg;c.fillText('I = V/R = '+v.V+'/'+v.R+' = '+I.toFixed(2)+' A',20,24);c.fillText('Resistor',295,80);c.fillText('Bulb',505,225)}},
Titration:{controls:[['v','NaOH added (mL)',0,50,0,.5]],
 explain:'Adding NaOH to 25 mL of 0.1 M HCl: pH rises slowly, then jumps at the equivalence point (25 mL). Phenolphthalein turns pink above pH 8.2 to show the end point.',
 quiz:['pH at equivalence for a strong acid + strong base?','7'],
 draw(c,v){const ph=x=>{if(x==25)return 7;const h=(2.5-.1*x)/(25+x);return h>0?-Math.log10(h):14+Math.log10(-h)};
  const P=ph(v.v),fg=getComputedStyle(document.body).color,a=Math.max(0,Math.min(1,(P-8.2)/1.5));
  c.strokeStyle=fg;c.lineWidth=3;c.strokeRect(88,30,24,190);
  const lv=(50-v.v)/50*186;c.fillStyle='rgba(56,189,248,.5)';c.fillRect(90,34+(186-lv),20,lv);
  c.fillStyle=fg;c.fillRect(80,222,40,6);
  c.fillStyle='rgba(56,189,248,.6)';if(v.v<50){c.beginPath();c.arc(100,238+((tm*90)%50),3,0,7);c.fill()}
  c.beginPath();c.moveTo(92,290);c.lineTo(108,290);c.lineTo(145,345);c.lineTo(55,345);c.closePath();
  c.fillStyle=`rgba(${236*a+56*(1-a)|0},${72*a+189*(1-a)|0},${153*a+248*(1-a)|0},${.3+.4*a})`;c.fill();c.stroke();
  c.strokeStyle='#888';c.lineWidth=1;c.strokeRect(260,40,340,260);
  c.beginPath();for(let x=0;x<=50;x+=.5){const X=260+x/50*340,Y=300-ph(x)/14*260;x?c.lineTo(X,Y):c.moveTo(X,Y)}
  c.strokeStyle='#4f46e5';c.lineWidth=3;c.stroke();
  c.setLineDash([5,5]);c.strokeStyle='#888';c.lineWidth=1;c.beginPath();c.moveTo(430,40);c.lineTo(430,300);c.stroke();c.setLineDash([]);
  c.fillStyle='#e11d48';c.beginPath();c.arc(260+v.v/50*340,300-P/14*260,7,0,7);c.fill();
  c.fillStyle=fg;c.fillText('pH = '+P.toFixed(2)+'  ('+v.v+' mL)',260,24);c.fillText('pH',232,45);c.fillText('mL →',565,318)}},
Cell:{controls:[['o','Organelle (0-4)',0,4,0,1]],
 info:[['Nucleus','Stores DNA, controls the cell','নিউক্লিয়াস','DNA ধারণ করে, কোষ নিয়ন্ত্রণ করে'],['Mitochondria','Makes energy (ATP)','মাইটোকন্ড্রিয়া','শক্তি (ATP) তৈরি করে'],['Golgi body','Packs and ships proteins','গলজি বডি','প্রোটিন প্যাক করে পাঠায়'],['Lysosome','Digests waste','লাইসোজোম','বর্জ্য হজম করে'],['Ribosomes','Build proteins','রাইবোসোম','প্রোটিন তৈরি করে']],
 explain:'Use the slider to pick an organelle (0–4): the glowing part is the one you chose. Nucleus holds DNA, mitochondria make energy, Golgi packs proteins, lysosomes digest waste, ribosomes build proteins.',
 quiz:['Which organelle is the powerhouse of the cell?','Mitochondria'],
 draw(c,v){const fg=getComputedStyle(document.body).color,b=i=>Math.sin(tm*2+i)*3,gl=i=>{c.shadowColor='#facc15';c.shadowBlur=v.o==i?25:0};
  c.fillStyle='rgba(125,211,252,.25)';c.strokeStyle='#38bdf8';c.lineWidth=4;c.beginPath();c.ellipse(320,170,270,150,0,0,7);c.fill();c.stroke();
  gl(0);c.fillStyle='#a78bfa';c.beginPath();c.arc(320,170+b(0),55,0,7);c.fill();c.fillStyle='#6d28d9';c.beginPath();c.arc(335,160+b(0),16,0,7);c.fill();
  gl(1);c.fillStyle='#fb923c';[[180,120,.5],[450,240,-.4]].forEach(([x,y,r],k)=>{c.beginPath();c.ellipse(x,y+b(k+1),32,15,r,0,7);c.fill()});
  gl(2);c.strokeStyle='#ec4899';c.lineWidth=6;for(let k=0;k<3;k++){c.beginPath();c.arc(470,100+b(2)+k*12,30,3.3,6.1);c.stroke()}
  gl(3);c.fillStyle='#22c55e';[[200,240],[250,280],[420,70]].forEach(([x,y],k)=>{c.beginPath();c.arc(x,y+b(k),10,0,7);c.fill()});
  gl(4);c.fillStyle='#1e293b';for(let k=0;k<14;k++){const a=k/14*6.28+tm*.3;c.beginPath();c.arc(320+Math.cos(a)*75,170+Math.sin(a)*75,4,0,7);c.fill()}
  c.shadowBlur=0;const f=this.info[v.o],i=bn?2:0;c.fillStyle=fg;c.font='bold 16px system-ui';c.fillText(f[i]+': '+f[i+1],20,345)}}
};
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
let cur='Physics',vals={};
function render(){const L=labs[cur];ctx.clearRect(0,0,W,H);ctx.font='14px system-ui';ctx.fillStyle=getComputedStyle(document.body).color;L.draw(ctx,vals)}
let bn=false;
const TN={Physics:['🎯 Projectile','🎯 প্রক্ষেপণ'],Circuit:['⚡ Circuit','⚡ সার্কিট'],Chemistry:['💥 Collision','💥 সংঘর্ষ'],Titration:['⚗️ Titration','⚗️ টাইট্রেশন'],Math:['📈 Sine','📈 সাইন'],Biology:['🧬 Punnett','🧬 পানেট'],Cell:['🔬 Cell','🔬 কোষ']};
const BN={
Physics:{t:'প্রক্ষেপক গতি',e:'অনুভূমিক বেগ ধ্রুবক থাকে আর অভিকর্ষ উল্লম্ব বেগ কমায়। পাল্লা R = v²·sin(2θ)/g, তাই ৪৫° কোণে পাল্লা সবচেয়ে বেশি।',q:['সর্বোচ্চ পাল্লার জন্য কোণ কত?','৪৫°'],c:['কোণ (°)','গতি (m/s)','অভিকর্ষ (m/s²)']},
Circuit:{t:'ওহমের সূত্র: সার্কিট',e:'ভোল্টেজ বাড়ালে কারেন্ট বাড়ে, রেজিস্ট্যান্স বাড়ালে কারেন্ট কমে। I = V/R। কারেন্ট বেশি হলে বাল্ব উজ্জ্বল জ্বলে আর নীল ইলেকট্রন দ্রুত চলে।',q:['V = 6 V, R = 3 Ω হলে I কত?','২ A'],c:['ভোল্টেজ (V)','রেজিস্ট্যান্স (Ω)']},
Chemistry:{t:'সংঘর্ষ তত্ত্ব: বিকারে বিক্রিয়া',e:'নীল (A) ও লাল (B) কণা যথেষ্ট শক্তিতে ধাক্কা খেলে সবুজ (C) তৈরি হয়। তাপ দিলে কণা দ্রুত চলে, তাই বেশি সংঘর্ষ সফল হয়। সক্রিয়করণ শক্তি বেশি হলে বিক্রিয়া ধীর হয়।',q:['তাপ দিলে বিক্রিয়া দ্রুত হয় কেন?','বেশি কণা যথেষ্ট শক্তিতে ধাক্কা খায়'],c:['সক্রিয়করণ শক্তি (kJ/mol)','হিটার তাপমাত্রা (K)']},
Titration:{t:'অ্যাসিড-ক্ষার টাইট্রেশন',e:'২৫ mL ০.১ M HCl এ NaOH মেশালে pH আস্তে বাড়ে, সমতা বিন্দুতে (২৫ mL) হঠাৎ লাফ দেয়। ফেনলফথ্যালিন pH ৮.২ এর পর গোলাপি হয়ে শেষ বিন্দু বোঝায়।',q:['শক্তিশালী অ্যাসিড-ক্ষারের সমতা বিন্দুতে pH কত?','৭'],c:['NaOH যোগ (mL)']},
Math:{t:'ফাংশন গ্রাফ: y = a·sin(bx + c)',e:'a তরঙ্গকে উপর-নিচে বাড়ায়, b তরঙ্গকে সংকুচিত করে (পর্যায় = 2π/b), c তরঙ্গকে ডানে-বামে সরায়।',q:['b = 2 হলে পর্যায়কাল কত?','π'],c:['বিস্তার a','কম্পাঙ্ক b','দশা c']},
Biology:{t:'জিনতত্ত্ব: পানেট স্কয়ার',e:'প্রতিটি প্যারেন্ট একটি অ্যালিল দেয়। Aa × Aa এ ২৫% AA, ৫০% Aa, ২৫% aa হয়, অর্থাৎ প্রকট:প্রচ্ছন্ন = ৩:১।',q:['Aa × Aa এ aa সন্তানের সম্ভাবনা?','২৫%'],c:['প্যারেন্ট ১ এ প্রভাবী অ্যালিল (A)','প্যারেন্ট ২ এ প্রভাবী অ্যালিল (A)']},
Cell:{t:'কোষের অঙ্গাণু',e:'স্লাইডার দিয়ে অঙ্গাণু (০–৪) বেছে নাও, জ্বলজ্বল করা অংশটি তোমার বাছাই। নিউক্লিয়াসে DNA থাকে, মাইটোকন্ড্রিয়া শক্তি বানায়, গলজি প্রোটিন প্যাক করে, লাইসোজোম বর্জ্য হজম করে, রাইবোসোম প্রোটিন তৈরি করে।',q:['কোষের পাওয়ারহাউস কোন অঙ্গাণু?','মাইটোকন্ড্রিয়া'],c:['অঙ্গাণু (০-৪)']}};
function load(n,keep){cur=n;parts=null;const L=labs[n],b=bn&&BN[n],old=keep?{...vals}:{};vals={};
 title.textContent=b?b.t:L.title;explain.textContent=b?b.e:L.explain;quiz.textContent=(b?b.q:L.quiz)[0];ans.textContent='';
 controls.innerHTML='';L.controls.forEach(([id,lb,mn,mx,val,st],i)=>{val=old[id]??val;vals[id]=val;
  const d=document.createElement('div');d.className='ctl';d.innerHTML=`<label>${b?b.c[i]:lb}</label><input type=range min=${mn} max=${mx} step=${st} value=${val}><b>${val}</b>`;
  d.querySelector('input').oninput=e=>{vals[id]=+e.target.value;d.querySelector('b').textContent=e.target.value;render()};controls.append(d)});
 tabs.innerHTML='';Object.keys(TN).forEach(k=>{const t=document.createElement('button');t.textContent=TN[k][+bn];t.className=k==n?'on':'';t.onclick=()=>load(k);tabs.append(t)});
 reveal.textContent=bn?'উত্তর দেখো':'Show answer';wh.textContent=bn?'কেন এমন হয়?':'Why does this happen?';mqh.textContent=bn?'মিনি কুইজ':'Mini quiz';lang.textContent=bn?'English':'বাংলা';render()}
reveal.onclick=()=>{const b=bn&&BN[cur];ans.textContent=(b?b.q:labs[cur].quiz)[1]};
lang.onclick=()=>{bn=!bn;load(cur,true)};
theme.onclick=()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme=='dark'?'':'dark';render()};
load('Physics');(function loop(){tm+=1/60;render();requestAnimationFrame(loop)})();
