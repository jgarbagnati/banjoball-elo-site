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
		this.search = this.search.bind(this);
	}
	
	updateSearchBarValue(val) {
		this.state.searchValue = val;
	}
	
	search() {
		let search = this.state.searchValue;
		let players = search.split(",");
		for (let i = 0; i < players.length; ++i) {
			let player = players[i].trim(" ");
			players[i] = player;
		}
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
						<SearchBar updateValue={this.updateSearchBarValue}
							value={this.state.value} onSearch={this.search} />
					</div>
				</div>
			</div>
		);
	}
}