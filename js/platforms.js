// platforms.js - Platform creation and management

const PlatformManager = {
    createPlatformTextures(scene) {
        const theme = scene.selectedTheme || 'classic';

        // Static platform - green neon glow
        const staticGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            // Outer glow
            staticGfx.fillStyle(0x00ff88, 0.15);
            staticGfx.fillRoundedRect(0, 0, 100, 18, 9);
            // Main body
            staticGfx.fillStyle(0x00dd77, 1);
            staticGfx.fillRoundedRect(2, 2, 96, 14, 7);
            // Inner highlight
            staticGfx.fillStyle(0x00ff99, 0.6);
            staticGfx.fillRoundedRect(6, 3, 88, 6, 3);
            // Border glow
            staticGfx.lineStyle(1, 0x00ffaa, 0.8);
            staticGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        } else if (theme === 'space') {
            staticGfx.fillStyle(0x00dd77, 0.15);
            staticGfx.fillRoundedRect(0, 0, 100, 18, 9);
            staticGfx.fillStyle(0x00bb66, 1);
            staticGfx.fillRoundedRect(2, 2, 96, 14, 7);
            staticGfx.fillStyle(0x00dd88, 0.6);
            staticGfx.fillRoundedRect(6, 3, 88, 6, 3);
            staticGfx.lineStyle(1, 0x00ff99, 0.6);
            staticGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        } else {
            staticGfx.fillStyle(0x00ff88, 0.15);
            staticGfx.fillRoundedRect(0, 0, 100, 18, 9);
            staticGfx.fillStyle(0x00dd77, 1);
            staticGfx.fillRoundedRect(2, 2, 96, 14, 7);
            staticGfx.fillStyle(0x00ff99, 0.6);
            staticGfx.fillRoundedRect(6, 3, 88, 6, 3);
            staticGfx.lineStyle(1, 0x00ffaa, 0.8);
            staticGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        }
        staticGfx.generateTexture('platform_static', 100, 18);
        staticGfx.destroy();

        // Moving platform - cyan/blue neon glow
        const movGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            movGfx.fillStyle(0x00ccff, 0.15);
            movGfx.fillRoundedRect(0, 0, 100, 18, 9);
            movGfx.fillStyle(0x00aadd, 1);
            movGfx.fillRoundedRect(2, 2, 96, 14, 7);
            movGfx.fillStyle(0x00ddff, 0.6);
            movGfx.fillRoundedRect(6, 3, 88, 6, 3);
            movGfx.lineStyle(1, 0x00eeff, 0.8);
            movGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        } else if (theme === 'space') {
            movGfx.fillStyle(0x00ccff, 0.15);
            movGfx.fillRoundedRect(0, 0, 100, 18, 9);
            movGfx.fillStyle(0x0088cc, 1);
            movGfx.fillRoundedRect(2, 2, 96, 14, 7);
            movGfx.fillStyle(0x00bbff, 0.6);
            movGfx.fillRoundedRect(6, 3, 88, 6, 3);
            movGfx.lineStyle(1, 0x00ddff, 0.6);
            movGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        } else {
            movGfx.fillStyle(0x00ccff, 0.15);
            movGfx.fillRoundedRect(0, 0, 100, 18, 9);
            movGfx.fillStyle(0x00aadd, 1);
            movGfx.fillRoundedRect(2, 2, 96, 14, 7);
            movGfx.fillStyle(0x00ddff, 0.6);
            movGfx.fillRoundedRect(6, 3, 88, 6, 3);
            movGfx.lineStyle(1, 0x00eeff, 0.8);
            movGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        }
        movGfx.generateTexture('platform_moving', 100, 18);
        movGfx.destroy();

        // Breakable platform - red/orange neon
        const brkGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            brkGfx.fillStyle(0xff4444, 0.15);
            brkGfx.fillRoundedRect(0, 0, 100, 18, 9);
            brkGfx.fillStyle(0xcc3333, 0.9);
            brkGfx.fillRoundedRect(2, 2, 96, 14, 7);
            brkGfx.fillStyle(0xff5555, 0.5);
            brkGfx.fillRoundedRect(6, 3, 88, 6, 3);
            brkGfx.lineStyle(1, 0xff6666, 0.6);
            brkGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        } else if (theme === 'space') {
            brkGfx.fillStyle(0xcc6644, 0.15);
            brkGfx.fillRoundedRect(0, 0, 100, 18, 9);
            brkGfx.fillStyle(0xaa5533, 0.9);
            brkGfx.fillRoundedRect(2, 2, 96, 14, 7);
            brkGfx.fillStyle(0xcc7755, 0.5);
            brkGfx.fillRoundedRect(6, 3, 88, 6, 3);
        } else {
            brkGfx.fillStyle(0xff4444, 0.15);
            brkGfx.fillRoundedRect(0, 0, 100, 18, 9);
            brkGfx.fillStyle(0xcc3333, 0.9);
            brkGfx.fillRoundedRect(2, 2, 96, 14, 7);
            brkGfx.fillStyle(0xff5555, 0.5);
            brkGfx.fillRoundedRect(6, 3, 88, 6, 3);
            brkGfx.lineStyle(1, 0xff6666, 0.6);
            brkGfx.strokeRoundedRect(2, 2, 96, 14, 7);
        }
        brkGfx.generateTexture('platform_breakable', 100, 18);
        brkGfx.destroy();

        // Spring platform
        const sprGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            sprGfx.fillStyle(0x00ff88, 0.15);
            sprGfx.fillRoundedRect(0, 12, 100, 18, 9);
            sprGfx.fillStyle(0x00dd77, 1);
            sprGfx.fillRoundedRect(2, 14, 96, 14, 7);
            sprGfx.fillStyle(0x00ff99, 0.6);
            sprGfx.fillRoundedRect(6, 15, 88, 6, 3);
            sprGfx.lineStyle(1, 0x00ffaa, 0.8);
            sprGfx.strokeRoundedRect(2, 14, 96, 14, 7);
            // Spring coil
            sprGfx.fillStyle(0xffdd00, 1);
            sprGfx.fillRoundedRect(38, 0, 24, 14, 4);
            sprGfx.fillStyle(0xffee44, 0.8);
            sprGfx.fillRoundedRect(40, 2, 20, 4, 2);
        } else if (theme === 'space') {
            sprGfx.fillStyle(0x00bb66, 0.15);
            sprGfx.fillRoundedRect(0, 12, 100, 18, 9);
            sprGfx.fillStyle(0x00bb66, 1);
            sprGfx.fillRoundedRect(2, 14, 96, 14, 7);
            sprGfx.fillStyle(0xffcc44, 1);
            sprGfx.fillRoundedRect(38, 0, 24, 14, 4);
        } else {
            sprGfx.fillStyle(0x00ff88, 0.15);
            sprGfx.fillRoundedRect(0, 12, 100, 18, 9);
            sprGfx.fillStyle(0x00dd77, 1);
            sprGfx.fillRoundedRect(2, 14, 96, 14, 7);
            sprGfx.fillStyle(0x00ff99, 0.6);
            sprGfx.fillRoundedRect(6, 15, 88, 6, 3);
            sprGfx.lineStyle(1, 0x00ffaa, 0.8);
            sprGfx.strokeRoundedRect(2, 14, 96, 14, 7);
            sprGfx.fillStyle(0xffdd00, 1);
            sprGfx.fillRoundedRect(38, 0, 24, 14, 4);
        }
        sprGfx.generateTexture('platform_spring', 100, 30);
        sprGfx.destroy();
    },

    createPlatform(scene, x, y, type) {
        let textureKey;
        switch (type) {
            case 'moving': textureKey = 'platform_moving'; break;
            case 'breakable': textureKey = 'platform_breakable'; break;
            case 'spring': textureKey = 'platform_spring'; break;
            default: textureKey = 'platform_static'; break;
        }

        const platform = scene.platforms.create(x, y, textureKey);
        platform.platformType = type;
        platform.body.immovable = true;
        platform.body.allowGravity = false;
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;

        if (type === 'moving') {
            platform.moveSpeed = Phaser.Math.Between(40, 80) * (scene.currentLevel ? scene.currentLevel.speed : 1);
            platform.moveDir = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
        }

        return platform;
    },

    generatePlatforms(scene, startY, endY, levelConfig) {
        const gameWidth = scene.scale.width;
        const gap = levelConfig ? levelConfig.platformGap : 90;
        let y = startY;

        while (y > endY) {
            const x = Phaser.Math.Between(50, gameWidth - 50);
            const rand = Math.random();
            let type = 'static';

            if (levelConfig) {
                if (rand < levelConfig.breakableChance) {
                    type = 'breakable';
                } else if (rand < levelConfig.breakableChance + levelConfig.movingChance) {
                    type = 'moving';
                } else if (rand < levelConfig.breakableChance + levelConfig.movingChance + levelConfig.springChance) {
                    type = 'spring';
                }
            }

            this.createPlatform(scene, x, y, type);
            y -= Phaser.Math.Between(gap - 20, gap + 20);
        }
    },

    updateMovingPlatforms(scene) {
        const gameWidth = scene.scale.width;
        const dt = scene.game.loop.delta / 1000;
        scene.platforms.children.iterate((platform) => {
            if (platform && platform.platformType === 'moving') {
                platform.x += platform.moveDir * platform.moveSpeed * dt;
                platform.body.updateFromGameObject();
                if (platform.x < 40 || platform.x > gameWidth - 40) {
                    platform.moveDir *= -1;
                }
            }
        });
    }
};
