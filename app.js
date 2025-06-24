function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
        };
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 === 0 && this.currentRound > 0;
        },
    },
    methods: {
        attackPlayer() {
            const damage = getRandomInt(8, 15);
            this.playerHealth -= damage;
        },
        attackMonster() {
            const damage = getRandomInt(5, 12);
            this.monsterHealth -= damage;
            this.attackPlayer();
            this.increaseRound();
        },
        specialAttackMonster() {
            const damage = getRandomInt(10, 25);
            this.monsterHealth -= damage;
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
            this.attackPlayer();
            this.increaseRound();
        }
    }
});

app.mount('#game');