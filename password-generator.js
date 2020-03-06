/////////////////////
/////////// Functions
/////////////////////
function addEvent(element, evnt, funct) {
  return element.addEventListener(evnt, funct);
}

function getElementObject(DOMid) {
  return document.getElementById(DOMid);
}

function getTextInputValue(DOMid) {
  return document.getElementById(DOMid).value;
}

function setTextInputValue(DOMid, val) {
  document.getElementById(DOMid).value = val;
}

function bubbleStop(obj, type) {
  if (type === "stopPropagation") {
    obj.stopPropagation();
  } else if (type === "preventDefault") {
    obj.preventDefault();
  }
}

function consoleLog(obj) {
  console.log(obj);
}

function GetUnicode(params) {
  return;
}
////////////////////////////////////////////////////////
/////////// Main Handler ///////////////////////////////
////////////////////////////////////////////////////////
function main() {
  //Test Main Password Field
  setTextInputValue("passwordTextInput", "Johnny Bravo");
  console.log(getTextInputValue("passwordTextInput"));

  //Test Dropdown-Toggler click event
  addEvent(getElementObject("dropdownToggleBtn"), "click", function (e){
    bubbleStop(e, "preventDefault");
    consoleLog(e);
  });

  return;
}
////////////////////////////////////////////////////////
////////// Run /////////////////////////////////////////
////////////////////////////////////////////////////////
addEvent(document, "DOMContentLoaded", main());
