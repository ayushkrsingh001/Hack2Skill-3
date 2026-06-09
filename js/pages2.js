// Calculator, Dashboard, Recommendations pages
PAGES.calculator = `
<div class="page" id="page-calculator">
  <section class="calculator-page section">
    <div class="container">
      <h2 class="section-title">Carbon Footprint Calculator</h2>
      <p class="section-subtitle">Estimate your environmental impact across transport, energy, and lifestyle.</p>
      <div class="calculator-layout">
        <div class="calc-form glass">
          <div class="calc-tabs">
            <button class="calc-tab active" onclick="switchCalcTab('transport')">🚗 Transport</button>
            <button class="calc-tab" onclick="switchCalcTab('energy')">⚡ Energy</button>
            <button class="calc-tab" onclick="switchCalcTab('lifestyle')">🛒 Lifestyle</button>
          </div>
          <div class="calc-panel active" id="panel-transport">
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-car">Weekly Car Miles</label><span class="range-value" id="carVal">50</span></div><input type="range" class="range-slider" min="0" max="500" value="50" aria-labelledby="lbl-car" oninput="updateRange('carVal',this.value);calcFootprint()"></div>
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-bike">Weekly Bike Miles</label><span class="range-value" id="bikeVal">10</span></div><input type="range" class="range-slider" min="0" max="200" value="10" aria-labelledby="lbl-bike" oninput="updateRange('bikeVal',this.value);calcFootprint()"></div>
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-transit">Monthly Public Transit Trips</label><span class="range-value" id="transitVal">20</span></div><input type="range" class="range-slider" min="0" max="100" value="20" aria-labelledby="lbl-transit" oninput="updateRange('transitVal',this.value);calcFootprint()"></div>
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-flight">Flights Per Year</label><span class="range-value" id="flightVal">2</span></div><input type="range" class="range-slider" min="0" max="30" value="2" aria-labelledby="lbl-flight" oninput="updateRange('flightVal',this.value);calcFootprint()"></div>
          </div>
          <div class="calc-panel" id="panel-energy">
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-elec">Monthly Electricity (kWh)</label><span class="range-value" id="elecVal">300</span></div><input type="range" class="range-slider" min="0" max="1500" value="300" aria-labelledby="lbl-elec" oninput="updateRange('elecVal',this.value);calcFootprint()"></div>
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-gas">Monthly Gas (therms)</label><span class="range-value" id="gasVal">40</span></div><input type="range" class="range-slider" min="0" max="200" value="40" aria-labelledby="lbl-gas" oninput="updateRange('gasVal',this.value);calcFootprint()"></div>
          </div>
          <div class="calc-panel" id="panel-lifestyle">
            <div class="form-group"><label class="form-label" id="lbl-diet">Diet Type</label><select class="form-select" id="dietSelect" aria-labelledby="lbl-diet" onchange="calcFootprint()"><option value="3.3">Meat Lover</option><option value="2.5" selected>Average</option><option value="1.7">Vegetarian</option><option value="1.0">Vegan</option></select></div>
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-shop">Monthly Shopping Spending ($)</label><span class="range-value" id="shopVal">200</span></div><input type="range" class="range-slider" min="0" max="2000" value="200" aria-labelledby="lbl-shop" oninput="updateRange('shopVal',this.value);calcFootprint()"></div>
            <div class="range-group"><div class="range-header"><label class="form-label" id="lbl-waste">Weekly Waste (bags)</label><span class="range-value" id="wasteVal">2</span></div><input type="range" class="range-slider" min="0" max="10" value="2" aria-labelledby="lbl-waste" oninput="updateRange('wasteVal',this.value);calcFootprint()"></div>
          </div>
          <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var(--space-xl)" onclick="calcFootprint()">🌿 Calculate Footprint</button>
        </div>
        <div class="calc-results glass">
          <div class="results-header"><h3>Your Carbon Score</h3></div>
          <div class="score-meter"><svg viewBox="0 0 180 180"><defs><linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#00c853"/><stop offset="100%" stop-color="#0091ea"/></linearGradient></defs><circle class="score-track" cx="90" cy="90" r="80"/><circle class="score-fill" id="scoreFill" cx="90" cy="90" r="80"/></svg><div class="score-value"><div class="score-number" id="scoreNum">0</div><div class="score-label">tons CO₂/yr</div></div></div>
          <div class="emissions-breakdown">
            <div class="emission-item"><span class="emission-label"><span class="emission-dot" style="background:#00c853"></span>Transport</span><span class="emission-value" id="emTransport">0 t</span></div>
            <div class="emission-item"><span class="emission-label"><span class="emission-dot" style="background:#0091ea"></span>Energy</span><span class="emission-value" id="emEnergy">0 t</span></div>
            <div class="emission-item"><span class="emission-label"><span class="emission-dot" style="background:#00e5ff"></span>Lifestyle</span><span class="emission-value" id="emLifestyle">0 t</span></div>
          </div>
          <div class="estimates-row"><div class="estimate-card"><h4 id="monthlyEst">0</h4><p>Monthly (kg)</p></div><div class="estimate-card"><h4 id="yearlyEst">0</h4><p>Yearly (tons)</p></div></div>
        </div>
      </div>
    </div>
  </section>
</div>`;

