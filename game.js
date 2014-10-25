
function initGame() {
    stage.canvas.style.cursor = "none";

    var background = new createjs.Bitmap("tausta.png");
    stage.addChild(background);

    crosshair = new createjs.Bitmap("crosshair.png");
    crosshair.regX = 16;
    crosshair.regY = 16;

    player.hp = 5;

    stage.addChild(player);
    stage.addChild(crosshair);

    player.shadow = new createjs.Shadow("#555555", 4, 4, 10);

    wallsInit();
    makeBounds();

    enemies = [];
    bullets = [];
    enemyBullets = [];

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    stage.on('stagemousedown', handleMouseDown);
    stage.on('stagemouseup', handleMouseUp);
    stage.on('stagemousemove', handleMouseMove);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    stage.addChild(enemyContainer, bulletContainer);
    stage.addChild(UIContainer);

    initGameUI();
}
function handleTick(event) {

    handlePlayerTick(event);
    handleBulletTick(event);
    handleEnemyTick(event);

    enemySpawnTimer += event.delta;
    if (enemySpawnTimer > enemySpawnInterval) {
        spawnEnemyAtRandomPoint();
        enemySpawnTimer = 0;
    }
    stage.update();
}

function handleMouseUp(event) {
    // stop shooting
}
function handleMouseDown(event) {
    // start shooting
    if (event.nativeEvent.button != 0) return;

    // send player to the opposite direction
    player.speed[0] += -player.dir[0];
    player.speed[1] += -player.dir[1];

    // shoot bullet
    var b = getBullet();
    b.x = player.x;
    b.y = player.y;
    b.rotation = player.rotation;
    b.speed = player.dir.splice(0);
    bulletContainer.addChild(b);
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
            enemyContainer.addChild(getEnemy());
    }
}
function handleKeyUp(event) {
    if (!event) event = window.event;
    switch(event.keyCode) {
    }
}


//init();
initMainMenu();
//initGameOver();
