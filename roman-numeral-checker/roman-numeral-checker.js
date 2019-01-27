
"use strict";

function convertToRoman(num) {

	let numerals = [['I', 'V'], ['X', 'L'], ['C', 'D'], ['M']];
	let strArray = num.toString().split('');
	let decimal = strArray.length - 1;
	let returnArray = [];

	function pushNumeralsToArray (num, decimal) {
		switch (num) {
			case '0':
				break;
			case '1':
			case '2':
			case '3': 
				while (num > 0) {
					returnArray.push(numerals[decimal][0]);
					num--;
				}
				break;
			case '4': returnArray.push(numerals[decimal][0] + numerals[decimal][1]);
				break;
			case '5': returnArray.push(numerals[decimal][1]);
				break;
			case '6':
			case '7':
			case '8':
				returnArray.push(numerals[decimal][1]);
				while (num > 5) {
					returnArray.push(numerals[decimal][0]);
					num--;
				}
				break;
			case '9': returnArray.push(numerals[decimal][0] + numerals[decimal + 1][0]);
				break;
		}
	}
	
	for (let i = 0; i < strArray.length; i++) {		
		pushNumeralsToArray(strArray[i], decimal);
		decimal--;
	}

	return returnArray.join('');
}

console.log(convertToRoman(8));


/*
I = 1;
V = 5;

X = 10;
L = 50

C = 100
D= 500

M = 1000







*/