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
			playerMap: {},
			ongoing: [],
			matches: [],
			db: null
		};
		
		this.update = this.update.bind(this);
		this.onDB = this.onDB.bind(this);
		this.getPlayerById = this.getPlayerById.bind(this);
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
		
		let query = db.prepare("SELECT ID,name,elo,win,loss FROM players ORDER BY elo desc");
		while(query.step()) {
			let obj = query.getAsObject();
			this.state.playerMap[obj.ID] = obj;
			obj.matches = [];
			if (obj.win > 0 || obj.loss > 0) {
				this.state.players.push(obj);
			}
		}
		
		query = db.prepare("SELECT ID,p1,p2,p3,p4,s1,s2,p5,p6,p7,p8 FROM games WHERE ID >= 0 ORDER BY ID desc;");
		while(query.step()) {
			let obj = query.getAsObject();
			if (obj.s1 == null || obj.s2 == null) {
				this.state.ongoing.push(obj);
			} else {
				this.state.matches.push(obj);
			}
		}
		
		this.setState({
			loading: false,
			db: db
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
									ongoing={this.state.ongoing}
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
