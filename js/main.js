// main.js - Neon Leap Game Entry Point

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

        // Light background (Doodle Jump graph paper style)
        this.cameras.main.setBackgroundColor('#f5f0e0');
        this.drawMenuBackground(w, h);

        // Animated decorative elements
        this.drawAnimatedElements(w, h);

        // Title "DOODLE LEAP"
        const titleStyle = {
            fontSize: Math.min(60, w * 0.15) + 'px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            color: '#4a8030',
            stroke: '#2d5a1a',
            strokeThickness: 3
        };
        const titleNeon = this.add.text(w / 2, h * 0.1, 'DOODLE', titleStyle).setOrigin(0.5);
        const titleLeap = this.add.text(w / 2, h * 0.2, 'LEAP', titleStyle).setOrigin(0.5);

        // Animate title with pulsing glow
        this.tweens.add({
            targets: [titleNeon, titleLeap],
            alpha: { from: 0.8, to: 1 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Tagline
        const tagline = this.add.text(w / 2, h * 0.37, 'Jump. Survive. Ascend.', {
            fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#888877'
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: tagline,
            alpha: 1,
            duration: 1000,
            delay: 500
        });

        // Best score (no emoji - use drawn icon)
        const best = UIManager.getBestScore();
        const bestStr = best.toLocaleString();
        this.drawTrophyIcon(w / 2 - 70, h * 0.6 - 10);
        this.add.text(w / 2 + 10, h * 0.6, 'BEST: ' + bestStr, {
            fontSize: '20px', fontFamily: 'Arial, sans-serif', fontStyle: 'bold',
            color: '#c8a020'
        }).setOrigin(0.5);

        // TAP TO START button
        this.createStartButton(w, h);

        // Warning (no emoji)
        this.add.text(w / 2, h * 0.8, 'Stomp enemies from above to kill!', {
            fontSize: '13px', fontFamily: 'Arial, sans-serif', color: '#aa7733'
        }).setOrigin(0.5);

        // Controls info
        this.add.text(w / 2, h * 0.86, 'Arrow keys  |  Tap sides  |  Tilt phone', {
            fontSize: '11px', fontFamily: 'Arial, sans-serif', color: '#999988'
        }).setOrigin(0.5);

        // Platform legend
        this.drawPlatformLegend(w, h);
    }

    drawMenuBackground(w, h) {
        const gfx = this.add.graphics();
        // Graph paper grid lines (Doodle Jump notebook style)
        gfx.lineStyle(1, 0xd0c8b0, 0.3);
        for (let x = 0; x < w; x += 20) {
            gfx.lineBetween(x, 0, x, h);
        }
        for (let y = 0; y < h; y += 20) {
            gfx.lineBetween(0, y, w, y);
        }
    }

    drawAnimatedElements(w, h) {
        // Floating platform animation (left) - simple green
        const platGfx1 = this.add.graphics();
        platGfx1.fillStyle(0x59b535, 1);
        platGfx1.fillRoundedRect(-45, -5, 90, 12, 6);
        platGfx1.fillStyle(0x4a9e2d, 1);
        platGfx1.fillRoundedRect(-45, 0, 90, 7, 5);
        platGfx1.setPosition(80, h * 0.3);

        this.tweens.add({
            targets: platGfx1,
            y: h * 0.3 - 8,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Floating platform animation (right) - blue moving platform
        const platGfx2 = this.add.graphics();
        platGfx2.fillStyle(0x5bb5e0, 1);
        platGfx2.fillRoundedRect(-40, -5, 80, 12, 6);
        platGfx2.fillStyle(0x4a9ec8, 1);
        platGfx2.fillRoundedRect(-40, 0, 80, 7, 5);
        platGfx2.setPosition(w - 80, h * 0.43);

        this.tweens.add({
            targets: platGfx2,
            x: w - 70,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Animated character blob in center (Doodle Jump style)
        const charGfx = this.add.graphics();
        const cx = 0, cy = 0;
        // Dark outline for body
        charGfx.fillStyle(0x222222, 1);
        charGfx.fillCircle(cx, cy - 2, 18);
        charGfx.fillRoundedRect(cx - 18, cy, 36, 20, 5);
        // Snout outline
        charGfx.fillStyle(0x222222, 1);
        charGfx.fillCircle(cx + 16, cy - 4, 8);
        charGfx.fillCircle(cx + 22, cy - 4, 5);
        // Yellow-green body fill
        charGfx.fillStyle(0xc8d840, 1);
        charGfx.fillCircle(cx, cy - 2, 15);
        charGfx.fillRoundedRect(cx - 15, cy, 30, 17, 4);
        // Snout fill
        charGfx.fillStyle(0xc8d840, 1);
        charGfx.fillCircle(cx + 14, cy - 4, 6);
        charGfx.fillCircle(cx + 19, cy - 4, 3.5);
        // Snout nostril
        charGfx.fillStyle(0x222222, 1);
        charGfx.fillCircle(cx + 20, cy - 5, 1.5);
        // Green striped shirt
        charGfx.fillStyle(0x4a8030, 1);
        charGfx.fillRoundedRect(cx - 14, cy + 6, 28, 13, 3);
        // Shirt stripes
        charGfx.fillStyle(0x222222, 0.4);
        charGfx.fillRect(cx - 13, cy + 10, 26, 2);
        charGfx.fillRect(cx - 13, cy + 15, 26, 2);
        // Eyes
        charGfx.fillStyle(0x222222, 1);
        charGfx.fillCircle(cx - 5, cy - 4, 3.5);
        charGfx.fillCircle(cx + 5, cy - 4, 3.5);
        // Legs
        charGfx.fillStyle(0x222222, 1);
        charGfx.fillRect(cx - 10, cy + 17, 5, 8);
        charGfx.fillRect(cx - 2, cy + 17, 5, 8);
        charGfx.fillRect(cx + 6, cy + 17, 5, 8);
        charGfx.setPosition(w / 2, h * 0.48);

        // Bounce animation
        this.tweens.add({
            targets: charGfx,
            y: h * 0.48 - 15,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeOut'
        });

        // Draw enemy (brown monster) with animation
        const enemyGfx = this.add.graphics();
        enemyGfx.fillStyle(0x884422, 1);
        enemyGfx.fillCircle(0, 0, 14);
        enemyGfx.fillStyle(0xaa6633, 1);
        enemyGfx.fillCircle(0, 3, 8);
        // Eyes
        enemyGfx.fillStyle(0xffffff, 1);
        enemyGfx.fillCircle(-5, -3, 4);
        enemyGfx.fillCircle(5, -3, 4);
        enemyGfx.fillStyle(0x222222, 1);
        enemyGfx.fillCircle(-4, -3, 2);
        enemyGfx.fillCircle(6, -3, 2);
        // Horns
        enemyGfx.fillStyle(0x884422, 1);
        enemyGfx.fillCircle(-7, -11, 4);
        enemyGfx.fillCircle(7, -11, 4);
        enemyGfx.setPosition(55, h * 0.52);

        // Enemy float animation
        this.tweens.add({
            targets: enemyGfx,
            y: h * 0.52 - 5,
            x: 60,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Spring platform below character
        const sprGfx = this.add.graphics();
        sprGfx.fillStyle(0x59b535, 1);
        sprGfx.fillRoundedRect(-20, 0, 40, 10, 4);
        sprGfx.fillStyle(0xe8c020, 1);
        sprGfx.fillRoundedRect(-8, -8, 16, 10, 3);
        sprGfx.setPosition(w / 2, h * 0.56);

        this.tweens.add({
            targets: sprGfx,
            y: h * 0.56 + 3,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    drawTrophyIcon(x, y) {
        const gfx = this.add.graphics();
        // Cup body
        gfx.fillStyle(0xc8a020, 1);
        gfx.fillRoundedRect(x - 8, y - 6, 16, 14, 3);
        // Cup handles
        gfx.lineStyle(2, 0xc8a020, 1);
        gfx.strokeCircle(x - 10, y + 1, 4);
        gfx.strokeCircle(x + 10, y + 1, 4);
        // Base
        gfx.fillStyle(0xc8a020, 1);
        gfx.fillRect(x - 5, y + 8, 10, 3);
        gfx.fillRect(x - 8, y + 11, 16, 2);
    }

    createStartButton(w, h) {
        const btnW = 220;
        const btnH = 52;
        const btnX = w / 2;
        const btnY = h * 0.71;

        // Button background (rounded green rectangle)
        const gfx = this.add.graphics();
        gfx.fillStyle(0x59b535, 1);
        gfx.fillRoundedRect(btnX - btnW / 2, btnY - btnH / 2, btnW, btnH, 14);

        // Button text
        this.add.text(btnX, btnY, 'TAP  TO  START', {
            fontSize: '24px', fontFamily: 'Arial, sans-serif', fontStyle: 'bold',
            color: '#000000'
        }).setOrigin(0.5);

        // Invisible interactive area
        const hitArea = this.add.rectangle(btnX, btnY, btnW, btnH, 0x000000, 0)
            .setInteractive({ useHandCursor: true });

        hitArea.on('pointerover', () => gfx.setScale(1.03));
        hitArea.on('pointerout', () => gfx.setScale(1));
        hitArea.on('pointerdown', () => {
            AudioManager.resume();
            this.scene.start('GameScene', {
                character: UIManager.getSelectedCharacter(),
                theme: UIManager.getSelectedTheme()
            });
        });
    }

    drawPlatformLegend(w, h) {
        const gfx = this.add.graphics();
        const legendY = h * 0.93;
        const labelY = legendY + 14;
        const items = [
            { name: 'Normal', color: 0x59b535, highlight: 0x4a9e2d },
            { name: 'Moving', color: 0x5bb5e0, highlight: 0x4a9ec8 },
            { name: 'Break', color: 0xc8a060, highlight: 0xb08848 },
            { name: 'Spring', color: 0x59b535, highlight: 0x4a9e2d, isSpring: true },
            { name: 'Boost', color: 0xcc66cc, highlight: 0xaa44aa }
        ];
        const spacing = w / (items.length + 1);

        items.forEach((item, i) => {
            const ix = spacing * (i + 1);

            if (item.isSpring) {
                // Spring icon
                gfx.fillStyle(item.color, 1);
                gfx.fillRoundedRect(ix - 16, legendY - 2, 32, 6, 3);
                gfx.fillStyle(0xe8c020, 1);
                gfx.fillRoundedRect(ix - 5, legendY - 8, 10, 8, 2);
            } else {
                // Colored bar with glow style
                gfx.fillStyle(item.color, 1);
                gfx.fillRoundedRect(ix - 18, legendY - 2, 36, 6, 3);
                gfx.fillStyle(item.highlight, 0.6);
                gfx.fillRoundedRect(ix - 16, legendY - 1, 32, 3, 2);
            }

            // Label
            this.add.text(ix, labelY, item.name, {
                fontSize: '10px', fontFamily: 'Arial, sans-serif',
                color: '#888877'
            }).setOrigin(0.5, 0);
        });
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
        const popBg = this.add.rectangle(w / 2, h / 2, popW, popH, 0xf0ead0, 1)
            .setStrokeStyle(2, 0x59b535)
            .setDepth(101);

        // Title (no emoji)
        const title = this.add.text(w / 2, h / 2 - popH / 2 + 25, 'DAILY REWARD', {
            fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold', color: '#c8a020'
        }).setOrigin(0.5).setDepth(102);

        // Calendar
        const calY = h / 2 - popH / 2 + 65;
        const daySpacing = popW / 8;

        for (let i = 0; i < 7; i++) {
            const dayInfo = UIManager.dailyRewards[i];
            const dx = w / 2 - popW / 2 + daySpacing * (i + 1);
            const isCurrent = (i + 1) === rewardStatus.day;
            const isPast = (i + 1) < rewardStatus.day;

            const dayColor = isCurrent ? '#c8a020' : (isPast ? '#59b535' : '#666666');
            const dayBg = isCurrent ? 'rgba(200,160,32,0.2)' : (isPast ? 'rgba(89,181,53,0.15)' : 'rgba(0,0,0,0.05)');

            this.add.text(dx, calY, 'D' + (i + 1), {
                fontSize: '11px', fontFamily: 'Arial', fontStyle: 'bold', color: dayColor,
                backgroundColor: dayBg, padding: { x: 3, y: 2 }
            }).setOrigin(0.5).setDepth(102);

            this.add.text(dx, calY + 18, dayInfo.coins + ' coins', {
                fontSize: '9px', fontFamily: 'Arial', color: '#888877'
            }).setOrigin(0.5).setDepth(102);

            if (isPast) {
                // Draw a checkmark icon instead of emoji
                const checkGfx = this.add.graphics().setDepth(102);
                checkGfx.lineStyle(2, 0x59b535, 1);
                checkGfx.lineBetween(dx - 4, calY + 32, dx - 1, calY + 36);
                checkGfx.lineBetween(dx - 1, calY + 36, dx + 5, calY + 28);
            }
        }

        // Current reward info
        const currentReward = UIManager.dailyRewards[rewardStatus.day - 1];
        const infoY = h / 2 + 10;

        this.add.text(w / 2, infoY, 'Day ' + rewardStatus.day, {
            fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#333322'
        }).setOrigin(0.5).setDepth(102);

        this.add.text(w / 2, infoY + 30, currentReward.coins + ' Coins', {
            fontSize: '18px', fontFamily: 'Arial', color: '#c8a020'
        }).setOrigin(0.5).setDepth(102);

        if (currentReward.special) {
            this.add.text(w / 2, infoY + 55, currentReward.special, {
                fontSize: '12px', fontFamily: 'Arial', color: '#aa44aa'
            }).setOrigin(0.5).setDepth(102);
        }

        // Claim or Close button
        if (rewardStatus.canClaim) {
            const claimBtn = this.add.text(w / 2, infoY + 90, 'CLAIM', {
                fontSize: '20px', fontFamily: 'Arial', fontStyle: 'bold', color: '#ffffff',
                backgroundColor: '#59b535', padding: { x: 24, y: 8 }
            }).setOrigin(0.5).setDepth(102).setInteractive({ useHandCursor: true });

            claimBtn.on('pointerdown', () => {
                const reward = UIManager.claimDailyReward();
                AudioManager.playCoin();
                claimBtn.setText('Claimed +' + reward.coins);
                claimBtn.setStyle({ backgroundColor: '#4a9e2d' });
                claimBtn.removeInteractive();
                this.coinText.setText(UIManager.getCoins());

                this.time.delayedCall(1200, () => {
                    this.destroyPopup();
                });
            });
        } else {
            this.add.text(w / 2, infoY + 80, 'Already claimed today!', {
                fontSize: '14px', fontFamily: 'Arial', color: '#888877'
            }).setOrigin(0.5).setDepth(102);
        }

        // Close button (X text, not emoji)
        const closeBtn = this.add.text(w / 2 + popW / 2 - 15, h / 2 - popH / 2 + 10, 'X', {
            fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#ff4444'
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
        // Light graph paper background (Doodle Jump style)
        this.cameras.main.setBackgroundColor('#f5f0e0');
        this.bgGraphics = this.add.graphics();

        // Graph paper grid lines
        this.bgGraphics.lineStyle(1, 0xd0c8b0, 0.3);
        for (let x = 0; x < w; x += 20) {
            this.bgGraphics.lineBetween(x, 0, x, h);
        }
        for (let y = 0; y < h; y += 20) {
            this.bgGraphics.lineBetween(0, y, w, y);
        }
        this.bgGraphics.setScrollFactor(0);
    }

    setupPhysics(w, h) {
        this.physics.world.gravity.y = 900;
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
        // Death counter (initialize)
        this.deathCount = 0;

        // Score - large dark green number, top-left
        this.scoreText = this.add.text(15, 15, '0', {
            fontSize: '32px', fontFamily: 'Arial', fontStyle: 'bold', color: '#4a8030'
        }).setScrollFactor(0).setDepth(20);

        // Best score - on a light green bg, top-right
        const best = UIManager.getBestScore();
        const bestBg = this.add.graphics().setScrollFactor(0).setDepth(19);
        bestBg.fillStyle(0x59b535, 0.3);
        bestBg.fillRoundedRect(w - 145, 10, 140, 28, 6);
        bestBg.lineStyle(1, 0x59b535, 0.5);
        bestBg.strokeRoundedRect(w - 145, 10, 140, 28, 6);

        this.bestText = this.add.text(w - 75, 24, 'BEST: ' + best.toLocaleString(), {
            fontSize: '13px', fontFamily: 'Arial', fontStyle: 'bold', color: '#c8a020'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);

        // Level text (smaller, below best)
        this.levelText = this.add.text(w - 10, 42, 'Level 1', {
            fontSize: '11px', fontFamily: 'Arial', color: '#888877'
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(20);

        // Skull icon + death count - bottom-left (drawn skull icon)
        this.skullGfx = this.add.graphics().setScrollFactor(0).setDepth(20);
        this.drawSkullIcon(this.skullGfx, 18, h - 22);

        this.deathText = this.add.text(34, h - 30, '0', {
            fontSize: '14px', fontFamily: 'Arial', fontStyle: 'bold', color: '#555544'
        }).setScrollFactor(0).setDepth(20);
    }

    drawSkullIcon(gfx, x, y) {
        // Skull head
        gfx.fillStyle(0x888877, 1);
        gfx.fillCircle(x, y - 3, 8);
        // Jaw
        gfx.fillStyle(0x888877, 1);
        gfx.fillRoundedRect(x - 6, y + 1, 12, 6, 2);
        // Eyes
        gfx.fillStyle(0x333322, 1);
        gfx.fillCircle(x - 3, y - 4, 2.5);
        gfx.fillCircle(x + 3, y - 4, 2.5);
        // Nose
        gfx.fillStyle(0x333322, 1);
        gfx.fillTriangle(x - 1, y, x + 1, y, x, y + 2);
        // Teeth lines
        gfx.lineStyle(1, 0x333322, 0.8);
        gfx.lineBetween(x - 2, y + 2, x - 2, y + 6);
        gfx.lineBetween(x + 2, y + 2, x + 2, y + 6);
    }

    setupControls(w, h) {
        this.cursors = this.input.keyboard.createCursorKeys();

        // Invisible half-screen touch zones (left half = move left, right half = move right)
        const leftZone = this.add.rectangle(w / 4, h / 2, w / 2, h, 0x000000, 0)
            .setScrollFactor(0).setDepth(30).setInteractive();
        const rightZone = this.add.rectangle(w * 3 / 4, h / 2, w / 2, h, 0x000000, 0)
            .setScrollFactor(0).setDepth(30).setInteractive();

        leftZone.on('pointerdown', () => { this.touchLeft = true; });
        leftZone.on('pointerup', () => { this.touchLeft = false; });
        leftZone.on('pointerout', () => { this.touchLeft = false; });

        rightZone.on('pointerdown', () => { this.touchRight = true; });
        rightZone.on('pointerup', () => { this.touchRight = false; });
        rightZone.on('pointerout', () => { this.touchRight = false; });
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
        this.scoreText.setText(this.score);

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
            this.shieldGraphic.lineStyle(2, 0x5bb5e0, 0.5);
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
        const color = 0x88cc44;

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

        // Increment death counter
        this.deathCount++;
        if (this.deathText) {
            this.deathText.setText(this.deathCount);
        }

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

        // Light background with graph paper
        this.cameras.main.setBackgroundColor('#f5f0e0');

        // Draw graph paper grid
        const gridGfx = this.add.graphics();
        gridGfx.lineStyle(1, 0xd0c8b0, 0.3);
        for (let x = 0; x < w; x += 20) {
            gridGfx.lineBetween(x, 0, x, h);
        }
        for (let y = 0; y < h; y += 20) {
            gridGfx.lineBetween(0, y, w, y);
        }

        this.add.text(w / 2, h * 0.2, 'GAME OVER', {
            fontSize: Math.min(42, w * 0.09) + 'px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            color: '#cc3333',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(w / 2, h * 0.35, 'Score: ' + this.finalScore, {
            fontSize: '28px', fontFamily: 'Arial', fontStyle: 'bold', color: '#333322'
        }).setOrigin(0.5);

        this.add.text(w / 2, h * 0.43, 'Best: ' + this.bestScore, {
            fontSize: '20px', fontFamily: 'Arial', color: '#c8a020'
        }).setOrigin(0.5);

        if (this.finalScore >= this.bestScore && this.finalScore > 0) {
            // Draw trophy icon instead of emoji
            const trophyGfx = this.add.graphics();
            trophyGfx.fillStyle(0xc8a020, 1);
            trophyGfx.fillRoundedRect(w / 2 - 8, h * 0.50 - 8, 16, 14, 3);
            trophyGfx.lineStyle(2, 0xc8a020, 1);
            trophyGfx.strokeCircle(w / 2 - 10, h * 0.50 - 1, 4);
            trophyGfx.strokeCircle(w / 2 + 10, h * 0.50 - 1, 4);
            trophyGfx.fillRect(w / 2 - 5, h * 0.50 + 6, 10, 3);
            trophyGfx.fillRect(w / 2 - 8, h * 0.50 + 9, 16, 2);

            this.add.text(w / 2 + 20, h * 0.50, 'NEW RECORD!', {
                fontSize: '16px', fontFamily: 'Arial', fontStyle: 'bold', color: '#c8a020'
            }).setOrigin(0, 0.5);
        }

        // Level reached
        const levelReached = LevelConfig.getCurrentLevelForScore(this.finalScore);
        this.add.text(w / 2, h * 0.56, 'Level Reached: ' + levelReached.id, {
            fontSize: '16px', fontFamily: 'Arial', color: '#888877'
        }).setOrigin(0.5);

        // Restart button
        const restartGfx = this.add.graphics();
        // Draw circular arrow icon
        restartGfx.lineStyle(3, 0x59b535, 1);
        restartGfx.beginPath();
        restartGfx.arc(w / 2 - 60, h * 0.68, 8, -0.5, 4.5, false);
        restartGfx.strokePath();
        // Arrow head
        restartGfx.fillStyle(0x59b535, 1);
        restartGfx.fillTriangle(w / 2 - 55, h * 0.68 - 10, w / 2 - 52, h * 0.68 - 4, w / 2 - 58, h * 0.68 - 4);

        const restartBtn = this.add.text(w / 2 + 10, h * 0.68, 'RESTART', {
            fontSize: '22px', fontFamily: 'Arial', fontStyle: 'bold', color: '#ffffff',
            backgroundColor: '#59b535', padding: { x: 24, y: 12 }
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
        const homeGfx = this.add.graphics();
        // Draw house icon
        homeGfx.fillStyle(0x5bb5e0, 1);
        homeGfx.fillTriangle(w / 2 - 52, h * 0.80 - 2, w / 2 - 42, h * 0.80 - 10, w / 2 - 32, h * 0.80 - 2);
        homeGfx.fillRect(w / 2 - 49, h * 0.80 - 2, 14, 10);

        const menuBtn = this.add.text(w / 2 + 10, h * 0.80, 'MENU', {
            fontSize: '18px', fontFamily: 'Arial', fontStyle: 'bold', color: '#ffffff',
            backgroundColor: '#5bb5e0', padding: { x: 24, y: 10 }
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
    backgroundColor: '#f5f0e0',
    fps: {
        target: 30,
        forceSetTimeOut: true
    },
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
