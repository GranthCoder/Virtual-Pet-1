//Create variables here
var dog,happyDog,foodS,foodStock,database,dogImg,happyDogImg;
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  //dog Sprite
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  //Fetching data
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw(){  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){
    WriteStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  textSize(20);
  fill("orange")
  text("Food Remaining: "+foodS,150,50);
  text("Press Up Arrow to feed the dog",100,100)
}

function readStock(data){
  foodS = data.val();
}

function WriteStock(food){

  if(food<=0){
    food = 0
  }else{
    food =food -1;
  }
  database.ref('/').update({
    Food:food
  })
}


