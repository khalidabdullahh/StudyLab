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
  c.shadowBlur=0;const f=this.info[v.o],i=bn?2:0;c.fillStyle=fg;c.font='bold 16px system-ui';c.fillText(f[i]+': '+f[i+1],20,345)}},
Waves:{title:'Waves & Superposition',controls:[['f1','Wave 1 frequency',1,6,2,.5],['f2','Wave 2 frequency',1,6,3,.5],['a','Amplitude',10,40,30,5]],
 explain:'When two waves meet, their displacements add (superposition). Change the frequencies and amplitude to see how the sum wave changes.',
 quiz:['Two identical waves in phase: what is the new amplitude?','Double'],
 draw(c,v){const fg=getComputedStyle(document.body).color,w=(f,x)=>v.a*Math.sin(f*(x-tm*60)/60);
  c.lineWidth=2;[['#3b82f6',v.f1],['#ef4444',v.f2]].forEach(([col,f])=>{c.strokeStyle=col;c.beginPath();for(let x=0;x<=W;x+=3){const y=90-w(f,x);x?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()});
  c.strokeStyle='#8b5cf6';c.lineWidth=3;c.beginPath();for(let x=0;x<=W;x+=3){const y=265-w(v.f1,x)-w(v.f2,x);x?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
  c.fillStyle=fg;c.fillText('Wave 1 (blue) + Wave 2 (red)',20,24);c.fillText('Sum = superposition (purple)',20,172)}},
Calculus:{title:'Derivative as Slope: f(x) = 0.1x³ − 0.6x',controls:[['x','Point x',-3,3,1,.1],['h','Step h',.05,3,2,.05]],
 explain:'The red secant line joins two points a distance h apart. As h shrinks, its slope approaches the green tangent slope, which is the derivative f′(x).',
 quiz:['What does the derivative measure?','Slope of the tangent (rate of change)'],
 draw(c,v){const f=x=>.1*x**3-.6*x,X=x=>W/2+x*60,Y=y=>H/2-y*30,fg=getComputedStyle(document.body).color;
  c.strokeStyle='#888';c.lineWidth=1;c.beginPath();c.moveTo(0,H/2);c.lineTo(W,H/2);c.moveTo(W/2,0);c.lineTo(W/2,H);c.stroke();
  c.strokeStyle='#4f46e5';c.lineWidth=3;c.beginPath();for(let x=-5;x<=5;x+=.05){x>-5?c.lineTo(X(x),Y(f(x))):c.moveTo(X(x),Y(f(x)))}c.stroke();
  const m=(f(v.x+v.h)-f(v.x))/v.h,d=.3*v.x*v.x-.6,y0=f(v.x);
  c.lineWidth=2;c.strokeStyle='#ef4444';c.beginPath();c.moveTo(X(v.x-3),Y(y0-3*m));c.lineTo(X(v.x+3),Y(y0+3*m));c.stroke();
  c.setLineDash([6,5]);c.strokeStyle='#16a34a';c.beginPath();c.moveTo(X(v.x-3),Y(y0-3*d));c.lineTo(X(v.x+3),Y(y0+3*d));c.stroke();c.setLineDash([]);
  c.fillStyle='#ef4444';c.beginPath();c.arc(X(v.x),Y(y0),6,0,7);c.arc(X(v.x+v.h),Y(f(v.x+v.h)),6,0,7);c.fill();
  c.fillStyle=fg;c.fillText('secant slope = '+m.toFixed(2)+'   tangent slope f′(x) = '+d.toFixed(2),20,24)}},
Molecule:{title:'Molecule Shapes (3D)',controls:[['m','Molecule (0 Water, 1 Methane, 2 CO₂)',0,2,0,1],['s','Spin speed',0,3,1,.5]],
 n:[['H₂O: bent, 104.5°','CH₄: tetrahedral, 109.5°','CO₂: linear, 180°'],['H₂O: বাঁকা, ১০৪.৫°','CH₄: চতুস্তলকীয়, ১০৯.৫°','CO₂: রৈখিক, ১৮০°']],
 explain:'Electron pairs repel each other, so molecules take fixed 3D shapes: water is bent, methane is tetrahedral, CO₂ is linear.',
 quiz:['What shape is methane?','Tetrahedral'],
 draw(c,v){const fg=getComputedStyle(document.body).color,C='#475569',O='#ef4444',Hh='#e2e8f0',q=.577,
  M=[[[O,18,0,.2,0],[Hh,11,.79,-.41,0],[Hh,11,-.79,-.41,0]],
     [[C,16,0,0,0],[Hh,11,q,q,q],[Hh,11,q,-q,-q],[Hh,11,-q,q,-q],[Hh,11,-q,-q,q]],
     [[C,16,0,0,0],[O,18,1.16,0,0],[O,18,-1.16,0,0]]][v.m];
  const a=tm*v.s,ca=Math.cos(a),sa=Math.sin(a),ct=Math.cos(.4),st=Math.sin(.4);
  const P=M.map(([col,r,x,y,z])=>{const x1=x*ca+z*sa,z1=-x*sa+z*ca,y1=y*ct-z1*st,z2=y*st+z1*ct;return{col,r:r*(1+z2*.12),X:W/2+x1*110,Y:H/2-y1*110,z:z2}});
  c.strokeStyle='#94a3b8';c.lineWidth=7;P.slice(1).forEach(p=>{c.beginPath();c.moveTo(P[0].X,P[0].Y);c.lineTo(p.X,p.Y);c.stroke()});
  [...P].sort((a,b)=>a.z-b.z).forEach(p=>{c.fillStyle=p.col;c.beginPath();c.arc(p.X,p.Y,p.r*1.3,0,7);c.fill();c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=1;c.stroke()});
  c.fillStyle=fg;c.fillText(this.n[+bn][v.m],20,24)}},
DNA:{title:'DNA Replication',controls:[['p','Replication progress (%)',0,100,40,1]],
 explain:'The double helix unzips at the replication fork and each old strand builds a new partner, giving two identical DNA molecules (semi-conservative replication). Drag the slider to move the fork.',
 quiz:['Why is replication called semi-conservative?','Each new DNA keeps one old strand'],
 draw(c,v){const fg=getComputedStyle(document.body).color,f=20+v.p/100*(W-40);
  for(let x=20;x<W;x+=12){const ph=x/45-tm*1.5,s=Math.sin(ph),rc=(x/12|0)%2?'#f59e0b':'#10b981';
   const H2=H/2-10,rows=x<f?[[H2-70,25,'#3b82f6','#22c55e'],[H2+70,25,'#ef4444','#f97316']]:[[H2,50,'#3b82f6','#ef4444']];
   rows.forEach(([cy,A,c1,c2])=>{const y1=cy+A*s,y2=cy-A*s;c.strokeStyle=rc;c.lineWidth=2;c.beginPath();c.moveTo(x,y1);c.lineTo(x,y2);c.stroke();
    c.fillStyle=c1;c.beginPath();c.arc(x,y1,5,0,7);c.fill();c.fillStyle=c2;c.beginPath();c.arc(x,y2,5,0,7);c.fill()})}
  c.fillStyle=fg;c.fillText('Replication fork ▶ at '+v.p+'%',20,24);c.fillText('old strands: blue / red   new strands: green / orange',20,H-12)}},
Mitosis:{title:'Mitosis: Cell Division',controls:[['s','Stage (0-4)',0,4,0,1]],
 info:[['Interphase','DNA is copied inside the nucleus','ইন্টারফেজ','নিউক্লিয়াসে ডিএনএ কপি হয়'],['Prophase','Chromosomes condense, nucleus fades','প্রোফেজ','ক্রোমোজোম গুটিয়ে যায়, নিউক্লিয়াস মিলিয়ে যায়'],['Metaphase','Chromosomes line up at the middle','মেটাফেজ','ক্রোমোজোম মাঝখানে সারি বাঁধে'],['Anaphase','Sister chromatids pulled apart','অ্যানাফেজ','ক্রোমাটিড আলাদা হয়ে দুই দিকে যায়'],['Telophase','Two nuclei form, the cell splits','টেলোফেজ','দুটি নতুন নিউক্লিয়াস হয়, কোষ ভাগ হয়']],
 explain:'Slide through the stages: DNA is copied in interphase, chromosomes condense, line up, split apart, and the cell divides into two identical cells.',
 quiz:['In which stage do chromosomes line up in the middle?','Metaphase'],
 draw(c,v){const fg=getComputedStyle(document.body).color,s=v.s,j=Math.sin(tm*3)*2;
  c.fillStyle='rgba(125,211,252,.22)';c.strokeStyle='#38bdf8';c.lineWidth=4;
  const cell=(x,y,rx,ry)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();c.stroke()};
  const X=(x,y)=>{c.strokeStyle='#a855f7';c.lineWidth=5;c.beginPath();c.moveTo(x-8,y-14);c.lineTo(x+8,y+14);c.moveTo(x+8,y-14);c.lineTo(x-8,y+14);c.stroke()};
  const L=(x,y)=>{c.strokeStyle='#a855f7';c.lineWidth=5;c.beginPath();c.moveTo(x-4,y-13);c.lineTo(x+4,y+13);c.stroke()};
  const nuc=(x,y,r)=>{c.fillStyle='rgba(167,139,250,.45)';c.strokeStyle='#7c3aed';c.lineWidth=3;c.beginPath();c.arc(x,y,r,0,7);c.fill();c.stroke();c.fillStyle='#6d28d9';for(let k=0;k<9;k++){c.beginPath();c.arc(x+Math.cos(k*2.1)*r*.5,y+Math.sin(k*2.1)*r*.5,4,0,7);c.fill()}};
  const ys=[110,150,190,230];
  if(s==4){cell(205,175,115,120);cell(435,175,115,120);nuc(205,175,50);nuc(435,175,50)}
  else{cell(320,175,250,145);
   if(s==0)nuc(320,175,70);
   if(s==1)[[270,140],[360,165],[290,215],[380,225]].forEach(([x,y],k)=>X(x+j*(k%2?1:-1),y));
   if(s>=2){c.strokeStyle='#94a3b8';c.lineWidth=1;[110,530].forEach(px=>ys.forEach(y=>{c.beginPath();c.moveTo(px,175);c.lineTo(s==2?320:px<300?250:390,y);c.stroke()}))}
   if(s==2)ys.forEach(y=>X(320,y));
   if(s==3)ys.forEach(y=>{L(255,y);L(385,y)})}
  const f=this.info[s],i=bn?2:0;c.fillStyle=fg;c.font='bold 16px system-ui';c.fillText(f[i]+': '+f[i+1],20,345)}}
};
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
let cur='Physics',vals={};
function render(){const L=labs[cur];ctx.clearRect(0,0,W,H);ctx.font='14px system-ui';ctx.fillStyle=getComputedStyle(document.body).color;L.draw(ctx,vals)}
let bn=false;
const TN={Physics:['🎯 Projectile','🎯 প্রক্ষেপণ'],Circuit:['⚡ Circuit','⚡ সার্কিট'],Waves:['🌊 Waves','🌊 তরঙ্গ'],Chemistry:['💥 Collision','💥 সংঘর্ষ'],Titration:['⚗️ Titration','⚗️ টাইট্রেশন'],Molecule:['🧪 Molecule 3D','🧪 অণু 3D'],Math:['📈 Sine','📈 সাইন'],Calculus:['∫ Calculus','∫ ক্যালকুলাস'],Biology:['🧬 Punnett','🧬 পানেট'],Cell:['🔬 Cell','🔬 কোষ'],DNA:['🧬 DNA','🧬 ডিএনএ'],Mitosis:['🔬 Mitosis','🔬 মাইটোসিস']};
const BN={
Physics:{t:'প্রক্ষেপক গতি',e:'অনুভূমিক বেগ ধ্রুবক থাকে আর অভিকর্ষ উল্লম্ব বেগ কমায়। পাল্লা R = v²·sin(2θ)/g, তাই ৪৫° কোণে পাল্লা সবচেয়ে বেশি।',q:['সর্বোচ্চ পাল্লার জন্য কোণ কত?','৪৫°'],c:['কোণ (°)','গতি (m/s)','অভিকর্ষ (m/s²)']},
Circuit:{t:'ওহমের সূত্র: সার্কিট',e:'ভোল্টেজ বাড়ালে কারেন্ট বাড়ে, রেজিস্ট্যান্স বাড়ালে কারেন্ট কমে। I = V/R। কারেন্ট বেশি হলে বাল্ব উজ্জ্বল জ্বলে আর নীল ইলেকট্রন দ্রুত চলে।',q:['V = 6 V, R = 3 Ω হলে I কত?','২ A'],c:['ভোল্টেজ (V)','রেজিস্ট্যান্স (Ω)']},
Chemistry:{t:'সংঘর্ষ তত্ত্ব: বিকারে বিক্রিয়া',e:'নীল (A) ও লাল (B) কণা যথেষ্ট শক্তিতে ধাক্কা খেলে সবুজ (C) তৈরি হয়। তাপ দিলে কণা দ্রুত চলে, তাই বেশি সংঘর্ষ সফল হয়। সক্রিয়করণ শক্তি বেশি হলে বিক্রিয়া ধীর হয়।',q:['তাপ দিলে বিক্রিয়া দ্রুত হয় কেন?','বেশি কণা যথেষ্ট শক্তিতে ধাক্কা খায়'],c:['সক্রিয়করণ শক্তি (kJ/mol)','হিটার তাপমাত্রা (K)']},
Titration:{t:'অ্যাসিড-ক্ষার টাইট্রেশন',e:'২৫ mL ০.১ M HCl এ NaOH মেশালে pH আস্তে বাড়ে, সমতা বিন্দুতে (২৫ mL) হঠাৎ লাফ দেয়। ফেনলফথ্যালিন pH ৮.২ এর পর গোলাপি হয়ে শেষ বিন্দু বোঝায়।',q:['শক্তিশালী অ্যাসিড-ক্ষারের সমতা বিন্দুতে pH কত?','৭'],c:['NaOH যোগ (mL)']},
Math:{t:'ফাংশন গ্রাফ: y = a·sin(bx + c)',e:'a তরঙ্গকে উপর-নিচে বাড়ায়, b তরঙ্গকে সংকুচিত করে (পর্যায় = 2π/b), c তরঙ্গকে ডানে-বামে সরায়।',q:['b = 2 হলে পর্যায়কাল কত?','π'],c:['বিস্তার a','কম্পাঙ্ক b','দশা c']},
Biology:{t:'জিনতত্ত্ব: পানেট স্কয়ার',e:'প্রতিটি প্যারেন্ট একটি অ্যালিল দেয়। Aa × Aa এ ২৫% AA, ৫০% Aa, ২৫% aa হয়, অর্থাৎ প্রকট:প্রচ্ছন্ন = ৩:১।',q:['Aa × Aa এ aa সন্তানের সম্ভাবনা?','২৫%'],c:['প্যারেন্ট ১ এ প্রভাবী অ্যালিল (A)','প্যারেন্ট ২ এ প্রভাবী অ্যালিল (A)']},
Cell:{t:'কোষের অঙ্গাণু',e:'স্লাইডার দিয়ে অঙ্গাণু (০–৪) বেছে নাও, জ্বলজ্বল করা অংশটি তোমার বাছাই। নিউক্লিয়াসে DNA থাকে, মাইটোকন্ড্রিয়া শক্তি বানায়, গলজি প্রোটিন প্যাক করে, লাইসোজোম বর্জ্য হজম করে, রাইবোসোম প্রোটিন তৈরি করে।',q:['কোষের পাওয়ারহাউস কোন অঙ্গাণু?','মাইটোকন্ড্রিয়া'],c:['অঙ্গাণু (০-৪)']},
Waves:{t:'তরঙ্গ ও উপরিপাতন',e:'দুটি তরঙ্গ মিললে তাদের সরণ যোগ হয় (উপরিপাতন)। কম্পাঙ্ক ও বিস্তার বদলে দেখো যোগফল তরঙ্গের আকার কীভাবে বদলায়।',q:['দুটি সমান তরঙ্গ এক ফেজে মিললে বিস্তার কত হয়?','দ্বিগুণ'],c:['তরঙ্গ ১ কম্পাঙ্ক','তরঙ্গ ২ কম্পাঙ্ক','বিস্তার']},
Calculus:{t:'অন্তরীকরণ: স্পর্শকের ঢাল',e:'লাল ছেদক রেখা h দূরত্বের দুটি বিন্দু জোড়ে। h ছোট করলে এর ঢাল সবুজ স্পর্শকের ঢালের কাছে যায়, এটাই অন্তরজ f′(x)।',q:['অন্তরজ কী মাপে?','স্পর্শকের ঢাল বা পরিবর্তনের হার'],c:['বিন্দু x','ধাপ h']},
Molecule:{t:'অণুর আকৃতি (3D)',e:'ইলেকট্রন জোড়ের বিকর্ষণে অণু নির্দিষ্ট ত্রিমাত্রিক আকার নেয়: পানি বাঁকা, মিথেন চতুস্তলকীয়, CO₂ রৈখিক।',q:['মিথেনের আকৃতি কী?','চতুস্তলকীয়'],c:['অণু (০ পানি, ১ মিথেন, ২ CO₂)','ঘূর্ণন গতি']},
DNA:{t:'ডিএনএ প্রতিলিপন',e:'রেপ্লিকেশন ফর্কে ডিএনএ-র দুই সুতো আলাদা হয় আর প্রতিটি পুরনো সুতো নতুন সঙ্গী তৈরি করে। ফলে দুটি একই ডিএনএ পাওয়া যায়। স্লাইডার টেনে ফর্ক সরাও।',q:['প্রতিলিপনকে অর্ধ-সংরক্ষণশীল বলা হয় কেন?','প্রতিটি নতুন ডিএনএ-তে একটি পুরনো সুতো থাকে'],c:['প্রতিলিপন অগ্রগতি (%)']},
Mitosis:{t:'মাইটোসিস: কোষ বিভাজন',e:'স্লাইডার টেনে ধাপগুলো দেখো: ইন্টারফেজে ডিএনএ কপি হয়, ক্রোমোজোম গুটিয়ে যায়, মাঝখানে সারি বাঁধে, আলাদা হয়, তারপর কোষ দুই ভাগ হয়।',q:['কোন ধাপে ক্রোমোজোম মাঝখানে সারি বাঁধে?','মেটাফেজ'],c:['ধাপ (০-৪)']}};
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
