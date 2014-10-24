var stage = new createjs.Stage("gameCanvas");
var invertedX = false;
var invertedY = false;
var clusterTimer = 0;
var clusterDirection = 1; //voi olla 1-4

var clusterArraySize = 0;
var clusterArray;
var clusterDirArray;

var bullet = new createjs.Bitmap("ball.png");
//bullet.speed = [0,0];
bullet.x = stage.canvas.width/2;
bullet.y = stage.canvas.height - 35;

bullet.regX = 32;
bullet.regY = 32;


//var ball = new createjs.Bitmap("ball.png");
stage.addChild(bullet);

createjs.Ticker.addEventListener("tick", handleTick);

function checkBound(){
  if (bullet.x + 32 > stage.canvas.width){
    invertedX = true;
  }
  if (bullet.x - 32 < 0){
    invertedX = false;
  }
  if (bullet.y + 32 > stage.canvas.height){
    invertedY = true;
  }
  if (bullet.y - 32 < 0){
    invertedY = false;
  }
}

function spawnCluster(){
  clusterArray[clusterArraySize] = newcreatejs.Bitmap("ball.png");

  cluster.x = bullet.x;
  cluster.y = bullet.y;

  clusterDirArray[clusterArraySize] = clusterDirection;
    
  /*
  
  */

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

function handleTick(event) {
    checkBound();
    clusterTimer++;
    
    updateBullet();
    updateClusters();

    

    if (clusterTimer > 100){
      clusterTimer = 0;
      spawnCluster();
      
      
    }

    stage.update();
}

