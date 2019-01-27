"use strict"

function palindrome(str) {
  let strArray = str.toLowerCase().match(/[a-z0-9]/g);

  for (let i = 0; i < strArray.length; i++) {
  	if (strArray[i] !== strArray[strArray.length - 1 - i]) {
  		return false;
  	}
  }
  return true;
}