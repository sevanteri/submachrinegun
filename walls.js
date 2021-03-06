function wallsInit(){
    walls = [];
}

function makeBounds(){
    var i = 0;
    while (i < 4){
        walls[i] = new createjs.Shape();
        i++;
    }
    walls[0].graphics.beginFill("blue").drawRect(0,0,stage.canvas.width,5);
    walls[1].graphics.beginFill("blue").drawRect(0,0,stage.canvas.width,5);
    walls[2].graphics.beginFill("blue").drawRect(0,0,5,stage.canvas.height);
    walls[3].graphics.beginFill("blue").drawRect(0,0,5,stage.canvas.height);
  
    // walls[0] is roof
    walls[0].x = 0;
    walls[0].y = 0;
    stage.addChild(walls[0]);
    
    // rectangle1 is floor
    walls[1].x = 0;
    walls[1].y = stage.canvas.height - 5;
    stage.addChild(walls[1]);

    // rectangle2 is left wall
    walls[2].x = 0;
    walls[2].y = 0;
    stage.addChild(walls[2]);

    // rectangle3 is right wall
    walls[3].x = stage.canvas.width - 5;
    walls[3].y = 0;
    stage.addChild(walls[3]);
}

function makeBoundswSize(size){
    var i = 0;
    while (i < 4){
        walls[i] = new createjs.Shape();
        i++;
    }
    walls[0].graphics.beginFill("blue").drawRect(0,0,stage.canvas.width,size);
    walls[1].graphics.beginFill("blue").drawRect(0,0,stage.canvas.width,size);
    walls[2].graphics.beginFill("blue").drawRect(0,0,size,stage.canvas.height);
    walls[3].graphics.beginFill("blue").drawRect(0,0,size,stage.canvas.height);
  
    // walls[0] is roof
    walls[0].x = 0;
    walls[0].y = 0;
    walls[0].setBounds(0,0, stage.canvas.width, size);
    stage.addChild(walls[0]);
    
    // rectangle1 is floor
    walls[1].x = 0;
    walls[1].y = stage.canvas.height - size;
    walls[1].setBounds(0,stage.canvas.height - size, stage.canvas.width, size);
    stage.addChild(walls[1]);

    // rectangle2 is left wall
    walls[2].x = 0;
    walls[2].y = 0;
    walls[2].setBounds(0,0,size, stage.canvas.width);
    stage.addChild(walls[2]);

    // rectangle3 is right wall
    walls[3].x = stage.canvas.width - size;
    walls[3].y = 0;
    walls[3].setBounds(stage.canvas.width - size,0,size, stage.canvas.width);
    stage.addChild(walls[3]);
}

function verticalObstacle(x, y, length){
    var i = walls.length;
    
    walls[i] = new createjs.Shape();
    walls[i].graphics.beginFill("blue").drawRect(0,0,10,length);
    walls[i].x = x;
    walls[i].y = y;
    walls[i].setBounds(x, y, 10, length);
    stage.addChild(walls[i]);
}

function horizontalObstacle(x, y, length){
    var i = walls.length;
    
    walls[i] = new createjs.Shape();
    walls[i].graphics.beginFill("blue").drawRect(0,0,length,10);
    walls[i].x = x;
    walls[i].y = y;
    walls[i].setBounds(x, y, length, 10);
    stage.addChild(walls[i]);
}
