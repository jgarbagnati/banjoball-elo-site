import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

const FRAMES_PER_DOT = 20;
const DOTS = 3;

export default class Loading extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div id='loading-screen'>
				<div className='loading-outer'>
					<div className='loading-inner'>
					</div>
				</div>
			</div>
		);
	}
}
