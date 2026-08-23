/* ============================================
   CAMPO DE ESTRELLAS — canvas de fondo persistente
   ============================================ */
(function(){
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w, h, stars = [];
  const STAR_COUNT_BASE = 140;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeStars(){
    const count = Math.min(STAR_COUNT_BASE, Math.floor((w * h) / 9000));
    stars = [];
    for(let i = 0; i < count; i++){
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        parallax: Math.random() * 0.35 + 0.05,
        color: Math.random() > 0.88 ? '247,197,216' : '244,241,255'
      });
    }
  }

  let scrollY = 0;
  function draw(t){
    ctx.clearRect(0, 0, w, h);
    for(const s of stars){
      const offsetY = (s.y + scrollY * s.parallax) % (h + 100);
      const alpha = reduceMotion
        ? s.baseAlpha
        : s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.25;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${s.color},${Math.max(0, alpha)})`;
      ctx.arc(s.x, offsetY, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if(!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); makeStars(); });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  resize();
  makeStars();
  if(reduceMotion){
    draw(0);
  } else {
    requestAnimationFrame(draw);
  }
})();
