var stage = new createjs.Stage("gameCanvas");

var ball = new createjs.Bitmap("ball.png");
stage.addChild(ball);

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
    ball.x += 5;
    stage.update();
}
