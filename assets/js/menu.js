var Menu = {

    preload : function() {
        game.load.image('menu', './assets/images/mlti.png');
    },

    create: function () {
        this.add.button(0, 0, 'menu', this.startGame, this);
    },

    startGame: function () {
        this.state.start('Game');

    }

};
