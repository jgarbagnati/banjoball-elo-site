import {render, Component} from 'inferno';
import {HashRouter, Route, Switch} from 'inferno-router';
import NavbarTop from './components/NavbarTop/NavbarTop';
import Home from './components/Home/Home';
import Loading from './components/Loading/Loading';
import Season from './components/Season/Season';

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			lastXhr: null,
			loading: true,
			players: [],
			matches: [],
			db: null
		};
		
		this.update = this.update.bind(this);
		this.onDB = this.onDB.bind(this);
	}
	
	componentDidMount() {
		setTimeout(() => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', './res/db/elo.db', true);
			xhr.responseType = 'arraybuffer';
			xhr.onload = this.onDB;
			this.state.lastXhr = xhr;
			xhr.send();
		}, 100);
	}
	
	update() {
		window.requestAnimationFrame(() => this.forceUpdate());
	}
	
	onDB(e) {
		let dbpath = new Uint8Array(this.state.lastXhr.response);
		let db = new SQL.Database(dbpath);
		
		let query = db.prepare("SELECT name,elo,win,loss FROM players WHERE win > 0 ORDER BY elo desc");
		while(query.step()) {
			this.state.players.push(query.getAsObject());
		}
		
		this.setState({
			loading: false,
			db: db
		});
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
								<Home players={this.state.players}
									matches={this.state.matches}
									db={this.state.db} />} />
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
