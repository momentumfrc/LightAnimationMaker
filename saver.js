var javaifyer = {
  toConstructor : function(animation) {
    switch(animation.type) {
      case "sequence":
        var animationArr = "new Animation[]{";
        var timesArr = "new int[]{";
        for(var i = 0; i < animation.animations.length; i++) {
          animationArr += this.toConstructor(animation.animations[i]) + ", ";
          timesArr += Math.floor(animation.times[i]) + ", ";
        }
        animationArr = animationArr.slice(0,animationArr.length-2) + "}";
        timesArr = timesArr.slice(0, timesArr.length-2) + "}";
        return "new AnimationSequence("+animationArr+", "+timesArr+" )";
      case "blink":
        var colorsArr = "new Color[]{";
        var timesArr = "new int[]{";
        for(var i = 0; i < animation.colors.length; i++) {
          var roundColor = animation.colors[i].getRounded();
          colorsArr += "new Color("+roundColor.r+", "+roundColor.g+", "+roundColor.b+"), ";
          timesArr += Math.floor(animation.waittimes[i]) + ", ";
        }
        colorsArr = colorsArr.slice(0, colorsArr.length-2) + "}";
        timesArr = timesArr.slice(0, timesArr.length-2) + "}";
        return "new Blink("+colorsArr+", "+timesArr+")";
      case "fade":
        var colorsArr = "new Color[]{";
        for(var i = 0; i < animation.colors.length; i++) {
          var roundColor = animation.colors[i].getRounded();
          colorsArr += "new Color("+roundColor.r+", "+roundColor.g+", "+roundColor.b+"), ";
        }
        colorsArr = colorsArr.slice(0, colorsArr.length-2) + "}";
        return "new Fade("+colorsArr+", "+animation.fadetime+", "+animation.holdtime+")";
      case "random":
        return "new RandomColors("+animation.delay+", "+animation.repeat+")";
      case "snake":
        var colorsArr = "new Color[]{";
        for(var i = 0; i < animation.colors.length; i++) {
          var roundColor = animation.colors[i].getRounded();
          colorsArr += "new Color("+roundColor.r+", "+roundColor.g+", "+roundColor.b+"), ";
        }
        colorsArr = colorsArr.slice(0, colorsArr.length-2) + "}";
        return "new Snake("+colorsArr+", "+animation.speed+")"
      case "solid":
        var colorsArr = "new Color[]{";
        for(var i = 0; i < animation.colors.length; i++) {
          var roundColor = animation.colors[i].getRounded();
          colorsArr += "new Color("+roundColor.r+", "+roundColor.g+", "+roundColor.b+"), ";
        }
        colorsArr = colorsArr.slice(0, colorsArr.length-2) + "}";
        return "new Solid("+colorsArr+")";
    }
  },
  toJavaStatement : function(animation) {
    return "Animation name = "+this.toConstructor(animation)+";";
  }
};
$(document).ready(function(e) {
  $("#javaify").click(function(e) {
    if(animator.current == null) {
      return;
    }
    $("#jout").text(javaifyer.toJavaStatement(animator.current));
    $("#jout").show();
  });
});
