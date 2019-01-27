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

function convertHTML(str) {
  let returnArray = [];
  let strArray = str.split('');
  for (let i = 0; i < strArray.length; i++) {
  	switch (strArray[i]) {
  		case '&': returnArray.push("&amp;");
  			break;
  		case '<': returnArray.push("&lt;");
  			break;
  		case '>': returnArray.push("&gt;");
  			break;
  		case '"': returnArray.push("&quot;");
  			break;
  		case "'": returnArray.push("&apos;");
  			break;
  		default:  returnArray.push(strArray[i]);
  	}
  }
 	returnArray = returnArray.join('');
 	return returnArray;
}

function sumFibs(num) {
	let fibArray = [1, 1];
	if (num === 1) return 1;
	if (num === 2) return 2;
	let currentNum = 0

	while ( (currentNum = fibArray[0] + fibArray[1]) <= num) {
		fibArray.unshift(currentNum);
	}

	return fibArray.filter( value => value % 2 === 1).reduce( (a,b) => a + b);
}

function sumPrimes(num) {

	function isPrime (num) {
		for (let i = 2; i <= num; i++) {
			if (num % i === 0 && num != i) return false;
		}
		return true;
	}

	let sum = 0;
	for (let i = 2; i <= num; i++) {
		if (isPrime(i)) {
			sum += i;
		}

	}
	return sum;
}

function commonMultiples (num) {
	let arr = [];

	for (let i = 2; i <= num; i++) {
		if (num % i === 0) {
			arr.push(i);
			num /= i;
			i--;
		}
	}
	return arr;
}

function smallestCommons(arr) {

	arr.sort( (a,b) => a - b );

	let commonMultipleArr = [];

	function iterateExistingPrimes (num) {
	  	let remainder = num;
	  	for (let i = 0; i < commonMultipleArr.length; i++) {
	  		if (remainder % commonMultipleArr[i] === 0) {
	  			remainder /= commonMultipleArr[i];
	  		}
	  	}
	  	return addMissingPrimes(remainder);
	}

	function addMissingPrimes (remainder) {
		while (remainder > 1) {
			for (let i = 2; i <= remainder; i++) {
				if (remainder % i === 0) {
					commonMultipleArr.push(i);
					remainder /= i;
					i--;
				}
			}
		}
	}

	for (let i = arr[0]; i <= arr[1]; i++) {
		iterateExistingPrimes(i);
	}
	 return commonMultipleArr.reduce( (a,b) => a * b );
}

function dropElements(arr, func) {
  
	while (!func(arr[0])) {
		arr.shift();
	}
	return arr;
}

function steamrollArray(arr) {
	let returnArr = [];
	
	function flattenArrays (arr) {
		for (let i = 0; i < arr.length; i++) {
			if ( Array.isArray(arr[i]) ) {
				flattenArrays(arr[i]);
			} else {
				returnArr.push(arr[i]);
				console.log(returnArr);
			}
		}
	}
	flattenArrays(arr);
	return returnArr;
}

function binaryAgent(str) {
  let strArray = str.split(' ');
  return strArray.map( item => parseInt(item, 2) ).map( item => String.fromCharCode(item) ).join(''); 
}

function truthCheck(collection, pre) {
   for (let i = 0; i < collection.length; i++) {
   	if (!collection[i][pre]) {
   		return false;
   	}
   }
  return true;
}

function addTogether(...args) {

	function checkNum (num) {
	  if (typeof num !== "number") {
	  	return undefined;
	  } else {
	  	return num;
	  }
	}

	if ( args.length === 1 && checkNum(args[0]) ) {
		return function (num2) {
			if (checkNum(num2)) {
				return args[0] + num2;
			}	
		}
	} else if ( args.length === 2 && checkNum(args[0]) && checkNum(args[1])) {
		return args[0] + args[1];
	} else return undefined;
}

var Person = function(firstAndLast) {

  let fullName = firstAndLast;

  this.getFullName = function() {
    return fullName;
  };

  this.getFirstName = function() {
  	return fullName.split(' ')[0];
  }

  this.getLastName = function() {
  	return fullName.split(' ')[1];
  }

  this.setFullName = function(name) {
  	fullName = name;
  }

  this.setFirstName = function (firstName) {
  	fullName = firstName + ' ' + fullName.split(' ')[1];
  }

  this.setLastName = function (lastName) {
  	fullName = fullName.split(' ')[0] + ' ' + lastName;
  }
};

function orbitalPeriod(arr) {
  let returnArr = [];
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  
  function calculateOrbitalPeriod (avgAlt) {
  	return Math.round(2 * Math.PI * Math.sqrt( Math.pow(earthRadius + avgAlt, 3) / GM) );
  }

  for (let i = 0; i < arr.length; i++) {
  	returnArr.push({"name": arr[i]["name"], "orbitalPeriod": calculateOrbitalPeriod(arr[i]["avgAlt"])})
  }
  return returnArr;
}