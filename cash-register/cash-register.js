"use script"

function checkCashRegister(price, cash, cid) {
  
	var output = { status: null, change: [] };
	let registerBalance = getRegisterBalance(cid);
	let owedChange = Math.round((cash - price) * 100) / 100;	
	let providedChange = [];

	let currency = [
	{ name: "PENNY", value: 0.01 },
	{ name: "NICKEL", value: 0.05 },
	{ name: "DIME", value: 0.1 },
	{ name: "QUARTER", value: 0.25 },
	{ name: "ONE", value: 1 },
	{ name: "FIVE", value: 5 },
	{ name: "TEN", value: 10 },
	{ name: "TWENTY", value: 20 },
	{ name: "ONE HUNDRED", value: 100 }
	]

	function getRegisterBalance (cid) {
		let balance = 0;
		for (let i = 8; i >= 0; i--) {
			balance += cid[i][1];
		}
		balance = Math.round(balance * 100) / 100;
		return balance;
	}

	function getProvidedChange (owedChange, cid) {

		for (let i = 8; i >= 0; i--) {
			let currencyValue = currency[i]["value"]
			if (cid[i][1] >= currencyValue && owedChange >= currencyValue) {
				providedChange.push([currency[i]["name"], 0])
				owedChange = Math.round(owedChange * 100) / 100;
				while (owedChange >= currencyValue && cid[i][1] >= currencyValue) {
					owedChange -= currencyValue;
					owedChange = Math.round(owedChange * 100) / 100;
					cid[i][1] -= currencyValue;
					cid[i][1] = Math.round(cid[i][1] * 100) / 100;
					providedChange[providedChange.length - 1][1] += currencyValue;
					providedChange[providedChange.length - 1][1] = Math.round(providedChange[providedChange.length - 1][1] * 100) / 100;
				}
					
			}
		}

		return (owedChange < 0.01) ? true : false;
	}
	

	if (registerBalance < owedChange) {
		output["status"] = "INSUFFICIENT_FUNDS";
	} else if (registerBalance === owedChange) {
		output["status"] = "CLOSED"
		output["change"] = cid;
	} else {
		if (getProvidedChange(owedChange, cid)) {
			output["status"] = "OPEN";
			output["change"] = providedChange
		} else {
			output["status"] = "INSUFFICIENT_FUNDS"
		}
	}

	return output;
}

checkCashRegister(19.94, 20, [["PENNY", 0.06], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])



