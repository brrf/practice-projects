"use strict"


/*
// Looping a triangle

function loopTriangle (j) {

	let string = '#'

	for (let i = 0; i < j; i++) {
		console.log(string);
		string += '#'
	}
}

*/


/*

//FizzBuzz

function fizzBuzz (j) {

	for (let i = 0; i < j; i++) {
		switch (true) {
			case (i % 3 === 0 && i % 5 === 0 ):
				console.log("FizzBuzz");
				break;
			case (i % 3 === 0):
				console.log("Fizz");
				break;
			case (i % 5 === 0):
				console.log("Buzz");
				break;
			default:
				console.log(i);
				break;
		}

	}
}

*/

/*
//Chessboard

function chessboard (width, height) {
	let board = ''
	let tiles = (width + 1) * height;

	for (let i = 1; i < tiles ; i++) {
		switch (true) {
			case (i % (width + 1) === 0):
				board += "\n";
				break;
			case (i % 2 === 0):
				board += " ";
				break;
			case (i % 2 === 1):
				board += "#";
				break;
		}
	}
	console.log(board);
}
*/