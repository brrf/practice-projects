var React = require ('react');


function NavItems (props) {

	const navItems = ['Home', 'Battle', 'Popular']

	return (
		<ul className='nav-list'>
			{navItems.map(navItem => 
				<li key={navItem}
					onClick={props.onSelect.bind(null, navItem)}
					style={navItem === props.navItem ? {fontWeight: 'bold'} : null}>
					{navItem}
				</li>
			)}
		</ul>
	)
}




class Nav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {navItem: 'Home'};

		this.updateNavItem = this.updateNavItem.bind(this);
	};

	updateNavItem (navItem) {
		this.setState({
			navItem: navItem,
		})
	}

	
	render() {
		return (
			<NavItems onSelect={this.updateNavItem}
					  navItem={this.state.navItem}
			/>
		)
	}
}

module.exports = Nav;