import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import SearchBar from '../SearchBar/SearchBar';
import PlayersTable from '../PlayersTable/PlayersTable';		
import GamesTable from '../GamesTable/GamesTable';

export default class Home extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchValue: '',
			currSeason: 0
		}
		
		
		this.updateSearchBarValue = this.updateSearchBarValue.bind(this);
		this.search = this.search.bind(this);
	}
	
	componentDidMount() {
		this.setState({});
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
		let height = window.innerHeight - 100;
		let left = document.getElementById('left-cntr');
		let right = document.getElementById('right-cntr')
		if (left !== null && right !== null) {
			height: Math.max(left.clientHeight, right.clientHeight)
		}
		
		let heightStyle = {
			minHeight: height
		};
		
		let currMatches = (this.props.ongoing.length == 0)? null: 			
			(<GamesTable id={'current-games-table-cntr'} 
				header={"Current Matches"}
				getPlayerById={this.getPlayerById}
				players={this.props.players}
				matches={this.props.ongoing} />);
		return (
			<div id="home-cntr">
				<div id="left-cntr" style={heightStyle}>
					<div className="header-cntr">
						Warcraft 3 Banjoball Elo, Season {this.state.currSeason + 1}
					</div>
					{currMatches}
					
				</div>
				<div id="right-cntr" style={heightStyle}>
					<div className="search-cntr">
						<SearchBar updateValue={this.updateSearchBarValue}
							value={this.state.value} onSearch={this.search} />
					</div>
					<PlayersTable db={this.props.db}
						players={this.props.players}
						matches={this.props.matches} />
				</div>
			</div>
		);
	}
}