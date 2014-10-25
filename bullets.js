
bulletContainer = new createjs.Container();
EnemyBullet = new createjs.Bitmap("enemy_bullet.png");
EnemyBullet.speed = [0,0];

Bullet = new createjs.Bitmap("bullet_player.png");
Bullet.regX = 46;
Bullet.regY = 20;
Bullet.speed = [0,0];


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
        i++;
    }
}
function getEnemyBullet() {
    var i=0, len = enemyBullets.length;

    while (i <= len) {
        if (!enemyBullets[i]) {
            var b = EnemyBullet.clone();
            enemyBullets[i] = b;
            b.active = true;
            return b;
        }
        else if (!enemyBullets[i].active) {
            enemyBullets[i].active = true;
            return enemyBullets[i];
        }
        i++;
    }
}

function handleBulletTick(event) {
    var dt = event.delta;
    // move bullets
    for (b in bullets) {
        var bullet = bullets[b];
        if (!bullet.active) continue;
        if (bullet.x > stage.canvas.width ||
            bullet.y > stage.canvas.height ||
            bullet.x < 0 ||
            bullet.y < 0) {

            bullet.active = false;
            bulletContainer.removeChild(bullet);
        }
        else if (0 == checkWallCollision(bullet)){
            bullet.x += dt/1000*bullet.speed[0]*500;
            bullet.y += dt/1000*bullet.speed[1]*500;
            checkEnemyCollision(bullet);
        }
    }
    for (b in enemyBullets) {
        var bullet = enemyBullets[b];
        if (!bullet.active) continue;
        
        if (bullet.x > stage.canvas.width ||
            bullet.y > stage.canvas.height ||
            bullet.x < 0 ||
            bullet.y < 0) {

            bullet.active = false;
            bulletContainer.removeChild(bullet);
        }
        else if (0 == checkWallCollision(bullet)) {
            bullet.x += dt/1000*bullet.speed[0]*500;
            bullet.y += dt/1000*bullet.speed[1]*500;
            checkPlayerCollision(bullet);
        }

    }
}
function checkEnemyCollision(bullet) {
    for (e in enemies) {
        var enemy = enemies[e];
        if (!enemy.alive) continue;

        var pt = bullet.localToLocal(0,0, enemy);
        if (enemy.hitTest(pt.x, pt.y)) {
            score++;
            enemy.alive = false;
            bullet.active = false;
            enemyContainer.removeChild(enemy);
            bulletContainer.removeChild(bullet);
        }
    }
}
function checkPlayerCollision(bullet) {
    var pt = bullet.localToLocal(0,0, player);
    if (player.hitTest(pt.x, pt.y)) {
        handlePlayerHit();
        bullet.active = false;
        bulletContainer.removeChild(bullet);
    }
}
function checkWallCollision(bullet){
    var pt;
    
    for (w in walls){
        pt = bullet.localToLocal(0,0,walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            console.log("bullet collided with a wall");
            bullet.active = false;
            bulletContainer.removeChild(bullet);
            return 1;
        }
    }
    return 0;
}