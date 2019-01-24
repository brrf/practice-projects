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

console.log( destroyer([1, 2, 3, 1, 2, 3], 2, 3) );





