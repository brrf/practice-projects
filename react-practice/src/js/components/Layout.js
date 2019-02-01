import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class extends React.Component {
	constructor() {
		super();
		this.state = {user: "Moshe"};
	}

	changeTitle(title) {
		this.setState({user: title})
	}
	render() {
		return (
			<div>
				<Header changeTitle={this.changeTitle.bind(this)} header={this.state.user} />
				<div>
					<Footer />
				</div>
			</div>
		)
	}
}