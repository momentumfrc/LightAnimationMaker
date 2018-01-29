var builder = {
  animationBox : function() {
    var baseHTML = `
    <div class="animationbox"><button class="removeButton">Delete</button></div>
    `;
    var elem = $($.parseHTML(baseHTML));
    elem.append(builder.animationSelector());
    elem.find(".removeButton").click(function(e){
      $(e.target).closest(".animationbox").remove();
    });
    return elem;
  },
  animationSelector : function() {
    var baseHTML = `
    <select class="animationtype">
      <option value="group">Animation Sequence</option>
      <option value="blink">Blink</option>
      <option value="fade">Fade</option>
      <option value="random">Random</option>
      <option value="snake">Chase</option>
      <option value="solid" selected="selected">Solid</option>
    </select>
    `;
    var elem = $($.parseHTML(baseHTML));
    elem.change(function(e){builder.switchAnimationOptions(e);});
    return elem;
  },
  switchAnimationOptions : function(e) {
    switch($(e.target).find(".animationType").val()) {
      case "group":
        break;
      case "blink":
        break;
      case "fade":
        break;
      case "random":
        break;
      case "solid":
        break;
    },
    group : function() {
    },
    blink : function() {
    }
  }
}
