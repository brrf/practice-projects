import React from "react";

export default class Layout extends React.Component {
	constructor () {
		super();
		this.name = "Moshe"
	}
	render() {
		
		return (
			<h1>It works, {this.name}!</h1>

		)
	}
}