import {render, Component} from 'inferno';
import {HashRouter, Route, Switch} from 'inferno-router';
import NavbarTop from './components/NavbarTop/NavbarTop';
import Home from './components/Home/Home';
import Season from './components/Season/Season';

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {};
		
		this.update = this.update.bind(this);
	}
	
	update() {
		window.requestAnimationFrame(() => this.forceUpdate());
	}
	
	render() {
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
							<Route exact path="/" render={() =><Home />} />
							<Route path="/season-1" render={() =><Season season={1} />} />
						</Switch>
					</div>
				</div>
			</HashRouter>
		);
	}
}

render(
	<App />,
	document.getElementById('root')
);
