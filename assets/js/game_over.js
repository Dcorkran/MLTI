var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/gameover.png');
        this.getLeaderBoard();
    },

    create : function() {
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(260, 350, "SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(325, 348, gameScore.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });

    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Game');

    },

    getLeaderBoard: function() {
      var requestStr = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board';
      $.ajax({
          type: "GET",
          url: requestStr,
          dataType: "json",
          success: function(data){
            console.log('test');
            console.log(data);
          }
      });
    }

};
