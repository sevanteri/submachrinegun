
player = new createjs.Bitmap("ball.png");
player.speed = [0,0];
player.dir = [0,0];
player.x = stage.canvas.width/2;
player.y = stage.canvas.height/2;
player.regX = 32;
player.regY = 32;

function handlePlayerTick(event) {
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
}
