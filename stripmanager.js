
var canvas;
var ctx;

var strip = {
  pixels: [],
  pixelSize: 50,
  resize: function() {
    if(canvas.width != canvas.clientWidth) {
      canvas.width = canvas.clientWidth;
    }
    canvas.height = this.pixelSize;
    var size = Math.floor(canvas.width / this.pixelSize);
    if(this.pixels.length > size) {
      this.pixels = this.pixels.slice(0, size-1);
    } else {
      for(var i = this.pixels.length - 1; i < size; i++) {
        this.pixels.push(new color(255,255,255));
      }
    }
  },
  draw: function() {
    for(var i = 0; i < this.pixels.length; i++) {
      ctx.fillStyle = "rgb("+this.pixels[i].r+","+this.pixels[i].g+","+this.pixels[i].b+")";
      ctx.fillRect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
    }
  },
  parseCommands: function(commands) {
    for(var k = 0; k < commands.length; k++) {
      var c = commands[k];
      switch(c.type) {
        case "single":
          if(c.address > 0 && c.address < this.pixels.length) {
            this.pixels[c.address] = c.color;
          }
          break;
        case "run":
          if(c.address < 0 || c.address > this.pixels.length) {
            break;
          }
          for(var i = c.address; i < Math.min(c.length + c.address, this.pixels.length); i++) {
            this.pixels[i] = c.color;
          }
          break;
        case "stride":
          if(c.address < 0 || c.address > this.pixels.length) {
            break;
          }
          for(var i = c.address; i < this.pixels.length; i += c.stride) {
            for(var j = i; j < Math.min(c.length + i, this.pixels.length); j++) {
              this.pixels[j] = c.color;
            }
          }
          break;
      }
    }
    this.draw();
  }
}
window.onload = function() {
  canvas = document.getElementById('strip');
  ctx = canvas.getContext('2d');
  strip.resize();
}
window.onResize = function() {
  strip.resize();
}
