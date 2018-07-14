import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import SearchBar from '../SearchBar/SearchBar';

export default class Home extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			height: 0,
			searchValue: '',
			currSeason: 0
		}
		this.updateSearchBarValue = this.updateSearchBarValue.bind(this);
	}
	
	updateSearchBarValue(val) {
		this.state.searchValue = val;
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
						<SearchBar value={this.state.value}
							updateValue={this.updateSearchBarValue} />
					</div>
				</div>
			</div>
		);
	}
}