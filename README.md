# EcoTrack AI

**EcoTrack AI** is a comprehensive, AI-powered carbon footprint tracking platform designed to help individuals understand, track, and reduce their environmental impact through logical decision-making and personalized, actionable insights.

![EcoTrack AI](https://via.placeholder.com/1200x600.png?text=EcoTrack+AI+Platform)

---

## 🏆 Hackathon Evaluation Checklist

### ✔ Completed Features
- **Smart Dynamic Assistant**: Context-aware AI chat that stores user history and gives tailored advice.
- **Logical Decision-Making**: Dynamic recommendation engine that identifies the user's highest emission sources (Transport, Energy, Lifestyle) and prioritizes actionable steps.
- **Real-World Usability**: Practical recommendations with estimated CO₂ reduction and monetary savings.
- **Carbon Footprint Calculator**: Interactive sliders with live visual updates (SVG ring).
- **Personal Dashboard**: Analytics, canvas charts (line and donut), goal tracking, and gamification (badges, points).
- **Community Impact**: Leaderboards, community counters, and active group challenges.
- **Education Hub**: Curated articles and a fully functional FAQ accordion.
- **Modern UI/UX**: Responsive design, glassmorphism, dark/light mode toggle, custom animations.
- **Security & Efficiency**: Input sanitization for chat, optimized rendering, no heavy external libraries.

### 🚀 Recommended Future Improvements
- **Backend Integration**: Connect to a real database (e.g., Firebase, Supabase) for cross-device syncing.
- **Live APIs**: Integrate with live energy grid APIs or vehicle emission databases for higher accuracy.
- **Machine Learning Model**: Train a custom model on user data for predictive sustainability trends.

---

## 📖 Project Overview

### Chosen Challenge Vertical
**Sustainability & Climate Action**

### Problem Statement
Most people want to reduce their carbon footprint but lack actionable, personalized guidance. Generic advice is often overwhelming or impractical, leading to inaction.

### Solution Approach
EcoTrack AI solves this by calculating precise emissions across three key areas—Transport, Energy, and Lifestyle. It then uses a logical AI engine to identify the largest emission source and generates a targeted, prioritized action plan.

### AI Logic Used
The **EcoTrack AIEngine** (`js/ai-engine.js`) operates on a rule-based expert system:
1. **Data Ingestion**: Parses real-time inputs from the calculator.
2. **Analysis**: Evaluates the highest contributing category (e.g., Transport vs. Energy).
3. **Reasoning Engine**: Selects the top 5 most impactful actions, calculates estimated CO₂ and monetary savings, and provides explicit reasoning for why the action was recommended.
4. **Contextual Chat**: The floating AI assistant tailors its responses based on the user's highest emission source and chat history.

### System Architecture
- **Frontend**: Vanilla HTML5, CSS3 (CSS Custom Properties, Glassmorphism), JavaScript (ES6+).
- **State Management**: LocalStorage for persisting user profiles, themes, and footprint data.
- **Routing**: Single Page Application (SPA) architecture via dynamic DOM manipulation.

---

## ⚙️ Features

*   **Dynamic Calculator**: Real-time CO₂ score generation.
*   **AI Recommendations**: Targeted suggestions with reasoning and impact estimates.
*   **Gamification**: Earn badges, eco-points, and compete on the global leaderboard.
*   **Data Visualization**: Custom HTML5 Canvas charts showing weekly trends and emission sources.
*   **Smart Assistant**: Floating chat widget for on-the-fly sustainability questions.

---

## 🛠️ Installation & Usage

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- (Optional) A local development server like VS Code Live Server, Python `http.server`, or Node `serve`.

### Setup Instructions
1. Clone the repository or extract the project folder.
2. Navigate to the project root directory.
3. Open `index.html` directly in your browser, or run a local server:
   ```bash
   npx serve .
   ```
4. Access the platform at `http://localhost:3000` (if using a local server).

### Usage Guide
1. **Calculate**: Start by clicking "Calculate My Footprint" and use the sliders to input your weekly habits.
2. **Review Dashboard**: See your overall score, charts, and unlocked badges.
3. **Get Recommendations**: Navigate to the "AI Tips" page to view your dynamically generated action plan.
4. **Chat**: Click the floating 💬 icon to ask the AI assistant specific questions about sustainability.

---

## 📌 Assumptions & Constraints
- The current version relies on standard EPA/IPCC emission factors (e.g., 0.000404 tons/mile for cars) embedded in the client-side logic.
- User data is stored locally in the browser (`localStorage`). Clearing browser data will reset progress.

## 🌟 Bonus Features Implemented
- Sustainability Score (0-100 visual meter)
- Personalized Carbon Reduction Action Plan
- Achievement Badges & Streaks
- Eco Challenges Timer
- Community Leaderboard

---
*Developed for the Hack2Skill Hackathon.*
