var invertedX = false;
var invertedY = false;
var clusterTimer = 0;
var clusterDirection = 1; //voi olla 1-4

var clusterArraySize = 0;
var clusterArray;
var clusterDirArray;

enemyContainer = new createjs.Container();
Enemy = new createjs.Bitmap("enemy_submachrinegun.png");
Enemy.regX = 55;
Enemy.regY = 45;
Enemy.dir = [0,0];
Enemy.speed = [0,0];
Enemy.x = stage.canvas.width/3;
Enemy.y = stage.canvas.height/4;
Enemy.cache(0,0,160,90);

var shootTimer = 0;
var gunAngle = 140;

function handleEnemyTick(event) {
    // move enemies
    for (e in enemies) {
        var enemy = enemies[e];
        if (!enemy.alive) continue;
        checkBound(enemy);
        checkEnemyWallCollision(enemy);

        enemy.rotation += event.delta/1000 * 50;
        enemy.x += event.delta/1000*enemy.speed[0]*500;
        enemy.y += event.delta/1000*enemy.speed[1]*500;

        // shoot
        if (shootTimer > 500) {
            var b = getEnemyBullet();

            var rot = enemy.rotation + gunAngle;
            b.rotation = enemy.rotation + gunAngle-90;
            b.speed = angleToDir(rot);
            b.x = enemy.x + b.speed[0]*62;
            b.y = enemy.y + b.speed[1]*50;
            bulletContainer.addChild(b);
            shootTimer = 0;
        }
        shootTimer += event.delta;
    }
}
function getEnemy() {
    var i=0, len = enemies.length;

    while (i <= len) {
        if (!enemies[i]) {
            var e = Enemy.clone();
            enemies[i] = e;
            e.alive = true;
            e.speed = [0.5,0.5];
            return e;
        }
        else if (!enemies[i].alive) {
            var e = enemies[i];
            e.alive = true;
            e.x = stage.canvas.width/3;
            e.y = stage.canvas.height/4;
            e.speed = [0.5,0.5];
            return e;
        }
        i++;
    }
}
function spawnEnemyAtRandomPoint() {
    var e = getEnemy();

    var w = stage.canvas.width/4;
    var h = stage.canvas.height/4;
    var points = [
        [w, h],
        [w, h*3],
        [w*3, h*3],
        [w*3, h]
    ];
    var dirs = [
        [0.5,-0.5],
        [-0.5,0.5],
        [0.5,0.5],
        [-0.5, -0.5]
    ];
    var i = Math.floor(Math.random() * 4);
    var d = Math.floor(Math.random() * 4);
    e.x = points[i][0];
    e.y = points[i][1];
    e.speed[0] = dirs[d][0];
    e.speed[1] = dirs[d][1];
    enemyContainer.addChild(e);
}

function spawnCluster(){
    clusterArray[clusterArraySize] = newcreatejs.Bitmap("ball.png");

    cluster.x = bullet.x;
    cluster.y = bullet.y;

    clusterDirArray[clusterArraySize] = clusterDirection;

    clusterArraySize++;

    if (clusterDirection != 4){
        clusterDirection = clusterDirection + 1;
    }
    else{
        clusterDirection = 1;
    }
}

function updateBullet(){
    if (invertedY == false){
        bullet.y += 5;
    }
    else{
        bullet.y -= 5;
    }
    if (invertedX == false){
        bullet.x += 5;
    }
    else{
        bullet.x -= 5;
    }
}

function updateCluster(){
    var i = 0;
    while (i < clusterArraySize){
        switch (clusterDirArray[i]){
            case 1:
                // liikutaan ylospain ja alaspain

            case 2:
                // liikutaan oikealle ylaviistoon ja vasemmalle alaviistoon

            case 3:
                // liikutellaan oikealle ja vasemmalle

            case 4:

        }
    }

}

var enemyRadius = Math.max(Enemy.regX, Enemy.regY);
function checkEnemyWallCollision(enemy) {
    enemy.left = enemy.x - enemyRadius;
    enemy.top = enemy.y - enemyRadius;
    enemy.right = enemy.x + enemyRadius;
    enemy.bottom = enemy.y + enemyRadius;
    for (w in walls) {
        var wall = walls[w];
        var wBounds = wall.getBounds();
        if (enemy.y > wall.y && enemy.y < wall.y + wBounds.height) {
            // horizontal detection
            if (enemy.left < wall.x + wBounds.width && enemy.x > wall.x) {
                enemy.speed[0] = Math.abs(enemy.speed[0]);
            }
            else if (enemy.right > wall.x && enemy.x < wall.x + wBounds.width) {
                enemy.speed[0] = -Math.abs(enemy.speed[0]);
            }
        }
        if (enemy.x < wall.x + wBounds.width && enemy.x > wall.x) {
            // vertical detection
            if (enemy.top < wall.y + wBounds.height && enemy.y > wall.y) {
                enemy.speed[1] = Math.abs(enemy.speed[1]);
            }
            else if (enemy.bottom > wall.y && enemy.y < wall.y + wBounds.height) {
                enemy.speed[1] = -Math.abs(enemy.speed[1]);
            }
        }
    }
}

