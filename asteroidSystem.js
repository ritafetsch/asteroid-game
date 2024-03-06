class AsteroidSystem {

  //creates arrays to store each asteroid's data
  constructor(){
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
  }

  run(){
    this.move();
    this.draw();
    // Tracks numer of asteroids hit in top left corner
    textSize(24);
    text("# Asteroids Hit:  " + count, 50,50);

    // Making the game more difficult - increasing amount of asteroids 
    // depending on how many asteroids have been hit
    if (count <= 10) {
      this.spawn(0.01)
    }
    else if (count <= 20) {
      this.spawn(0.03);
    }
    else {
      this.spawn(0.06);
    }
  }

  // spawns asteroid at random intervals
  spawn(frequency){
    if (random(1)<frequency){
      this.accelerations.push(new createVector(0,random(0.1,1)));
      this.velocities.push(new createVector(0, 0));
      this.locations.push(new createVector(random(width), 0));
      this.diams.push(random(30,50));
    }
  }

  //moves all asteroids
  move(){
    for (var i=0; i<this.locations.length; i++){
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  applyForce(f){
    for (var i=0; i<this.locations.length; i++){
      this.accelerations[i].add(f);
    }
  }

  //draws all asteroids
  draw(){
    noStroke();
    fill(200);
    for (var i=0; i<this.locations.length; i++){
      ellipse(this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
    }
  }

  //function that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass){
    for (var i=0; i<this.locations.length; i++){
      var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
      gravity.normalize();
      gravity.mult(.001);
      this.applyForce(gravity);
    }
  }

  //destroys all data associated with each asteroid
  destroy(index){
    this.locations.splice(index,1);
    this.velocities.splice(index,1);
    this.accelerations.splice(index,1);
    this.diams.splice(index,1);
  }
}
