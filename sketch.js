var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg;
var stoneImg;
var foodGroup;
var obstacleGroup;
var gameOver , gameOverImg;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png")
  stoneImg = loadImage("stone.png")
  gameOverImg = loadImage("gameOver.png");
  FoodGroup =new Group();
  obstacleGroup= new Group();
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



  gameOver = createSprite(350,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible = false;

  score = 0;
}




function draw() { 
  background("darkcyan");
 
  fill("white");
  text("Score :  "+ score , 700 , 50 );

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
     
    if(keyDown(38) && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8;
  
  }
  //  player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  spawnfood();
  spawnobstacle();

  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
     score = score +2;
     player.scale+= + 0.1
  }

  if(obstacleGroup.isTouching(player)){
    gameState =END;
  }
  else if(gameState === END){
    backgr.visible= false;

    gameOver.visible = true;
    //textSize(30);
    //fill("blue");
   // text(" GAME OVER !!", 300,220);

    obstacleGroup.setVelocityXEach(0);
    //foodGroup.setVelocityXEach(0);

    backgr,velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

  }



  
  drawSprites();
}

function spawnfood(){
  //write code to here the spawn the food
  if (frameCount % 80 === 0){
  var banana= createSprite(600,250,40,10);
  banana.y = random(120,200);
  banana.addImage(bananaImg);
  banana.scale = 0.05;
  banana.velocityX=-4;
  
  banana.lifetime = 250 ; 
  player.depth = banana.depth+1;
  FoodGroup.add(banana);
  }
  }

  function spawnobstacle(){
    //write code to here the spawn the food
    if (frameCount % 60 === 0){
    var stone= createSprite(600,307,60,40);
    stone.velocityX=-(6+3*score/100)
    stone.addImage(stoneImg);
    stone.scale = 0.2;
   
    
    stone.lifetime = 95 ; 
    player.depth = stone.depth+1;
    obstacleGroup.add(stone);
    }
    }

   

