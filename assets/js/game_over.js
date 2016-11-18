function getLeaderBoard() {
    $('#high-scores').children().remove();
    var requestStr = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board';
    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "JSON",
        success: function(data) {
            function compare(a, b) {
                if (a.score < b.score)
                    return 1;
                if (a.score > b.score)
                    return -1;
                return 0;
            }
            var newObj = data.sort(compare);
            for (var i = 0; i < Math.min(newObj.length, 10); i++) {
                var highScoreEntry;
                highScoreEntry = $('<tr><td>' + newObj[i].player_name + '</td><td>' + newObj[i].score + '</td><tr>');
                $('#high-scores').append(highScoreEntry);
            }
        }
    });
}

function postScore() {
    var newHighScore = {
        game_name: "MLTI",
        player_name: playerName,
        score: gameScore
    };

    $.ajax({
        method: 'POST',
        url: 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(newHighScore),
        success: getLeaderBoard
    });

}

var Game_Over = {

    preload: function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/gameover.png');
        if (gameScore > 30 && playerName != '') {
            postScore();
            setTimeout(displayLeaderBoard(), 2000);
        }
    },

    create: function() {
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(260, 350, "SCORE", {
            font: "bold 16px sans-serif",
            fill: "#46c0f9",
            align: "center"
        });
        game.add.text(325, 348, gameScore.toString(), {
            font: "bold 20px sans-serif",
            fill: "#fff",
            align: "center"
        });

    },

    startGame: function() {

        // Change the state back to Game.
        this.state.start('Game');

    }

};
