function preDrop(e) {
  e.preventDefault();
  $(e.target).addClass("hover");
}
function dropAbort(e) {
  $(e.target).removeClass("hover");
}

function setListeners(dom) {
  var sub = $(dom).find(".subCommands");
  sub.on("dragover", function(e){preDrop(e);});
  sub.on("dragleave", function(e){dropAbort(e);});
  sub.on("drop", function(e) {
    $(e.target).removeClass("hover");
    var dom = $.parseHTML(e.originalEvent.dataTransfer.getData("text/html"));
    setListeners(dom);
    $(e.target).append(dom);
  });
  var norm = $(dom).find(".block, .blockdata");
  norm.on("dragover",function(e){
    $(e.target).addClass("disableDrag");
  });
  norm.on("dragleave",function(e){
    $(e.target).removeClass("disableDrag");
  });
}

$(document).ready(function() {
  $("#commandarea").on("dragover", function(e){preDrop(e);});
  $("#commandarea").on("dragleave", function(e){dropAbort(e);});
  $("#commandarea").on("drop", function(e){
    $(e.target).removeClass("hover");
    var dom = $.parseHTML(e.originalEvent.dataTransfer.getData("text/html"));
    setListeners(dom);
    $(e.target).html('');
    $(e.target).append(dom);
  });

  $("#addCommandGroup").on("dragstart", function(e){
    e.originalEvent.dataTransfer.setData("text/html", `
    <div class="block commandGroup" draggable="true">
      <div class="blockdata">Command Group</div>
      <div class="subCommands" ondragstart="drag(event)" ondragover="preDrop(event)" ondragleave="abortDrop(event)"></div>
    </div>
    `);
  });
});
