
var stage, player, crosshair;
var bullets = [], Bullet, bulletGraph;
var walls;
var level = 0;
var Enemy, enemies = [];
var enemyBullets = [], EnemyBullet, enemyBulletGraph;
var changingLevel = false;

var curStage = 0;
var score = 0;

var mainMenuContainer;
var bulletContainer, enemyContainer, wallContainer;
var UIContainer;
var HPtext;

var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_S = 83;

var enemySpawnTimer = 0;
var enemySpawnInterval = 1000;

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
function angleToDir(ang) {
    var rads = (ang) * Math.PI/180;
    var dirX = Math.cos(rads);
    var dirY = Math.sin(rads);
    return [dirX, dirY];
}
function dirToAngle(dir) {
    return Math.atan2(dir[1], dir[0]) * 180/Math.PI;
}
