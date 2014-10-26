var boss;
var bossHP;
//var boss_shootTimer = 0;
//var boss1_chkRad = 30;
 
function nextLevel(){
    level++;
    /*
    for (w in walls){
        //delete wall;
    }
    */
    
    if (level > 1){
        for (w in walls){
            stage.removeChild(walls[w]);
        }
    }
    
    wallsInit();
    //makeBounds();
    //makeBoundswSize(10);
    
    switch (level){
        case 1:
            makeLevel1();
            break;
        case 2:
            bossBattle(1);
            break;
        case 3:
            bossBattle(2);
            break;
        case 4:
            bossBattle(3);
    }
    //bossBattle();
}

function makeLevel1(){
    horizontalObstacle(150, 150, 400);
    horizontalObstacle(150, 400, 400);
    verticalObstacle(550, 150, 260);
}

function makeLevel2(){
    horizontalObstacle(250, 300, 450);
    verticalObstacle(450, 100, 300);
}

function makeLevel3(){
    horizontalObstacle(150, 300, 500);
    verticalObstacle(300, 125, 325);
}

function bossBattle(bossNum){
    boss = new createjs.Shape();
    boss.speed = [0,0];
    boss.alive = true;
    wallsInit();
    //makeBoundswSize(10);
    
    //poista kaikki enemyt. bulletit lentaa pois ruudusta, jos niita ei haluta poistaa
    for (e in enemies){
        var enemy = enemies[e];
        enemy.alive = false;
        enemyContainer.removeChild(enemy);
    }
    for (b in enemyBullets){
        var bullet = enemyBullets[b]
        
        bullet.active = false;
        bulletContainer.removeChild(bullet);
    }
    
    createBoss(bossNum);
    //while (bossAlive){
        //handleBossTick(event);
        //handlePlayerTick(event);
    //}
}

function createBoss(bossNumber){
    if (1 == bossNumber){
        //bossHP = 5;
        boss.graphics.beginFill("red").drawCircle(0,0,40);
        boss.setBounds(0,0,80,80);
        boss.regX = boss.regY = 10;
        boss.x = 600;
        boss.y = 500;
        boss.hp = 5;
        boss.num = 1;
        boss.speed = [0,-3];
        boss.chkRad = 30;
        boss.shootInterval = 500;
        boss.shootAngle = 100;
        enemyContainer.addChild(boss);
    }
    if (2 == bossNumber){
        //bossHP = 15;
        boss.graphics.beginFill("red").drawRect(0,0,80, 80);
        boss.regX = boss.regY = 40;
        boss.x = 600;
        boss.y = 500;
        boss.hp = 2;
        boss.num = 2;
        boss.speed = [3,-3];
        boss.chkRad = 20;
        boss.shootInterval = 250;
        boss.shootAngle = 150;
        enemyContainer.addChild(boss);
    }
    if (3 == bossNumber){
        //boss HP = 35;
        boss.graphics.beginFill("red").drawRoundRect(0,0,80,40,20);
        boss.setBounds(0,0,80,40);
        boss.regX = 40;
        boss.regY = 20;
        boss.x = 600;
        boss.y = 500;
        boss.hp = 5;
        boss.num = 3;
        boss.speed = [0,0];
        boss.chkRad = 50;
        boss.shootInterval = 50;
        boss.shootAngle = 200;
        enemyContainer.addChild(boss);
    }
}

function handleBossTick(event){
    // collision detection
    /*
    if (boss.x + boss.speed[0] > ){
        
    }
    */
    
    checkBound(boss);
    //bossCollisionCheck(boss, boss.chkRad);
    boss.x += event.delta/1000 * boss.speed[0]*100;
    boss.y += event.delta/1000 * boss.speed[1]*100;
    boss.rotation += event.delta/1000 * boss.shootAngle;
    shootTimer += event.delta;
    if (shootTimer > boss.shootInterval + boss.hp*10){
        //shoot
        shootTimer = 0;

        var b = getEnemyBullet();

        b.rotation = boss.rotation + 90;
        b.speed = angleToDir(boss.rotation);
        b.x = boss.x;
        b.y = boss.y;
        bulletContainer.addChild(b);
        shootTimer = 0;
    }
}

function handleBossHit(){
    boss.hp -= 1;
    
    if (boss.hp < 1){
        nextBoss++;
        for (b in enemyBullets){
            var bullet = enemyBullets[b]
            
            bullet.active = false;
            bulletContainer.removeChild(bullet);
        }
        if (1 == boss.num){
            score += 30 * player.comboMultiplier;
            player.comboTimer = 50;
            //console.log("score == ", score, " multiplier was:", player.comboMultiplier);
            //score += (10 * comboMult);
            levelChangeScore = score;
            makeLevel2();
        }
        else if (2 == boss.num){
            score += 80 * player.comboMultiplier;
            player.comboTimer = 50;
            //console.log("score == ", score, " multiplier was:", player.comboMultiplier);
            //score += (15 * comboMult);
            levelChangeScore = score;
            makeLevel3();
        }
        else if (3 == boss.num){
            score += 200 * player.comboMultiplier;
            //console.log("score == ", score, " multiplier was:", player.comboMultiplier);
            //score += (200 * comboMult);
            enemyContainer.removeChild(boss);
            initWinScreen();
        }
        changingLevel = false;
        enemyContainer.removeChild(boss);
        
        
    }
}

function deleteBoss(){
    
}

function bossCollisionCheck(checkObj, checkRad){
    var pt;
    
    for (w in walls){
        //check up
        pt = checkObj.localToLocal(0, (checkRad * -1), walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            boss.speed[1] = 3;
            break;
        }
        
        //check right
        pt = checkObj.localToLocal(checkRad, 0, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            boss.speed[0] = -3;
            break;
        }
        
        //check down
        pt = checkObj.localToLocal(0, checkRad, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            boss.speed[1] = -3;
            break;
        }
        
        //check left
        pt = checkObj.localToLocal((checkRad * -1), 0, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            boss.speed[0] = 3;
            break;
        }
    }
}
