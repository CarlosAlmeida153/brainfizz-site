document.addEventListener('DOMContentLoaded', () => {

  // ==== Partículas ====
  const canvas = document.createElement('canvas');
  canvas.id="particleCanvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for(let i=0;i<150;i++){
    particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5});
  }

  function drawParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(56,189,248,0.5)';
      ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.x>canvas.width)p.x=0;
      if(p.x<0)p.x=canvas.width;
      if(p.y>canvas.height)p.y=0;
      if(p.y<0)p.y=canvas.height;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
  window.addEventListener('resize', ()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

  // ==== Hero animation ====
  anime.timeline({loop:false})
  .add({targets:'.hero',translateY:[40,0],opacity:[0,1],duration:1500,easing:'easeOutExpo'})
  .add({targets:'.hero h1',translateY:[-30,0],opacity:[0,1],duration:1200,easing:'easeOutExpo'},'-=1000')
  .add({targets:'.hero p',translateY:[-20,0],opacity:[0,1],duration:1200,easing:'easeOutExpo'},'-=1000');

  // ==== Nav links animation ====
  anime({targets:'nav a',translateY:[-20,0],opacity:[0,1],delay: anime.stagger(200),duration:1200,easing:'easeOutElastic(1,.8)'});

  // ==== Scroll animations ====
  function animateOnScroll(el, options = {}) {
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          anime({targets: entry.target,translateY:[50,0],opacity:[0,1],duration: options.duration || 1500,easing: options.easing || 'easeOutExpo',delay: options.delay || 0});
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.2});
    observer.observe(el);
  }
  document.querySelectorAll('section, .card, h1, h2, h3, p, li').forEach(el=>animateOnScroll(el,{duration:1500}));

  // ==== Glow pulsante ====
  anime({targets:'.hero h1, .hero p, .card',textShadow:[{value:'0 0 20px #1db4f5'},{value:'0 0 100px #acacac'}],duration:2500,direction:'alternate',loop:true});

});
