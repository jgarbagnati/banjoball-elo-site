import {render, Component} from 'inferno';
import {HashRouter, Route, Switch} from 'inferno-router';
import NavbarTop from './components/NavbarTop/NavbarTop';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import Season from './components/Season/Season';

const SEASON_API = 'http://elo.banjoball.net:8080/api/season/';
const PLAYER_API = 'http://elo.banjoball.net:8080/api/players/';
const MATCH_API  = 'http://elo.banjoball.net:8080/api/matches/';

function xhrGet(url, onSuccess) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = '';
	xhr.onload = () => onSuccess(xhr.response);
	xhr.send();
}

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: true,
			season: 1,
			curr: 0,
			players: [[], []],
			playerMap: [{}, {}],
			matches: [[], []],
			ongoing: []
		};
		
		this.update = this.update.bind(this);
		this.getPlayerById = this.getPlayerById.bind(this);
		this.onSeason = this.onSeason.bind(this);
		this.onPlayers = this.onPlayers.bind(this);
		this.onMatches = this.onMatches.bind(this);
	}
	
	componentDidMount() {
		setTimeout(() => {
			xhrGet(SEASON_API, data => this.onSeason(data));
		}, 100);
	}
	
	update() {
		window.requestAnimationFrame(() => this.forceUpdate());
	}

	onSeason(data) {
		this.state.season = JSON.parse(data).currentSeason;
		this.state.curr = this.state.season - 1;
		xhrGet(PLAYER_API + this.state.season + "/", data => this.onPlayers(data));
	}

	onPlayers(data) {
		const playerList = JSON.parse(data);
		this.state.playerMap[this.state.curr] = {};
		this.state.players[this.state.curr] = [];
		playerList.forEach(player => {
			this.state.playerMap[this.state.curr][player.ID] = player;
			player.matches = [];
			if (player.win > 0 || player.loss > 0) {
				this.state.players[this.state.curr].push(player);
			}
		});

		if (this.state.curr > 0) {
			this.state.curr = this.state.curr - 1;
			xhrGet(PLAYER_API + this.state.curr + 1 + "/", data => this.onPlayers(data));
		} else {
			// Get match data
			this.state.curr = this.state.season - 1;
			xhrGet(MATCH_API + this.state.season + "/", data => this.onMatches(data));
		}
	}
	
	onMatches(data) {
		const matchList = JSON.parse(data);
		
		this.state.matches[this.state.curr] = [];
		matchList.forEach(match => {
			if (match.s1 == null || match.s2 == null) {
				this.state.ongoing.push(match);
			} else {
				this.state.matches[this.state.curr].push(match);
			}
		});

		if (this.state.curr > 0) {
			this.state.curr = this.state.curr - 1;
			xhrGet(MATCH_API + this.state.curr + 1 + "/", data => this.onMatches(data));
		} else {
			// Finish loading
			this.setState({
				loading: false
			});
		}
	}
	
	getPlayerById(season, id) {
		return this.state.playerMap[season][id];
	}
	
	render() {
		let loading = (this.state.loading)? <Loading />: null;
		return (
			<HashRouter>
				<div id='inferno-root'>
					<div id="background-cntr">
						<div className="left-cntr" />
						<div className="right-cntr" />
					</div>
					<NavbarTop update={this.update} />
					<div id="main-cntr">
						<Switch>
							<Route exact path="/" render={() =>
								<Home season={this.state.season}
									getPlayerById={id => this.getPlayerById(this.state.season - 1, id)}
									players={this.state.players[this.state.season - 1]}
									matches={this.state.matches[this.state.season - 1]}
									ongoing={this.state.ongoing} />} />
							<Route path="/season-1/" render={() =>
								<Season season={1} 
									getPlayerById={id => this.getPlayerById(0, id)}
									players={this.state.players[0]}
									matches={this.state.matches[0]}
									ongoing={[]} />}/>} />
							<Route path="/season-2/" render={() =>
								<Season season={2} 
									getPlayerById={id => this.getPlayerById(1, id)}
									players={this.state.players[1]}
									matches={this.state.matches[1]}
									ongoing={this.state.ongoing} />}/>} />
						</Switch>
					</div>
					{loading}
				</div>
			</HashRouter>
		);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	render(
		<App />,
		document.getElementById('root')
	);
});
