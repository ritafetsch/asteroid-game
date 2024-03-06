var spaceship;
var asteroids;

var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var count = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);

  // Initialise new spacehip, asteroid system, and new bullet system
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  bulletSys = new BulletSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  // function that checks collision between various elements
  checkCollisions(spaceship, asteroids); 
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    
    //spaceship-2-asteroid collisions
    for (var i = 0; i < asteroids.locations.length; i++ ) {
      if (isInside(earthLoc,asteroids.locations[i], earthSize.x, asteroids.diams[i])) {
        gameOver();
      }
    }

    //asteroid-2-earth collisions
    for (var i = 0; i < asteroids.locations.length; i++ ) {
      if (isInside(spaceship.location,asteroids.locations[i], spaceship.size, asteroids.diams[i])) {  
        gameOver();
      }
    }

    //spaceship-2-earth
    if (isInside(spaceship.location,earthLoc, spaceship.size, earthSize.x)) {  
      gameOver();
    }

    //spaceship-2-atmosphere
    if (isInside(spaceship.location,atmosphereLoc, spaceship.size, atmosphereSize.x)) {  
      console.log("NEAR EARTH")
      spaceship.setNearEarth();
    }

    //bullet collisions
    for (var i = 0; i < spaceship.bulletSys.bullets.length; i++ ) {

      for (var j = 0; j < asteroids.locations.length; j++) {
        if (isInside(spaceship.bulletSys.bullets[i],asteroids.locations[j], 10, asteroids.diams[j])) {
          asteroids.destroy(j);
          count += 1;
          }
        }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, locB, sizeA, sizeB){
  for (var i = 0; i < asteroids.locations.length; i++ ) { 
    if (dist(locA.x, locA.y, locB.x, locB.y) < sizeA/2 + sizeB/2 ) {
      return true;
    }
  }
  
}

//////////////////////////////////////////////////
// if spacebar is pressed, fire!
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ 
    spaceship.fire();
  }

}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
