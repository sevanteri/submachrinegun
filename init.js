
var stage, player, crosshair;
var bullets = [], Bullet, bulletGraph;
var Enemy, enemies = [];
var enemyBullets = [], EnemyBullet, enemyBulletGraph;

var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_S = 83;

stage = new createjs.Stage("gameCanvas");

function checkBound(obj){
    if (obj.x + obj.regX > stage.canvas.width){
        obj.speed[0] = -Math.abs(obj.speed[0]);
    }
    if (obj.x - obj.regX < 0){
        obj.speed[0]  = Math.abs(obj.speed[0]);
    }
    if (obj.y + obj.regY > stage.canvas.height){
        obj.speed[1]  = -Math.abs(obj.speed[1]);
    }
    if (obj.y - obj.regY < 0){
        obj.speed[1]  = Math.abs(obj.speed[1]);
    }
}
