let img;
let squareSize = 7;
let bricolage = [];
let s = 10;
let index = 0;
let timer = 5000;
let lastTime = 0;
let offset = 0;
let p;
let ps = [];
let toggle = false;

class Particle {
  constructor(p5_, x_, y_) {
    this.p5 = p5_;
    this.x = x_;
    this.y = y_;
    this.initX = x_;
    this.initY = y_;
    this.changeCol = false;
    this.size = squareSize;
    this.speed = squareSize;
    this.col;
    let r = this.p5.random();
    if (r < 0.25){
      this.col= this.p5.color(233, 76, 23);
    } else if (r < 0.5){
      this.col= this.p5.color(42, 136, 171);
    }  else if (r < 0.75){
      this.col= this.p5.color(235, 228, 136);
    }  else if (r < 1.){
      this.col= this.p5.color(108, 109, 150);
    }
  }

  display() {
    if (this.changeCol) {
      this.p5.fill(this.col);
    } else {
      this.p5.fill(0);
    }
    //fill(0);
    this.p5.rect(this.x, this.y, this.size, this.size);

    if (this.p5.random()>0.999){
     // this.changeCol = !this.changeCol;
    }
  }

  move() {
    this.x += this.p5.int(this.p5.random(-2, 2)) * this.speed;
    this.y += this.p5.int(this.p5.random(-2, 2)) * this.speed;
  }

  converge(){
    this.x += (((this.initX-this.x))/(squareSize)) * this.speed;
        this.y += (((this.initY-this.y))/(squareSize)) * this.speed;

  }

}

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(185, 185).parent(canvasParentRef);
  p5.background(255);
  p5.noStroke();
  word();
  appear(p5); //, squareSize * index, (index) * 255 / s); //
  // Sam, appear doesn't expect these commented args above
}

const draw = p5 => {
  p5.background(255);

  for (let i = 0; i < ps.length; i++) {
    ps[i].changeCol = isHovering(p5.mouseX, p5.mouseY);

    ps[i].display();
    if (p5.random() < 0.01 && !toggle) {
      ps[i].move();
    }

    if (p5.random()< 0.05 && toggle){
        ps[i].converge();
    }
  }

  if (p5.millis()-lastTime > timer){
    toggle = !toggle;
    lastTime = p5.millis();
    if (toggle){
      timer = 3000;
    } else {
      timer = 10000;
    }
  }

  //glitch();

}

const mousePressed = () => {
  toggle = !toggle;
}

function glitch() {
  if (p5.random() < 0.2) {
    let randomI = int(p5.random() * bricolage.length - 1);
    let randomJ = int(p5.random() * bricolage.length);

    if (p5.random() > 0.7) {
      p5.fill(p5.color(233, 76, 23));
    } else {
      p5.fill(255);
    }
    p5.rect(randomI * squareSize + offset, randomJ * squareSize, squareSize, squareSize);
  }
}

function appear(p5) {
  let ind = 0;
  for (let i = 0; i < bricolage.length; i++) {
    for (let j = 0; j < bricolage.length; j++) {
      if (bricolage[j][i] == 1) {
        ps[ind] = new Particle(p5, i * squareSize + offset, j * squareSize + offset);
        //fill(color(0));
        //stroke(255);
        // rect(i * squareSize+offset, j * squareSize+offset, squareSize, squareSize);
        //noStroke()
        ind++;
      }

    }
  }

}

function isHovering(x, y){
  return x > 0 && x< squareSize*bricolage.length && y > 0 && y < squareSize*bricolage.length
}

function word() {
  bricolage[0] = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[1] = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bricolage[2] = [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0];
  bricolage[3] = [1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[4] = [1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[5] = [1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[6] = [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];
  bricolage[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bricolage[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0];
  bricolage[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[10] = [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[11] = [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[12] = [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[13] = [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0];
  bricolage[14] = [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1];
  bricolage[15] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bricolage[16] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bricolage[17] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bricolage[18] = [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0];
  bricolage[19] = [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1];
  bricolage[20] = [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1];
  bricolage[21] = [1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0];
  bricolage[22] = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0];
  bricolage[23] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export { setup, draw, mousePressed, isHovering };
