"use strict"

function rot13(str) { 

	let cipherArray = str.split('');
	for (let i = 0; i < cipherArray.length; i++) {
		if (/[A-Z]/.test(cipherArray[i])) {
			let decryptedCharacter;
			if (cipherArray[i].charCodeAt(0) >= 78) {
				decryptedCharacter = String.fromCharCode(cipherArray[i].charCodeAt(0) - 13);
			} else {
				decryptedCharacter = String.fromCharCode(cipherArray[i].charCodeAt(0) + 13);
			}
			cipherArray.splice(i, 1, decryptedCharacter);
		}
	}
	return cipherArray.join('');
}