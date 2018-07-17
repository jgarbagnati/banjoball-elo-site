import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import SearchBar from '../SearchBar/SearchBar';
import PlayersTable from '../PlayersTable/PlayersTable';		
import GamesTable from '../GamesTable/GamesTable';

const MAIN_CNTR_BREAKPOINT = 1240;

export default class Home extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchValue: '',
			currSeason: 0,
			height: window.innerHeight - 161
		}
		
		this.updateSearchBarValue = this.updateSearchBarValue.bind(this);
		this.updateHeights = this.updateHeights.bind(this);
		this.search = this.search.bind(this);
	}
	
	updateHeights() {
		let height = 0;
		if (window.innerWidth > MAIN_CNTR_BREAKPOINT) {
			let left = document.getElementById('left-cntr');
			let right = document.getElementById('right-cntr');
			if (left !== null && right !== null) {
				height = Math.max(left.clientHeight, right.clientHeight);
			} else {
				height = window.innerHeight - 161;
			}
		}
		
		this.setState({
			height: height
		});
	}
	
	componentDidMount() {
		this.setState({});
		window.addEventListener("resize", this.updateHeights);
	}
	
	updateSearchBarValue(val) {
		this.state.searchValue = val;
		window.removeEventListener("resize", this.updateHeights);
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
		let heightStyle = {
			minHeight: this.state.height
		};
		
		let currMatches = (this.props.ongoing.length == 0)? null: 			
			(<GamesTable id={'current-games-table-cntr'} 
				header={"Current Matches"}
				getPlayerById={this.props.getPlayerById}
				players={this.props.players}
				matches={this.props.ongoing}
				updateHeights={this.updateHeights} />);
		return (
			<div id="home-cntr">
				<div className="top-cntr">
					<div className="header-cntr">
						Warcraft 3 Banjoball Elo, Season {this.state.currSeason + 1}
					</div>
					<div className="search-cntr">
						<SearchBar updateValue={this.updateSearchBarValue}
							value={this.state.value} onSearch={this.search} />
					</div>
				</div>
				<div id="right-cntr" style={heightStyle}>
					<PlayersTable db={this.props.db}
						players={this.props.players}
						matches={this.props.matches}
						updateHeights={this.updateHeights} />
				</div>
				<div id="left-cntr" style={heightStyle}>
					{currMatches}
					<GamesTable id={'games-table-cntr'} 
						header={"Match History"}
						getPlayerById={this.props.getPlayerById}
						players={this.props.players}
						matches={this.props.matches}
						updateHeights={this.updateHeights} />
				</div>
			</div>
		);
	}
}