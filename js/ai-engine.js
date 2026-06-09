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
      footprint: {
        transport: 0,
        energy: 0,
        lifestyle: 0,
        total: 0
      },
      preferences: {},
      history: []
    };
    try {
      const saved = localStorage.getItem('ecotrack_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  }

  saveProfile() {
    localStorage.setItem('ecotrack_profile', JSON.stringify(this.userProfile));
  }

  updateFootprint(transport, energy, lifestyle, total) {
    this.userProfile.footprint = { transport, energy, lifestyle, total };
    this.saveProfile();
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
        reasoning: 'Your transport emissions are your highest contributor. Biking for trips under 5 miles is the most effective way to reduce this quickly.',
        impactCO2: 0.8,
        impactMoney: 350,
        action: 'Start biking twice a week'
      });
      recommendations.push({
        id: 'rec_transport_2',
        title: 'Carpool or Public Transit',
        category: 'Transportation',
        icon: '🚌',
        iconBg: 'rgba(0,145,234,0.15)',
        reasoning: 'Sharing rides or taking transit can cut your commute emissions by 50%.',
        impactCO2: 1.2,
        impactMoney: 500,
        action: 'Use public transit'
      });
    }

    if (highestSource === 'energy' || fp.energy > 4) {
      recommendations.push({
        id: 'rec_energy_1',
        title: 'Switch to LED Lighting',
        category: 'Energy',
        icon: '💡',
        iconBg: 'rgba(245,158,11,0.15)',
        reasoning: 'Your energy usage is high. LEDs use 75% less energy than incandescent bulbs.',
        impactCO2: 0.5,
        impactMoney: 150,
        action: 'Upgrade bulbs'
      });
      recommendations.push({
        id: 'rec_energy_2',
        title: 'Smart Thermostat',
        category: 'Energy',
        icon: '🌡️',
        iconBg: 'rgba(0,229,255,0.15)',
        reasoning: 'Optimizing heating/cooling can significantly lower energy emissions without sacrificing comfort.',
        impactCO2: 0.9,
        impactMoney: 200,
        action: 'Install smart thermostat'
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
        impactCO2: 0.5,
        impactMoney: 100,
        action: 'Plan vegetarian meals'
      });
      recommendations.push({
        id: 'rec_life_2',
        title: 'Buy Second-Hand',
        category: 'Waste',
        icon: '🛍️',
        iconBg: 'rgba(139,92,246,0.15)',
        reasoning: 'Shopping emissions are high. Buying used items reduces manufacturing demand.',
        impactCO2: 0.3,
        impactMoney: 400,
        action: 'Shop thrift stores'
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
        impactCO2: 0.2,
        impactMoney: 50,
        action: 'Cut shower by 2 mins'
      });
    }

    return recommendations.slice(0, 5); // Return top 5
  }

  // Contextual Chat Assistant
  getChatResponse(userInput) {
    const input = userInput.toLowerCase();
    const highestSource = this.getHighestEmissionSource();
    
    this.userProfile.history.push({ role: 'user', content: userInput });
    this.saveProfile();

    let reply = "I'm your EcoTrack AI assistant. I can help you find ways to reduce your footprint!";
    
    // Logic based on highest source and user input
    if (input.includes('how') && input.includes('reduce')) {
      if (highestSource === 'transport') {
        reply = "Based on your calculator results, transportation is your biggest emission source. I recommend focusing on biking for short trips or taking public transit. Would you like a personalized transit plan?";
      } else if (highestSource === 'energy') {
        reply = "Energy use is your largest footprint contributor. Start by upgrading to LED bulbs and adjusting your thermostat. Shall we look at renewable energy providers in your area?";
      } else {
        reply = "Lifestyle choices (like diet and shopping) are your main footprint drivers. Starting with 'Meatless Mondays' is a great first step. Want some vegetarian recipe ideas?";
      }
    } else if (input.includes('yes') || input.includes('sure')) {
      reply = "Great! I've added a new action item to your goals on the Dashboard. Let's tackle this together. 🌱";
    } else if (input.includes('car') || input.includes('drive')) {
      reply = "Driving is a major emissions source. Keeping your tires properly inflated can improve gas mileage by up to 3%, saving money and reducing CO₂!";
    } else if (input.includes('food') || input.includes('diet')) {
      reply = "Food accounts for 10-30% of a household's footprint. Eating locally sourced, seasonal plant-based foods makes the biggest impact.";
    } else {
      const genericReplies = [
        "Did you know? Switching to LED bulbs can reduce your lighting energy use by up to 75%!",
        "Consider this! Fixing a dripping faucet can save up to 3,000 gallons of water per year.",
        "Fun fact! Public transit produces about 45% less CO₂ per mile than a single-occupancy car."
      ];
      reply = genericReplies[Math.floor(Math.random() * genericReplies.length)];
    }

    this.userProfile.history.push({ role: 'assistant', content: reply });
    this.saveProfile();
    return reply;
  }
}

// Global instance
window.ecoAI = new AIEngine();
