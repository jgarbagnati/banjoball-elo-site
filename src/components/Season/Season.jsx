import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import SearchBar from '../SearchBar/SearchBar';
import PlayersTable from '../PlayersTable/PlayersTable';
import GamesTable from '../GamesTable/GamesTable';

const MAIN_CNTR_BREAKPOINT = 1240;

export default class Season extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchValue: '',
			width: 0
		}
		
		this.updateSearchBarValue = this.updateSearchBarValue.bind(this);
		this.search = this.search.bind(this);
	}
	
	onResize() {
		if (window.innerWidth < 400) {
			this.setState({});
		}
		if ((window.innerWidth <= MAIN_CNTR_BREAKPOINT &&
			this.state.width > MAIN_CNTR_BREAKPOINT) ||
			(window.innerWidth > MAIN_CNTR_BREAKPOINT &&
			this.state.width <= MAIN_CNTR_BREAKPOINT)) {
			this.setState({});
		}
		this.state.width = window.innerWidth;
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
		let currMatches = (this.props.ongoing.length == 0)? null: 			
			(<GamesTable season={this.props.season} 
				id={'current-games-table-cntr'} 
				header={"Current Matches"}
				getPlayerById={this.props.getPlayerById}
				pageSize={10}
				players={this.props.players}
				matches={this.props.ongoing} />);
		
		let pageWidth = window.innerWidth;
		let header = "Warcraft 3 Banjoball Elo, Season " + (this.props.season);
		if (pageWidth < 650) {
			if (pageWidth < 400) {
				header = "WC3 Banjoball, S" + (this.props.season);
			} else {
				header = "WC3 Banjoball Elo, S" + (this.props.season);
			}
		}
		return (
			<div id={`season-${this.props.season}`} class='season-cntr'>
				<div className="top-cntr">
					<div className="header-cntr">
						{header}
					</div>
					<div className="search-cntr">
						<SearchBar updateValue={this.updateSearchBarValue}
							value={this.state.value} onSearch={this.search} />
					</div>
				</div>
				<div id="right-cntr">
					<PlayersTable season={this.props.season}
						players={this.props.players}
						matches={this.props.matches}
	 />
				</div>
				<div id="left-cntr">
					{currMatches}
					<GamesTable season={this.props.season}
						id={'games-table-cntr'} 
						header={"Match History"}
						getPlayerById={this.props.getPlayerById}
						players={this.props.players}
						matches={this.props.matches}
	 />
				</div>
			</div>
		);
	}
}
