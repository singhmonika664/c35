var balloon, balloonImg;
var backgroundImg,position;
var database;
function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png")
  balloonImg = loadImage("Hot Air Ballon-02.png")
}
function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  balloon = createSprite(400, 200, 10, 10);
  balloon.addImage(balloonImg)
  balloon.scale = 0.4
var balloonPositionRef= database.ref('balloon/position');
balloonPositionRef.on("value",readPosition);
}

function draw(){
  background(backgroundImg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

