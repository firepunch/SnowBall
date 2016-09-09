//window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var groundFriction = 0.1;
    var airFriction = 0.08;
    var iceFriction = 0.001;

    var mapArr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2177, 2178, 2179, 566, 567, 568, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3705, 3700, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2177, 2178, 2179, 2180, 566, 567, 568, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3705, 3700, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2177, 2178, 2179, 566, 567, 568, 0, 0, 0, 0],
        [0, 0, 0, 0, 2181, 2182, 2183, 570, 571, 572, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3755, 3756, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2181, 2182, 2183, 2184, 570, 571, 572, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3721, 3722, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2181, 2182, 2183, 570, 571, 572, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2177, 2178, 2179, 2180, 565, 566, 3759, 3760, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3725, 3726, 2179, 2180, 565, 566, 567, 568, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2177, 2178, 568, 0, 0, 0, 0, 0, 0, 0, 0, 2177, 2178, 568, 0, 0, 0, 2181, 2182, 2183, 2184, 569, 570, 3763, 3764, 0, 0, 0, 2177, 2178, 568, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2177, 2178, 568, 0, 0, 0, 3729, 3730, 2183, 2184, 569, 570, 571, 572, 0, 0, 0, 2177, 2178, 568, 0, 0, 0, 0, 0, 0, 2177, 2178, 568, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2181, 2182, 572, 0, 0, 0, 0, 0, 0, 0, 0, 2181, 2182, 572, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2181, 2182, 572, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2181, 2182, 572, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2181, 2182, 572, 0, 0, 0, 0, 0, 0, 2181, 2182, 572, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 401, 402, 403, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 404, 405, 406, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 407, 408, 409, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [617, 618, 619, 634, 635, 636, 0, 0, 601, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 636, 0, 0, 601, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 635, 636, 0, 0, 601, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 620, 617, 618, 619, 636, 0, 0, 601, 602, 603, 604, 619, 620],
        [621, 622, 623, 638, 639, 640, 0, 0, 605, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 640, 0, 0, 605, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 639, 640, 0, 0, 605, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 624, 621, 622, 623, 640, 0, 0, 605, 606, 607, 608, 623, 624],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 416, 417, 418, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 410, 411, 412, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 419, 420, 421, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 410, 411, 412, 0, 0],
        [0, 0, 413, 414, 415, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 422, 423, 424, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 413, 414, 415, 0, 0],
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 34, 35, 36, 37, 38, 39, 40, 41, 42],
        [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 56, 57, 58]
    ];


    var pointX = 100;
    var pointY = 100;

    canvas.addEventListener('mousemove', function (event) {
        pointX = event.offsetX;
        pointY = event.offsetY;
    });

    canvas.addEventListener('mousedown', function (event) {
        mousePressed = true;

    });
    canvas.addEventListener('mouseup', function (event) {
      player.throwBall();
        mousePressed = false;
    });

    var press = {65: false, 87: false, 68: false}; //65 left 84 top 68 right

    document.addEventListener('keydown', function (event) {
        if (event.keyCode in press) {
            press[event.keyCode] = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.keyCode in press) {
            press[event.keyCode] = false;
        }
    });

    class spriteSheet{
      constructor(img, numOfX, numOfY, w,h){
        this.img = img;
        this.numOfX = numOfX;
        this.numOfY = numOfY;
        this.width = w;
        this.height = h;
      }

      getSheet(index){
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;

        ctx.drawImage(this.img, this.width * (index % this.numOfX), this.height * Math.floor(index / this.numOfX), this.width, this.height, 0, 0, canvas.width, canvas.height);
        return canvas;
      }
    }

    var mousePressed = false;

    canvas.width = 1340;
    canvas.height = 640;
    var skeletionImg = new Image();
    skeletionImg.src = "../public/image/skeleton.png"
    var skeletonSheet = new spriteSheet(skeletionImg, 9,2,64,64);

    var mapImage = new Image();
    mapImage.addEventListener('load', pngLoaded, false);
    mapImage.src = "../public/image/map.png";

    class Object {
        constructor() {

        }

        applyForth(addingVector) {
            let transedAddingVector = addingVector.copy();
            transedAddingVector.div(this.mass);
            this.acceleration.add(transedAddingVector);
        }

        checkEdge() {

        }

        getFriction(mew, vector) { // mew = 마찰계수
            mew = mew * (vector.mag() * vector.mag());
            let friction = vector.copy();
            friction.mult(-1);
            friction.nomalize();
            friction.mult(mew);
            return friction;
        }
    }

    class Vector {

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        add(vector) {
            this.x += vector.x;
            this.y += vector.y;
        }

        sub(vector) {
            this.xx -= vector.x;
            this.xy -= vector.y;
        }

        mult(how) {
            this.x *= how;
            this.y *= how;
        }

        div(how) {
            this.x /= how;
            this.y /= how;
        }

        mag() {
            const Vsize = Math.sqrt(this.x * this.x + this.y * this.y);
            return Vsize;
        }

        nomalize() {
            if (this.mag() != 0) {
                this.div(this.mag());
            }
        }

        limit(limitNum) {
            if (this.mag() > limitNum) {
                this.nomalize();
                this.mult(limitNum);
            }
        }

        copy() {
            var copyVector = new Vector(this.x, this.y);
            return copyVector;
        }

        static addStatic(Vector1, Vector2) {
            let addedVector = new Vector(Vector1.x + Vector2.x, Vector1.y + Vector2.y);
            return addedVector;
        }

        static subStatic(Vector1, Vector2) {
            let subedVector = new Vector(Vector1.x - Vector2.x, Vector1.y - Vector2.y);
            return subedVector;
        }

        static divStatic(Vector1, Num) {
            let subedVector = new Vector(Vector1.x / Num, Vector1.y / Num);
            return subedVector;
        }
    }

    class Ball extends Object{

      constructor(x, y, power, mouse){
        super();
        this.acceleration = new Vector();
        this.velocity = new Vector();
        this.location = new Vector(x,y);
        this.dir = new Vector();
        this.mouse = mouse;
        this.power = power;
      }

      update(){
       this.dir = Vector.subStatic(this.mouse, this.location);
       this.dir.nomalize();
       this.dir.mult(this.power);
       this.acceleration = this.dir;
       this.velocity.add(this.acceleration);
       this.velocity.limit(20);
       this.location.add(this.velocity);
      }

      draw(){
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.location.x,this.location.y, 4, 0, Math.PI*2, true);
        ctx.restore();
      }

      run(){
        console.log("!1");
        this.update();
        this.draw();
      }
    }

    class Player extends Object {
        constructor(setVector, mass) {
            super();
            this.location = setVector.copy();
            this.velocity = new Vector(0, 0);
            this.acceleration = new Vector(0, 0);
            this.mass = mass;
            this.flying = true;
            this.elasticity;
            this.jumpHeight = 150;
            this.speed = 10;
            this.vLocation = this.location.copy(); // vLocation is only uesed for draw real info is just location
            this.nowImageIndex = 0;
            this.walkStep=1;
        }

        update() {
          if(this.flying){
            this.acceleration.x += this.getFriction(airFriction,this.velocity).x;
          }
            this.applyForth(gravity);
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
            this.acceleration.mult(0);
        }

        vLocationUpdate(){
          // vLocation left rught max sync
          if(this.location.x-670<0){
            this.vLocation.x = this.location.x;
          } else if(this.location.x+670>3200){
            this.vLocation.x = this.location.x-1860;
          } else{
            this.vLocation.x = 670; // middle of canvas
          }
        }

        draw() {
            ctx.save();
            //vLocation is middle about vLocation;
            ctx.drawImage(skeletonSheet.getSheet(this.nowImageIndex), this.vLocation.x-this.mass, this.location.y-this.mass);
            ctx.restore();
        }

        checkImage(){
          var state = "walk";

          if(Math.abs(this.velocity.x)<0.2){
            state = "stop"
            //console.log(`make it 1`);
            this.walkStep=1;
          }

          if(!(this.flying) && (state == "stop")){
            if(this.velocity.x>=0){
              this.nowImageIndex = 8;
            } else if(this.velocity.x<0) {
              this.nowImageIndex = 17;
            }
          }

          if(!(this.flying) && (state == "walk")){
            if(this.velocity.x<0){
            this.nowImageIndex = this.walkStep+9;
          } else {
            this.nowImageIndex = this.walkStep;
          }
          }

          if(this.flying){ //flying state
            if(this.velocity.x>=0){
              this.nowImageIndex = 0;
            } else if(this.velocity.x<0) {
              this.nowImageIndex = 9;
            }
          }

          if(this.walkStep>8){

            this.walkStep=1;
          }

        //console.log(`now image ${this.nowImageIndex}`);


        }

        checkEdge() {
          if(this.location.y-this.mass<3){
            this.location.y = this.location.y;
            this.velocity.y = 0.1;
          }

            var nowPosition = mapArr[Math.floor((this.location.y + this.mass) / this.mass)][Math.floor(this.location.x / this.mass)];
            if (!(nowPosition == 0)) { // y impact check bottom
                this.location.y = Math.floor(this.location.y/this.mass)*this.mass;
                this.velocity.y = -(this.velocity.y/5); // 탄성. 상수를 통해 정도를 조절가능
                if(nowPosition <= 14){ // 얼음 조각들은 모두 id 14를 넘지 않음
                  this.acceleration.x += this.getFriction(iceFriction, this.velocity).x; //add friction only X
                }
                else{
                this.acceleration.x += this.getFriction(groundFriction, this.velocity).x; //add friction only X
                }
                this.flying = false; // 땅에 닿았으므로 날고있지 않음
            }
            else {
              this.flying = true;
            }

            console.log("adadadadad " + Math.floor(this.location.x / 32));
            console.log("adadadadad~@~@~@~@~@ " + Math.floor((this.location.y - this.mass) / 32));
            nowPosition = mapArr[Math.floor((this.location.y - this.mass) / 32)][Math.floor(this.location.x / 32)];
            if (!(nowPosition == 0)) { // y impact check top
                this.location.y = this.location.y+1;
                this.velocity.y = 0;
            }

            var nowPositionX = mapArr[Math.floor(this.location.y / 32)][Math.floor((this.location.x + this.mass) / 32)];
            if (!(nowPositionX == 0)) { // x impact sheck right
                this.location.x = this.location.x-1;
                this.velocity.x=0;
            }

            nowPositionX = mapArr[Math.floor(this.location.y / 32)][Math.floor((this.location.x - this.mass) / 32)];
            if(!(nowPositionX ==0 )){ // x impact check left
                this.location.x = this.location.x+1;
                this.velocity.x=0;
            }


        }

        run() {
            this.pressUpdate();
            this.update();
            this.vLocationUpdate();
            this.checkEdge(this.location.x, this.location.y);
            this.checkImage();
            this.draw();
        }

        pressUpdate(){ //65 left 84 top 68 right
          if(press[65]){
            var left = new Vector(-(this.speed), 0);
            this.applyForth(left);
            this.walkStep = this.walkStep+1;
          }

          if(press[68]){
            var right = new Vector(this.speed, 0);
            this.applyForth(right);
            this.walkStep++;
          }

          if(press[87]){
            if(!(this.flying)){
              this.applyForth(new Vector(0, -(this.jumpHeight)));
            }
            this.flying = true;
          }
        }

        throwBall(){
          var newBall = new Ball(this.location.x, this.location.y, 10, new Vector(pointX, pointY));
          newBall.run();
        }

    }

    function pngLoaded() {
        start();
    }

    var player = new Player(new Vector(670, 50), 32);
    var gravity =  new Vector(0, 2);

    function start() {
        setInterval('loop()', 10);
    }

    function loop() {
        ctx.clearRect(0,0,canvas.width, canvas.height);

        // map move
        if(player.location.x-670<0){ // if left max
          ctx.drawImage(mapImage, 0, 0, 1340, 640, 0,0, canvas.width, canvas.height);
        } else if(player.location.x+670>3200){ // if right max
          ctx.drawImage(mapImage, 3200-canvas.width, 0, 1340, 640, 0,0, canvas.width, canvas.height);
        } else { // middle
          ctx.drawImage(mapImage, player.location.x-670, 0, 1340, 640, 0,0, canvas.width, canvas.height);
      }

        player.velocity.limit(5);
        player.run();
        drawString();
    }

    function drawString() {
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(`${pointX}, ${pointY} X velocity ${Math.floor(player.velocity.x)} Y velocity ${Math.floor(player.velocity.y)}`, 10, 50);
        ctx.fillStyle = "blue";
        ctx.fillText(`X acceleration ${(player.acceleration.x)} Y acceleration ${Math.floor(player.acceleration.y)}`, 10,75);
        ctx.fillText(`X velocity ${(player.velocity.x)} Y velocity ${Math.floor(player.velocity.y)}`, 10,100);
        ctx.fillStyle = "black"
        ctx.fillText(`X location ${Math.floor(player.location.x)} Y location ${Math.floor(player.location.y)}`, 10,125);
        ctx.fillText(`X Vlocation ${Math.floor(player.vLocation.x)} Y Vlocation ${Math.floor(player.vLocation.y)}`, 10,150);


    }
//}
