var tower,towerI;
var door,doorI,doorG;
var climber,climberI,climberG;
var invisibleBlock,invisibleBG;
var ghost,ghosti;
var gameState=1;
var Score=0;


function preload() {
  towerI=loadImage("tower.png");
  doorI=loadImage("door.png");
  climberI=loadImage("climber.png");
  ghosti=loadImage("ghost-standing.png");
  
}

function setup() {
  createCanvas(600,600);
  tower=createSprite(300,300,600,600);
  tower.addImage("T", towerI);
  tower.velocityY=1;
  
  doorG=new Group();
  climberG=new Group();
  invisibleBG=new Group();
  
  ghost=createSprite(300,300,10,10);
  ghost.addImage("G", ghosti);
  ghost.scale=.4;
} 

function draw() {
  background("blue");
  
  
  //resetting of tower
  if(gameState===1) {
    
  
  if(tower.y > 600) {
    tower.y=300;
  }
  
  if(keyDown("space")) {
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(keyDown("right_arrow")) {
    ghost.x=ghost.x+2;
  }
  
   
  if(keyDown("left_arrow")) {
     ghost.x=ghost.x-2;
  }
  
  if(ghost.isTouching(climberG)) {
    ghost.velocityY=0;
  }
  spawnDoors();
  }
  if(ghost.isTouching(invisibleBG) || ghost.y > 600)  {
    gameState=0;
  }
  drawSprites();
  textSize(15)
  fill("red");
  text("Score:"+Score,300,20);
  if(gameState===0) {
    tower.velocityY=0;
    invisibleBG.destroyEach();
    doorG.destroyEach();
    climberG.destroyEach();
    //display GAME OVER
    textSize(50);
    fill("white")
    text("GAME OVER", 150,200);
    
    
    
  }
}

function spawnDoors() {
  if(frameCount %240===0) {
    //creation of doors
    door=createSprite(200,-50,10,10);
    door.velocityY=1;
    door.addImage("D", doorI);
    door.x=Math.round(random(100,500));
    door.lifeTime=600;
    doorG.add(door);
    
      climber=createSprite(200,20,10,10);
    climber.velocityY=1;
    climber.addImage("C", climberI);
    climber.x=door.x
    climber.lifeTime=600;
    climberG.add(climber);
    
     invisibleBlock=createSprite(200,20,10,10);
    invisibleBlock.velocityY=1;
    
    invisibleBlock.x=door.x
    invisibleBlock.lifeTime=600;
    invisibleBG.add(invisibleBlock);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.debug=true;
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
  }
}