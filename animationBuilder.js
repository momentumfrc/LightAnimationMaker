var builder = {
  animationBox : function() {
    var baseHTML = `
    <div class="animationbox"><button class="removeButton">Delete</button><div class="animationoptions"></div></div>
    `;
    var elem = $($.parseHTML(baseHTML));
    elem.find(".animationoptions").before(builder.animationSelector());
    elem.find(".removeButton").click(function(e){
      $(e.target).closest(".animationbox").remove();
    });
    elem.find(".animationoptions").append(builder.solid());
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
    var anioptions = $(e.target).closest(".animationbox").find(".animationoptions");
    anioptions.empty();
    switch($(e.target).val()) {
      case "group":
        anioptions.append(builder.group());
        break;
      case "blink":
        anioptions.append(builder.blink());
        break;
      case "fade":
        break;
      case "random":
        break;
      case "solid":
        break;
    }
  },
  rgbcell : function() {
    var baseHTML = `
    <div class="rgbbox">
      <input type="number" min="0" max="255" class="r">
      <input type="number" min="0" max="255" class="g">
      <input type="number" min="0" max="255" class="b">
      <div class="rgbdisplay"></div>
    </div>`;
    var elem = $($.parseHTML(baseHTML));
    elem.find(".r,.g,.b").on("input",function(e) {
      var rgbbox = $(e.target).closest(".rgbbox");
      var r = rgbbox.find(".r").val();
      var g = rgbbox.find(".g").val();
      var b = rgbbox.find(".b").val();
      rgbbox.find(".rgbdisplay").css("background","rgb("+r+","+g+","+b+")");
    });
    return elem;
  },
  group : function() {
    var baseHTML = `
    <table>
      <tr><th>Animation</th><th>Time</th></tr>
      <tr><td rowspan="2"><button class="addsuban">Add</button></td></tr>
    </table>
    `;
    var elem = $($.parseHTML(baseHTML));
    elem.find(".addsuban").click(function(e) {
      var baseHTML = '<tr><td class="animationcell"></td><td><input type="number" class="animationtime"></td></tr>';
      var elem = $($.parseHTML(baseHTML));
      var anibox = builder.animationBox();
      anibox.find(".removeButton").off("click");
      anibox.find(".removeButton").click(function(e){
        $(e.target).closest("tr").remove();
      });
      elem.find(".animationcell").append(anibox);
      var target = $(e.target);
      target.closest("tr").before(elem);
    });
    return elem;
  },
  blink : function() {
    var baseHTML = `
    <table>
      <tr><th>Color</th><th>Time</th></tr>
      <tr><td rowspan="2"><button class="addcol">Add</button></td></tr>
    </table>
    `;
    var elem = $($.parseHTML(baseHTML));
    elem.find(".addcol").click(function(e) {
      var baseHTML = '<tr><td class="colorcell"><button class="removecolor">Delete</button></td><td><input type="number" class="colortime"></td></tr>';
      var elem = $($.parseHTML(baseHTML));
      elem.find(".removecolor").click(function(e) {
        $(e.target).closest("tr").remove();
      });
      elem.find(".colorcell").append(builder.rgbcell());
      $(e.target).closest("tr").before(elem);
    });
    return elem;
  },
  fade : function() {

  },
  random : function() {

  },
  solid : function() {

  }
}
