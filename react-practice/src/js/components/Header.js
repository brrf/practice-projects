import React from "react";

import Title from "./Header/Title";

export default class Header extends React.Component {
	handleChange(e) {
		const title = e.target.value;
		this.props.changeTitle(title);
	}
	render() {

		return (
			<div>
				<Title header={this.props.header} />
				<input placeholder="please enter name" onChange={this.handleChange.bind(this)} />
			</div>
			);
	}
}