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
  P2.forEach((b,j)=>P1.forEach((a,i)=>{const s=[a,b].sort().join('');c.strokeStyle='#888';c.strokeRect(190+i*90,90+j*90,80,80);c.fillStyle=s=='aa'?'#e11d48':'#4f46e5';c.fillText(s,230+i*90,140+j*90)}));c.textAlign='left'}}
};
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
let cur='Physics',vals={};
function render(){const L=labs[cur];ctx.clearRect(0,0,W,H);ctx.font='14px system-ui';ctx.fillStyle=getComputedStyle(document.body).color;L.draw(ctx,vals)}
function load(n){cur=n;parts=null;const L=labs[n];vals={};
 title.textContent=L.title;explain.textContent=L.explain;quiz.textContent=L.quiz[0];ans.textContent='';
 controls.innerHTML='';L.controls.forEach(([id,lb,mn,mx,val,st])=>{vals[id]=val;
  const d=document.createElement('div');d.className='ctl';d.innerHTML=`<label>${lb}</label><input type=range min=${mn} max=${mx} step=${st} value=${val}><b>${val}</b>`;
  d.querySelector('input').oninput=e=>{vals[id]=+e.target.value;d.querySelector('b').textContent=e.target.value;render()};controls.append(d)});
 [...tabs.children].forEach(b=>b.classList.toggle('on',b.textContent==n));render()}
Object.keys(labs).forEach(n=>{const b=document.createElement('button');b.textContent=n;b.onclick=()=>load(n);tabs.append(b)});
reveal.onclick=()=>ans.textContent=labs[cur].quiz[1];
theme.onclick=()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme=='dark'?'':'dark';render()};
load('Physics');(function loop(){tm+=1/60;render();requestAnimationFrame(loop)})();
