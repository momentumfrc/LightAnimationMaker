var animator = {
  current: null,
  timeout: null,
  next: function() {
    if(this.current == null) {
      return;
    }
    strip.parseCommands(this.current.getNextFrame());
    this.timeout = window.setTimeout(function(){animator.next();}, this.current.getFrameDelayMilliseconds());
  },
  setAnimation: function(newAnimation) {
    if(this.timeout != null) {
      window.clearTimeout(this.timeout);
    }
    this.current = newAnimation;
    this.next();
  }
}
