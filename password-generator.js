/////////////////////
/////////// Functions
/////////////////////

function addEvent(element, evnt, funct) {
  element.addEventListener(evnt, funct);
}

function getElement(DOMid) {
  return document.getElementById(DOMid);
}

function getChecked(DOMid) {
  return getElement(DOMid).checked;
}

function getInputValue(DOMid) {
  return getElement(DOMid).value;
}

function setInputValue(DOMid, value) {
  getElement(DOMid).value = value;
}

function preventEvent(e) {
  e.preventDefault();
}

function generatePassword() {
  const length = parseInt(getInputValue("passwordLengthNumberInput"), 10);
  const includeUppercase = getChecked("uppercaseCheck");
  const includeLowercase = getChecked("lowercaseCheck");
  const includeNumbers = getChecked("numericCheck");
  const includeSpecialChars = getChecked("specialCharCheck");

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "@!#$&._";

  let allowedChars = "";
  if (includeUppercase) allowedChars += uppercaseChars;
  if (includeLowercase) allowedChars += lowercaseChars;
  if (includeNumbers) allowedChars += numberChars;
  if (includeSpecialChars) allowedChars += specialChars;

  if (allowedChars.length === 0 || length < 8 || length > 128) {
    alert("Please select at least one character type and set a valid length (8-128).");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  }

  setInputValue("passwordTextInput", password);
}

// Copy password without regenerating
function copyToClipboard() {
  const passwordField = getElement("passwordTextInput");
  
  if (!passwordField.value) {
    alert("No password to copy!");
    return;
  }

  passwordField.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
}

// Sync number input with range input
function syncPasswordLength(event) {
  setInputValue("passwordLengthRangeInput", event.target.value);
  setInputValue("passwordLengthNumberInput", event.target.value);
}

////////////////////////////////////////////////////////
/////////// Main Handler ///////////////////////////////
////////////////////////////////////////////////////////

function main() {
  // Set sensible defaults
  setInputValue("passwordLengthNumberInput", "16");
  setInputValue("passwordLengthRangeInput", "16");
  getElement("uppercaseCheck").checked = true;
  getElement("lowercaseCheck").checked = true;
  getElement("numericCheck").checked = true;
  getElement("specialCharCheck").checked = true;

  // Generate password ONCE on initial load
  generatePassword();

  // Sync number input with range input
  addEvent(getElement("passwordLengthNumberInput"), "input", syncPasswordLength);
  addEvent(getElement("passwordLengthRangeInput"), "input", syncPasswordLength);

  // Prevent dropdown from closing on interactions
  document.querySelectorAll(".dropdown-menu input").forEach((input) => {
    addEvent(input, "click", (e) => e.stopPropagation());
  });

  // Generate password on submit & close dropdown
  addEvent(document.querySelector(".dropdown-menu button[type='submit']"), "click", function (e) {
    preventEvent(e);
    generatePassword();
    $(".dropdown-menu").removeClass("show"); // Close dropdown after generating password
  });

  // Copy password to clipboard (without regenerating)
  addEvent(document.querySelector(".input-group-append button"), "click", function (e) {
    preventEvent(e);
    copyToClipboard();
  });

  // Prevent dropdown toggle button from closing the menu
  addEvent(getElement("dropdownToggleBtn"), "click", function (e) {
    preventEvent(e);
    $(".dropdown-menu").toggleClass("show");
  });

  // Close dropdown when clicking outside of it
  addEvent(document, "click", function (e) {
    if (!e.target.closest(".dropdown-menu") && !e.target.closest("#dropdownToggleBtn")) {
      $(".dropdown-menu").removeClass("show");
    }
  });
}

////////////////////////////////////////////////////////
////////// Run /////////////////////////////////////////
////////////////////////////////////////////////////////

addEvent(document, "DOMContentLoaded", main);

