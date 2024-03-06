class Spaceship {

  // initialise variables
  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 6;
    this.bulletSys = new BulletSystem();
    this.size = 50;

    
  }

  // Functions called recurringly
  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }


  // Draws spaceship
  draw(){
    fill(200);
    stroke(130,100,0);
    strokeWeight(10);
    circle(this.location.x, this.location.y, this.size);
    
  }

  // Moves spaceship
  move(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity)
    this.location.add(this.velocity);
    this.acceleration.mult(0);   
  
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  // Controls spaceship direction with arrow keys
  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.2, 0));
        console.log(this.bulletSys.bullets.length)
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.2, 0));
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.2));
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.2));
      }
  }

  // Fire bullets
  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);  
  }

  // If spaceship goes off screen, it comes out other side 
  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  // Applying physics to earth's atmosphere
  setNearEarth(){
    var gravity = new createVector(0,0.05);
    this.applyForce(gravity); 

    var friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.div(30);
    this.applyForce(friction);

  }

}
