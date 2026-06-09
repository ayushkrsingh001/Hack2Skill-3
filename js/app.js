// ===== EcoTrack AI - Main Application =====

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  initParticles();
  initNavScroll();
  calcFootprint();
  startChallengeTimer();
});

// ===== Page Navigation =====
function showPage(name) {
  const app = document.getElementById('app');
  const pageContent = PAGES[name];
  if (!pageContent) return;

  // Only render the active page
  const content = pageContent.replace('class="page"', 'class="page active"');
  app.innerHTML = content;

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === name);
  });

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('menuToggle').classList.remove('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Post-render hooks
  setTimeout(() => {
    if (name === 'home') { initParticles(); animateCounters(); }
    if (name === 'community') animateCounters();
    if (name === 'dashboard') drawCharts();
    if (name === 'calculator') calcFootprint();
    if (name === 'recommendations') { renderRecommendations(); startChallengeTimer(); }
    initScrollAnimations();
  }, 100);
}

// ===== Theme Toggle =====
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}
// Load saved theme
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// ===== Mobile Menu =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('menuToggle').classList.toggle('active');
}

// ===== Navbar Scroll Effect =====
function initNavScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== Particles =====
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    p.style.animationDelay = (Math.random() * 6) + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.opacity = 0.1 + Math.random() * 0.3;
    container.appendChild(p);
  }
}

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate-in'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.glass, .stat-card, .feature-card, .article-card').forEach(el => observer.observe(el));
}

// ===== Calculator Logic =====
function switchCalcTab(tab) {
  document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  const panel = document.getElementById('panel-' + tab);
  if (panel) panel.classList.add('active');
}

