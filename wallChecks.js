 
function newCheckCollision(checkObj, checkRadius){
    var pt;
    
    for (w in walls){
        //check up
        /*
        if (walls[w].hitTest(checkObj.x, checkObj.y - checkRadius)){
            console.log("hit up");
            movement[1] = 1;
        }
        */
        
        pt = checkObj.localToLocal(0,(checkRadius * -1), walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit up");
            movement[1] = 1;
            break;
        }
        
        //check right
        pt = checkObj.localToLocal(checkRadius,0, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit right");
            movement[0] = -1;
            break;
        }
        
        //check down
        pt = checkObj.localToLocal(0,checkRadius, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit down");
            movement[1] = -1;
            break;
        }
        
        //check left
        pt = checkObj.localToLocal((checkRadius * -1),0, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit left");
            movement[0] = 1;
            break;
        }
        
        // check upright
        pt = checkObj.localToLocal(checkRadius * 1.0, ((checkRadius * 1.0) * -1), walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit upright")
            movement[0] = -1;
            movement[1] = 1;
            break;
        }
        
        // check downright
        pt = checkObj.localToLocal(checkRadius * 1.0, checkRadius * 1.0, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit downright");
            movement[0] = -1;
            movement[1] = -1;
            break;
        }
        
        // check downleft
        pt = checkObj.localToLocal(((checkRadius * 1.0) * -1), checkRadius * 1.0, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit downleft");
            movement[0] = 1;
            movement[1] = -1;
            break;
        }
        
        // check upleft
        pt = checkObj.localToLocal(((checkRadius * 1.0) * -1), (checkRadius * 1.0) * -1, walls[w]);
        if (walls[w].hitTest(pt.x, pt.y)){
            //console.log("hit upleft");
            movement[0] = 1;
            movement[1] = 1;
        }
    }
    //console.log("funktion lopussa", movement[0], movement[1]);
}

function updateMovement(updObj){
    //console.log("movement ==", movement[0], movement[1]);
    updObj.x += (movement[0] * 5);
    updObj.y += (movement[1] * 5);
}

function startingDirection(dir){
    if (dir == 1){
        movement[0] = 0;
        movement[1] = -1;
    }
    else if (dir == 2){
        movement[0] = 1;
        movement[1] = -1;
    }
    else if (dir == 3){
        movement[0] = 1;
        movement[1] = 0;
    }
    else if (dir == 4){
        movement[0] = 1;
        movement[1] = 1;
    }
    else if (dir == 5){
        movement[0] = 0;
        movement[1] = 1;
    }
    else if (dir == 6){
        movement[0] = -1;
        movement[1] = 1;
    }
    else if (dir == 7){
        movement[0] = 0;
        movement[1] = -1;
    }
    else if (dir == 8){
        movement[0] = -1;
        movement[1] = -1;
    }
}

function moveObj(currObj, collCheckRad){
    newCheckCollision(currObj, collCheckRad);
    updateMovement(currObj);
}