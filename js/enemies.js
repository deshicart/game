// enemies.js - Enemy creation and management

const EnemyManager = {
    createEnemyTextures(scene) {
        const theme = scene.selectedTheme || 'classic';

        const gfx = scene.make.graphics({ add: false });
        if (theme === 'neon') {
            gfx.fillStyle(0xff0055, 1);
            gfx.fillCircle(15, 15, 15);
            gfx.fillStyle(0xff3388, 1);
            gfx.fillCircle(8, 10, 4);
            gfx.fillCircle(22, 10, 4);
            gfx.lineStyle(2, 0xff0055, 0.5);
            gfx.strokeCircle(15, 15, 17);
        } else if (theme === 'space') {
            gfx.fillStyle(0xdd4444, 1);
            gfx.fillCircle(15, 15, 14);
            gfx.fillStyle(0xff8888, 1);
            gfx.fillCircle(8, 11, 4);
            gfx.fillCircle(22, 11, 4);
            // Antenna
            gfx.lineStyle(2, 0xdd4444, 1);
            gfx.lineBetween(15, 1, 15, -5);
            gfx.fillCircle(15, -5, 3);
        } else {
            gfx.fillStyle(0xcc3333, 1);
            gfx.fillCircle(15, 15, 13);
            gfx.fillStyle(0xffffff, 1);
            gfx.fillCircle(9, 12, 4);
            gfx.fillCircle(21, 12, 4);
            gfx.fillStyle(0x000000, 1);
            gfx.fillCircle(10, 12, 2);
            gfx.fillCircle(22, 12, 2);
        }
        gfx.generateTexture('enemy', 30, 30);
        gfx.destroy();
    },

    spawnEnemy(scene, x, y) {
        const enemy = scene.enemies.create(x, y, 'enemy');
        enemy.body.allowGravity = false;
        enemy.body.immovable = true;
        enemy.moveSpeed = Phaser.Math.Between(30, 60);
        enemy.moveDir = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
        return enemy;
    },

    updateEnemies(scene) {
        const gameWidth = scene.scale.width;
        scene.enemies.children.iterate((enemy) => {
            if (enemy) {
                enemy.x += enemy.moveDir * enemy.moveSpeed * (1 / 60);
                enemy.body.updateFromGameObject();
                if (enemy.x < 20 || enemy.x > gameWidth - 20) {
                    enemy.moveDir *= -1;
                }
            }
        });
    },

    trySpawnEnemy(scene, x, y, chance) {
        if (Math.random() < chance) {
            this.spawnEnemy(scene, x, y - 35);
        }
    }
};
