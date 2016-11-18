function getLeaderBoard(){
  var requestStr = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board';
  $.ajax({
      type: "GET",
      url: requestStr,
      dataType: "JSON",
      success: function(data){
        console.log(data);
      }
  });
}

function postScore(){
  var newHighScore = {
        "game_name": "MLTI",
        "player_name": playerName,
        "score": gameScore
  };
  $.post( 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board',newHighScore, function(data){
    console.log('posted');
  });

}
// https://galvanize-leader-board.herokuapp.com/api/v1/leader-board

var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/gameover.png');
        getLeaderBoard();
        if (gameScore > 2) {
          postScore();
        }
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

    // getLeaderBoard: function() {
    //
    // }

};
