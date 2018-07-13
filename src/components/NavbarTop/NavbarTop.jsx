import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

export default class NavbarTop extends Component {
	constructor(props) {
		super(props);
		this.refresh = this.refresh.bind(this);
	}
	
	refresh() {
		this.props.update();
	}
	
	render() {
		return (
			<div id="nav-bar-top">
				<div className="top-cntr">
					<Link to="/" exact>
						<div className="icon" />
					</Link>
				</div>
				<div className="bottom-cntr">
					<div className="nav-btns-cntr">
						<NavLink to="/" exact activeClassName="active">
							<div onclick={this.refresh} className='nav-season-btn'> Home </div>
						</NavLink>
						<NavLink to="/season-1" exact activeClassName="active">
							<div onclick={this.refresh} className='nav-season-btn'> Season 1 </div>
						</NavLink>
					</div>
				</div>
			</div>
		);
	}
}