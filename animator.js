var animator = {
  current: null,
  next: function() {
    if(this.current == null) {
      return;
    }
    strip.parseCommands(this.current.getNextFrame());
    window.setTimeout(function(){animator.next();}, this.current.getFrameDelayMilliseconds());
  },
  setAnimation: function(newAnimation) {
    this.current = newAnimation;
    this.next();
  }
}
