var snake, apple, squareSize, score, speed, updateDelay,
direction, new_direction, addNew, cursors, scoreTextValue,
speedTextValue, textStyle_Key, textStyle_Value, timer, timerTextValue, snakeTimer, cameraTest,
middleWall, botWall, gameScore, gameScoreTimer, w,a,s,d, dodgeSquare, shooter, shooter2, shooter3, shooter4,
weapon, weapon2, weapon3, weapon4, background, background2, background3, background4, bullet1, bullet2, bullet3,
bullet4, space, jumpBox, jumpWall, /*jumpWallBox,*/ gap, mathTimer,mathAnswerTimer, mathProblem, textStyle_Key2, textStyle_Value2,
key1,key2,key3,key4,key5,key6,key7,key8,key9,key0, mathAnswer, randomMathProblem, level, wallTimer, redX, buzz, ding,
pause1,pause2,pause3,pause4, answerTextValue, enter, greenCheck;



function removeTimer(){
  game.time.events.remove(snakeTimer);
}

function updateTimer(){
  timer--;
  timerTextValue.text = timer;
}

function updateMathText(){
  answerTextValue.text = mathAnswer;
}

function updateGameScore(){
  gameScore++;
}

var Game = {
  preload : function(){
    game.load.image('snake', './assets/images/snake.png');
    game.load.image('apple', './assets/images/apple.png');
    game.load.image('yWall', './assets/images/yWall.png');
    game.load.image('xWall', './assets/images/xWall.png');
    game.load.image('shooter','./assets/images/shooter3.png');
    game.load.image('bullet','./assets/images/bullet.png');
    game.load.image('bg1', './assets/images/background1.png');
    game.load.image('bg2', './assets/images/background2.png');
    game.load.image('bg3', './assets/images/background3.png');
    game.load.image('bg4', './assets/images/backgroundFinal.png');
    game.load.image('pause1', './assets/images/wasd1.png');
    game.load.image('pause2', './assets/images/arrows1.png');
    game.load.image('pause3', './assets/images/spacebar1.png');
    game.load.image('pause4', './assets/images/numbers1.png');
    game.load.image('redX','./assets/images/redX.png');
    game.load.image('greenCheck', './assets/images/greenCheck.png')
    game.load.audio('buzz', './assets/buzz.mp3');
    game.load.audio('ding', './assets/ding.wav');
  },

  create : function(){
    snake = [];
    apple = {};
    squareSize = 15;
    score = 0;
    speed = 0;
    updateDelay = 0;
    direction = 'right';
    new_direction = null;
    addNew = false;
    timer = 7;
    gameScore = 0;
    jumpWall = game.add.group();
    level = 1;
    weapon = undefined;
    weapon2 = undefined;
    weapon3 = undefined;
    weapon4 = undefined;
    shooter = undefined;
    shooter2 = undefined;
    shooter3 = undefined;
    shooter4 = undefined;
    dodgeSquare = undefined;
    // fx = game.add.audio('sfx');
    // fx.allowMultiple = true;
    buzz = game.add.audio('buzz');
    ding = game.add.audio('ding');
    mathAnswer = 0;



    game.physics.startSystem(Phaser.Physics.ARCADE);

    middleWall = game.add.sprite(300, 0, 'yWall');
    botWall = game.add.sprite(0, 225, 'xWall');
    cursors = game.input.keyboard.createCursorKeys();
    w = game.input.keyboard.addKey(Phaser.Keyboard.W);
    a = game.input.keyboard.addKey(Phaser.Keyboard.A);
    s = game.input.keyboard.addKey(Phaser.Keyboard.S);
    d = game.input.keyboard.addKey(Phaser.Keyboard.D);

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);


    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    enter.onDown.add(this.unpause, self);

    background4 = game.add.image(0, 0, 'bg4');
    background3 = game.add.image(0, 0, 'bg3');
    background2 = game.add.image(0, 0, 'bg2');
    background = game.add.image(0, 0, 'bg1');

    for (var i = 0; i < 5; i++) {
      snake[i] = game.add.sprite(75+i*squareSize, 150, 'snake');
    }

    this.generateApple();

    textStyle_Key = {font: 'bold 14px sans-serif', fill: "#46c0f9", align: 'center'};
    textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

    // game.add.text(30,20, 'SCORE', textStyle_Key);
    // scoreTextValue = game.add.text(90,18,score.toString(), textStyle_Value);
    //
    // game.add.text(500,20, 'SPEED', textStyle_Key);
    // speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value)

    game.add.text(30,20, 'TIMER', textStyle_Key);
    timerTextValue = game.add.text(80, 18, timer.toString(), textStyle_Value);




    snakeTimer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);
    gameScoreTimer = game.time.events.loop(Phaser.Timer.SECOND, updateGameScore, this);

  },

  update: function() {
    game.physics.arcade.collide(dodgeSquare, middleWall);
    game.physics.arcade.collide(dodgeSquare, botWall);
    game.physics.arcade.collide(shooter, botWall);
    game.physics.arcade.collide(shooter2, middleWall);
    game.physics.arcade.collide(shooter3, botWall);
    game.physics.arcade.collide(shooter4, middleWall);
    game.physics.arcade.collide(jumpBox, botWall);

    if (gameScore === 0) {
      this.levelPause(1);
      gameScore++;
    }


      // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.

      if (d.isDown && direction!='left')
      {
          new_direction = 'right';
      }
      else if (a.isDown && direction!='right')
      {
          new_direction = 'left';
      }
      else if (w.isDown && direction!='down')
      {
          new_direction = 'up';
      }
      else if (s.isDown && direction!='up')
      {
          new_direction = 'down';
      }
      if (gameScore === 15) {
        this.startDodge();
        background.destroy();
        this.levelPause(2);
        level++;
      } else if (gameScore === 45) {
        background2.destroy();
        this.startJump();
        space.onDown.add(this.jump, this);
        this.createWall();
        // this.addShooter();
        // this.addWeapon();
        this.levelPause(3);
        level++;
      } else if (gameScore === 60) {
        background3.destroy();
        textStyle_Key2 = {font: 'bold 30px sans-serif', fill: "#46c0f9", align: 'center'};
        textStyle_Value2 = { font: "bold 40px sans-serif", fill: "#fff", align: "center" };
        game.add.text(400,250, 'SOLVE', textStyle_Key2);
        game.add.text(350,350, 'YOUR ANSWER', textStyle_Key2);
        this.levelPause(4);
        answerTextValue = game.add.text(425,400,mathAnswer.toString(), textStyle_Value2);
        gameScore++;
        level++;
        this.addMathTimer();
      }

      if (level > 1) {
        weapon.fire();
        this.checkBulletCollision();

        if (cursors.right.isDown)
        {
            dodgeSquare.body.velocity.x += 5;
        }
        else if (cursors.left.isDown)
        {
            dodgeSquare.body.velocity.x -= 5;
        }
        else if (cursors.up.isDown)
        {
            dodgeSquare.body.velocity.y -= 5;
        }
        else if (cursors.down.isDown)
        {
            dodgeSquare.body.velocity.y += 5;
        }
      }

      if (level > 2) {
        // game.physics.arcade.collide(weapon2.bullets, botWall, this.killBulletBot, null, this);
        // weapon2.fire();

        // function setGameOver(level) {
        //   return function() {
        //     this.gameOver(level);
        //   }
        // }

        game.physics.arcade.overlap(jumpWall, jumpBox, function(){
          this.gameOver(3);
        }, null, this);
        // this.createWall();
      }
      //
      // if (gameScore === 4) {

      //   weapon2.fire();
      // }
      // if (gameScore === 6) {
      //   this.addShooter();
      //   this.addWeapon();
      // }
      // if (gameScore === 8) {
      //   this.addShooter();
      //   this.addWeapon();
      // }
      //

      // if (gameScore === 30) {
      //   this.addShooter();
      //   this.addWeapon();
      //   this.levelPause();
      // }


      if (gameScore > 60) {
        this.checkMathInput();

      }


      // A formula to calculate game speed based on the score.
      // The higher the score, the higher the game speed, with a maximum of 10;
      speed = Math.min(10, Math.floor(score/5));
      // Update speed value on game screen.
      // speedTextValue.text = '' + speed;

      // Since the update function of Phaser has an update rate of around 60 FPS,
      // we need to slow that down make the game playable.

      // Increase a counter on every update call.
      updateDelay++;

      // Do game stuff only if the counter is aliquot to (10 - the game speed).
      // The higher the speed, the more frequently this is fulfilled,
      // making the snake move faster.
      if (updateDelay % (15 - speed) == 0) {


          // Snake movement

          var firstCell = snake[snake.length - 1],
              lastCell = snake.shift(),
              oldLastCellx = lastCell.x,
              oldLastCelly = lastCell.y;

          // If a new direction has been chosen from the keyboard, make it the direction of the snake now.
          if(new_direction){
              direction = new_direction;
              new_direction = null;
          }


          // Change the last cell's coordinates relative to the head of the snake, according to the direction.

          if(direction == 'right'){

              lastCell.x = firstCell.x + 15;
              lastCell.y = firstCell.y;
          }
          else if(direction == 'left'){
              lastCell.x = firstCell.x - 15;
              lastCell.y = firstCell.y;
          }
          else if(direction == 'up'){
              lastCell.x = firstCell.x;
              lastCell.y = firstCell.y - 15;
          }
          else if(direction == 'down'){
              lastCell.x = firstCell.x;
              lastCell.y = firstCell.y + 15;
          }


          // Place the last cell in the front of the stack.
          // Mark it as the first cell.

          snake.push(lastCell);
          firstCell = lastCell;

          // End of snake movement.



          // Increase length of snake if an apple had been eaten.
          // Create a block in the back of the snake with the old position of the previous last block (it has moved now along with the rest of the snake).
          if(addNew){
              snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
              addNew = false;
          }

          // Check for apple collision.
          this.appleCollision();

          //If the timer === 0, Game over
          this.checkTimer(timer);

          // Check for collision with self. Parameter is the head of the snake.
          this.selfCollision(firstCell);

          // Check with collision with wall. Parameter is the head of the snake.
          this.wallCollision(firstCell);


      }

    // if (gameScore === 2) {

    //
    // }

    // if (gameScore === 4) {
    //   background2.destroy();
    //   this.startJump();
    //   space.onDown.add(this.jump, this);
    //   // this.createWall();
    // }

    // if (gameScore === 6) {
    //   background3.destroy();
    //   textStyle_Key2 = {font: 'bold 30px sans-serif', fill: "#46c0f9", align: 'center'};
    //   textStyle_Value2 = { font: "bold 40px sans-serif", fill: "#fff", align: "center" };
    //   game.add.text(375,338, 'SOLVE:', textStyle_Key2);
    //   gameScore++;
    //   this.addMathTimer();
    // }

  },

  generateApple: function(){

      // Chose a random place on the grid.
      // X is between 0 and 585 (39*15)
      // Y is between 0 and 435 (29*15)

      var randomX = Math.floor(Math.random() * 20 ) * squareSize,
          randomY = Math.floor(Math.random() * 15 ) * squareSize;

      // Add a new apple.
      apple = game.add.sprite(randomX, randomY, 'apple');
  },

  appleCollision: function() {

      // Check if any part of the snake is overlapping the apple.
      // This is needed if the apple spawns inside of the snake.
      for(var i = 0; i < snake.length; i++){
          if(snake[i].x == apple.x && snake[i].y == apple.y){

              // Next time the snake moves, a new block will be added to its length.
              addNew = true;

              // Destroy the old apple.
              apple.destroy();

              // Make a new one.
              this.generateApple();

              // Increase score.
              score++;
              // Reset Timer
              timer = 7;
              removeTimer();
              snakeTimer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);


              // Refresh scoreboard.
              // scoreTextValue.text = score.toString();

          }
      }

  },

  selfCollision: function(head) {

      // Check if the head of the snake overlaps with any part of the snake.
      for(var i = 0; i < snake.length - 1; i++){
          if(head.x == snake[i].x && head.y == snake[i].y){

              // If so, go to game over screen.
              this.gameOver(1)
          }
      }

  },

  wallCollision: function(head) {

      // Check if the head of the snake is in the boundaries of the game field.

      if(head.x >= 300 || head.x < 0 || head.y >= 225 || head.y < 0){


          // If it's not in, we've hit a wall. Go to game over screen.
          this.gameOver(1);
      }

  },

  checkTimer: function(timer){
    if (timer === 0) {
      this.gameOver(1);
    }
  },

  startDodge: function(){
    dodgeSquare = game.add.sprite(450, 100, 'apple');
    // shooter = game.add.sprite(300, 200, 'shooter');
    gameScore++;
    game.physics.enable( [dodgeSquare,middleWall,botWall], Phaser.Physics.ARCADE);
    dodgeSquare.body.collideWorldBounds = true;
    dodgeSquare.body.bounce.set(.5);
    dodgeSquare.body.maxVelocity = 50;
    this.addShooter();
    this.addWeapon();
    middleWall.body.immovable = true;
    botWall.body.immovable = true;
  },

  addShooter: function(){
    if (shooter === undefined) {
      shooter = game.add.sprite(300, 200, 'shooter');
      game.physics.enable( shooter, Phaser.Physics.ARCADE);
      shooter.body.collideWorldBounds = true;
      shooter.body.bounce.set(1);
      shooter.body.velocity.y = 20;
    } else if (shooter2 === undefined) {
      gameScore++;
      shooter2 = game.add.sprite(450, 0, 'shooter');
      game.physics.enable( shooter2, Phaser.Physics.ARCADE);
      shooter2.body.collideWorldBounds = true;
      shooter2.body.bounce.set(1);
      shooter2.body.velocity.x = 20;
      shooter2.angle = 90;
    } else if (shooter3 === undefined) {
      gameScore++;
      shooter3 = game.add.sprite(600, 0, 'shooter');
      game.physics.enable( shooter3, Phaser.Physics.ARCADE);
      shooter3.body.collideWorldBounds = true;
      shooter3.body.bounce.set(1);
      shooter3.body.velocity.y = 20;
      shooter3.scale.x =-1;
    } else if (shooter4 === undefined) {
      gameScore++;
      shooter4 = game.add.sprite(450, 225, 'shooter');
      game.physics.enable( shooter4, Phaser.Physics.ARCADE);
      shooter4.body.collideWorldBounds = true;
      shooter4.body.bounce.set(1);
      shooter4.body.velocity.x = 20;
      shooter4.angle = 270;
    }
  },

  addWeapon: function(){
    if (weapon === undefined) {
      weapon = game.add.weapon(1, 'bullet');
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon.bulletSpeedVariance = 50;
      weapon.bulletSpeed = 75;
      weapon.fireAngle = Phaser.ANGLE_RIGHT;
      weapon.trackSprite(shooter, 14, 0);
      weapon.bulletAngleOffset = 90;
    } else if (weapon2 === undefined) {
      weapon2 = game.add.weapon(1, 'bullet');
      // weapon2.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
      // weapon2.bulletDistance.y = 200;
      weapon2.bulletSpeedVariance = 50;
      weapon2.bulletSpeed = 75;
      weapon2.fireAngle = Phaser.ANGLE_DOWN;
      weapon2.trackSprite(shooter2, 0, 14);
      weapon2.bulletAngleOffset = 90;
    } else if (weapon3 === undefined) {
      weapon3 = game.add.weapon(1, 'bullet');
      weapon3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon3.bulletSpeedVariance = 50;
      weapon3.bulletSpeed = 75;
      weapon3.fireAngle = Phaser.ANGLE_LEFT;
      weapon3.trackSprite(shooter3, -14, 0);
      weapon3.bulletAngleOffset = 90;
    } else if (weapon4 === undefined) {
      weapon4 = game.add.weapon(1, 'bullet');
      weapon4.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon4.bulletSpeedVariance = 50;
      weapon4.bulletSpeed = 75;
      weapon4.fireAngle = Phaser.ANGLE_UP;
      weapon4.trackSprite(shooter4, 0, -14);
      weapon4.bulletAngleOffset = 90;
    }

  },

  checkBulletCollision: function(){
    game.physics.arcade.collide(dodgeSquare, weapon.bullets, function(){
      this.gameOver(2);
    }, null, this);
    if (weapon2 != undefined) {
      game.physics.arcade.collide(dodgeSquare, weapon2.bullets, function(){
        this.gameOver(2);
      }, null, this);
      game.physics.arcade.collide(weapon2.bullets, botWall, function(){
        this.gameOver(2);
      }, null, this);
      weapon2.fire();
    }
    if (weapon3 != undefined) {
      game.physics.arcade.collide(dodgeSquare, weapon3.bullets, function(){
        this.gameOver(2);
      }, null, this);
    }
    if (weapon4 != undefined) {
      game.physics.arcade.collide(dodgeSquare, weapon4.bullets, function(){
        this.gameOver(2);
      }, null, this);
    }
  },

  gameOver: function(gameNumber){
    if (gameNumber === 1) {
      redX = game.add.image(0, 0, 'redX');
    } else if (gameNumber === 2) {
      redX = game.add.image(300, 0, 'redX');
    } else if (gameNumber === 3) {
      redX = game.add.image(0, 225, 'redX');
    } else {
      redX = game.add.image(300, 225, 'redX');
    }
    game.add.text(150, 150, "PRESS ENTER", { font: "bold 44px sans-serif", fill: "#424242", align: "center"});
    game.add.text(105, 250, "FOR YOUR SCORE", { font: "bold 44px sans-serif", fill: "#424242", align: "center"});
    game.paused = true;
    game.state.start('Game_Over');
  },

  killBulletBot: function(botWall, bullet){
    bullet.kill();
  },

  startJump: function(){
    gameScore++;
    jumpBox = game.add.sprite(50, 435, 'apple');
    game.physics.arcade.enable(jumpBox, Phaser.Physics.ARCADE);
    jumpBox.body.gravity.y = 300;
    jumpBox.body.collideWorldBounds=true;
  },
  jump: function(){
    jumpBox.body.velocity.y = -200;
  },

  createWall: function(){
    gap = Math.floor(Math.random() * 9);
    for (var i = 0, j = 0; i < 15; i++) {
      if (i !== gap && i !== gap+1 && i !== gap+2 && i!== gap+3 && i!== gap+4 && i!== gap+5) {
        this.createWallPiece(285,435 - (i*15));
        // jumpWall.create(285, 435-(i*15) ,'apple');
        // game.physics.arcade.enable(jumpWall.children[j], Phaser.Physics.ARCADE);
        // jumpWall.children[j].body.velocity.x = -50;
        // jumpWall.children[j].outOfBoundsKill = true;
        // j++;
      }
    }
    this.addWallTimer();
    game.world.bringToTop(jumpWall);

  },
  createWallPiece: function(x,y){
    var jumpWallBox = game.add.sprite(x,y,'apple');
    jumpWall.add(jumpWallBox);
    game.physics.arcade.enable(jumpWallBox, Phaser.Physics.ARCADE);
    jumpWallBox.body.velocity.x = -75;
    jumpWallBox.checkWorldBounds = true;
    jumpWallBox.outOfBoundsKill = true;
  },
  addWallTimer: function(){
    var randomNum = Math.floor(Math.random() * 5) + 7;
    wallTimer = game.time.events.add(Phaser.Timer.SECOND * randomNum, this.createWall, this);
  },

  addMathTimer: function(){
    var randomNum = Math.floor(Math.random() * 3) + 5;
    mathTimer = game.time.events.add(Phaser.Timer.SECOND * randomNum, this.displayMathProblem, this);
  },

  displayMathProblem: function(){
    mathProblem = ['2+2','4+1','1+4','5+3','9-5','3+1','8-5','7-1','1+8'];
    var randomIndex = Math.floor(Math.random() * (mathProblem.length - 1));
    randomMathProblem = mathProblem[randomIndex];
    mathTextValue = game.add.text(425,300,randomMathProblem, textStyle_Value2);
    buzz.play();
    this.startMathAnswerTimer();
  },

  checkMathInput: function(){
    if (key1.isDown) {
      mathAnswer = 1;
    } else if (key2.isDown) {
      mathAnswer = 2;
    } else if (key3.isDown) {
      mathAnswer = 3;
    } else if (key4.isDown) {
      mathAnswer = 4;
    } else if (key5.isDown) {
      mathAnswer = 5;
    } else if (key6.isDown) {
      mathAnswer = 6;
    } else if (key7.isDown) {
      mathAnswer = 7;
    } else if (key8.isDown) {
      mathAnswer = 8;
    } else if (key9.isDown) {
      mathAnswer = 9;
    } else if (key0.isDown) {
      mathAnswer = 0;
    }

    updateMathText();
    // for (var i = 0; i < 10; i++) {
    //
    //
    //   if (['key'+[i]].isDown) {
    //     console.log(i);
    //     return i;
    //   }
    // }
  },

  startMathAnswerTimer: function(){
    mathAnswerTimer = game.time.events.add(Phaser.Timer.SECOND * 5, this.checkMathAnswer, this);
  },

  checkMathAnswer: function(){
    if (mathAnswer != eval(randomMathProblem)) {
      this.gameOver(4);
    } else {
      mathAnswer = -1;
      greenCheck = game.add.image(300, 225, 'greenCheck');
      ding.play();
      game.time.events.add(Phaser.Timer.SECOND * 2, function(){
        greenCheck.destroy();
      }, this);

      mathTextValue.destroy();
      this.addMathTimer();
    }
  },

  levelPause: function(pauseNumber){
    if (pauseNumber === 1) {
      pause1 = game.add.image(150, 112, 'pause1');
      game.paused = true;
    } else if (pauseNumber === 2) {
      pause2 = game.add.image(150, 112, 'pause2');
      game.paused = true;
    } else if (pauseNumber === 3) {
      pause3 = game.add.image(150, 112, 'pause3');
      game.paused = true;
    } else {
      pause4 = game.add.image(150, 112, 'pause4');
      game.paused = true;
    }
  },
  unpause: function(){
    game.paused = false;
    if (pause1) {
      pause1.destroy();
      pause1 = undefined;
    } else if (pause2) {
      pause2.destroy();
      pause2 = undefined;
    } else if (pause3) {
      pause3.destroy();
      pause3 = undefined;
    } else if (pause4) {
      pause4.destroy();
    }
  }




};
