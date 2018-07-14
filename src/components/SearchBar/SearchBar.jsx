import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			active: false
		}
		
		this.onInput = this.onInput.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}
	
	onInput(evt) {
		this.props.updateValue(evt.target.value);
		this.setState({});
	}
	
	onFocus(evt) {
		this.setState({active: true});
	}
	
	onBlur(evt) {
		this.setState({active: false});
	}
	
	render() {
		let btnClass = 'search-btn' + ((this.state.active)? ' active': '');
		return (
			<div>
				<div className={btnClass}>
					Search
				</div>
				<input type='text' placeholder='Player 1, Player 2, Player 3...'
					className='search-input'
					value={this.props.value}
					onInput={this.onInput}
					onFocus={this.onFocus} 
					onBlur={this.onBlur} />
			</div>
		);
	}
}