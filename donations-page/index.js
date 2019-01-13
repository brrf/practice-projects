
let donation = {

	
	surplusContribution: 0,
	goal: 10000,
	totalRaised: 0,
	donationAmount: function (event) {

			let amount;
			if (this.totalRaised === this.goal) {
				alert("We've already hit our goal! God bless!!!");
				return;
			} 

			
			if (event.target.innerHTML === "Other") {
				do {
					amount = prompt("How much would you like to donate?");
				} while ( isNaN(amount) );
			} else {
				amount = +event.target.innerHTML.slice(1, event.target.innerHTML.length);
			}

			if (typeof amount === 'object') return;
			amount = +amount;

			let boolean = confirm(`Are you sure you want to donate $${amount}?`)
			if (!boolean) return


			if (this.totalRaised + amount >= this.goal) {
				this.surplusContribution = this.goal - this.totalRaised
				this.totalRaised = this.goal
			} else {
				this.totalRaised += amount;
			}

			this.progressBar(this.totalRaised);
	},

	progressBar: function (totalRaised) {

		document.querySelector(".total-raised").innerHTML = `$${totalRaised}`;
		let progress = document.querySelector(".progress-bar-completed");
		progress.style.width = `${ (totalRaised/this.goal) * 100}%`;

		progress.addEventListener('transitionend', function() {

			if (totalRaised/this.goal < .25) {
				progress.style.backgroundColor = "crimson";
				return;
			}

			if (totalRaised/this.goal < .50) {
				progress.style.backgroundColor = "#F7A324";
				return;
			}	

			if (totalRaised/this.goal < .75) {
				progress.style.backgroundColor = "#EACF1B";
				return;
			}

			if (totalRaised === this.goal) {
				alert(`We hit our goal! We were only able to accept $${this.surplusContribution}. God bless!!!`)
				progress.style.backgroundColor = "green";
				return;
			}
		});
	},

	eventListener: function () {
		let donationInput = document.querySelector(".donate-selection");
		donationInput.addEventListener("click", function(event) {

		if (event.target.className !== "donate-selection-box") return;
		donation.donationAmount(event);
		});
	}
}
