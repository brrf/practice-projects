function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {	
		return new Promise(function(resolve, reject){
			fakeAjax(file, resolve)
		})
}

async function callAndRespond() {
	let p1 = getFile('file1');
	let p2 = getFile('file2');
	let p3 = getFile('file3');

	let text1 = await p1
	output(text1);
	let text2 = await p2
	output(text2);
	let text3 = await p3
	output(text3);
	output('finished!')
}

callAndRespond();




// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
