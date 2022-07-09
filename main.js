import {Ball} from './Ball.component'
import {EvilCircle} from './EvilCircle.component'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const count = document.querySelector('p');
let amountBalls = 25;
function scoreBalls () {
   count.textContent = `Ball count: ${amountBalls}`;
   amountBalls-- ;
}
scoreBalls()

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const balls = [];

while (balls.length < amountBalls) {
   const size = random(10,20);
   const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );

  balls.push(ball);
}

const newEvilCircle = new EvilCircle(random(0,width),random(0,height));

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);
   for (const ball of balls) {
      if (ball.exists) {
         ball.draw();
         ball.update();
         ball.collisionDetect();
      }
   }

   newEvilCircle.draw();
   newEvilCircle.checkBounds();
   newEvilCircle.collisionDetect();

   requestAnimationFrame(loop);
}

loop();