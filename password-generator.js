// Unicode

function GetUnicode(params) {
  return;
}

function getTextInputValue(DOMid) {
  return document.getElementById(DOMid).value;;
}

function setTextInputValue(DOMid, val) {
  document.getElementById(DOMid).value = val;
}

document.addEventListener("DOMContentLoaded", function() {
  setTextInputValue("passwordTextInput","Johnny Bravo");  
  console.log(getTextInputValue("passwordTextInput"));
});