PAGES.dashboard = `
<div class="page" id="page-dashboard">
  <section class="dashboard-page section">
    <div class="container">
      <div class="dashboard-header">
        <div class="user-info"><div class="user-avatar">AJ</div><div><div class="user-name">Alex Johnson</div><div class="user-level"><span class="badge badge-green">🌿 Eco Warrior</span> Level 12</div></div></div>
        <button class="btn btn-accent btn-sm">📊 Export Report</button>
      </div>
      <div class="dashboard-grid">
        <div class="dash-stat glass" style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; padding: var(--space-2xl);">
          <div>
            <h3 style="font-family: var(--font-display); font-size: 1.5rem;">Overall Sustainability Score</h3>
            <p style="color: var(--text-secondary); margin-top: 5px;">Based on your Transport, Energy, and Lifestyle metrics.</p>
          </div>
          <div style="position: relative; width: 100px; height: 100px;">
            <svg viewBox="0 0 36 36" style="width:100%; height:100%;">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border)" stroke-width="3"/>
              <path id="scoreRing" stroke-dasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--primary)" stroke-width="3" style="transition: stroke-dasharray 1s ease;"/>
            </svg>
            <div id="sustainabilityScore" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: bold; font-size: 1.5rem; color: var(--primary);">50</div>
          </div>
        </div>
        <div class="dash-stat glass"><div class="dash-stat-icon" style="background:rgba(0,200,83,0.15);color:var(--primary)">🌍</div><h4><span id="dashTotalValue">4.2</span>t</h4><p>Carbon Footprint</p><div class="trend trend-down">↓ 12% from last month</div></div>
        <div class="dash-stat glass"><div class="dash-stat-icon" style="background:rgba(0,145,234,0.15);color:var(--secondary)">⚡</div><h4>780</h4><p>Eco Points</p><div class="trend trend-down">↑ 85 this week</div></div>
        <div class="dash-stat glass"><div class="dash-stat-icon" style="background:rgba(0,229,255,0.15);color:var(--accent)">🏆</div><h4>7/12</h4><p>Badges Earned</p><div class="trend" style="color:var(--accent)">2 in progress</div></div>
        <div class="dash-stat glass"><div class="dash-stat-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b">🎯</div><h4>68%</h4><p>Goal Progress</p><div class="trend trend-down">On track</div></div>
      </div>
      <div class="dash-charts">
        <div class="chart-card glass"><h3>📈 Weekly Carbon Emissions</h3><div class="chart-placeholder"><canvas id="weeklyChart"></canvas></div></div>
        <div class="chart-card glass"><h3>🥧 Emission Sources</h3><div class="chart-placeholder"><canvas id="pieChart"></canvas></div></div>
      </div>
      <div class="badges-section"><h3 class="section-title" style="font-size:1.3rem;margin-bottom:var(--space-lg)">Achievement Badges</h3>
        <div class="badges-grid">
          <div class="badge-item glass"><div class="badge-icon">🌱</div><p>First Step</p></div>
          <div class="badge-item glass"><div class="badge-icon">🚲</div><p>Bike Hero</p></div>
          <div class="badge-item glass"><div class="badge-icon">♻️</div><p>Recycler</p></div>
          <div class="badge-item glass"><div class="badge-icon">💧</div><p>Water Saver</p></div>
          <div class="badge-item glass"><div class="badge-icon">🌿</div><p>Vegan Week</p></div>
          <div class="badge-item glass"><div class="badge-icon">⚡</div><p>Energy Pro</p></div>
          <div class="badge-item glass"><div class="badge-icon">🌍</div><p>Eco Warrior</p></div>
          <div class="badge-item glass locked"><div class="badge-icon">🏔️</div><p>Carbon Neutral</p></div>
          <div class="badge-item glass locked"><div class="badge-icon">🌟</div><p>Influencer</p></div>
          <div class="badge-item glass locked"><div class="badge-icon">💎</div><p>Diamond</p></div>
          <div class="badge-item glass locked"><div class="badge-icon">🦸</div><p>Superhero</p></div>
          <div class="badge-item glass locked"><div class="badge-icon">👑</div><p>Legend</p></div>
        </div>
      </div>
      <div class="goals-card glass"><h3 style="font-family:var(--font-display);font-weight:700;margin-bottom:var(--space-lg)">🎯 Active Goals</h3>
        <div class="goal-item"><div class="goal-header"><span>Reduce car usage by 20%</span><span class="goal-progress">75%</span></div><div class="progress-bar"><div class="progress-fill" style="width:75%"></div></div></div>
        <div class="goal-item"><div class="goal-header"><span>Switch to renewable energy</span><span class="goal-progress">40%</span></div><div class="progress-bar"><div class="progress-fill" style="width:40%"></div></div></div>
        <div class="goal-item"><div class="goal-header"><span>Zero waste for 30 days</span><span class="goal-progress">60%</span></div><div class="progress-bar"><div class="progress-fill" style="width:60%"></div></div></div>
      </div>
    </div>
  </section>
</div>`;

