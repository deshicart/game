// main.js - Neon Jump Game Entry Point

// ============================================================
// AUDIO MANAGER - Generate sounds using Web Audio API
// ============================================================
const AudioManager = {
    ctx: null,
    enabled: true,

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.enabled = false;
        }
    },

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    playJump() {
        if (!this.enabled || !this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.15);
    },

    playSpring() {
        if (!this.enabled || !this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.25);
    },

    playPowerUp() {
        if (!this.enabled || !this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1500, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.35);
    },

    playGameOver() {
        if (!this.enabled || !this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.6);
    },

    playCoin() {
        if (!this.enabled || !this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.setValueAtTime(1100, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.2);
    }
};

// ============================================================
// BOOT SCENE
// ============================================================
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        AudioManager.init();
        this.scene.start('MenuScene');
    }
}

// ============================================================
// MENU SCENE
// ============================================================
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;
        const theme = UIManager.getSelectedTheme();

        this.drawBackground(theme, w, h);

        // Title
        const titleStyle = {
            fontSize: Math.min(48, w * 0.1) + 'px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            color: '#00ffcc',
            stroke: '#004444',
            strokeThickness: 4,
            shadow: { offsetX: 0, offsetY: 0, color: '#00ffcc', blur: 20, fill: true }
        };
        this.add.text(w / 2, h * 0.1, 'NEON JUMP', titleStyle).setOrigin(0.5);

        // Coin display
        const coins = UIManager.getCoins();
        this.coinText = this.add.text(w - 15, 15, '🪙 ' + coins, {
            fontSize: '18px', fontFamily: 'Arial', color: '#ffdd44'
        }).setOrigin(1, 0);

        // Best score
        const best = UIManager.getBestScore();
        this.add.text(w / 2, h * 0.17, 'Best: ' + best, {
            fontSize: '16px', fontFamily: 'Arial', color: '#aaaaaa'
        }).setOrigin(0.5);

        // Play button
        this.createButton(w / 2, h * 0.28, '▶  PLAY', '#00ff88', () => {
            AudioManager.resume();
            this.scene.start('GameScene', {
                character: UIManager.getSelectedCharacter(),
                theme: UIManager.getSelectedTheme()
            });
        });

        // Character selection
        this.add.text(w / 2, h * 0.38, 'CHARACTER', {
            fontSize: '14px', fontFamily: 'Arial', color: '#888888'
        }).setOrigin(0.5);

        this.createCharacterSelection(w, h);

        // Theme selection
        this.add.text(w / 2, h * 0.58, 'THEME', {
            fontSize: '14px', fontFamily: 'Arial', color: '#888888'
        }).setOrigin(0.5);

        this.createThemeSelection(w, h);

        // Level info
        this.add.text(w / 2, h * 0.78, 'LEVELS', {
            fontSize: '14px', fontFamily: 'Arial', color: '#888888'
        }).setOrigin(0.5);

        this.createLevelDisplay(w, h);

        // Daily reward button
        this.createButton(w / 2, h * 0.93, '🎁 Daily Reward', '#ffaa00', () => {
            this.showDailyReward(w, h);
        }, 14);

        // Check and auto-show daily reward
        const rewardStatus = UIManager.checkDailyReward();
        if (rewardStatus.canClaim) {
            this.time.delayedCall(500, () => {
                this.showDailyReward(w, h);
            });
        }
    }

    drawBackground(theme, w, h) {
        if (theme === 'neon') {
            this.cameras.main.setBackgroundColor('#0a0a2e');
            // Add neon grid lines
            const gfx = this.add.graphics();
            gfx.lineStyle(1, 0x00ffcc, 0.08);
            for (let x = 0; x < w; x += 40) {
                gfx.lineBetween(x, 0, x, h);
            }
            for (let y = 0; y < h; y += 40) {
                gfx.lineBetween(0, y, w, y);
            }
        } else if (theme === 'space') {
            this.cameras.main.setBackgroundColor('#050515');
            const gfx = this.add.graphics();
            for (let i = 0; i < 60; i++) {
                const sx = Phaser.Math.Between(0, w);
                const sy = Phaser.Math.Between(0, h);
                const size = Math.random() * 2 + 0.5;
                gfx.fillStyle(0xffffff, Math.random() * 0.6 + 0.2);
                gfx.fillCircle(sx, sy, size);
            }
        } else {
            this.cameras.main.setBackgroundColor('#e8e8e0');
        }
    }

    createButton(x, y, text, color, callback, fontSize) {
        const fs = fontSize || 20;
        const btn = this.add.text(x, y, text, {
            fontSize: fs + 'px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            color: color,
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: { x: 24, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setScale(1.05));
        btn.on('pointerout', () => btn.setScale(1));
        btn.on('pointerdown', callback);
        return btn;
    }

    createCharacterSelection(w, h) {
        const selected = UIManager.getSelectedCharacter();
        const owned = UIManager.getOwnedCharacters();
        const chars = PlayerManager.characters;
        const spacing = w / (chars.length + 1);

        chars.forEach((char, i) => {
            const x = spacing * (i + 1);
            const y = h * 0.45;
            const isOwned = owned.includes(char.id);
            const isSelected = char.id === selected;

            const bgColor = isSelected ? 'rgba(0,255,200,0.25)' : 'rgba(255,255,255,0.08)';
            const textColor = isOwned ? '#ffffff' : '#666666';
            const label = isOwned ? char.name : char.name + '\n🪙' + char.cost;

            const btn = this.add.text(x, y, label, {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: textColor,
                backgroundColor: bgColor,
                padding: { x: 8, y: 6 },
                align: 'center'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            if (isSelected) {
                btn.setStyle({ stroke: '#00ffcc', strokeThickness: 1 });
            }

            btn.on('pointerdown', () => {
                if (isOwned) {
                    UIManager.setSelectedCharacter(char.id);
                    this.scene.restart();
                } else {
                    const coins = UIManager.getCoins();
                    if (coins >= char.cost) {
                        UIManager.setCoins(coins - char.cost);
                        UIManager.addOwnedCharacter(char.id);
                        UIManager.setSelectedCharacter(char.id);
                        AudioManager.playCoin();
                        this.scene.restart();
                    }
                }
            });
        });
    }

    createThemeSelection(w, h) {
        const themes = [
            { id: 'classic', name: 'Classic', color: '#44bb44' },
            { id: 'neon', name: 'Neon', color: '#00ffcc' },
            { id: 'space', name: 'Space', color: '#8888ff' }
        ];
        const selected = UIManager.getSelectedTheme();
        const spacing = w / (themes.length + 1);

        themes.forEach((theme, i) => {
            const x = spacing * (i + 1);
            const y = h * 0.65;
            const isSelected = theme.id === selected;
            const bgColor = isSelected ? 'rgba(0,255,200,0.25)' : 'rgba(255,255,255,0.08)';

            const btn = this.add.text(x, y, theme.name, {
                fontSize: '14px',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                color: theme.color,
                backgroundColor: bgColor,
                padding: { x: 12, y: 6 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            if (isSelected) {
                btn.setStyle({ stroke: theme.color, strokeThickness: 1 });
            }

            btn.on('pointerdown', () => {
                UIManager.setSelectedTheme(theme.id);
                this.scene.restart();
            });
        });
    }

    createLevelDisplay(w, h) {
        const best = UIManager.getBestScore();
        const unlocked = LevelConfig.getUnlockedLevels(best);
        const y = h * 0.84;
        const totalLevels = LevelConfig.levels.length;
        const spacing = Math.min(30, (w - 40) / totalLevels);
        const startX = w / 2 - (totalLevels - 1) * spacing / 2;

        for (let i = 0; i < totalLevels; i++) {
            const level = LevelConfig.levels[i];
            const isUnlocked = best >= level.unlockScore;
            const lx = startX + i * spacing;

            this.add.text(lx, y, (i + 1).toString(), {
                fontSize: '13px',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                color: isUnlocked ? '#00ff88' : '#444444',
                backgroundColor: isUnlocked ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.05)',
                padding: { x: 4, y: 2 }
            }).setOrigin(0.5);
        }
    }

    showDailyReward(w, h) {
        const rewardStatus = UIManager.checkDailyReward();

        // Overlay
        const overlay = this.add.rectangle(w / 2, h / 2, w, h, 0x000000, 0.7)
            .setInteractive()
            .setDepth(100);

        // Popup background
        const popW = Math.min(320, w * 0.85);
        const popH = Math.min(400, h * 0.6);
        const popBg = this.add.rectangle(w / 2, h / 2, popW, popH, 0x1a1a3e, 1)
            .setStrokeStyle(2, 0x00ffcc)
            .setDepth(101);

        // Title
        const title = this.add.text(w / 2, h / 2 - popH / 2 + 25, '🎁 DAILY REWARD', {
            fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold', color: '#ffdd44'
        }).setOrigin(0.5).setDepth(102);

        // Calendar
        const calY = h / 2 - popH / 2 + 65;
        const daySpacing = popW / 8;

        for (let i = 0; i < 7; i++) {
            const dayInfo = UIManager.dailyRewards[i];
            const dx = w / 2 - popW / 2 + daySpacing * (i + 1);
            const isCurrent = (i + 1) === rewardStatus.day;
            const isPast = (i + 1) < rewardStatus.day;

            const dayColor = isCurrent ? '#ffdd44' : (isPast ? '#00ff88' : '#666666');
            const dayBg = isCurrent ? 'rgba(255,221,0,0.2)' : (isPast ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.05)');

            this.add.text(dx, calY, 'D' + (i + 1), {
                fontSize: '11px', fontFamily: 'Arial', fontStyle: 'bold', color: dayColor,
                backgroundColor: dayBg, padding: { x: 3, y: 2 }
            }).setOrigin(0.5).setDepth(102);

            this.add.text(dx, calY + 18, '🪙' + dayInfo.coins, {
                fontSize: '9px', fontFamily: 'Arial', color: '#aaaaaa'
            }).setOrigin(0.5).setDepth(102);

            if (isPast) {
                this.add.text(dx, calY + 32, '✅', {
                    fontSize: '10px'
                }).setOrigin(0.5).setDepth(102);
            }
        }

        // Current reward info
        const currentReward = UIManager.dailyRewards[rewardStatus.day - 1];
        const infoY = h / 2 + 10;

        this.add.text(w / 2, infoY, 'Day ' + rewardStatus.day, {
            fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#ffffff'
        }).setOrigin(0.5).setDepth(102);

        this.add.text(w / 2, infoY + 30, '🪙 ' + currentReward.coins + ' Coins', {
            fontSize: '18px', fontFamily: 'Arial', color: '#ffdd44'
        }).setOrigin(0.5).setDepth(102);

        if (currentReward.special) {
            this.add.text(w / 2, infoY + 55, currentReward.special, {
                fontSize: '12px', fontFamily: 'Arial', color: '#ff88ff'
            }).setOrigin(0.5).setDepth(102);
        }

        // Claim or Close button
        if (rewardStatus.canClaim) {
            const claimBtn = this.add.text(w / 2, infoY + 90, '✨ CLAIM ✨', {
                fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold', color: '#000000',
                backgroundColor: '#ffdd44', padding: { x: 24, y: 8 }
            }).setOrigin(0.5).setDepth(102).setInteractive({ useHandCursor: true });

            claimBtn.on('pointerdown', () => {
                const reward = UIManager.claimDailyReward();
                AudioManager.playCoin();
                claimBtn.setText('✅ Claimed +' + reward.coins);
                claimBtn.setStyle({ backgroundColor: '#44aa44' });
                claimBtn.removeInteractive();
                this.coinText.setText('🪙 ' + UIManager.getCoins());

                this.time.delayedCall(1200, () => {
                    this.destroyPopup();
                });
            });
        } else {
            this.add.text(w / 2, infoY + 80, 'Already claimed today!', {
                fontSize: '14px', fontFamily: 'Arial', color: '#888888'
            }).setOrigin(0.5).setDepth(102);
        }

        // Close button
        const closeBtn = this.add.text(w / 2 + popW / 2 - 15, h / 2 - popH / 2 + 10, '✕', {
            fontSize: '20px', fontFamily: 'Arial', color: '#ff4444'
        }).setOrigin(0.5).setDepth(102).setInteractive({ useHandCursor: true });

        closeBtn.on('pointerdown', () => {
            this.destroyPopup();
        });
    }

    destroyPopup() {
        // Remove all depth 100+ objects (popup elements)
        this.children.list.filter(c => c.depth >= 100).forEach(c => c.destroy());
    }
}

// ============================================================
// GAME SCENE
// ============================================================
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.selectedCharacter = data.character || 'classic';
        this.selectedTheme = data.theme || 'classic';
        this.score = 0;
        this.highestY = 0;
        this.currentLevel = LevelConfig.getLevel(1);
        this.touchLeft = false;
        this.touchRight = false;
        this.gameOver = false;
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        this.setupBackground(w, h);
        this.setupPhysics(w, h);
        this.setupTextures();
        this.setupPlayer(w, h);
        this.setupPlatforms(w, h);
        this.setupEnemies();
        this.setupPowerUps();
        this.setupUI(w, h);
        this.setupControls(w, h);
        this.setupParticles();
    }

    setupBackground(w, h) {
        if (this.selectedTheme === 'neon') {
            this.cameras.main.setBackgroundColor('#0a0a2e');
            this.bgGraphics = this.add.graphics();
            this.bgGraphics.lineStyle(1, 0x00ffcc, 0.05);
            for (let x = 0; x < w; x += 40) {
                this.bgGraphics.lineBetween(x, 0, x, h);
            }
            for (let y = 0; y < h; y += 40) {
                this.bgGraphics.lineBetween(0, y, w, y);
            }
        } else if (this.selectedTheme === 'space') {
            this.cameras.main.setBackgroundColor('#050515');
            this.bgGraphics = this.add.graphics();
            for (let i = 0; i < 50; i++) {
                const sx = Phaser.Math.Between(0, w);
                const sy = Phaser.Math.Between(0, h);
                this.bgGraphics.fillStyle(0xffffff, Math.random() * 0.5 + 0.2);
                this.bgGraphics.fillCircle(sx, sy, Math.random() * 1.5 + 0.5);
            }
            // Add planets
            this.bgGraphics.fillStyle(0x334488, 0.3);
            this.bgGraphics.fillCircle(w * 0.8, h * 0.2, 30);
            this.bgGraphics.fillStyle(0x884433, 0.2);
            this.bgGraphics.fillCircle(w * 0.15, h * 0.6, 20);
        } else {
            this.cameras.main.setBackgroundColor('#e8e8e0');
        }
    }

    setupPhysics(w, h) {
        const gravity = this.selectedTheme === 'space' ? 700 : 900;
        this.physics.world.gravity.y = gravity;
        this.physics.world.setBounds(0, -999999, w, 1999999);
    }

    setupTextures() {
        PlatformManager.createPlatformTextures(this);
        EnemyManager.createEnemyTextures(this);
        PlayerManager.createPlayerTexture(this, this.selectedCharacter);
        PlayerManager.createPowerUpTextures(this);
    }

    setupPlayer(w, h) {
        this.player = PlayerManager.createPlayer(this, w / 2, h - 80);
        this.player.setVelocityY(-500);
    }

    setupPlatforms(w, h) {
        this.platforms = this.physics.add.staticGroup();

        // Starting platform
        PlatformManager.createPlatform(this, w / 2, h - 30, 'static');

        // Generate initial platforms
        PlatformManager.generatePlatforms(this, h - 100, -200, this.currentLevel);

        // Collision
        this.physics.add.collider(this.player, this.platforms, this.onPlatformCollision, null, this);
    }

    setupEnemies() {
        this.enemies = this.physics.add.group();
        this.physics.add.overlap(this.player, this.enemies, this.onEnemyHit, null, this);
    }

    setupPowerUps() {
        this.powerUps = this.physics.add.group();
        this.physics.add.overlap(this.player, this.powerUps, this.onPowerUpCollect, null, this);

        // Shield graphic
        this.shieldGraphic = this.add.graphics();
        this.shieldGraphic.setVisible(false);
        this.shieldGraphic.setDepth(10);
    }

    setupUI(w, h) {
        const textColor = this.selectedTheme === 'classic' ? '#333333' : '#ffffff';

        this.scoreText = this.add.text(10, 10, 'Score: 0', {
            fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: textColor
        }).setScrollFactor(0).setDepth(20);

        this.levelText = this.add.text(w - 10, 10, 'Level 1', {
            fontSize: '14px', fontFamily: 'Arial', color: textColor
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(20);
    }

    setupControls(w, h) {
        this.cursors = this.input.keyboard.createCursorKeys();

        // Touch controls
        const btnSize = 60;
        const btnY = h - 45;
        const btnAlpha = 0.25;

        // Left button
        const leftBtn = this.add.rectangle(btnSize / 2 + 10, btnY, btnSize, btnSize, 0xffffff, btnAlpha)
            .setScrollFactor(0).setDepth(30).setInteractive();
        this.add.text(btnSize / 2 + 10, btnY, '◀', {
            fontSize: '24px', color: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(31);

        leftBtn.on('pointerdown', () => { this.touchLeft = true; });
        leftBtn.on('pointerup', () => { this.touchLeft = false; });
        leftBtn.on('pointerout', () => { this.touchLeft = false; });

        // Right button
        const rightBtn = this.add.rectangle(w - btnSize / 2 - 10, btnY, btnSize, btnSize, 0xffffff, btnAlpha)
            .setScrollFactor(0).setDepth(30).setInteractive();
        this.add.text(w - btnSize / 2 - 10, btnY, '▶', {
            fontSize: '24px', color: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(31);

        rightBtn.on('pointerdown', () => { this.touchRight = true; });
        rightBtn.on('pointerup', () => { this.touchRight = false; });
        rightBtn.on('pointerout', () => { this.touchRight = false; });
    }

    setupParticles() {
        // We'll draw particles manually with graphics
        this.jumpParticles = [];
    }

    update() {
        if (this.gameOver) return;

        const w = this.scale.width;
        const h = this.scale.height;

        // Player input
        PlayerManager.handleInput(this, this.player);

        // Update moving platforms
        PlatformManager.updateMovingPlatforms(this);

        // Update enemies
        EnemyManager.updateEnemies(this);

        // Score based on height
        const playerWorldY = this.player.y;
        if (playerWorldY < this.highestY) {
            this.score += Math.floor((this.highestY - playerWorldY) * 0.1);
            this.highestY = playerWorldY;
        }
        this.scoreText.setText('Score: ' + this.score);

        // Update level based on score
        const newLevel = LevelConfig.getCurrentLevelForScore(this.score);
        if (newLevel.id !== this.currentLevel.id) {
            this.currentLevel = newLevel;
            this.levelText.setText('Level ' + newLevel.id);
        }

        // Camera follow (scroll world down)
        this.scrollWorld(h);

        // Generate new platforms above
        this.generateNewContent();

        // Clean up off-screen objects
        this.cleanupOffscreen(h);

        // Shield visual
        if (this.player.hasShield) {
            this.shieldGraphic.setVisible(true);
            this.shieldGraphic.clear();
            this.shieldGraphic.lineStyle(2, 0x4488ff, 0.5);
            this.shieldGraphic.strokeCircle(this.player.x, this.player.y, 22);
        }

        // Update particles
        this.updateParticles();

        // Check game over
        if (this.player.y > this.cameras.main.scrollY + h + 50) {
            this.endGame();
        }
    }

    scrollWorld(h) {
        const camY = this.cameras.main.scrollY;
        const playerScreenY = this.player.y - camY;

        if (playerScreenY < h * 0.35) {
            const newCamY = this.player.y - h * 0.35;
            this.cameras.main.scrollY = Phaser.Math.Linear(camY, newCamY, 0.1);
        }
    }

    generateNewContent() {
        const camTop = this.cameras.main.scrollY;

        // Find highest platform
        let highestPlatY = Infinity;
        this.platforms.children.iterate((p) => {
            if (p && p.y < highestPlatY) highestPlatY = p.y;
        });

        // Generate more platforms if needed
        if (highestPlatY > camTop - 200) {
            const gap = this.currentLevel.platformGap;
            const gameWidth = this.scale.width;
            let y = highestPlatY - Phaser.Math.Between(gap - 20, gap + 20);

            while (y > camTop - 600) {
                const x = Phaser.Math.Between(50, gameWidth - 50);
                const rand = Math.random();
                let type = 'static';

                if (rand < this.currentLevel.breakableChance) {
                    type = 'breakable';
                } else if (rand < this.currentLevel.breakableChance + this.currentLevel.movingChance) {
                    type = 'moving';
                } else if (rand < this.currentLevel.breakableChance + this.currentLevel.movingChance + this.currentLevel.springChance) {
                    type = 'spring';
                }

                PlatformManager.createPlatform(this, x, y, type);

                // Maybe spawn enemy
                EnemyManager.trySpawnEnemy(this, x, y, this.currentLevel.enemyChance);

                // Maybe spawn power-up
                if (Math.random() < 0.03) {
                    const puType = Math.random() < 0.5 ? 'powerup_jetpack' : 'powerup_shield';
                    const pu = this.powerUps.create(Phaser.Math.Between(30, gameWidth - 30), y - 40, puType);
                    pu.body.allowGravity = false;
                    pu.puType = puType;
                }

                y -= Phaser.Math.Between(gap - 20, gap + 20);
            }
        }
    }

    cleanupOffscreen(h) {
        const camBottom = this.cameras.main.scrollY + h + 100;

        this.platforms.children.iterate((p) => {
            if (p && p.y > camBottom) p.destroy();
        });

        this.enemies.children.iterate((e) => {
            if (e && e.y > camBottom) e.destroy();
        });

        this.powerUps.children.iterate((pu) => {
            if (pu && pu.y > camBottom) pu.destroy();
        });
    }

    onPlatformCollision(player, platform) {
        if (player.body.velocity.y < 0) return;
        if (player.body.touching.down === false) return;

        if (platform.platformType === 'breakable') {
            this.tweens.add({
                targets: platform,
                alpha: 0,
                scaleX: 0.5,
                duration: 200,
                onComplete: () => platform.destroy()
            });
            AudioManager.playJump();
            player.setVelocityY(-500);
            this.spawnJumpParticles(player.x, player.y + 15);
            return;
        }

        if (platform.platformType === 'spring') {
            player.setVelocityY(-900);
            AudioManager.playSpring();
            this.spawnJumpParticles(player.x, player.y + 15);
            return;
        }

        player.setVelocityY(-500);
        AudioManager.playJump();
        this.spawnJumpParticles(player.x, player.y + 15);
    }

    onEnemyHit(player, enemy) {
        if (player.hasShield) {
            player.hasShield = false;
            this.shieldGraphic.setVisible(false);
            enemy.destroy();
            return;
        }

        // Stomp from above
        if (player.body.velocity.y > 0 && player.y < enemy.y - 10) {
            enemy.destroy();
            player.setVelocityY(-400);
            this.score += 100;
            return;
        }

        this.endGame();
    }

    onPowerUpCollect(player, powerUp) {
        AudioManager.playPowerUp();

        if (powerUp.puType === 'powerup_jetpack') {
            player.hasJetpack = true;
            player.jetpackTimer = 3000;
        } else {
            player.hasShield = true;
            player.shieldTimer = 8000;
        }

        powerUp.destroy();
    }

    spawnJumpParticles(x, y) {
        const theme = this.selectedTheme;
        const color = theme === 'neon' ? 0x00ffcc : (theme === 'space' ? 0x8888ff : 0x88dd88);

        for (let i = 0; i < 5; i++) {
            this.jumpParticles.push({
                x: x + Phaser.Math.Between(-10, 10),
                y: y,
                vx: Phaser.Math.Between(-40, 40),
                vy: Phaser.Math.Between(20, 60),
                life: 300,
                maxLife: 300,
                color: color,
                size: Phaser.Math.Between(2, 4)
            });
        }
    }

    updateParticles() {
        // Draw particles
        if (!this.particleGraphics) {
            this.particleGraphics = this.add.graphics().setDepth(5);
        }
        this.particleGraphics.clear();

        const dt = this.game.loop.delta;
        for (let i = this.jumpParticles.length - 1; i >= 0; i--) {
            const p = this.jumpParticles[i];
            p.x += p.vx * (dt / 1000);
            p.y += p.vy * (dt / 1000);
            p.life -= dt;

            if (p.life <= 0) {
                this.jumpParticles.splice(i, 1);
                continue;
            }

            const alpha = p.life / p.maxLife;
            this.particleGraphics.fillStyle(p.color, alpha);
            this.particleGraphics.fillCircle(p.x, p.y, p.size * alpha);
        }
    }

    endGame() {
        if (this.gameOver) return;
        this.gameOver = true;

        AudioManager.playGameOver();

        const bestScore = UIManager.getBestScore();
        if (this.score > bestScore) {
            UIManager.setBestScore(this.score);
        }

        this.time.delayedCall(500, () => {
            this.scene.start('GameOverScene', {
                score: this.score,
                bestScore: Math.max(this.score, bestScore),
                character: this.selectedCharacter,
                theme: this.selectedTheme
            });
        });
    }
}

// ============================================================
// GAME OVER SCENE
// ============================================================
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.bestScore = data.bestScore || 0;
        this.selectedCharacter = data.character || 'classic';
        this.selectedTheme = data.theme || 'classic';
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        if (this.selectedTheme === 'neon') {
            this.cameras.main.setBackgroundColor('#0a0a2e');
        } else if (this.selectedTheme === 'space') {
            this.cameras.main.setBackgroundColor('#050515');
        } else {
            this.cameras.main.setBackgroundColor('#e8e8e0');
        }

        const titleColor = this.selectedTheme === 'classic' ? '#cc3333' : '#ff4444';
        const textColor = this.selectedTheme === 'classic' ? '#333333' : '#ffffff';

        this.add.text(w / 2, h * 0.2, 'GAME OVER', {
            fontSize: Math.min(42, w * 0.09) + 'px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            color: titleColor,
            stroke: '#000000',
            strokeThickness: 2,
            shadow: { offsetX: 0, offsetY: 0, color: titleColor, blur: 15, fill: true }
        }).setOrigin(0.5);

        this.add.text(w / 2, h * 0.35, 'Score: ' + this.finalScore, {
            fontSize: '28px', fontFamily: 'Arial', fontStyle: 'bold', color: textColor
        }).setOrigin(0.5);

        this.add.text(w / 2, h * 0.43, 'Best: ' + this.bestScore, {
            fontSize: '20px', fontFamily: 'Arial', color: '#ffdd44'
        }).setOrigin(0.5);

        if (this.finalScore >= this.bestScore && this.finalScore > 0) {
            this.add.text(w / 2, h * 0.50, '🏆 NEW RECORD!', {
                fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#ffaa00'
            }).setOrigin(0.5);
        }

        // Level reached
        const levelReached = LevelConfig.getCurrentLevelForScore(this.finalScore);
        this.add.text(w / 2, h * 0.56, 'Level Reached: ' + levelReached.id, {
            fontSize: '16px', fontFamily: 'Arial', color: '#aaaaaa'
        }).setOrigin(0.5);

        // Restart button
        const restartBtn = this.add.text(w / 2, h * 0.68, '🔄  RESTART', {
            fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#00ff88',
            backgroundColor: 'rgba(0,0,0,0.4)', padding: { x: 24, y: 12 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        restartBtn.on('pointerover', () => restartBtn.setScale(1.05));
        restartBtn.on('pointerout', () => restartBtn.setScale(1));
        restartBtn.on('pointerdown', () => {
            this.scene.start('GameScene', {
                character: this.selectedCharacter,
                theme: this.selectedTheme
            });
        });

        // Menu button
        const menuBtn = this.add.text(w / 2, h * 0.80, '🏠  MENU', {
            fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#4488ff',
            backgroundColor: 'rgba(0,0,0,0.4)', padding: { x: 24, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        menuBtn.on('pointerover', () => menuBtn.setScale(1.05));
        menuBtn.on('pointerout', () => menuBtn.setScale(1));
        menuBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

// ============================================================
// PHASER CONFIG
// ============================================================
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 400,
    height: 700,
    backgroundColor: '#0a0a2e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, GameScene, GameOverScene],
    input: {
        activePointers: 3
    },
    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: true
    }
};

const game = new Phaser.Game(config);