function updateRange(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function calcFootprint() {
  const g = id => { const e = document.getElementById(id); return e ? parseFloat(e.textContent || 0) : 0; };
  const car = g('carVal') * 52 * 0.000404;
  const transit = g('transitVal') * 12 * 0.00289;
  const flights = g('flightVal') * 0.9;
  const transport = car + transit + flights;

  const elec = g('elecVal') * 12 * 0.000417;
  const gas = g('gasVal') * 12 * 0.005;
  const energy = elec + gas;

  const dietEl = document.getElementById('dietSelect');
  const diet = dietEl ? parseFloat(dietEl.value) : 2.5;
  const shop = g('shopVal') * 12 * 0.0001;
  const waste = g('wasteVal') * 52 * 0.005;
  const lifestyle = diet + shop + waste;

  const total = transport + energy + lifestyle;

  // Update score display
  const scoreNum = document.getElementById('scoreNum');
  if (scoreNum) scoreNum.textContent = total.toFixed(1);

  // Update score ring
  const fill = document.getElementById('scoreFill');
  if (fill) {
    const maxScore = 20;
    const pct = Math.min(total / maxScore, 1);
    fill.style.strokeDashoffset = 502 - (502 * pct);
  }

  // Update breakdown
  const setVal = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v.toFixed(1) + ' t'; };
  setVal('emTransport', transport);
  setVal('emEnergy', energy);
  setVal('emLifestyle', lifestyle);

  const monthly = document.getElementById('monthlyEst');
  const yearly = document.getElementById('yearlyEst');
  if (monthly) monthly.textContent = (total * 1000 / 12).toFixed(0);
  if (yearly) yearly.textContent = total.toFixed(1);

  // Update UI Elements
  if(document.getElementById('scoreNum')) {
    document.getElementById('scoreNum').innerText = total;
  }
  
  // Dashboard Updates
  if(document.getElementById('dashTotalValue')) {
    document.getElementById('dashTotalValue').innerText = total;
  }

  // Update Sustainability Score Ring on Dashboard
  if(document.getElementById('sustainabilityScore') && window.ecoAI) {
    const score = window.ecoAI.userProfile.score || 50;
    document.getElementById('sustainabilityScore').innerText = score;
    // Calculate stroke-dasharray based on score (max is 100, full circumference is 100)
    const ring = document.getElementById('scoreRing');
    if(ring) {
      ring.style.strokeDasharray = \`\${score}, 100\`;
      ring.style.stroke = score > 80 ? 'var(--primary)' : score > 50 ? '#f59e0b' : '#ef4444';
    }
  }

  // Save to AI Engine
  if (window.ecoAI) {
    window.ecoAI.updateFootprint(transport, energy, lifestyle, total);
  }
}

// ===== Charts =====
function drawCharts() {
  drawWeeklyChart();
  drawPieChart();
}

function drawWeeklyChart() {
  const canvas = document.getElementById('weeklyChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);

  const w = rect.width, h = rect.height;
  const data = [85, 72, 90, 65, 78, 55, 60];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = 100;
  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  // Grid
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(0,0,0,0.08)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (ch / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#8a9bab';
    ctx.font = '11px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(max - (max / 4) * i) + ' kg', pad.left - 8, y + 4);
  }

  // Gradient fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  grad.addColorStop(0, 'rgba(0,200,83,0.3)');
  grad.addColorStop(1, 'rgba(0,200,83,0)');
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad.left + (cw / (data.length - 1)) * i;
    const y = pad.top + ch - (v / max) * ch;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(pad.left + cw, pad.top + ch);
  ctx.lineTo(pad.left, pad.top + ch);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  const lineGrad = ctx.createLinearGradient(pad.left, 0, w - pad.right, 0);
  lineGrad.addColorStop(0, '#00c853');
  lineGrad.addColorStop(1, '#0091ea');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad.left + (cw / (data.length - 1)) * i;
    const y = pad.top + ch - (v / max) * ch;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Points & labels
  data.forEach((v, i) => {
    const x = pad.left + (cw / (data.length - 1)) * i;
    const y = pad.top + ch - (v / max) * ch;
    ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#00c853'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#8a9bab';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x, h - pad.bottom + 20);
  });
}

function drawPieChart() {
  const canvas = document.getElementById('pieChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);

  const w = rect.width, h = rect.height;
  const cx = w / 2, cy = h / 2 - 10;
  const r = Math.min(w, h) / 2 - 30;

  const data = [
    { label: 'Transport', value: 40, color: '#00c853' },
    { label: 'Energy', value: 30, color: '#0091ea' },
    { label: 'Diet', value: 20, color: '#00e5ff' },
    { label: 'Other', value: 10, color: '#f59e0b' }
  ];
  const total = data.reduce((s, d) => s + d.value, 0);

  let angle = -Math.PI / 2;
  data.forEach(d => {
    const slice = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();

    // Label
    const mid = angle + slice / 2;
    const lx = cx + (r * 0.65) * Math.cos(mid);
    const ly = cy + (r * 0.65) * Math.sin(mid);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(d.value + '%', lx, ly + 4);

    angle += slice;
  });

  // Center hole (donut)
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim();
  ctx.fillStyle = bgColor.includes('rgba') ? (document.documentElement.dataset.theme === 'dark' ? '#101d35' : '#fff') : '#fff';
  ctx.fill();

  // Legend
  let ly = cy + r + 25;
  ctx.font = '11px Inter';
  data.forEach((d, i) => {
    const lx = (w / 4) * (i) + 20;
    ctx.fillStyle = d.color;
    ctx.fillRect(lx, ly, 10, 10);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#5a6a7a';
    ctx.fillText(d.label, lx + 14, ly + 9);
  });
}

// ===== Chat Assistant =====
function toggleChat() {
  const panel = document.getElementById('chatPanel');
  const btn = document.getElementById('chatToggle');
  panel.classList.toggle('open');
  btn.classList.toggle('active');
  btn.textContent = panel.classList.contains('open') ? '✕' : '💬';
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const text = input.value.trim();
  if (!text) return;

  // XSS Prevention / Input Sanitization
  const sanitizedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  messages.innerHTML += `<div class="chat-msg user"><div class="chat-bubble">${sanitizedText}</div></div>`;
  input.value = '';

  // Get dynamic contextual response from AI Engine
  setTimeout(() => {
    const reply = window.ecoAI ? window.ecoAI.getChatResponse(text) : "I am currently offline.";
    messages.innerHTML += `<div class="chat-msg bot"><div class="chat-bubble">${reply}</div></div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 800);
  messages.scrollTop = messages.scrollHeight;
}

// ===== Dynamic Recommendations =====
function renderRecommendations() {
  const container = document.getElementById('ai-recommendations-list');
  if (!container || !window.ecoAI) return;

  const recs = window.ecoAI.getRecommendations();
  container.innerHTML = '';

  recs.forEach(rec => {
    let badgeClass = rec.difficulty === 'Easy' ? 'badge-green' : rec.difficulty === 'Medium' ? 'badge-blue' : 'badge-accent';

    container.innerHTML += `
      <div class="rec-card glass">
        <div class="rec-header">
          <div class="rec-icon" style="background:${rec.iconBg}">${rec.icon}</div>
          <div style="flex:1">
            <div style="display:flex; justify-content:space-between; align-items:center;">
               <h3 style="margin:0">${rec.title}</h3>
               <span class="badge ${badgeClass}" style="padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; border: 1px solid currentColor;">${rec.difficulty}</span>
            </div>
            <span class="rec-category">${rec.category}</span>
          </div>
        </div>
        <p><strong>AI Reasoning:</strong> ${rec.reasoning}</p>
        <p><strong>Action:</strong> ${rec.action}</p>
        <div style="display: flex; gap: 15px; margin-top: 10px;">
          <div class="rec-impact" style="color: var(--primary);">🌿 Saves ${rec.impactCO2}t CO₂/yr</div>
          <div class="rec-impact" style="color: var(--secondary);">💰 Saves $${rec.impactMoney}/yr</div>
        </div>
      </div>
    `;
  });

  // Render Roadmap
  const roadmapContainer = document.getElementById('aiRoadmap');
  if (roadmapContainer && window.ecoAI.userProfile.roadmap) {
    const rm = window.ecoAI.userProfile.roadmap;
    roadmapContainer.innerHTML = `
      <div style="margin-bottom: 10px;"><strong>30 Days:</strong> ${rm.plan30Day}</div>
      <div style="margin-bottom: 10px;"><strong>90 Days:</strong> ${rm.plan90Day}</div>
      <div style="margin-bottom: 10px;"><strong>6 Months:</strong> ${rm.plan6Month}</div>
      <div style="color: var(--primary); font-weight: bold; margin-top: 15px;">Target Reduction: ${rm.predictedReduction} tons CO₂/yr</div>
    `;
  }
}

// ===== Auth Modal =====
function openAuth() { document.getElementById('authOverlay').classList.add('open'); }
function closeAuth() { document.getElementById('authOverlay').classList.remove('open'); }
function switchAuth(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.textContent.toLowerCase().includes(tab)));
  document.getElementById('loginForm').classList.toggle('active', tab === 'login');
  document.getElementById('signupForm').classList.toggle('active', tab === 'signup');
}

// ===== FAQ Toggle =====
function toggleFaq(btn) {
  btn.closest('.faq-item').classList.toggle('open');
}

// ===== Challenge Timer =====
function startChallengeTimer() {
  const el = document.getElementById('challengeTimer');
  if (!el) return;
  let secs = 86399;
  function tick() {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    secs--;
    if (secs >= 0) setTimeout(tick, 1000);
  }
  tick();
}

// Close auth on overlay click
document.getElementById('authOverlay')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeAuth();
});
