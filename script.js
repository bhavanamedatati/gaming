window.addEventListener("load", function(){
    //initialise width and height

    const WIDTH=640;
    const HEIGHT=360;
    //makiing game live

    var gameLive=true;
    //initilaise level
    var level=1;
    var life=5;

    //random color
    var color="#"+((1<<24)*Math.random()|0).toString(16);

    //enemies

    var enemies=[

        {
            x:100,//x cordinate
            y:100,//y cordinate
            speedY:2,
            w:40, // width of enemy
            h:40 // height 
        },
        {
            x:200,
            y:0,
            speedY:2,
            w:40,
            h:40
        },
        {
            x:330,
            y:100,
            speedY:3,
            w:40,
            h:40
        },
        {
            x:450,
            y:100,
            speedY:-3,
            w:40,
            h:40
        }
    ];
      



      // initialise Player

     var player={
         x:10,
         y:160,
         w:40,
         h:40,
         isMoving:false,//keep track
         speedX:2
     }
       var goal={
           x:580,
           y:160,
           w:50,
           h:36
       }


     var sprites={};

     var movePlayer=function() {
         player.isMoving=true
     }
     var stopPlayer=function() {
         player.isMoving=false
     }

     //selecting canvas from HTML

     var canvas=document.getElementById("mycanvas");
     var ctx=canvas.getContext("2d");

     //adding Event Listners

     canvas.addEventListener("mousedown",movePlayer);
     canvas.addEventListener("mouseup",stopPlayer);
     canvas.addEventListener("touchstart",movePlayer);
     canvas.addEventListener("touchend",stopPlayer);

     //update the logic

     var update=function() {
         //check if player is won

         if(checkCollision(player,goal)) {
             alert("Win!!!");
             level+=1;
             life+=1;
             player.speedX+=1;
             player.x=10;
             player.y=160;
             player.isMoving=false;

             //loop
             for(var ab=0; ab<enemies.length; ab++){
                 if(enemies[ab].speedY>1){
                     enemies[ab].speedY+=1; //increasing
                 }
                 else {
                     enemies[ab].speedY-=1; //decreasing
                 }
             }
         }
          
         //update the player
         if(player.isMoving) {
             player.x=player.x+player.speedX;


         }
          //update enemies 
          var i=0;
          var n=enemies.length;

          enemies.forEach(function(element,index) {
              //checking collision with player

              if(checkCollision(player,element)) {
                  //stop game
                  if(life===0){
                      alert("Game Over!!")
                      // loop
                      for(var ab=0; ab<enemies.length; ab++) {
                          if(enemies[ab].speedY > 1) {
                              enemies[ab].speedY-=(level - 1)
                          }
                          else {
                              enemies[ab].speedY+=(level - 1)
                          }
                      }

                      level=1;
                      life=6;
                      player.speedX=2;
                      color="#"+((1<<24)*Math.random()|0).toString(16);

                    }
                    if(life>0) {
                        life-=1;
                        color="#"+((1<<24)*Math.random()|0).toString(16);

                    }
                    player.x=10;
                    player.y=160;
                    player.isMoving=false;
               }
               //move the enemy

               element.y+=element.speedY;

               //check for borders

               if(element.y <= 10) {
                   element.y=10;
                   element.speedY*=-1;
               }
               else if(element.y>=HEIGHT -50) {
                   element.y=HEIGHT-50;
                   element.speedY*=-1
                    
               }



            })

        }

        // draw the elements
        var draw =function() {
            //clear canvas 
            ctx.clearRect(0,0,WIDTH,HEIGHT);

             //DRAW
             ctx.font = '15px verdana';
             ctx.fillStyle='rgb(0,0,0)';
             ctx.fillText("Level:"+level,10,15)
             ctx.fillText("Life:"+life,10,35)
             ctx.fillText("Speed:"+player.speedX,10,55)

             //draw Player with random color
             ctx.fillStyle = color;
             ctx.fillRect(player.x,player.y,player.w,player.h)
              //draw enemies
              ctx.fillStyle=color;
              enemies.forEach(function(element,index) {
                  ctx.fillRect(element.x,element.y,element.w,element.h)
              })

              //draw goal
              ctx.fillStyle ="rgb(0,255,120)";
              ctx.fillRect(goal.x,goal.y,goal.w,goal.h)
              ctx.fillStyle="rgb(0,0,0)";
              ctx.fillText("Goal",goal.x+7,goal.y+25)


        };

        //step functio -- executed multiple times per second

       var step=function() {
            update();
            draw();
            if(gameLive) {
                window.requestAnimationFrame(step);
            }
        };

        //checking collision between two rects

        var checkCollision=function(rect1,rect2) {
            var closeOnWidth=Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w,rect2.w);
            var closeOnHeight=Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h,rect2.h);

            return closeOnWidth && closeOnHeight;
        
        }
        step();

});