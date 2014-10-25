
function init() {

    player = new createjs.Bitmap("ball.png");
    player.speed = [0,0];
    player.dir = [0,0];
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
    var dt = event.delta;

    // calculate direction between player and crosshair
    var mToPX = stage.mouseX - player.x;
    var mToPY = stage.mouseY - player.y;
    var l = Math.sqrt(Math.pow(mToPX, 2) + Math.pow(mToPY, 2));
    player.dir[0] = mToPX / Math.abs(l);
    player.dir[1] = mToPY / Math.abs(l);
    player.rotation = Math.atan2(mToPY, mToPX) * 180/Math.PI;

    // move player
    player.x += dt/1000*player.speed[0]*500;
    player.y += dt/1000*player.speed[1]*500;
    checkBound(player);
    // TODO: more sane inertia
    player.speed[0] -= player.speed[0] * (0.8*dt/1000);
    player.speed[1] -= player.speed[1] * (0.8*dt/1000);

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
            bullet.x += dt/1000*bullet.speed[0]*500;
            bullet.y += dt/1000*bullet.speed[1]*500;
        }

    }

    handleEnemyTick(event);
    stage.update();
}

function handleMouseUp(event) {
    // stop shooting
}
function handleMouseDown(event) {
    // start shooting

    // send player to the opposite direction
    player.speed[0] += -player.dir[0];
    player.speed[1] += -player.dir[1];

    // shoot bullet
    var b = getBullet();
    b.x = player.x;
    b.y = player.y;
    b.rotation = player.rotation;
    b.speed = player.dir.splice(0);
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
            stage.addChild(getEnemy());
    }
}
function handleKeyUp(event) {
    if (!event) event = window.event;
    switch(event.keyCode) {
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
    }
}

enemiesInit();
init();
