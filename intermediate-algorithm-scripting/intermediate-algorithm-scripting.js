"use strict"


function sumAll(arr) {
	let sum = 0;
	let sortedArr = arr.sort( (a,b) => a - b);
  for (let i = sortedArr[0]; i <= sortedArr[1]; i++) {
  	sum += i;
	}
	return sum;
}

function diffArray(arr1, arr2) {
  var newArr = [];

  function onlyInFirst (arra, arrb) {
	  for (let i = 0; i < arra.length; i++) {
	  	if (!arrb.includes(arra[i])) {
	  		newArr.push(arra[i])
	  	}
	  }
	}
 
  onlyInFirst(arr1, arr2);
  onlyInFirst(arr2, arr1);

  return newArr;
}

function destroyer(arr, ...args) {
	return arr.filter(function(number) {
		return !args.includes(number)
	});
}

function whatIsInAName(collection, source) {

  let keys = Object.keys(source);

  return collection.filter(function(obj) {
  	for (let i = 0; i < keys.length; i++) {
  		if( !obj.hasOwnProperty(keys[i]) || obj[keys[i]] !== source[keys[i]] ) {
  			return false;
  		}
  	}
  	return true;
  })
}

function spinalCase(str) {

	str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
	return str.split(/\s+|_+/g).join('-').toLowerCase();
}

function translatePigLatin(str) {

	let regex = /^[^aeiou]+/;
	if (!regex.test(str)) {
		return str + "way";
	}
	let strArray = str.split(''); // array
	let beginningConsonant = str.match(regex).join(); // string
	strArray.splice(0, beginningConsonant.length)
	return strArray.join('').concat(beginningConsonant + "ay");
}

console.log(`Glove: ${translatePigLatin("lqwdf")}` );


