// levels.js - Level configuration and progression

const LevelConfig = {
    levels: [
        { id: 1, name: 'Level 1', unlockScore: 0, speed: 1.0, enemyChance: 0.02, breakableChance: 0.05, movingChance: 0.1, springChance: 0.08, platformGap: 90 },
        { id: 2, name: 'Level 2', unlockScore: 2000, speed: 1.1, enemyChance: 0.04, breakableChance: 0.08, movingChance: 0.15, springChance: 0.08, platformGap: 95 },
        { id: 3, name: 'Level 3', unlockScore: 3000, speed: 1.2, enemyChance: 0.06, breakableChance: 0.10, movingChance: 0.18, springChance: 0.07, platformGap: 100 },
        { id: 4, name: 'Level 4', unlockScore: 4000, speed: 1.3, enemyChance: 0.08, breakableChance: 0.12, movingChance: 0.20, springChance: 0.07, platformGap: 105 },
        { id: 5, name: 'Level 5', unlockScore: 5000, speed: 1.4, enemyChance: 0.10, breakableChance: 0.15, movingChance: 0.22, springChance: 0.06, platformGap: 110 },
        { id: 6, name: 'Level 6', unlockScore: 6000, speed: 1.5, enemyChance: 0.12, breakableChance: 0.18, movingChance: 0.25, springChance: 0.06, platformGap: 115 },
        { id: 7, name: 'Level 7', unlockScore: 7000, speed: 1.6, enemyChance: 0.14, breakableChance: 0.20, movingChance: 0.28, springChance: 0.05, platformGap: 120 },
        { id: 8, name: 'Level 8', unlockScore: 8000, speed: 1.7, enemyChance: 0.16, breakableChance: 0.22, movingChance: 0.30, springChance: 0.05, platformGap: 125 },
        { id: 9, name: 'Level 9', unlockScore: 9000, speed: 1.8, enemyChance: 0.18, breakableChance: 0.25, movingChance: 0.32, springChance: 0.04, platformGap: 130 },
        { id: 10, name: 'Level 10', unlockScore: 10000, speed: 2.0, enemyChance: 0.20, breakableChance: 0.28, movingChance: 0.35, springChance: 0.04, platformGap: 135 }
    ],

    getLevel(id) {
        return this.levels.find(l => l.id === id) || this.levels[0];
    },

    getUnlockedLevels(bestScore) {
        return this.levels.filter(l => bestScore >= l.unlockScore);
    },

    getCurrentLevelForScore(score) {
        let current = this.levels[0];
        for (const level of this.levels) {
            if (score >= level.unlockScore) {
                current = level;
            }
        }
        return current;
    }
};
