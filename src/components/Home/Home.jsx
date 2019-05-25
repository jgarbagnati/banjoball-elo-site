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
			width: 0
		}
		this.updateSearchBarValue = this.updateSearchBarValue.bind(this);
		this.updateHeights = this.updateHeights.bind(this);
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
	
	updateHeights() {
		this.setState({});
	}
	
	componentDidMount() {
		this.setState({});
		this.updateHeights();
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
		let currMatches = (this.props.ongoing.length == 0)? null: 			
			(<GamesTable id={'current-games-table-cntr'} 
				header={"Current Matches"}
				getPlayerById={this.props.getPlayerById}
				pageSize={10}
				players={this.props.players}
				matches={this.props.ongoing}
				updateHeights={this.updateHeights} />);
		
		let pageWidth = window.innerWidth;
		let header = "Warcraft 3 Banjoball Elo";
		return (
			<div id="home-cntr">
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
					<PlayersTable db={this.props.db}
						players={this.props.players}
						matches={this.props.matches}
						pageSize={25}
						updateHeights={this.updateHeights} />
				</div>
				<div id="left-cntr">
					{currMatches}
					<GamesTable id={'games-table-cntr'} 
						header={"Match History"}
						getPlayerById={this.props.getPlayerById}
						pageSize={10}
						players={this.props.players}
						matches={this.props.matches}
						updateHeights={this.updateHeights} />
				</div>
			</div>
		);
	}
}