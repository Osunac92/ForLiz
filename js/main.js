/* ============================================
   CONFIG — editá esta parte con tus datos
   ============================================ */
const CONFIG = {
  // Fecha de inicio para el contador (año, mes-1, día, hora, min)
  startDate: new Date(2026, 7, 15, 0, 0, 0), // 15 de agosto (este año)

  // Fotos: poné los archivos dentro de la carpeta /fotos y listalos acá.
  // Si el archivo no existe, se muestra un corazón de relleno (no rompe nada).
  photos: [
    { src: 'fotos/foto1.jpg', caption: 'mi duende de ciudad' },
    { src: 'fotos/foto2.jpg', caption: 'la carita que me enamoró' },
    { src: 'fotos/foto3.jpg', caption: 'mi reina' },
    { src: 'fotos/foto4.jpg', caption: 'hasta tus celos, los amo' },
    { src: 'fotos/foto5.jpg', caption: 'mi vida entera' }
  ],

  // Frase secreta que se arma tocando las estrellas de la escena 6
  hiddenPhrase: 'TE AMO LIZ, MI VIDA ENTERA'
};

/* ============================================
   PROGRESS BAR
   ============================================ */
const progressFill = document.getElementById('progress-fill');
function updateProgress(){
  const scrolled = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (scrolled / max) * 100 : 0;
  progressFill.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ============================================
   SCROLL REVEAL — Intersection Observer
   ============================================ */
const revealTargets = document.querySelectorAll('.scene-content, .final-content');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.25 });
revealTargets.forEach(el => revealObserver.observe(el));

/* Big bang trigger en escena origin */
const bigbang = document.getElementById('bigbang');
const bigbangObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      bigbang.classList.add('trigger');
      bigbangObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
bigbangObserver.observe(document.getElementById('scene-origin'));

/* ============================================
   OPENING SPARK — colocarlo en el centro del hero
   ============================================ */
const spark = document.getElementById('ignite-spark');
spark.style.left = '50%';
spark.style.top = '38%';

/* ============================================
   CONSTELACIÓN J + L
   ============================================ */
(function buildConstellation(){
  const svg = document.getElementById('constellation-svg');
  const ns = 'http://www.w3.org/2000/svg';

  // Puntos para dibujar una J y una L estilizadas, unidas por un corazón sutil en medio.
  // Coordenadas en un viewBox de 800x500.
  const pointsJ = [
    [150,120],[150,220],[150,300],[130,340],[90,340],[60,320]
  ];
  const pointsL = [
    [650,120],[650,260],[650,340],[720,340]
  ];
  const bridge = [
    [230,300],[300,360],[380,260],[460,360],[540,300]
  ]; // pequeño puente en forma de corazón entre J y L

  function addPath(points, delay){
    const path = document.createElementNS(ns, 'path');
    const d = points.map((p,i) => (i===0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
    path.setAttribute('d', d);
    path.setAttribute('class', 'const-line');
    svg.appendChild(path);
    setTimeout(() => path.classList.add('draw'), delay);
    return points;
  }

  function addDots(points, delayStart, stagger){
    points.forEach((p, i) => {
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', p[0]);
      c.setAttribute('cy', p[1]);
      c.setAttribute('r', 5);
      c.setAttribute('class', 'const-dot');
      svg.appendChild(c);
      setTimeout(() => c.classList.add('show'), delayStart + i * stagger);
    });
  }

  const label = document.createElementNS(ns, 'text');
  label.setAttribute('x', '400');
  label.setAttribute('y', '450');
  label.setAttribute('class', 'const-label');
  label.textContent = 'J + L';
  svg.appendChild(label);

  const constObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        addPath(pointsJ, 100);
        addPath(pointsL, 100);
        addPath(bridge, 500);
        addDots([...pointsJ, ...pointsL, ...bridge], 200, 90);
        setTimeout(() => label.classList.add('show'), 2200);
        constObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });
  constObserver.observe(document.getElementById('scene-constellation'));
})();

/* ============================================
   GALERÍA ORBITAL DE FOTOS
   ============================================ */
