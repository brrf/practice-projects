window.onload = function() {

	let operator = null;
	let runningTotal = 0;
	let buffer = "0";


	let display = document.querySelector(".calc-screen");
	let input = document.querySelector(".calc-buttons");

	input.addEventListener("click", function(event) {
		buttonClick(event.target.innerText);
	});

	function rerender() {
  		display.innerText = buffer;
	}


	function buttonClick(value) {
		if (isNaN(value)) {
			handleSymbol(value);
		} else {
			handleNumber(value);
		}
		rerender();
	}

	function handleNumber(value) {

		if (buffer === "0") {	
			buffer = value;
		} else {
			buffer += value;
		}
	}


	function handleSymbol(value) {
		if (value === "C") {
			runningTotal = 0;
			operator = null;
			buffer = "0";
		} else if (value === "<--") {
			if (buffer.length === 1) {
				buffer = "0"
			} else {
				buffer = buffer.slice(0, buffer.length - 1)
			}
		} else if (value === "=") {
			if (operator === null) {
				return;
			} else {
				doCalculation(buffer);	
			}
		} else {
			operator = value;
			runningTotal = +buffer;
			buffer = '0';
		}
		console.log(buffer);
	}

	function doCalculation(input) {

		let intBuffer = +input;

		if (buffer === "0") {
			return;
		}

		
		
		if (operator === null) {
			return;
		} else if (operator === "+") {
			runningTotal += intBuffer;
		} else if (operator === "-") {
			runningTotal -= intBuffer;
		} else if (operator === "x") {
			runningTotal *= intBuffer;
		} else if (operator === "%") {
			runningTotal /= intBuffer;
		}
		buffer = '' + runningTotal;
	}

const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelector('.box');
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, 'mousedown touchstart')
  .start((e) => {
    e.preventDefault();
    pointer(ballXY.get()).start(ballXY);
  });

listen(document, 'mouseup touchend')
  .start(() => {
    spring({
      from: ballXY.get(),
      velocity: ballXY.getVelocity(),
      to: { x: 0, y: 0 },
      stiffness: 200,
      // mass: 1,
      // damping: 10
    }).start(ballXY);
  });




}
