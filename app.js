// Each lab: controls [id,label,min,max,value,step], draw(ctx,v), explain, quiz.
const W=640,H=360;
const labs={
Physics:{title:'Projectile Motion',
 controls:[['a','Angle (°)',5,85,45,1],['s','Speed (m/s)',5,40,20,1],['g','Gravity (m/s²)',2,25,9.8,.1]],
 explain:'Horizontal speed stays constant while gravity pulls vertical speed down. Range R = v²·sin(2θ)/g, so 45° gives the longest range.',
 quiz:['Which angle gives maximum range (no air)?','45°'],
 draw(c,v){const r=Math.PI/180,vx=v.s*Math.cos(v.a*r),vy=v.s*Math.sin(v.a*r),T=2*vy/v.g,R=vx*T,sc=(W-60)/Math.max(R,40);
  c.strokeStyle='#4f46e5';c.lineWidth=3;c.beginPath();
  for(let i=0;i<=60;i++){const t=T*i/60,x=30+vx*t*sc,y=H-30-(vy*t-.5*v.g*t*t)*sc;i?c.lineTo(x,y):c.moveTo(x,y)}
  c.stroke();c.fillStyle=c.strokeStyle;c.fillText('Range ≈ '+R.toFixed(1)+' m, time ≈ '+T.toFixed(2)+' s',20,20)}},
Chemistry:{title:'Reaction Rate vs Temperature (Arrhenius)',
 controls:[['ea','Activation energy (kJ/mol)',20,120,50,1],['t','Temperature (K)',250,500,300,1]],
 explain:'Rate constant k = A·e^(−Ea/RT). Higher temperature gives more molecules enough energy to react; higher Ea makes the reaction slower.',
 quiz:['If temperature rises, does k increase or decrease?','Increase'],
 draw(c,v){const R=.008314,k=T=>Math.exp(-v.ea/(R*T)),m=k(500);
  c.strokeStyle='#e11d48';c.lineWidth=3;c.beginPath();
  for(let T=250;T<=500;T+=5){const x=30+(T-250)/250*(W-60),y=H-30-k(T)/m*(H-70);T>250?c.lineTo(x,y):c.moveTo(x,y)}
  c.stroke();const x=30+(v.t-250)/250*(W-60),y=H-30-k(v.t)/m*(H-70);
  c.fillStyle='#e11d48';c.beginPath();c.arc(x,y,7,0,7);c.fill();c.fillText('k/k(500K) = '+(k(v.t)/m).toFixed(3),20,20)}},
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
function load(n){cur=n;const L=labs[n];vals={};
 title.textContent=L.title;explain.textContent=L.explain;quiz.textContent=L.quiz[0];ans.textContent='';
 controls.innerHTML='';L.controls.forEach(([id,lb,mn,mx,val,st])=>{vals[id]=val;
  const d=document.createElement('div');d.className='ctl';d.innerHTML=`<label>${lb}</label><input type=range min=${mn} max=${mx} step=${st} value=${val}><b>${val}</b>`;
  d.querySelector('input').oninput=e=>{vals[id]=+e.target.value;d.querySelector('b').textContent=e.target.value;render()};controls.append(d)});
 [...tabs.children].forEach(b=>b.classList.toggle('on',b.textContent==n));render()}
Object.keys(labs).forEach(n=>{const b=document.createElement('button');b.textContent=n;b.onclick=()=>load(n);tabs.append(b)});
reveal.onclick=()=>ans.textContent=labs[cur].quiz[1];
theme.onclick=()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme=='dark'?'':'dark';render()};
load('Physics');
