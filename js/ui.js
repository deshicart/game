// ui.js - UI management, menus, daily rewards

const UIManager = {
    // Storage keys
    KEYS: {
        BEST_SCORE: 'neonJump_bestScore',
        UNLOCKED_LEVELS: 'neonJump_unlockedLevels',
        SELECTED_CHARACTER: 'neonJump_selectedCharacter',
        SELECTED_THEME: 'neonJump_selectedTheme',
        COINS: 'neonJump_coins',
        DAILY_LAST_LOGIN: 'neonJump_dailyLastLogin',
        DAILY_DAY: 'neonJump_dailyDay',
        DAILY_CLAIMED: 'neonJump_dailyClaimed',
        OWNED_CHARACTERS: 'neonJump_ownedCharacters'
    },

    dailyRewards: [
        { day: 1, coins: 100, special: null },
        { day: 2, coins: 200, special: null },
        { day: 3, coins: 300, special: null },
        { day: 4, coins: 400, special: null },
        { day: 5, coins: 500, special: null },
        { day: 6, coins: 700, special: null },
        { day: 7, coins: 1000, special: 'Special character skin unlocked!' }
    ],

    // Local storage helpers
    save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) { /* ignore */ }
    },

    load(key, defaultValue) {
        try {
            const val = localStorage.getItem(key);
            return val !== null ? JSON.parse(val) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    getBestScore() { return this.load(this.KEYS.BEST_SCORE, 0); },
    setBestScore(score) { this.save(this.KEYS.BEST_SCORE, score); },

    getCoins() { return this.load(this.KEYS.COINS, 0); },
    setCoins(coins) { this.save(this.KEYS.COINS, coins); },
    addCoins(amount) { this.setCoins(this.getCoins() + amount); },

    getSelectedCharacter() { return this.load(this.KEYS.SELECTED_CHARACTER, 'classic'); },
    setSelectedCharacter(id) { this.save(this.KEYS.SELECTED_CHARACTER, id); },

    getSelectedTheme() { return this.load(this.KEYS.SELECTED_THEME, 'classic'); },
    setSelectedTheme(id) { this.save(this.KEYS.SELECTED_THEME, id); },

    getOwnedCharacters() { return this.load(this.KEYS.OWNED_CHARACTERS, ['classic']); },
    addOwnedCharacter(id) {
        const owned = this.getOwnedCharacters();
        if (!owned.includes(id)) {
            owned.push(id);
            this.save(this.KEYS.OWNED_CHARACTERS, owned);
        }
    },

    // Daily reward logic
    checkDailyReward() {
        const now = Date.now();
        const lastLogin = this.load(this.KEYS.DAILY_LAST_LOGIN, 0);
        const currentDay = this.load(this.KEYS.DAILY_DAY, 0);
        const claimed = this.load(this.KEYS.DAILY_CLAIMED, false);

        const oneDayMs = 24 * 60 * 60 * 1000;
        const twoDaysMs = 48 * 60 * 60 * 1000;
        const timeSinceLogin = now - lastLogin;

        if (lastLogin === 0) {
            // First time: start at day 1
            this.save(this.KEYS.DAILY_DAY, 1);
            this.save(this.KEYS.DAILY_CLAIMED, false);
            this.save(this.KEYS.DAILY_LAST_LOGIN, now);
            return { canClaim: true, day: 1 };
        }

        if (timeSinceLogin >= twoDaysMs) {
            // Missed a day: reset to day 1
            this.save(this.KEYS.DAILY_DAY, 1);
            this.save(this.KEYS.DAILY_CLAIMED, false);
            this.save(this.KEYS.DAILY_LAST_LOGIN, now);
            return { canClaim: true, day: 1 };
        }

        if (timeSinceLogin >= oneDayMs && claimed) {
            // New day: advance
            const nextDay = currentDay >= 7 ? 1 : currentDay + 1;
            this.save(this.KEYS.DAILY_DAY, nextDay);
            this.save(this.KEYS.DAILY_CLAIMED, false);
            this.save(this.KEYS.DAILY_LAST_LOGIN, now);
            return { canClaim: true, day: nextDay };
        }

        if (!claimed) {
            return { canClaim: true, day: currentDay || 1 };
        }

        return { canClaim: false, day: currentDay };
    },

    claimDailyReward() {
        const day = this.load(this.KEYS.DAILY_DAY, 1);
        const reward = this.dailyRewards[day - 1];
        this.addCoins(reward.coins);
        this.save(this.KEYS.DAILY_CLAIMED, true);
        this.save(this.KEYS.DAILY_LAST_LOGIN, Date.now());
        return reward;
    }
};