(function buildOrbit(){
  const field = document.getElementById('orbit-field');
  const positions = [
    { top: '2%',  left: '4%'  },
    { top: '4%',  left: '54%' },
    { top: '34%', left: '26%' },
    { top: '62%', left: '2%'  },
    { top: '64%', left: '56%' }
  ];

  CONFIG.photos.forEach((photo, i) => {
    const pos = positions[i % positions.length];
    const div = document.createElement('div');
    div.className = 'orbit-photo';
    div.style.top = pos.top;
    div.style.left = pos.left;
    div.style.transitionDelay = (i * 0.12) + 's';

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption;
    img.loading = 'lazy';
    img.onerror = function(){
      div.innerHTML = `<div class="fallback">♡<br>${photo.caption}</div>`;
    };
    div.appendChild(img);

    div.addEventListener('click', () => openPhotoModal(photo));
    field.appendChild(div);
  });

  const orbitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        field.querySelectorAll('.orbit-photo').forEach(el => el.classList.add('show'));
        orbitObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  orbitObserver.observe(field);
})();

const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('photo-modal-img');
const modalCaption = document.getElementById('photo-modal-caption');
document.getElementById('photo-modal-close').addEventListener('click', closePhotoModal);
modal.addEventListener('click', (e) => { if(e.target === modal) closePhotoModal(); });

function openPhotoModal(photo){
  modalImg.src = photo.src;
  modalImg.alt = photo.caption;
  modalCaption.textContent = photo.caption;
  modal.classList.add('open');
}
function closePhotoModal(){
  modal.classList.remove('open');
}

/* ============================================
   CONTADOR EN VIVO
   ============================================ */
(function runCounter(){
  const elDays = document.getElementById('c-days');
  const elHours = document.getElementById('c-hours');
  const elMins = document.getElementById('c-mins');
  const elSecs = document.getElementById('c-secs');

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const now = new Date();
    let diff = now - CONFIG.startDate;
    if(diff < 0) diff = 0;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
})();

/* ============================================
   CORAZÓN CRECIENTE — toca para agrandarlo
   ============================================ */
(function buildGrowHeart(){
  const heart = document.getElementById('grow-heart');
  const messageEl = document.getElementById('grow-heart-message');

  const MAX_TAPS = 12;       // toques necesarios para llegar al tamaño máximo
  const MIN_SCALE = 1;
  const MAX_SCALE = 3.4;
  const FINAL_MESSAGE = 'Cuida mi corazón, te lo entrego sin miedo.';

  let taps = 0;
  let revealed = false;

  heart.addEventListener('click', () => {
    if(revealed) return;
    taps = Math.min(taps + 1, MAX_TAPS);

    const progress = taps / MAX_TAPS;
    const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress;
    heart.style.transform = `scale(${scale})`;

    if(taps >= MAX_TAPS){
      revealed = true;
      const shape = heart.querySelector('.grow-heart-shape');
      if(shape) shape.style.animation = 'none';
      setTimeout(() => {
        messageEl.textContent = FINAL_MESSAGE;
        messageEl.classList.add('show');
      }, 300);
    }
  });
})();


(function buildHiddenMessage(){
  const field = document.getElementById('hidden-field');
  const revealEl = document.getElementById('revealed-phrase');
  const words = CONFIG.hiddenPhrase.split(' ');

  // posiciones dispersas dentro del campo
  const positions = [];
  const cols = Math.ceil(Math.sqrt(words.length));
  words.forEach((word, i) => {
    positions.push({
      top: (10 + Math.random() * 75) + '%',
      left: (6 + (i % cols) * (85 / cols) + Math.random() * 8) + '%'
    });
  });

  const revealedWords = new Array(words.length).fill(null);

  words.forEach((word, i) => {
    const star = document.createElement('div');
    star.className = 'hidden-star';
    star.style.top = positions[i].top;
    star.style.left = positions[i].left;
    star.style.animationDelay = (Math.random() * 2) + 's';
    star.setAttribute('role', 'button');
    star.setAttribute('aria-label', 'Estrella secreta');

    star.addEventListener('click', () => {
      if(star.classList.contains('found')) return;
      star.classList.add('found');
      revealedWords[i] = word;
      renderPhrase();
    });

    field.appendChild(star);
  });

  function renderPhrase(){
    revealEl.textContent = revealedWords.filter(Boolean).join(' ');
  }
})();