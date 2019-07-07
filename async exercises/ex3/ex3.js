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
	return new Promise( function(resolve, reject) {
		fakeAjax(file, resolve)
	})
}

// request all files at once in "parallel"


const file1 = getFile('file1');
const file2 = getFile('file2');
const file3 = getFile('file3');


file1
	.then( function(response1) {
		output(response1)
		return file2
	})
	.then(function(response2) {
		output(response2)
		return file3
	})
	.then(function(response3) {
		output(response3)
		console.log('done')
	})