PAGES.recommendations = `
<div class="page" id="page-recommendations">
  <section class="recommendations-page section">
    <div class="container">
      <h2 class="section-title">AI-Powered Recommendations</h2>
      <p class="section-subtitle">Personalized suggestions based on your habits to reduce your carbon footprint.</p>
      <div class="rec-layout">
        <div id="ai-recommendations-list">
          <!-- Populated dynamically by ai-engine.js via renderRecommendations() -->
        </div>
        <div class="challenge-sidebar">
          <div class="glass" style="padding: var(--space-xl); margin-bottom: var(--space-xl); border-top: 4px solid var(--accent);">
            <h3 style="font-family:var(--font-display);font-weight:700">🗺️ Your AI Reduction Roadmap</h3>
            <div id="aiRoadmap" style="margin-top: 15px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              <p>Calculate your footprint to generate your personalized AI Roadmap.</p>
            </div>
          </div>
          <div class="daily-challenge glass"><h3 style="font-family:var(--font-display);font-weight:700">🎯 Daily Challenge</h3><p style="font-size:0.9rem;color:var(--text-secondary);margin:var(--space-md) 0">Take public transit or walk instead of driving today</p><div class="challenge-timer" id="challengeTimer">23:59:59</div><button class="btn btn-primary btn-sm" style="width:100%;justify-content:center">Accept Challenge</button></div>
          <div class="glass" style="padding:var(--space-xl); margin-top: var(--space-xl)"><h3 style="font-family:var(--font-display);font-weight:700;margin-bottom:var(--space-lg)">🔥 Streak</h3><div style="text-align:center"><div style="font-size:2.5rem;font-weight:800;color:var(--primary)">7</div><p style="color:var(--text-muted);font-size:0.85rem">days in a row</p></div></div>
        </div>
      </div>
    </div>
  </section>
</div>`;
