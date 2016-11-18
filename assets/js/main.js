var game;
var playerName = '';
game = new Phaser.Game(600, 450, Phaser.AUTO, "multi");

game.state.add('Menu', Menu);

game.state.add('Game', Game);

game.state.add('Game_Over', Game_Over);

game.state.start('Menu');

function displayLeaderBoard(){
  $('#leaderboard-collapse').addClass('active');
  $('#leaderboard-collapse-header').addClass('active')
  $('#leaderboard-collapse-body').css('display','block')
}

$( document ).ready(function() {

    Materialize.toast('If you would like to use the leaderboard, please submit your name!', 3000);

    $('#submit-button').on('click',function(event){
      event.preventDefault();
      if ($('#first_name2').val() !== '') {
        playerName = $('#first_name2').val();
        Materialize.toast('Thank You, '+playerName+'!', 3000);
        $('#leaderboard-card').remove();
      } else {
        Materialize.toast('Please enter a name!', 3000);
      }
    });
  getLeaderBoard();

});
