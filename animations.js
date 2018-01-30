function color(r,g,b) {
  this.r = r;
  this.g = g;
  this.b = b;
};
var commandFactory = {
  makeSingle: function(address, color) {
    this.type = "single";
    this.address = address;
    this.color = color;
  },
  makeRun: function(address, color, length) {
    this.type = "run";
    this.address = address;
    this.color = color;
    this.length = length;
  },
  makeStride: function(address, color, length, stride) {
    this.type = "stride";
    this.address = address;
    this.color = color;
    this.length = length;
    this.stride = stride;
  }
};
var animationFactory = {
  animationSequence: function(animations, times) {
    if(animations.length != times.length || animations.length == 0) {
      return;
    }
    this.times = times;
    this.animations = animations;
    this.startTime = Date.now();
    this.currentidx = 0;
    this.getNextFrame = function() {
      if(Date.now() - this.startTime >= this.times[this.currentidx]) {
        this.startTime = Date.now();
        this.currentidx = (this.currentidx + 1) % times.length;
      }
      return this.animations[this.currentidx].getNextFrame();
    };
    this.getFrameDelayMilliseconds = function() {
      var delay = this.animations[this.currentidx].getFrameDelayMilliseconds();
      if(delay < 0) {
        return this.times[this.currentidx];
      } else {
        return delay;
      }
    };
  },
  blink: function(colors, waittimes) {
    if(colors.length != waittimes.length || colors.length == 0) {
      return;
    }
    this.colors = colors;
    this.waittimes = waittimes;
    this.idx = 0;
    this.getNextFrame = function() {
      var out = [new commandFactory.makeStride(0, this.colors[this.idx], 1, 1)];
      this.idx = (this.idx + 1) % waittimes.length;
      return out;
    };
    this.getFrameDelayMilliseconds = function() {
      return this.waittimes[this.idx];
    }
  },
  fade: function(colors, fadetime, holdtime) {
    if(colors.length == 0) {
      return;
    }
    this.colors = colors;
    this.fadetime = fadetime;
    this.holdtime = holdtime;
    this.idx = 0;
    this.hold = false;
    this.STEPS = 50;
    this.diffCalc = {
      color: colors,
      diffs: new Color(0,0,0),
      to: new Color(0,0,0),
      CLOSE_ENOUGH: 0.005,
      calculateDiffs: function(to, steps) {
        this.to = to;
        this.diffs.r = (this.to.r - this.color.r) / steps;
        this.diffs.g = (this.to.g - this.color.g) / steps;
        this.diffs.b = (this.to.b - this.color.b) / steps;
      },
      applyDiffs: function() {
        this.color.r += this.diffs.r;
        this.color.g += this.diffs.g;
        this.color.b += this.diffs.b;
      },
      atTarget: function() {
        return (Math.abs(this.color.r - this.to.r) < CLOSE_ENOUGH) && (Math.abs(this.color.g - this.to.g) < CLOSE_ENOUGH) && (Math.abs(this.color.b - this.to.b) < CLOSE_ENOUGH);
      }
    };
    this.diffCalc.calculateDiffs(colors[(this.i+1)%this.colors.length], this.STEPS);
    this.getNextFrame = function() {
      this.diffCalc.applyDiffs();
      if(this.diffCalc.atTarget()) {
        this.idx = (this.idx + 1) % this.colors.length;
        this.hold = true;
        this.diffCalc.calculateDiffs(this.colors[idx], this.STEPS);
      }
      return [new commandFactory.makeStride(0, this.diffCalc.color, 1, 1)];
    };
  },
  random: function(delay, repeat) {
    this.delay = delay;
    this.repeat = repeat;
    this.randomRGB = function() {
      return Math.floor(Math.random() * 256);
    };
    this.getNextFrame = function() {
      var out = [];
      for(var i = 0; i < this.repeat; i++) {
        var paint = new color(this.randomRGB(), this.randomRGB(), this.randomRGB());
        out.push(new commandFactory.makeStride(i, paint, 1, this.repeat));
      }
      return out;
    };
    this.getFrameDelayMilliseconds = function() {
      return this.delay;
    };
  },
  snake: function(colors, delay) {
    if(colors.length == 0) {
      return;
    }
    this.colors = colors;
    this.speed = delay;
    this.increment = 1;
    this.offset = 0;
    this.getNextFrame = function() {
      var out = [];
      for(var i = 0; i < this.colors.length; i++) {
        out.push(new commandFactory.makeStride(i, this.colors[(i+this.offset) % this.colors.length], 1, this.colors.length));
      }
      this.offset = (this.offset + this.increment + this.colors.length) % this.colors.length;
      return out;
    };
    this.getFrameDelayMilliseconds = function() {
      return this.speed;
    };
    this.setReverse = function(forward) {
      this.increment = (forward) ? 1 : -1;
    };
  },
  solid: function(colors) {
    if(colors.length == 0) {
      return;
    }
    this.delay = 500;
    this.colors = colors;
    this.getNextFrame = function() {
      var out = [];
      for(var i = 0; i < this.colors.length; i++) {
        out.push(new commandFactory.makeStride(i, this.colors[i % this.colors.length], 1, this.colors.length));
      }
      return out;
    };
    this.getFrameDelayMilliseconds = function() {
      return this.delay;
    }
  }
};
