import {render, Component} from 'inferno';
import {HashRouter, Route, Switch} from 'inferno-router';
import NavbarTop from './components/NavbarTop';

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
							<Route exact path="/" component={Home}/>
							<Route path="/season-1" component={Team}/>
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
