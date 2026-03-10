// platforms.js - Platform creation and management

const PlatformManager = {
    createPlatformTextures(scene) {
        // Static platform - simple bright green (Doodle Jump style)
        const staticGfx = scene.make.graphics({ add: false });
        staticGfx.fillStyle(0x59b535, 1);
        staticGfx.fillRoundedRect(0, 2, 100, 14, 7);
        staticGfx.fillStyle(0x4a9e2d, 1);
        staticGfx.fillRoundedRect(0, 8, 100, 8, 5);
        staticGfx.generateTexture('platform_static', 100, 18);
        staticGfx.destroy();

        // Moving platform - light blue
        const movGfx = scene.make.graphics({ add: false });
        movGfx.fillStyle(0x5bb5e0, 1);
        movGfx.fillRoundedRect(0, 2, 100, 14, 7);
        movGfx.fillStyle(0x4a9ec8, 1);
        movGfx.fillRoundedRect(0, 8, 100, 8, 5);
        movGfx.generateTexture('platform_moving', 100, 18);
        movGfx.destroy();

        // Breakable platform - brown/tan with crack lines
        const brkGfx = scene.make.graphics({ add: false });
        brkGfx.fillStyle(0xc8a060, 1);
        brkGfx.fillRoundedRect(0, 2, 100, 14, 7);
        brkGfx.fillStyle(0xb08848, 1);
        brkGfx.fillRoundedRect(0, 8, 100, 8, 5);
        // Crack lines
        brkGfx.lineStyle(1, 0x806030, 0.6);
        brkGfx.lineBetween(30, 4, 35, 12);
        brkGfx.lineBetween(65, 3, 60, 13);
        brkGfx.generateTexture('platform_breakable', 100, 18);
        brkGfx.destroy();

        // Spring platform - green base with yellow spring
        const sprGfx = scene.make.graphics({ add: false });
        sprGfx.fillStyle(0x59b535, 1);
        sprGfx.fillRoundedRect(0, 14, 100, 14, 7);
        sprGfx.fillStyle(0x4a9e2d, 1);
        sprGfx.fillRoundedRect(0, 20, 100, 8, 5);
        // Spring coil
        sprGfx.fillStyle(0xe8c020, 1);
        sprGfx.fillRoundedRect(38, 2, 24, 14, 4);
        sprGfx.fillStyle(0xd0a818, 1);
        sprGfx.fillRoundedRect(40, 8, 20, 6, 2);
        // Spring coil lines
        sprGfx.lineStyle(1, 0xc89810, 0.7);
        sprGfx.lineBetween(42, 4, 42, 12);
        sprGfx.lineBetween(50, 4, 50, 12);
        sprGfx.lineBetween(58, 4, 58, 12);
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
