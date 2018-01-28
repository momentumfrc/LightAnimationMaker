jQuery.fn.outerHTML = function() {
  return jQuery('<div />').append(this.eq(0).clone()).html();
};
var toRemove = null;
function constructBlock(type) {
  if(type == "addCommandGroup") {
    return `
    <div class="block commandGroup" draggable="true">
      <div class="blockdata">Command Group</div>
      <div class="subCommands" ondragstart="drag(event)" ondragover="preDrop(event)" ondragleave="abortDrop(event)"></div>
    </div>`;
  }
  return `<div class="block ${type}" draggable="true" ondragstart="drag(event)"></div>`;
}

function drag(e) {
  if($(e.target).attr('id')=="addCommandGroup") {
    e.dataTransfer.setData("text/html",constructBlock("addCommandGroup"));
  } else if($(e.target).attr('id')=="addCommand") {
    e.dataTransfer.setData("text/html",constructBlock($(e.target).find(":selected").val()));
  } else {
    toRemove = $(e.target);
    e.dataTransfer.setData("text/html",$(e.target).outerHTML());
  }
}

function preDrop(e) {
  e.preventDefault();
  $(e.target).addClass("hover");
}
function preDropNo(e) {

}
function abortDrop(e) {
  console.log($(e.target).attr('id'));
  $(e.target).removeClass("hover");
}

function drop(e) {
  if(toRemove != null) {
    toRemove.remove();
  }
  $(e.target).removeClass("hover");
  if($(e.target).attr('id') == "commandarea") {
    e.target.innerHTML = e.dataTransfer.getData("text/html");
  } else {
    e.target.innerHTML += e.dataTransfer.getData("text/html");
  }
  e.dataTransfer.clearData("text/html");
}
