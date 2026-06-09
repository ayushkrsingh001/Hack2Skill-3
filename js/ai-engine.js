/**
 * EcoTrack AI - Intelligence Engine
 * Handles logical decision making, recommendations, and smart assistant functionality.
 */

class AIEngine {
  constructor() {
    this.userProfile = this.loadProfile();
  }

  loadProfile() {
    const defaultProfile = {
      footprint: { transport: 0, energy: 0, lifestyle: 0, total: 0 },
      preferences: {},
      history: [],
      score: 50,
      conversationState: { step: 0, context: 'initial' },
      roadmap: null
    };
    try {
      const saved = localStorage.getItem('ecotrack_profile');
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  }

  saveProfile() {
    localStorage.setItem('ecotrack_profile', JSON.stringify(this.userProfile));
  }

  updateFootprint(transport, energy, lifestyle, total) {
    this.userProfile.footprint = { transport, energy, lifestyle, total };
    this.calculateSustainabilityScore();
    this.generateRoadmap();
    this.saveProfile();
  }

  calculateSustainabilityScore() {
    const fp = this.userProfile.footprint;
    // Base logic: 0 total = 100 score. Avg is around 15 tons/year.
    let score = 100 - (fp.total * 4);
    this.userProfile.score = Math.max(0, Math.min(100, Math.round(score)));
  }

  // Detect the biggest source of carbon emissions
  getHighestEmissionSource() {
    const fp = this.userProfile.footprint;
    let maxSource = 'transport';
    let maxVal = fp.transport;

    if (fp.energy > maxVal) { maxVal = fp.energy; maxSource = 'energy'; }
    if (fp.lifestyle > maxVal) { maxVal = fp.lifestyle; maxSource = 'lifestyle'; }

    return maxSource;
  }

  // Generate personalized recommendations based on logical decision making
  getRecommendations() {
    const highestSource = this.getHighestEmissionSource();
    const fp = this.userProfile.footprint;
    const recommendations = [];

    // Base logical rules
    if (highestSource === 'transport' || fp.transport > 5) {
      recommendations.push({
        id: 'rec_transport_1',
        title: 'Switch to Bike Commuting',
        category: 'Transportation',
        icon: '🚲',
        iconBg: 'rgba(0,200,83,0.15)',
        reasoning: 'Transportation accounts for the majority of your footprint. Biking for short trips under 5 miles is the most effective way to reduce this quickly.',
        impactCO2: 0.8, impactMoney: 350, priority: 'High Priority', action: 'Start biking twice a week'
      });
      recommendations.push({
        id: 'rec_transport_2',
        title: 'Carpool or Public Transit',
        category: 'Transportation',
        icon: '🚌',
        iconBg: 'rgba(0,145,234,0.15)',
        reasoning: 'Sharing rides or taking transit cuts your commute emissions by 50%.',
        impactCO2: 1.2, impactMoney: 500, priority: 'Medium Priority', action: 'Use public transit'
      });
    }

    if (highestSource === 'energy' || fp.energy > 4) {
      recommendations.push({
        id: 'rec_energy_1',
        title: 'Switch to LED Lighting',
        category: 'Energy',
        icon: '💡',
        iconBg: 'rgba(245,158,11,0.15)',
        reasoning: 'Energy usage is high. LEDs use 75% less energy than incandescent bulbs.',
        impactCO2: 0.5, impactMoney: 150, priority: 'High Priority', action: 'Upgrade bulbs'
      });
      recommendations.push({
        id: 'rec_energy_2',
        title: 'Smart Thermostat',
        category: 'Energy',
        icon: '🌡️',
        iconBg: 'rgba(0,229,255,0.15)',
        reasoning: 'Optimizing heating/cooling significantly lowers energy emissions without sacrificing comfort.',
        impactCO2: 0.9, impactMoney: 200, priority: 'Medium Priority', action: 'Install smart thermostat'
      });
    }

    if (highestSource === 'lifestyle' || fp.lifestyle > 3) {
      recommendations.push({
        id: 'rec_life_1',
        title: 'Try Meatless Mondays',
        category: 'Diet',
        icon: '🥗',
        iconBg: 'rgba(0,200,83,0.15)',
        reasoning: 'Diet contributes heavily to your footprint. Reducing meat intake is a fast way to lower it.',
        impactCO2: 0.5, impactMoney: 100, priority: 'High Priority', action: 'Plan vegetarian meals'
      });
      recommendations.push({
        id: 'rec_life_2',
        title: 'Buy Second-Hand',
        category: 'Waste',
        icon: '🛍️',
        iconBg: 'rgba(139,92,246,0.15)',
        reasoning: 'Shopping emissions are high. Buying used items reduces manufacturing demand.',
        impactCO2: 0.3, impactMoney: 400, priority: 'Medium Priority', action: 'Shop thrift stores'
      });
    }

    // Default recommendations if footprint is low
    if (recommendations.length === 0) {
      recommendations.push({
        id: 'rec_default_1',
        title: 'Shorter Showers',
        category: 'Water',
        icon: '🚿',
        iconBg: 'rgba(0,145,234,0.15)',
        reasoning: 'Even with a low footprint, saving hot water reduces energy usage.',
        impactCO2: 0.2, impactMoney: 50, priority: 'Low Priority', action: 'Cut shower by 2 mins'
      });
    }

    return recommendations.slice(0, 5); // Return top 5
  }

  generateRoadmap() {
    this.userProfile.roadmap = {
      plan30Day: "Focus on easy wins: Replace 5 incandescent bulbs with LEDs. Try 1 meatless day per week.",
      plan90Day: "Habit building: Switch 2 commutes per week to public transit or cycling. Reduce food waste by 50%.",
      plan6Month: "Major changes: Consider installing a smart thermostat. Transition to a 50% plant-based diet.",
      predictedReduction: (this.userProfile.footprint.total * 0.25).toFixed(1) // Predict 25% reduction
    };
  }

  // Contextual Chat Assistant with memory
  getChatResponse(userInput) {
    const input = userInput.toLowerCase();
    const highestSource = this.getHighestEmissionSource();
    
    this.userProfile.history.push({ role: 'user', content: userInput });
    
    let reply = "";

    // Context-aware state machine
    if (this.userProfile.conversationState.step === 1) {
      if (input.includes('yes') || input.includes('sure')) {
        reply = "Excellent! I've added this to your 30-Day Plan. Start by looking up transit routes tonight. What's your next biggest concern?";
        this.userProfile.conversationState = { step: 0, context: 'general' };
      } else {
        reply = "No problem. We can look at easier wins. How about trying carpooling or simply ensuring your tires are properly inflated (saves 3% fuel)?";
        this.userProfile.conversationState = { step: 0, context: 'general' };
      }
    } else {
      if (input.includes('car') || input.includes('drive') || input.includes('travel')) {
        reply = "Transportation contributes significantly to your emissions. Would you be able to switch 2 days per week to public transport or biking?";
        this.userProfile.conversationState = { step: 1, context: 'transport_followup' };
      } else if (input.includes('how') && input.includes('reduce')) {
        reply = \`Since \${highestSource} accounts for the largest part of your footprint, let's focus there. Want to see your personalized 30-day reduction roadmap?\`;
      } else if (input.includes('yes') && this.userProfile.roadmap) {
         reply = \`Here is your 30-Day Plan: \${this.userProfile.roadmap.plan30Day}\`;
      } else if (input.includes('plan') || input.includes('roadmap')) {
        this.generateRoadmap();
        reply = \`Your 6-Month Roadmap:\\n\\n30-Day: \${this.userProfile.roadmap.plan30Day}\\n90-Day: \${this.userProfile.roadmap.plan90Day}\\n6-Month: \${this.userProfile.roadmap.plan6Month}\\n\\nEstimated CO₂ reduction: \${this.userProfile.roadmap.predictedReduction} tons.\`;
      } else {
        const genericReplies = [
          "Did you know? Switching to LED bulbs can reduce your lighting energy use by up to 75%!",
          "Consider this! Fixing a dripping faucet can save up to 3,000 gallons of water per year.",
          "Fun fact! Public transit produces about 45% less CO₂ per mile than a single-occupancy car."
        ];
        reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
      }
    }

    this.userProfile.history.push({ role: 'assistant', content: reply });
    this.saveProfile();
    return reply;
  }
}

// Global instance
window.ecoAI = new AIEngine();
