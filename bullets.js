
bulletGraph = new createjs.Graphics().beginStroke("#FF0000").moveTo(-1,0).lineTo(5,0);
Bullet = new createjs.Shape(bulletGraph);
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
        else {
            i++;
        }
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
        } else {
            bullet.x += dt/1000*bullet.speed[0]*500;
            bullet.y += dt/1000*bullet.speed[1]*500;
        }
    }
}
