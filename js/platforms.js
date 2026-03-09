// platforms.js - Platform creation and management

const PlatformManager = {
    createPlatformTextures(scene) {
        const theme = scene.selectedTheme || 'classic';

        // Static platform
        const staticGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            staticGfx.fillStyle(0x00ffcc, 1);
            staticGfx.fillRoundedRect(0, 0, 80, 15, 4);
            staticGfx.lineStyle(2, 0x00ffff, 0.8);
            staticGfx.strokeRoundedRect(0, 0, 80, 15, 4);
        } else if (theme === 'space') {
            staticGfx.fillStyle(0x8888cc, 1);
            staticGfx.fillRoundedRect(0, 0, 80, 15, 6);
            staticGfx.lineStyle(2, 0xaaaaff, 0.6);
            staticGfx.strokeRoundedRect(0, 0, 80, 15, 6);
        } else {
            staticGfx.fillStyle(0x44bb44, 1);
            staticGfx.fillRoundedRect(0, 0, 80, 15, 3);
        }
        staticGfx.generateTexture('platform_static', 80, 15);
        staticGfx.destroy();

        // Moving platform
        const movGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            movGfx.fillStyle(0xff00ff, 1);
            movGfx.fillRoundedRect(0, 0, 80, 15, 4);
            movGfx.lineStyle(2, 0xff66ff, 0.8);
            movGfx.strokeRoundedRect(0, 0, 80, 15, 4);
        } else if (theme === 'space') {
            movGfx.fillStyle(0x6666dd, 1);
            movGfx.fillRoundedRect(0, 0, 80, 15, 6);
            movGfx.lineStyle(2, 0x9999ff, 0.6);
            movGfx.strokeRoundedRect(0, 0, 80, 15, 6);
        } else {
            movGfx.fillStyle(0x4488dd, 1);
            movGfx.fillRoundedRect(0, 0, 80, 15, 3);
        }
        movGfx.generateTexture('platform_moving', 80, 15);
        movGfx.destroy();

        // Breakable platform
        const brkGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            brkGfx.fillStyle(0xff4444, 0.8);
            brkGfx.fillRoundedRect(0, 0, 80, 15, 4);
            brkGfx.lineStyle(1, 0xff6666, 0.5);
            brkGfx.strokeRoundedRect(0, 0, 80, 15, 4);
        } else if (theme === 'space') {
            brkGfx.fillStyle(0xcc6644, 0.8);
            brkGfx.fillRoundedRect(0, 0, 80, 15, 6);
        } else {
            brkGfx.fillStyle(0xbb8844, 1);
            brkGfx.fillRoundedRect(0, 0, 80, 15, 3);
            // Draw crack lines
            brkGfx.lineStyle(1, 0x886633, 1);
            brkGfx.lineBetween(20, 0, 35, 15);
            brkGfx.lineBetween(50, 0, 45, 15);
        }
        brkGfx.generateTexture('platform_breakable', 80, 15);
        brkGfx.destroy();

        // Spring platform
        const sprGfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            sprGfx.fillStyle(0x00ffcc, 1);
            sprGfx.fillRoundedRect(0, 10, 80, 15, 4);
            sprGfx.fillStyle(0xffff00, 1);
            sprGfx.fillRoundedRect(30, 0, 20, 12, 3);
        } else if (theme === 'space') {
            sprGfx.fillStyle(0x8888cc, 1);
            sprGfx.fillRoundedRect(0, 10, 80, 15, 6);
            sprGfx.fillStyle(0xffcc44, 1);
            sprGfx.fillRoundedRect(30, 0, 20, 12, 3);
        } else {
            sprGfx.fillStyle(0x44bb44, 1);
            sprGfx.fillRoundedRect(0, 10, 80, 15, 3);
            sprGfx.fillStyle(0xff6600, 1);
            sprGfx.fillRoundedRect(30, 0, 20, 12, 3);
        }
        sprGfx.generateTexture('platform_spring', 80, 25);
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
        scene.platforms.children.iterate((platform) => {
            if (platform && platform.platformType === 'moving') {
                platform.x += platform.moveDir * platform.moveSpeed * (1 / 60);
                platform.body.updateFromGameObject();
                if (platform.x < 40 || platform.x > gameWidth - 40) {
                    platform.moveDir *= -1;
                }
            }
        });
    }
};
