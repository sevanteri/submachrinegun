
player = new createjs.Bitmap("player.png");
player.speed = [0,0];
player.dir = [0,0];
player.x = stage.canvas.width/2;
player.y = stage.canvas.height/2;
player.regX = 60;
player.regY = 60;
player.hp = 5;

function handlePlayerTick(event) {
    var dt = event.delta;

    // calculate direction between player and crosshair
    var mToPX = stage.mouseX - player.x;
    var mToPY = stage.mouseY - player.y;
    var l = Math.sqrt(Math.pow(mToPX, 2) + Math.pow(mToPY, 2));
    player.dir[0] = mToPX / Math.abs(l);
    player.dir[1] = mToPY / Math.abs(l);
    player.rotation = dirToAngle(player.dir) + 180;

    // move player
    player.x += dt/1000*player.speed[0]*500;
    player.y += dt/1000*player.speed[1]*500;
    //checkBound(player);
    checkPlayerWallCollision();
    // slow the player a little when not shooting
    player.speed[0] -= player.speed[0] * (0.8*dt/500);
    player.speed[1] -= player.speed[1] * (0.8*dt/500);
}
function handlePlayerHit() {
    player.hp -= 1;
    HPtext.text = "HP: " + player.hp;

    if (player.hp < 1) {
        initGameOver();
    }

}
var playerRadius = Math.max(player.regX, player.regY);
function checkPlayerWallCollision() {
    player.left = player.x - playerRadius;
    player.top = player.y - playerRadius;
    player.right = player.x + playerRadius;
    player.bottom = player.y + playerRadius;
    for (w in walls) {
        var wall = walls[w];
        var wBounds = wall.getBounds();
        if (player.y > wall.y && player.y < wall.y + wBounds.height) {
            // horizontal detection
            if (player.left < wall.x + wBounds.width && player.x > wall.x) {
                player.speed[0] = Math.abs(player.speed[0]);
            }
            else if (player.right > wall.x && player.x < wall.x + wBounds.width) {
                player.speed[0] = -Math.abs(player.speed[0]);
            }
        }
        if (player.x < wall.x + wBounds.width && player.x > wall.x) {
            // vertical detection
            if (player.top < wall.y + wBounds.height && player.y > wall.y) {
                console.log("hit top");
                player.speed[1] = Math.abs(player.speed[1]);
            }
            else if (player.bottom > wall.y && player.y < wall.y + wBounds.height) {
                player.speed[1] = -Math.abs(player.speed[1]);
            }
        }
    }
}
