var sketch = function (p) {
  var Chars = ["1", "0", "1", "0"];
  var Cells = [];
  var tileSize = 16;
  var dropspeed = 8;
  var tiles = 119;
  var x = 0;

  p.setup = function () {
    p.noStroke();
    p.colorMode(p.HSB, 360, 100, 50, .1);
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('p5-container');
    for (var i = 0; i < tiles; i++) {
      x += tileSize;
      var y = p.round(p.random(p.height / dropspeed) * tileSize) - window.innerHeight;
      var r = tileSize;
      var h = p.random(100, 150);
      var t = p.random(.8, 8);
      var u = p.random(.3, .8);
      Cells[i] = new Matrix(x, y, r, h, t, u);
    }
  };

  p.draw = function () {
    p.background(100, 100, 0, .009);
    for (var i = 0; i < tiles; i++) {
      Cells[i].spread();
      Cells[i].update();
    }
  };

  function Matrix(isX, isY, myD, myHue, newX, newY) {
    this.x = isX;
    this.y = isY;
    this.tS = newX;
    this.tU = newY;
    this.diameter = myD;
    this.h = myHue;
    this.spread = function () {
      var tx = 0;
      var ty = p.round(p.random(0, 2));
      this.x += (tx * tileSize);
      if ((this.x > p.width + (tileSize * 8)) || (this.x < -tileSize * 8)) { this.x = p.random(p.width / tileSize) * tileSize; }
      this.y += (ty * dropspeed);
      if ((this.y > p.height + (tileSize * 8)) || (this.y < -tileSize * 8)) { this.y = p.random(-p.height / tileSize) * tileSize; }
      if ((this.y < ((window.innerHeight)))) this.y += this.tU;
    };

    this.update = function () {
      var thecol = p.round(p.random(0, 10));
      var thebri = 0;
      if (thecol == 10) { thecol = 0; thebri = 100; }
      else { myHue = 120; thecol = 100; thebri = 50; }
      p.fill(myHue, thecol, thebri, .7);
      p.textSize(16);
      p.textFont('Verdana');
      var thechar = p.round(p.random(0, 8));
      p.text((Chars[(thechar)]), this.x, this.y);
    }
  }

  p.mousePressed = function () {
    tileSize = p.random(0.3, 2);
    tiles = p.random(1, 239);
    for (var i = 0; i < tiles; i++) {
      var x = p.random(p.width / tileSize) * tileSize;
      var y = p.random((p.height / tileSize) * tileSize) - p.height;
      var r = tileSize;
      var h = p.random(10, 300);
      var t = p.random(.5, 2);
      var u = p.random(.3, 3.8);
      Cells[i] = new Matrix(x, y, r, h, t, u);
    }
  };
};

new p5(sketch);
