import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

const FRAMES_PER_DOT = 20;
const DOTS = 3;

export default class Loading extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loadingDots: 0
		}
		
		window.requestAnimationFrame(() => this.animateLoading());
	}
	
	animateLoading() {
		this.setState({
			loadingDots: (this.state.loadingDots + 1) 
				% (FRAMES_PER_DOT * (DOTS + 1))
		});
		window.requestAnimationFrame(() => this.animateLoading());
	}
	
	loadingMsg() {
		let out = "Loading content";
		let len = Math.floor(this.state.loadingDots / FRAMES_PER_DOT);
		for (let i = 0; i < len; ++i) {
			out = out + ".";
		}
		return out;
	}
	
	render() {
		return (
			<div id='loading-screen'>
				<div className='loading-outer'>
					<div className='loading-inner'>
						<h1>{this.loadingMsg()}</h1>
					</div>
				</div>
			</div>
		);
	}
}
