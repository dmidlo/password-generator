// Unicode

function addEvent(element, evnt, funct){
   return element.addEventListener(evnt, funct, false);
}

function getElementObject(DOMid) {
    return document.getElementById(DOMid)
}

function getTextInputValue(DOMid) {
  return document.getElementById(DOMid).value;;
}

function setTextInputValue(DOMid, val) {
  document.getElementById(DOMid).value = val;
}

function GetUnicode(params) {
  return;
}

function main() {
  //Test Main Password Field  
  setTextInputValue("passwordTextInput","Johnny Bravo");  
  console.log(getTextInputValue("passwordTextInput"));

  addEvent(getElementObject(""))


  return ;
}
addEvent(document, "DOMContentLoaded", main())


