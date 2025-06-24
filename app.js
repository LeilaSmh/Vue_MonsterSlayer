function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
        };
    },
    methods: {
        attackMonster() {
            const damage = getRandomInt(5, 12);
            this.monsterHealth -= damage;
            this.attackPlayer();
        },
        attackPlayer() {
            const damage = getRandomInt(8, 15);
            this.playerHealth -= damage;
        },
    }
});

app.mount('#game');