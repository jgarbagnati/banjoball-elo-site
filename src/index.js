import {render, Component} from 'inferno';
import {HashRouter, Route, Switch} from 'inferno-router';
import NavbarTop from './components/NavbarTop/NavbarTop';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import Season from './components/Season/Season';
import './index.scss';

const PLAYER_API = 'http://elo.banjoball.net:8080/api/players/';
const MATCH_API  = 'http://elo.banjoball.net:8080/api/matches/';

function xhrGet(url, onSuccess) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'JSON';
	xhr.onload = () => onSuccess(xhr.response);
	xhr.send();
}

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: true,
			players: [],
			playerMap: {},
			ongoing: [],
			matches: []
		};
		
		this.update = this.update.bind(this);
		this.getPlayerById = this.getPlayerById.bind(this);
	}
	
	componentDidMount() {
		setTimeout(() => {
			xhrGet(PLAYER_API, data => this.onPlayers(data));
		}, 100);
	}
	
	update() {
		window.requestAnimationFrame(() => this.forceUpdate());
	}

	onPlayers(data) {
		const playerList = JSON.parse(data);
		
		playerList.forEach(player => {
			this.state.playerMap[player.ID] = player;
			player.matches = [];
			if (player.win > 0 || player.loss > 0) {
				this.state.players.push(player);
			}
		});

		// Get match data
		xhrGet(MATCH_API, data => this.onMatches(data));
	}
	
	onMatches(data) {
		const matchList = JSON.parse(data);
		
		matchList.forEach(match => {
			if (match.s1 == null || match.s2 == null) {
				this.state.ongoing.push(match);
			} else {
				this.state.matches.push(match);
			}
		});

		this.setState({
			loading: false
		});
	}
	
	getPlayerById(id) {
		return this.state.playerMap[id];
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
								<Home getPlayerById={this.getPlayerById}
									players={this.state.players}
									matches={this.state.matches}
									ongoing={this.state.ongoing} />} />
							<Route path="/season-1" render={() =><Season season={1} />} />
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
