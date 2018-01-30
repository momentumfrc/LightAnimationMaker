var interpreter = {
  interpret : function(animationBox) {
    switch(animationBox.find("select.animationtype:first").val()) {
      case "group":
        var animations = [];
        var times = [];
        animationBox.find(".animationBox").each(function() {
          var ab = $(this);
          animations.push(interpreter.interpret(ab));
          times.push(ab.closest("tr").find(".animationtime").val());
        });
        return new animationFactory.animationSequence(animations, times);
      case "blink":
        var colors = [];
        var times = [];
        animationBox.find(".rgbbox").each(function(){
          var rb = $(this);
          colors.push(new color(
            rb.find(".r").val(),
            rb.find(".g").val(),
            rb.find(".b").val()
          ));
          times.push(rb.closest("tr").find(".colortime").val());
        });
        return new animationFactory.blink(colors, times);
      case "fade":
        var fadetime = animationBox.find(".fadetime").val();
        var holdtime = animationBox.find(".holdtime").val();
        var colors = [];
        animationBox.find(".rgbbox").each(function() {
          var rb = $(this);
          colors.push(new color(
            rb.find(".r").val(),
            rb.find(".g").val(),
            rb.find(".b").val()
          ));
        });
        return new animationFactory.fade(colors, fadetime, holdtime);
      case "random":
        var delay = animationBox.find(".delay").val();
        var repeat = animationBox.find(".repeat").val();
        return new animationFactory.random(delay, repeat);
      case "snake":
        var delay = animationBox.find(".delay").val();
        var colors = [];
        animationBox.find(".rgbbox").each(function() {
          var rb = $(this);
          colors.push(new color(
            rb.find(".r").val(),
            rb.find(".g").val(),
            rb.find(".b").val()
          ));
        });
        return new animationFactory.snake(colors, delay);
      case "solid":
        var colors = [];
        animationBox.find(".rgbbox").each(function() {
          var rb = $(this);
          colors.push(new color(
            rb.find(".r").val(),
            rb.find(".g").val(),
            rb.find(".b").val()
          ));
        });
        return new animationFactory.solid(colors);
    }
  },

}

$(document).ready(function(e) {
  $("#update").click(function(e){
    animator.setAnimation(interpreter.interpret($("#animation").find(".animationBox")));
  });
});
