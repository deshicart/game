# Neon Jump

A vertical endless jumping game inspired by Doodle Jump, built with HTML5, JavaScript, and the Phaser.js game engine. Optimized for Android devices and compatible with all modern mobile and desktop browsers.

## Game Concept

Neon Jump is a vertical endless jumping game where the player controls a character that automatically jumps upward across platforms while avoiding obstacles and collecting boosts. The score increases based on height climbed, and falling off the screen ends the game.

## Features

### Core Gameplay
- Automatic upward jumping with platform-based progression
- 6 platform types: static, moving, breakable, and spring boost
- Enemy obstacles with stomping mechanic
- Power-ups: jetpack and shield
- Score based on height climbed

### Characters
Three playable characters with unique visual styles:
1. **Classic Hero** – Simple neon character (free)
2. **Modern Runner** – Futuristic glowing character (500 coins)
3. **Space Explorer** – Astronaut-style neon character (1000 coins)

### Themes / Scenarios
Three selectable game environments:
1. **Classic** – Simple doodle-style platforms, light background, minimalist design
2. **Modern Neon** – Dark background, neon glowing platforms, cyberpunk style effects
3. **Space** – Starfield background, floating space platforms, low gravity feel

### Level System
10 levels with progressive difficulty:
- Level 1: Unlocked by default
- Level 2-10: Unlock at 2000-10000 score (1000 increment each)
- Higher levels = faster platforms, more enemies, more breakable platforms

### Daily Reward System
- 7-day reward cycle with increasing coin rewards (100-1000 coins)
- Day 7 includes a special character skin
- Missed days reset the cycle
- Reward calendar UI

### Controls
- **Mobile**: Touch buttons (left/right arrows on screen)
- **Desktop**: Arrow keys

### Data Persistence
All progress saved via localStorage:
- Best score
- Unlocked levels
- Selected character and theme
- Coin balance
- Daily reward progress

## How to Run

### Browser (Quick Start)
1. Serve the project directory with any HTTP server:
   ```bash
   # Using Python
   python3 -m http.server 8000

   # Using Node.js (npx)
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```
2. Open `http://localhost:8000` in your browser.

### Android Web App
To package as an Android-compatible web app:
1. Use a tool like [Capacitor](https://capacitorjs.com/) or [TWA (Trusted Web Activity)](https://developer.chrome.com/docs/android/trusted-web-activity/)
2. Alternatively, use [PWA Builder](https://www.pwabuilder.com/) to generate an APK from this web app

## Project Structure

```
├── index.html          # Main HTML entry point
├── css/
│   └── style.css       # Styles and responsive layout
├── js/
│   ├── main.js         # Phaser config, scenes (Boot, Menu, Game, GameOver), audio
│   ├── player.js       # Character definitions, player creation, input handling
│   ├── platforms.js    # Platform types, generation, movement
│   ├── enemies.js      # Enemy creation and AI
│   ├── levels.js       # Level configuration and progression
│   └── ui.js           # UI management, storage, daily rewards
└── README.md
```

## Technology

- **Phaser.js 3.60** – Game engine (loaded via CDN)
- **Web Audio API** – Procedurally generated sound effects
- **localStorage** – Data persistence
- **HTML5 Canvas** – Rendering (via Phaser)