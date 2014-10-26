var stuff = [
{id: 'shoot', src:'shoot.ogg'},
{id: 'death', src:'death.ogg'},
{id: 'player_hit', src:'player_hit.ogg'},
{id: 'enemy_hit', src:'enemy_hit.ogg'},
{id: 'boss_death', src:'boss_death.ogg'},
{id: 'jigga', src:'jigga.wav'},
];
var preload = new createjs.LoadQueue();
preload.installPlugin(createjs.Sound);
preload.loadManifest(stuff);

function initGame() {
    //level = 0;
    
    stage.canvas.style.cursor = "none";

    var background = new createjs.Bitmap("tausta.png");
    stage.addChild(background);

    createjs.Sound.play("jigga", createjs.Sound.INTERRUPT_NONE, 0,0,-1, 0.5);

    player.hp = 99;

    stage.addChild(player);

    player.shadow = new createjs.Shadow("#555555", 4, 4, 10);
    
    
    //console.log("before nextLevel");
    nextLevel();
    //console.log("after nextLevel");
    //wallsInit();
    //makeBoundswSize(10);
    //makeBounds();
    //level = 1;
    

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

    crosshair = new createjs.Bitmap("crosshair.png");
    crosshair.regX = 16;
    crosshair.regY = 16;
    stage.addChild(crosshair);
}
function handleTick(event) {
    
    if (1 == nextBoss && score > 90 && changingLevel == false){
        //createBoss();
        //bossBattle();
        levelChangeScore = score;
        changingLevel = true;
        //despawn all enemies
        nextLevel();
        //changingLevel = false;
    }
    if (2 == nextBoss && score > (levelChangeScore + 750) && changingLevel == false){
        //levelChangeScore = score;
        changingLevel = true;
        nextLevel();
    }
    if (3 == nextBoss && score > (levelChangeScore + 2000) && changingLevel == false){
        changingLevel = true;
        nextLevel();
    }
    
    
    if (changingLevel == true){
        if (boss.alive)
            handleBossTick(event);
    }
    
    handlePlayerTick(event);
    handleBulletTick(event);
    /*
    
    */
    if (changingLevel == false){
        handleEnemyTick(event);

        enemySpawnTimer += event.delta;
    }
    if (enemySpawnTimer > enemySpawnInterval) {
        if (changingLevel == true){
            console.log("changing level and spawning enemy. not supposed to be like this!");
        }
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
    createjs.Sound.play("shoot");
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
