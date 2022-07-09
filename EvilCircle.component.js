export class EvilCircle extends Shape{
    constructor(x, y){
      super(x, y, 20, 20);
      this.color = 'white';
      this.size = 10;
      var _this = this;
      window.onkeydown = function(e) {
          if (e.keyCode === 65) {
            _this.x -= _this.velX;
          } else if (e.keyCode === 68) {
            _this.x += _this.velX;
          } else if (e.keyCode === 87) {
            _this.y -= _this.velY;
          } else if (e.keyCode === 83) {
            _this.y += _this.velY;
          }
        }
    }
    draw() {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
   }
   checkBounds() {
      if ((this.x + this.size) >= width) {
         this.x -= this.size;
      }

      if ((this.x - this.size) <= 0) {
         this.x += this.size;
      }

      if ((this.y + this.size) >= height) {
         this.y -= this.size;
      }

      if ((this.y - this.size) <= 0) {
         this.y += this.size;
      }
   }
   collisionDetect() {
      for (const ball of balls) {
         if (ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
              ball.exists = false;
              scoreBalls(); 
            }
         }
      }
   }

}