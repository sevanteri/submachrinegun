
enemyBulletGraph = new createjs.Graphics().beginStroke("#FF0000").moveTo(-1,0).lineTo(10,0);
EnemyBullet = new createjs.Shape(enemyBulletGraph);
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
            stage.removeChild(bullet);
        } else {
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
            stage.removeChild(bullet);
        } else {
            bullet.x += dt/1000*bullet.speed[0]*500;
            bullet.y += dt/1000*bullet.speed[1]*500;
            //checkEnemyCollision(bullet);
        }

    }
}
function checkEnemyCollision(bullet) {
    for (e in enemies) {
        var enemy = enemies[e];
        if (!enemy.alive) continue;

        var pt = bullet.localToLocal(0,0, enemy);
        if (enemy.hitTest(pt.x, pt.y)) {
            enemy.alive = false;
            bullet.active = false;
            stage.removeChild(enemy);
            stage.removeChild(bullet);
        }
    }
}
