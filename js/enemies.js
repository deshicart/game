// enemies.js - Enemy creation and management

const EnemyManager = {
    createEnemyTextures(scene) {
        const gfx = scene.make.graphics({ add: false });
        // Simple round monster (Doodle Jump style) - dark body with eyes
        gfx.fillStyle(0x884422, 1);
        gfx.fillCircle(15, 15, 13);
        // Lighter belly
        gfx.fillStyle(0xaa6633, 1);
        gfx.fillCircle(15, 18, 8);
        // Eyes - white with dark pupils
        gfx.fillStyle(0xffffff, 1);
        gfx.fillCircle(10, 12, 5);
        gfx.fillCircle(20, 12, 5);
        gfx.fillStyle(0x222222, 1);
        gfx.fillCircle(11, 12, 2.5);
        gfx.fillCircle(21, 12, 2.5);
        // Small horns/bumps on top
        gfx.fillStyle(0x884422, 1);
        gfx.fillCircle(8, 4, 4);
        gfx.fillCircle(22, 4, 4);
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
        const dt = scene.game.loop.delta / 1000;
        scene.enemies.children.iterate((enemy) => {
            if (enemy) {
                enemy.x += enemy.moveDir * enemy.moveSpeed * dt;
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
