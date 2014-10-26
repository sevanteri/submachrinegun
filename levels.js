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
    makeBoundswSize(10);
    
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
    horizontalObstacle(100, 100, 150);
    verticalObstacle(450, 100, 300);
}

function makeLevel2(){
    horizontalObstacle(250, 300, 450);
    verticalObstacle(450, 100, 300);
}

function makeLevel3(){
    horizontalObstacle(100, 300, 250);
    verticalObstacle(250, 100, 350);
}

function bossBattle(bossNum){
    boss = new createjs.Shape();
    boss.speed = [0,0];
    var bossAlive = true;
    wallsInit();
    makeBoundswSize(10);
    
    //poista kaikki enemyt. bulletit lentaa pois ruudusta, jos niita ei haluta poistaa
    for (e in enemies){
        var enemy = enemies[e];
        enemy.alive = false;
        enemyContainer.removeChild(enemy);
    }
    /*
    for (b in enemyBullets){
        var bullet = enemyBullets[b]
        
        bullet.active = false;
        bulletContainer.removeChild(bullet);
    }
    */
    
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
        boss.x = 600;
        boss.y = 500;
        boss.hp = 5;
        boss.num = 1;
        boss.speed = [0,-3];
        boss.chkRad = 30;
        boss.shootTimer = 0;
        stage.addChild(boss);
    }
    if (2 == bossNumber){
        //bossHP = 15;
        boss.graphics.beginFill("red").drawRect(0,0,40, 40);
        boss.x = 600;
        boss.y = 500;
        boss.hp = 15;
        boss.num = 2;
        boss.speed = [3,-3];
        boss.chkRad = 20;
        boss.shootTimer = 0;
        stage.addChild(boss);
    }
    if (3 == bossNumber){
        //boss HP = 35;
        boss.graphics.beginFill("red").drawRoundRect(0,0,80,40,20);
        boss.x = 600;
        boss.y = 500;
        boss.hp = 35;
        boss.num = 3;
        boss.speed = [0,0];
        boss.chkRad = 50;
        boss.shootTimer = 0;
        stage.addChild(boss);
    }
}

function handleBossTick(){
    // collision detection
    /*
    if (boss.x + boss.speed[0] > ){
        
    }
    */
    
    bossCollisionCheck(boss, boss.chkRad);
    boss.x = boss.x + boss.speed[0];
    boss.y = boss.y + boss.speed[1];
    
    boss.shootTimer += 1;
    if (boss.shootTimer > 100 - boss.hp){
        //shoot
        boss.shootTimer = 0;
    }
}

function handleBossHit(){
    boss.hp -= 1;
    
    if (boss.hp < 1){
        if (1 == boss.num){
            score += 10;
            makeLevel2();
        }
        else if (2 == boss.num){
            score += 15;
            makeLevel3();
        }
        else if (3 == boss.num){
            score += 200;
            // winScreen()
        }
        changingLevel = false;
        stage.removeChild(boss);
        
        
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
