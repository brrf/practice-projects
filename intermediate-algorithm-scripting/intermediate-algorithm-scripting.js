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

function myReplace(str, before, after) {
   (before[0] == before[0].toUpperCase()) ? after = `${after[0].toUpperCase()}${after.slice(1)}` : after = `${after[0].toLowerCase()}${after.slice(1)}`;

   let strArray = str.split(' ');
   if (strArray.indexOf(before) > 0) {
   	strArray.splice( strArray.indexOf(before), 1, after)
   	return strArray.join(' ');
   }
}

function pairElement(str) {
  let returnArray = [];
 
  for (let i = 0; i < str.length; i++ ) {
  	switch (str[i]) {
  		case 'G': returnArray.push(['G', 'C']);
  					break;
  		case 'C': returnArray.push(['C', 'G']);
  					break;
  		case 'A': returnArray.push(['A', 'T']);
  					break;
  		case 'T': returnArray.push(['T', 'A']);
  					break;
  	}
  }
  return returnArray;
}

function fearNotLetter(str) {
	for (let i = 1; i < str.length; i++) {
		if (str.charCodeAt(i) - str.charCodeAt(i-1) > 1) {
			return String.fromCharCode(str.charCodeAt(i) -1);
		}
	}
}

function uniteUnique(...arr) {
  let filteredArray = [];
  for (let i = 0; i < arr.length; i++) {
  	for (let j = 0; j < arr[i].length; j++) {
  		if ( !filteredArray.includes(arr[i][j]) ) {
  			filteredArray.push(arr[i][j]);
  		}
  	}
  }
  return filteredArray
}

console.log( uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]) );

