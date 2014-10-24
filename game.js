var stage, player, crosshair;
var bullets = [], Bullet, bulletGraph;

var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_S = 83;

function init() {
    stage = new createjs.Stage("gameCanvas");

    player = new createjs.Bitmap("ball.png");
    player.speed = [0,0];
    player.x = stage.canvas.width/2;
    player.y = stage.canvas.height/2;
    player.regX = 32;
    player.regY = 32;

    bulletGraph = new createjs.Graphics().beginStroke("#FF0000").moveTo(-1,0).lineTo(5,0);
    Bullet = new createjs.Shape(bulletGraph);
    Bullet.speed = [0,0];

    crosshair = new createjs.Bitmap("crosshair.png");
    crosshair.regX = 25;
    crosshair.regY = 25;

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
    // move player
    player.x += event.delta/1000*player.speed[0]*500;
    player.y += event.delta/1000*player.speed[1]*500;
    // TODO: more sane inertia
    player.speed[0] /= 1.2;
    player.speed[1] /= 1.2;

    // move bullets
    for (b in bullets) {
        var bullet = bullets[b];
        if (!bullet.active) continue;
        if (bullet.x > stage.canvas.width ||
            bullet.y > stage.canvas.height ||
            bullet.x < 0 ||
            bullet.y < 0) {

            bullet.active = false;
        } else {
            bullet.x += event.delta/1000*bullet.speed[0]*500;
            bullet.y += event.delta/1000*bullet.speed[1]*500;
        }

    }

    stage.update();
}

function handleMouseUp(event) {
    // stop shooting
}
function handleMouseDown(event) {
    // start shooting

    // calculate direction between player and crosshair
    var mToPX = event.stageX - player.x;
    var mToPY = event.stageY - player.y;
    var l = Math.sqrt(Math.pow(mToPX, 2) + Math.pow(mToPY, 2));
    var dirX = mToPX / Math.abs(l);
    var dirY = mToPY / Math.abs(l);

    //console.log(dirX, dirY);
    player.speed[0] += -dirX;
    player.speed[1] += -dirY;

    // shoot bullet
    var b = getBullet();
    b.x = player.x;
    b.y = player.y;
    b.rotation = Math.atan2(mToPY, mToPX) * 180/Math.PI;
    b.speed[0] = dirX;
    b.speed[1] = dirY;
    stage.addChild(b);
    //bullet.speed[0] = 1;
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

function getBullet() {
    var i=0, len = bullets.length;

    while (i <= len) {
        if (!bullets[i]) {
            var b = Bullet.clone();
            bullets[i] = b;
            b.active = true;
            b.speed = [0,0];
            return b;
        }
        else if (!bullets[i].active) {
            bullets[i].active = true;
            return bullets[i];
        }
        else {
            i++;
        }

        if (len == 0) {
            bullets[0] = Bullet.clone();
        }

    }
}

init();
