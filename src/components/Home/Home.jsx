import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

export default class Home extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			height: 0,
			value: '',
			currSeason: 0
		}
		
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onInput = this.onInput.bind(this);
	}
	
	onFocus() {
		
	}
	
	onBlur() {
		
	}
	
	onInput() {
		
	}
	
	render() {
		return (
			<div id="home-cntr">
				<div className="left-cntr">
					<div className="header-cntr">
						Warcraft 3 Banjoball Elo, Season {this.state.currSeason + 1}
					</div>
				</div>
				<div className="right-cntr">
					<div className="search-cntr">
						<div className="search-btn">
							Search
						</div>
						<input type='text' placeholder='Player 1, Player 2, Player 3...'
							className='search-input'
							value={this.props.value}
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							onInput={this.onInput} />
					</div>
				</div>
			</div>
		);
	}
}