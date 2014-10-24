var stage, ball, crosshair;
var rot = false;

function init() {
    stage = new createjs.Stage("gameCanvas");

    crosshair = new createjs.Bitmap("ball.png");
    crosshair.regX = 32;
    crosshair.regY = 32;
    stage.addChild(crosshair);

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    stage.on('stagemousedown', handleMouseDown);
    stage.on('stagemouseup', handleMouseUp);
    stage.on('stagemousemove', handleMouseMove);

}
function handleTick(event) {
    if (rot) {
        crosshair.rotation += event.delta/1000 * 100;
    }
    stage.update();
}

function handleMouseUp(event) {
    // stop shooting
    rot = false;
}
function handleMouseDown(event) {
    // start shooting
    rot = true;
}
function handleMouseMove(event) {
    crosshair.x = event.stageX;
    crosshair.y = event.stageY;
}

init();
