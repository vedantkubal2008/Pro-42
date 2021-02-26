var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg,stone,stoneImg;
var gameOver,gameOverImg;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  //load image 
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
 
  //to create background
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  //to create player
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  //to create ground
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  //to create gameOver
  gameOver = createSprite(400,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;

  //to create generate the radmon number
  var rand = Math.round(random(1,100));
  console.log (rand);
  
  //to create groups
  FoodGroup = new Group;
  obstacleGroup = new Group;

}

function draw() { 
  background(0);

    //to play the game
  if(gameState===PLAY){
  
  //to make game over invisible
  gameOver.visible = false;

  //to repeat the background
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  //to jump the player
   if(keyDown("space") ) {
      player.velocityY = -12;
    }

    //add gravity to player
    player.velocityY = player.velocityY + 0.8;
  
  //player should be on ground
    player.collide(ground);
    
    //when food group is touching the score and size should be increase
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2 ;
      switch(score){
        case 10 : player.scale = 0.12;
                  break;
        case 20 : player.scale = 0.14;
                  break;
        case 30 : player.scale = 0.16;
                  break;
        case 40 : player.scale = 0.20;
                  break;
                 // default: break;
        case 50 : player.scale = 0.24;
                  break;
                  default: break;
      }
    } 
    food();
    obstacle();
    
    //when obstacle group is touching it should be gameover
    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
    if(score>=60){
      gameState = END;
      
    }

    //to make the game end
  }else if(gameState === END){
    
    //to make game over visible
    gameOver.visible = true;

    //to stop the background and player
    backgr.velocityX = 0;
    player.visible = false;
   
   //to stop the food group and obstacle group
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
 
  }
 
 

//to draw sprite
  drawSprites();

//to display the score
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : " +score,650,30);
}

//to create banana
function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImg);
    banana.y = random(120,200);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

//to create stone
function obstacle(){
  if(frameCount % 300 === 0){
  stone = createSprite(400,325,20,20);
  stone.addImage(stoneImg);
  stone.scale = 0.2;
  stone.velocityX = -3;

  stone.lifetime = 150;
  player.depth = stone.depth + 1;
  obstacleGroup.add(stone);
  }
}