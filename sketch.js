var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bannana,bannanaImg;
var stone,stoneImg

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bannanaImg = loadImage("banana.png");
  stoneImg=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  SpawnFood ();
  spawnObstacles();
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  drawSprites();
}

function SpawnFood () {

  if(frameCount % 80===0){
    bannana=createSprite(700,340,50,50);
    bannana.addImage("bannanaImg",bannanaImg)
    bannana.scale=0.08;
    bannana.velocityX=-4;
    bannana.lifetime=800/4;
    player.depth=bannana.depth+1
    FoodGroup.addBannana
  }

  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score=score+2;
    player.scale+= +0.1
  }
  
}

function spawnObstacles() {

  if(frameCount % 150===0){
  stone=createSprite(700,320,50,50);
  stone.addImage("stoneImg",stoneImg);
  stone.scale=0.2;
  stone.velocityX=-4;
  stone.lifetime=800/4;
  }

  if(ObstaclesGroup.isTouching(player)){
    gameState=End
  }
}else if(gamestate=END){
  backgr.velocityX=0;
  player.visible=false;
  FoodGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  textsize=(30);
  fill(255);
  text("Game Over",300,200);
}

}