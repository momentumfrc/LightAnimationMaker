var interpreter = {
  interpret : function(animationBox) {
    switch(animationBox.find("select.animationtype:first").val()) {
      case "group":
        var animations = [];
        var times = [];
        animationBox.find(".animationBox").each(function() {
          var ab = $(this);
          animations.push(inerpreter.interpret(ab));
          times.push(ab.closest("tr").find(".animationtime").val());
        });
        return new animationFactory.animationSequence(animations, times);
        break;
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
        break;
      case "fade":
        break;
      case "random":
        break;
      case "snake":
        break;
      case "solid":
        break;
    }
  },

}
