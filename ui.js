
UIContainer = new createjs.Container();
mainMenuContainer = new createjs.Container();
var bg = new createjs.Shape();
bg.graphics.beginFill("#000000").drawRoundRect(0,0,stage.canvas.width, stage.canvas.height, 0);

function initGameUI() {
    HPtext = new createjs.Text("HP: " + player.hp, "20px Arial", "#000000");
    HPtext.x = HPtext.y = 10;
    UIContainer.addChild(HPtext);
}

function initMainMenu() {
    mainMenuContainer.addChild(bg);

    var title = new createjs.Text("SUBMACHRINEGUN", "60px Arial", "#FFFFFF");
    title.x = 100;
    title.y = 50;
    mainMenuContainer.addChild(title);

    var startButton = new createjs.Container();
    var startText = new createjs.Text("Start", "30px Arial", "#FFFFFF");
    startText.x = 18;
    startText.y = 7;
    var blackB = new createjs.Shape();
    blackB.graphics.beginFill("#000000").drawRect(0,0,100,40);
    var whiteR = new createjs.Shape();
    whiteR.graphics.setStrokeStyle(4).beginStroke("#FFFFFF").drawRoundRect(0,0,100,40, 10);

    startButton.addChild(blackB);
    startButton.addChild(whiteR);
    startButton.addChild(startText);
    startButton.x = stage.canvas.width/2 - 50;
    startButton.y = stage.canvas.height/2 - 20;
    mainMenuContainer.addChild(startButton);

    startButton.on('click', function(e) {
        // start game
        stage.removeChild(mainMenuContainer);
        initGame();
    });

    stage.addChild(mainMenuContainer);
    stage.update();
}

function initGameOver() {
    createjs.Ticker.removeEventListener("tick", handleTick);
    stage.canvas.style.cursor = "inherit";
    stage.removeChild(player, UIContainer, bulletContainer, enemyContainer);
    stage.clear();

    var goContainer = new createjs.Container();

    goContainer.addChild(bg);

    var goText = new createjs.Text("GAME OVER", "60px Arial", "#FFFFFF");
    goText.x = stage.canvas.width/2 - 175;
    goText.y = stage.canvas.height/2 - 20;
    goContainer.addChild(goText);

    var scoreText = new createjs.Text("Score: " + score, "30px Arial", "#FFFFFF");
    scoreText.x = goText.x + 120;
    scoreText.y = goText.y + 80;
    goContainer.addChild(scoreText);

    var startButton = new createjs.Container();
    var startText = new createjs.Text("Try again", "30px Arial", "#FFFFFF");
    startText.x = 18;
    startText.y = 7;
    var blackB = new createjs.Shape();
    blackB.graphics.beginFill("#000000").drawRect(0,0,160,40);
    var whiteR = new createjs.Shape();
    whiteR.graphics.setStrokeStyle(4).beginStroke("#FFFFFF").drawRoundRect(0,0,160,40, 10);

    startButton.addChild(blackB);
    startButton.addChild(whiteR);
    startButton.addChild(startText);
    startButton.x = stage.canvas.width/2 - 75;
    startButton.y = stage.canvas.height/2 + 50;
    //goContainer.addChild(startButton);

    startButton.on('click', function(e) {
        // start game
        stage.removeChild(goContainer);
        initGame();
    });

    stage.addChild(goContainer);
    stage.update();
}
