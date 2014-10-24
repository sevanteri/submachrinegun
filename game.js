var stage, player, crosshair;
var rot = false;

var playerSpeed = [0,0];
var playerMaxSpeed = [3, 2];

var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_S = 83;

function init() {
    stage = new createjs.Stage("gameCanvas");

    player = new createjs.Bitmap("ball.png");
    crosshair = new createjs.Bitmap("ball.png");
    crosshair.regX = 32;
    crosshair.regY = 32;

    stage.addChild(player);
    stage.addChild(crosshair);

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    stage.on('stagemousedown', handleMouseDown);
    stage.on('stagemouseup', handleMouseUp);
    stage.on('stagemousemove', handleMouseMove);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}
function handleTick(event) {
    if (rot) {
        crosshair.rotation += event.delta/1000 * 200;
    }
    // move player
    player.x += event.delta/1000*playerSpeed[0]*100;
    player.y += event.delta/1000*playerSpeed[1]*100;
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
function handleKeyDown(event) {
    if (!event) event = window.event;
    //console.log(event.keyCode);
    switch(event.keyCode) {
        case KEYCODE_W:
            playerSpeed[1] += -playerMaxSpeed[1]; break;
        case KEYCODE_S:
            playerSpeed[1] += playerMaxSpeed[1]; break;
        case KEYCODE_A:
            playerSpeed[0] += -playerMaxSpeed[0]; break;
        case KEYCODE_D:
            playerSpeed[0] += playerMaxSpeed[0]; break;

    }
}
function handleKeyUp(event) {
    if (!event) event = window.event;
    switch(event.keyCode) {
        case KEYCODE_W:
            playerSpeed[1] += playerMaxSpeed[1]; break;
        case KEYCODE_S:
            playerSpeed[1] += -playerMaxSpeed[1]; break;
        case KEYCODE_A:
            playerSpeed[0] += playerMaxSpeed[0]; break;
        case KEYCODE_D:
            playerSpeed[0] += -playerMaxSpeed[0]; break;
    }
}

init();
