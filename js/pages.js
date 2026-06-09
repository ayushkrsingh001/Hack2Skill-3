// Page templates registry
const PAGES = {};

PAGES.home = `
<div class="page" id="page-home">
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-particles" id="particles"></div>
    <div class="container hero-content">
      <div class="hero-text">
        <div class="hero-badge">🌍 AI-Powered Sustainability Platform</div>
        <h1 class="hero-title">Track Your Carbon Footprint. <span class="highlight">Build a Greener Future.</span></h1>
        <p class="hero-subtitle">Measure your environmental impact and discover personalized ways to reduce it with cutting-edge AI insights.</p>
        <div class="hero-buttons">
          <button class="btn btn-primary btn-lg" onclick="showPage('calculator')">🌿 Calculate My Footprint</button>
          <button class="btn btn-secondary btn-lg" onclick="showPage('education')">Learn More →</button>
        </div>
        <div class="hero-stats-mini">
          <div class="hero-stat-item"><h4>50K+</h4><p>Active Users</p></div>
          <div class="hero-stat-item"><h4>2.4M</h4><p>kg CO₂ Saved</p></div>
          <div class="hero-stat-item"><h4>180+</h4><p>Countries</p></div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="earth-container">
          <div class="earth-globe"></div>
          <div class="earth-ring"></div>
          <div class="earth-ring-2"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="stats-section section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-card glass"><div class="stat-icon">🌳</div><div class="stat-number" data-count="125000">0</div><div class="stat-label">Trees Planted</div></div>
        <div class="stat-card glass"><div class="stat-icon">⚡</div><div class="stat-number" data-count="2400">0</div><div class="stat-label">Tons CO₂ Reduced</div></div>
        <div class="stat-card glass"><div class="stat-icon">👥</div><div class="stat-number" data-count="50000">0</div><div class="stat-label">Active Users</div></div>
        <div class="stat-card glass"><div class="stat-icon">🏆</div><div class="stat-number" data-count="180">0</div><div class="stat-label">Countries</div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Powerful Features for a Sustainable Future</h2>
      <p class="section-subtitle">Our AI-driven platform provides everything you need to understand, track, and reduce your environmental impact.</p>
      <div class="features-grid">
        <div class="feature-card glass"><div class="feature-icon">📊</div><h3>Carbon Calculator</h3><p>Calculate your carbon footprint across transportation, energy, and lifestyle with our comprehensive tool.</p></div>
        <div class="feature-card glass"><div class="feature-icon">🤖</div><h3>AI Recommendations</h3><p>Get personalized, actionable tips powered by AI to reduce your environmental impact effectively.</p></div>
        <div class="feature-card glass"><div class="feature-icon">📈</div><h3>Progress Tracking</h3><p>Monitor your sustainability journey with interactive charts, badges, and achievement milestones.</p></div>
        <div class="feature-card glass"><div class="feature-icon">🌍</div><h3>Community Impact</h3><p>Join a global community of eco-conscious individuals and compete in sustainability challenges.</p></div>
        <div class="feature-card glass"><div class="feature-icon">🎮</div><h3>Gamification</h3><p>Earn badges, climb leaderboards, and complete daily challenges to stay motivated on your green journey.</p></div>
        <div class="feature-card glass"><div class="feature-icon">📚</div><h3>Education Hub</h3><p>Access curated articles, infographics, and resources on climate change and sustainable living.</p></div>
      </div>
    </div>
  </section>

  <section class="section" style="background:linear-gradient(135deg,rgba(0,200,83,0.03),rgba(0,229,255,0.03))">
    <div class="container">
      <h2 class="section-title">What Our Users Say</h2>
      <p class="section-subtitle">Join thousands of people who are already making a difference with EcoTrack AI.</p>
      <div class="testimonials-grid">
        <div class="testimonial-card glass"><div class="testimonial-stars">★★★★★</div><p class="testimonial-text">"EcoTrack AI completely changed how I think about my daily habits. I've reduced my carbon footprint by 35% in just 3 months!"</p><div class="testimonial-author"><div class="testimonial-avatar">SK</div><div><div class="testimonial-name">Sarah K.</div><div class="testimonial-role">Environmental Scientist</div></div></div></div>
        <div class="testimonial-card glass"><div class="testimonial-stars">★★★★★</div><p class="testimonial-text">"The AI recommendations are incredibly specific and easy to follow. It's like having a personal sustainability coach in your pocket."</p><div class="testimonial-author"><div class="testimonial-avatar">MR</div><div><div class="testimonial-name">Marcus R.</div><div class="testimonial-role">Software Engineer</div></div></div></div>
        <div class="testimonial-card glass"><div class="testimonial-stars">★★★★★</div><p class="testimonial-text">"Our family uses EcoTrack AI together. The gamification features keep our kids engaged and excited about helping the planet!"</p><div class="testimonial-author"><div class="testimonial-avatar">JL</div><div><div class="testimonial-name">Jennifer L.</div><div class="testimonial-role">Parent & Educator</div></div></div></div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo"><span><span class="logo-eco">Eco</span><span class="logo-track">Track</span><span class="logo-ai"> AI</span></span></div>
          <p>Empowering individuals to make sustainable choices through AI-driven insights and community action.</p>
          <div class="footer-socials">
            <a class="footer-social-link" href="#" aria-label="Twitter" rel="noopener noreferrer">𝕏</a>
            <a class="footer-social-link" href="#" aria-label="LinkedIn" rel="noopener noreferrer">in</a>
            <a class="footer-social-link" href="#" aria-label="Facebook" rel="noopener noreferrer">📘</a>
            <a class="footer-social-link" href="#" aria-label="Instagram" rel="noopener noreferrer">📸</a>
          </div>
        </div>
        <div class="footer-column"><h4>Product</h4><a href="#calculator" onclick="showPage('calculator')">Calculator</a><a href="#dashboard" onclick="showPage('dashboard')">Dashboard</a><a href="#recommendations" onclick="showPage('recommendations')">AI Tips</a><a href="#community" onclick="showPage('community')">Community</a></div>
        <div class="footer-column"><h4>Resources</h4><a href="#education" onclick="showPage('education')">Education</a><a href="#">Blog</a><a href="#">API Docs</a><a href="#">Help Center</a></div>
        <div class="footer-column"><h4>Company</h4><a href="#">About</a><a href="#">Careers</a><a href="#contact" onclick="showPage('contact')">Contact</a><a href="#">Privacy</a></div>
      </div>
      <div class="footer-bottom"><span>© 2026 EcoTrack AI. All rights reserved.</span><span>Made with 💚 for Planet Earth</span></div>
    </div>
  </footer>
</div>`;
