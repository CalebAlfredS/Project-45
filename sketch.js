const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var bg;
var robot,robotImage;
var leftwall,rightwall,upwall,downwall;
var star,starImage;
var starGroup;
var enemy1,enemy1Image,enemy2,enemy3;
var Play=0;
var End=1;
var Gamestate=Play
var projectile;
var shield,shieldImage;
var shieldButton,shieldButtonImage;
var GameOver,GameOverImage;

function preload()
{
  bg=loadImage("Space.jpg")
  robotImage=loadImage("robot1.png")
  starImage=loadImage("star.png")
  shieldImage=loadImage("Shield.png")
  enemy1Image=loadImage("Alien.png")
  shieldButtonImage=loadImage("shield button.png")
  GameOverImage=loadImage("GameOver.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
 leftwall=createSprite(0,height/2,20,height);
 rightwall=createSprite(width,height/2,20,height);
 upwall=createSprite(width/2,0,width,20);
 downwall=createSprite(width/2,height,width,20);
 robot=createSprite(200,600,200,100);
 robot.addImage(robotImage)
 robot.scale=0.2;
 enemy1=createSprite(200,100,200,200)
 enemy1.addImage(enemy1Image)
 enemy1.scale=0.2;
 enemy1.velocityY=+3;
 shieldButton=createSprite(60,40,200,400)
 shieldButton.addImage(shieldButtonImage)
 shieldButton.scale=0.2;
 GameOver=createSprite(700,140,200,400)
 GameOver.addImage(GameOverImage)
 GameOver.visible=false;
 GameOver.scale=0.4
 starGroup=new Group()
}

function draw(){
  background(bg);
  if(keyDown("LEFT_ARROW")){
    robot.velocityX=-4
  }
  if(keyDown("RIGHT_ARROW")){
    robot.velocityX=+4
  }
  if(keyDown("UP_ARROW")){
    robot.velocityY=-4
  }
  if(keyDown("DOWN_ARROW")){
    robot.velocityY=+4
  }
  if(keyDown("S")){
    robot.velocityX=0;
    robot.velocityY=0;
  }
  if(robot.isTouching(leftwall)){
    robot.velocityX=+2;
  }
  if(robot.isTouching(rightwall)){
    robot.velocityX=-2;
  }
  if(robot.isTouching(upwall)){
    robot.velocityY=+2;
  }
  if(robot.isTouching(downwall)){
    robot.velocityY=-2;
  }
  
  if(Gamestate===End){
    enemy1.destroy()
    robot.destroy()
    starGroup.destroyEach()    
    starGroup.visible=false;  
    shieldButton.visible=false;
    GameOver.visible=true;
  }
  if(mousePressedOver(shieldButton)){
    shield=createSprite(robot.x,robot.y,200,100)
    shield.addImage(shieldImage)
    shield.scale=0.2;
  }
  

  
  
  
  
  if(enemy1.isTouching(robot)){
    Gamestate=End;
  }
  
  
 leftwall.visible=false;
 rightwall.visible=false;
 upwall.visible=false;
 downwall.visible=false;

 createstar();
  drawSprites();

}
function mousePressed(){
  projectile=createSprite(40,40,20,20)
  projectile.velocityY=-2;
  console.log(bullet)
}
function createstar(){
  if (frameCount % 150 == 0) 
{
  var star = createSprite(1400,600);
  star.y=Math.round(random(400,900))
  star.addImage(starImage);
  star.scale=0.03;
  star.velocityX = -5;
  star.lifetime = 300;
  starGroup.add(star);
  }
}

