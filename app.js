function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth <= 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if (this.playerHealth <= 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 === 0 && this.currentRound > 0;
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }
            else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            }
            else if (value <= 0) {
                this.winner = 'player';
            }
        },
    },
    methods: {
        attackPlayer() {
            const damage = getRandomInt(8, 15);
            this.playerHealth -= damage;
            this.addLogMessage('Monster', 'attacks', damage);
        },
        attackMonster() {
            const damage = getRandomInt(5, 12);
            this.monsterHealth -= damage;
            this.addLogMessage('Player', 'attacks', damage);    
            this.attackPlayer();
            this.increaseRound();
        },
        specialAttackMonster() {
            const damage = getRandomInt(10, 25);
            this.monsterHealth -= damage;
            this.addLogMessage('Player', 'special attacks', damage);
            this.attackPlayer();
            this.increaseRound();
        },
        increaseRound() {
            this.currentRound++;
        },
        healPlayer() {
            const healAmount = getRandomInt(8, 20);
            this.playerHealth += healAmount;
            if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }
            this.addLogMessage('Player', 'heals', healAmount);
            this.attackPlayer();
            this.increaseRound();
        },
        surrender() {
            this.winner = 'Monster';
        },
        resetGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');