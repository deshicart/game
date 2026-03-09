// player.js - Player character creation and management

const PlayerManager = {
    characters: [
        {
            id: 'classic',
            name: 'Classic Hero',
            description: 'Simple neon character',
            colors: { body: 0x00ff88, outline: 0x00ffaa, eye: 0xffffff, pupil: 0x000000 },
            cost: 0
        },
        {
            id: 'modern',
            name: 'Modern Runner',
            description: 'Futuristic glowing character',
            colors: { body: 0x00ccff, outline: 0x44ddff, eye: 0xffffff, pupil: 0x0044ff },
            cost: 500
        },
        {
            id: 'space',
            name: 'Space Explorer',
            description: 'Astronaut-style neon character',
            colors: { body: 0xddddff, outline: 0xaaaaff, eye: 0x88ff88, pupil: 0x004400, helmet: 0x4444ff },
            cost: 1000
        }
    ],

    getCharacter(id) {
        return this.characters.find(c => c.id === id) || this.characters[0];
    },

    createPlayerTexture(scene, characterId) {
        const char = this.getCharacter(characterId);
        const c = char.colors;
        const gfx = scene.make.graphics({ add: false });

        if (characterId === 'space') {
            // Helmet
            gfx.fillStyle(c.helmet, 0.3);
            gfx.fillCircle(16, 12, 14);
            gfx.lineStyle(2, c.outline, 0.8);
            gfx.strokeCircle(16, 12, 14);
            // Body
            gfx.fillStyle(c.body, 1);
            gfx.fillRoundedRect(6, 8, 20, 24, 4);
            // Visor
            gfx.fillStyle(c.eye, 0.6);
            gfx.fillRoundedRect(8, 8, 16, 10, 3);
            // Eyes
            gfx.fillStyle(c.pupil, 1);
            gfx.fillCircle(12, 13, 2);
            gfx.fillCircle(20, 13, 2);
            // Legs
            gfx.fillStyle(c.body, 1);
            gfx.fillRect(9, 30, 5, 6);
            gfx.fillRect(18, 30, 5, 6);
        } else if (characterId === 'modern') {
            // Glow effect
            gfx.fillStyle(c.outline, 0.15);
            gfx.fillCircle(16, 16, 18);
            // Body
            gfx.fillStyle(c.body, 1);
            gfx.fillRoundedRect(6, 4, 20, 24, 6);
            // Eyes (visor style)
            gfx.fillStyle(c.eye, 0.9);
            gfx.fillRoundedRect(8, 10, 16, 6, 3);
            gfx.fillStyle(c.pupil, 1);
            gfx.fillCircle(13, 13, 2);
            gfx.fillCircle(19, 13, 2);
            // Legs
            gfx.fillStyle(c.body, 0.8);
            gfx.fillRoundedRect(8, 26, 6, 8, 2);
            gfx.fillRoundedRect(18, 26, 6, 8, 2);
            // Glow lines
            gfx.lineStyle(1, c.outline, 0.6);
            gfx.lineBetween(6, 20, 26, 20);
        } else {
            // Classic Hero
            // Body
            gfx.fillStyle(c.body, 1);
            gfx.fillRoundedRect(6, 4, 20, 22, 5);
            // Eyes
            gfx.fillStyle(c.eye, 1);
            gfx.fillCircle(12, 12, 4);
            gfx.fillCircle(20, 12, 4);
            gfx.fillStyle(c.pupil, 1);
            gfx.fillCircle(13, 12, 2);
            gfx.fillCircle(21, 12, 2);
            // Legs
            gfx.fillStyle(c.body, 1);
            gfx.fillRect(9, 24, 5, 8);
            gfx.fillRect(18, 24, 5, 8);
            // Outline glow
            gfx.lineStyle(1, c.outline, 0.5);
            gfx.strokeRoundedRect(6, 4, 20, 22, 5);
        }

        gfx.generateTexture('player', 32, 36);
        gfx.destroy();
    },

    createPlayer(scene, x, y) {
        const player = scene.physics.add.sprite(x, y, 'player');
        player.setCollideWorldBounds(true);
        player.body.setSize(20, 30);
        player.body.setOffset(6, 4);
        player.hasJetpack = false;
        player.hasShield = false;
        player.jetpackTimer = 0;
        player.shieldTimer = 0;
        return player;
    },

    handleInput(scene, player) {
        const speed = 250;

        if (scene.cursors.left.isDown || scene.touchLeft) {
            player.setVelocityX(-speed);
            player.setFlipX(true);
        } else if (scene.cursors.right.isDown || scene.touchRight) {
            player.setVelocityX(speed);
            player.setFlipX(false);
        } else {
            player.setVelocityX(0);
        }

        // Wrap around screen
        const gameWidth = scene.scale.width;
        if (player.x < -16) {
            player.x = gameWidth + 16;
        } else if (player.x > gameWidth + 16) {
            player.x = -16;
        }

        // Jetpack
        if (player.hasJetpack) {
            player.jetpackTimer -= scene.game.loop.delta;
            if (player.jetpackTimer <= 0) {
                player.hasJetpack = false;
            } else {
                player.setVelocityY(-350);
            }
        }

        // Shield timer
        if (player.hasShield) {
            player.shieldTimer -= scene.game.loop.delta;
            if (player.shieldTimer <= 0) {
                player.hasShield = false;
                if (scene.shieldGraphic) {
                    scene.shieldGraphic.setVisible(false);
                }
            }
        }
    },

    createPowerUpTextures(scene) {
        // Jetpack
        const jetGfx = scene.make.graphics({ add: false });
        jetGfx.fillStyle(0xff8800, 1);
        jetGfx.fillRoundedRect(2, 2, 16, 22, 3);
        jetGfx.fillStyle(0xffcc00, 1);
        jetGfx.fillTriangle(6, 24, 10, 30, 14, 24);
        jetGfx.generateTexture('powerup_jetpack', 20, 32);
        jetGfx.destroy();

        // Shield
        const shieldGfx = scene.make.graphics({ add: false });
        shieldGfx.fillStyle(0x4488ff, 0.6);
        shieldGfx.fillCircle(12, 12, 12);
        shieldGfx.lineStyle(2, 0x66aaff, 1);
        shieldGfx.strokeCircle(12, 12, 12);
        shieldGfx.generateTexture('powerup_shield', 24, 24);
        shieldGfx.destroy();
    }
};
