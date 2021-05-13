class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(200,50);
    car1.addImage("Bike1",car1_img);
    car1.scale=0.06;
    car2 = createSprite(200,150);
    car2.addImage("Bike2",car2_img);
    car2.scale=0.1;
    car3 = createSprite(200,250);
    car3.addImage("Bike3",car3_img);
    car3.scale=0.06;
    car4 = createSprite(200,350);
    car4.addImage("Bike4",car4_img);
    car4.scale=0.2;
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,0,displayWidth*14, displayHeight*1);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 20;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = displayWidth+allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        y = y+120;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = displayHeight/2;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance > 16500){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    alert("Game Ended");
  }
}
