function getTimeTheme() {
  const h = new Date().getHours();
  return (h >= 7 && h < 19) ? 'light' : 'dark';
}

function setTheme(t) {
  document.documentElement.dataset.theme = t;
  document.getElementById('lightBtn').classList.toggle('active', t === 'light');
  document.getElementById('darkBtn').classList.toggle('active', t === 'dark');
  localStorage.setItem('theme', t);
  redrawCanvas();
}

function setLang(l) {
  document.getElementById('enBtn').classList.toggle('active', l === 'en');
  document.getElementById('ptBtn').classList.toggle('active', l === 'pt');
  localStorage.setItem('lang', l);

  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (val !== null) el.innerHTML = val;
  });
}

const savedTheme = localStorage.getItem('theme') || getTimeTheme();
setTheme(savedTheme);

const savedLang = localStorage.getItem('lang') || 'en';
setLang(savedLang);

const names = ['Guylherme', 'a dev', 'a QA', 'Guylherme'];
let ni = 0, ci = 0, deleting = false;

function typeLoop() {
  const el = document.getElementById('typedName');
  if (!el) return;
  const word = names[ni];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; return setTimeout(typeLoop, 1600); }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ni = (ni + 1) % names.length; return setTimeout(typeLoop, 300); }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    const nav = document.getElementById('nav');

    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

const indicator = document.getElementById('navIndicator');

function moveIndicator(el) {
  if (!el || !indicator) return;

  const parent = el.parentElement;
  const container = document.querySelector('.nav-links');

  const top = parent.offsetTop;
  const height = parent.offsetHeight;

  indicator.style.top = top + 'px';
  indicator.style.height = height + 'px';
  indicator.style.opacity = 1;
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    moveIndicator(link);
  });
});

window.addEventListener('scroll', () => {
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) moveIndicator(activeLink);
});

window.addEventListener('load', () => {
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) moveIndicator(activeLink);
});

function toggleDropdown(id) {
  document.getElementById(id).classList.toggle('open');
}

document.getElementById('hamburger').addEventListener('click', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('open');

  document.body.classList.toggle('nav-open');
});

const sections = ['home', 'projects', 'about'];
const dots = [];

function buildDots() {
  const container = document.getElementById('scrollDots');
  sections.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'scroll-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => scrollTo(s);
    container.appendChild(d);
    dots.push(d);
  });
}
buildDots();

const projectFilterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function setProjectFilter(filter) {
  projectFilterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  projectCards.forEach(card => {
    const tags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
    const visible = filter === 'all' || tags.includes(filter);
    card.classList.toggle('hidden', !visible);
  });
}

projectFilterButtons.forEach(button => {
  button.addEventListener('click', () => setProjectFilter(button.dataset.filter));
});

setProjectFilter('all');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 3;
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY - window.innerHeight / 3) {
      dots.forEach(d => d.classList.remove('active'));
      dots[i].classList.add('active');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) el.classList.add('visible');
  });
});

setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], lines = [], RAF;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - .5) * .4;
    this.vy = (Math.random() - .5) * .4;
    this.size = Math.random() * 2 + .5;
    this.alpha = Math.random() * .6 + .2;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function getAccentColor() {
  const t = document.documentElement.dataset.theme;

  return t === 'dark'
    ? [124, 58, 237]
    : [59, 130, 246];
}

function redrawCanvas() { }

function animate() {
  RAF = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, W, H);
  const [r, g, b] = getAccentColor();

  particles.forEach(p => {
    p.update();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * .5})`;
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / 120) * .12})`;
        ctx.lineWidth = .8;
        ctx.stroke();
      }
    }
  }
}
animate();