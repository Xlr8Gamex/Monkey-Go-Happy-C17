
var monkey , monkey_running;
var banana ,banana_Image, obstacle, obstacle_Image;
var banana_group, obstacle_group;
var GameState="PLAY",gameState = "END";
var PLAY = 1;
var END = 0;
var survivalTime=0
var score=0;
var backgroundImage;

function preload(){
  
   backgroundImage=loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  banana_Image = loadImage("banana.png");
  obstacle_Image = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(600, 250);
  
  
bg=createSprite(0,0,800,400);
bg.addImage(backgroundImage);
bg.scale=1.5;
bg.x=backgroundImage.width/2;
bg.velocityX=-4;
  
  
 monkey =createSprite(90,210,20,20); 
 monkey.addAnimation("moving", monkey_running);
 monkey.scale=0.1;
  
 ground =createSprite(50,245,9000,10); 
 ground.velocityX=-9;
 ground.x = ground.width /5;
 console.log(ground.x) 
  

  
  obstacle_group=new Group();
  banana_group=new Group();
}


function draw() {
background (0);
if(GameState==="PLAY"){
score=score+Math.round(getFrameRate()/60);  
  if (ground.x < 0){
   ground.x = ground.width/5;
  }
  
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.9
  monkey.collide(ground);
  

  
 if (obstacle_group.isTouching(monkey)||monkey.x>600){
 GameState="END";
 }  
}
 else if (gameState === "END") {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    banana_group.destroyEach();
    monkey.destroy();
   
   
    obstacle_group.setLifetimeEach(-1);
    banana_group.setLifetimeEach(-1);
   
    obstacle_group.setVelocityXEach(0);
    banana_group.setVelocityXEach(0);
   

 stroke("yellow");
 textSize(20);
 fill("black"); 
 survivalTime=Math.ceil(frameCount/frameRate())
 text("Survival Time: "+survivalTime,200,25) ; 
   
  }     
  
if (banana_group.isTouching(monkey)){
banana.destroyEach()
score=score+100;
//monkey.scale= scale+0.1;
 stroke("red");
 textSize(40);
 fill("yellow");
 text("Score+100!",200,95); 
}
  switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  drawSprites();

 stroke("red");
 textSize(20);
 fill("white");
 text("Score: "+score,490,25);  
  spawnObstacles();
  spawnBananas(); 
}

function spawnObstacles(){
if (frameCount%250===0){
 obstacle=createSprite(550,215,20,20);
 obstacle.addImage("obstacle",obstacle_Image);
 obstacle.scale=0.13;
 obstacle.velocityX=-6;
 obstacle_group.add(obstacle);
 obstacle.lifetime=200;
    
 }
}

function spawnBananas(){
if (frameCount%200===0){
 banana=createSprite(300,50,20,20);
 banana.addImage("obstacle",banana_Image);
 banana.scale=0.1;
 banana.velocityX=-3;
 banana_group.add(banana); 
}  
}