class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;

  }

  // Call to all continuously drawn functions
  run(){
    this.move();
    this.draw();
    this.edges();
  }

  // Fires bullets 
  fire(x, y){
    this.bullets.push(createVector(x,y));

  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
    
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }


  //check if bullets leave the screen and remove them from the array
  edges(){ // Step 1: In bulletSystem.js complete the function edges() by looping over the bullets array and for each bullet check if it has left the screen. If it has, remove the specific bullet from the array.
    for (var i=0; i < this.bullets.length; i++){
      
      if (this.bullets[i].x > width || this.bullets[i].x < 0 || this.bullets[i].y > height || this.bullets[i].y < 0)  {
        this.bullets.splice(i,1);
        i--;
      }

    }
  }
}
