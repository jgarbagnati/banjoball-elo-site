import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

export default class Loading extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div id='loading-screen'>
				<div className='loading-outer'>
					<div className='loading-inner'>
						<h1>Loading content...</h1>
					</div>
				</div>
			</div>
		);
	}
}
