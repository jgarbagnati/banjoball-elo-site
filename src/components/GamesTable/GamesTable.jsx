import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import GamesTableRow from './GamesTableRow';

function getPosition(element) {
    let yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}

export default class CurrentGamesTable extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			offset: 0
		}
		
		this.onScroll = this.onScroll.bind(this);
	}
	
	componentDidMount() {
		root.addEventListener('scroll', this.onScroll);
	}
	
	componentWillUnmount() {
		root.removeEventListener('scroll', this.onScroll, false);
	}
	
	onScroll() {
		let cntr = document.getElementById(this.props.id + '-inner');
		let bnd = cntr.getBoundingClientRect();
		let offset = Math.min(bnd.height-74, Math.max(0, -bnd.top));
		this.setState({
			offset: offset
		});
	}
	
	displayMatchRows() {
		let rows = [];
		for (let i = 0; i < this.props.matches.length; ++i) {
			let game = this.props.matches[i];
			let match = game.ID + 1;
			
			rows.push(<GamesTableRow alt={i%2==1} match={match}
				p1={game.p1} p2={game.p2} p3={game.p3} p4={game.p4}
				p5={game.p5} p6={game.p6} p7={game.p7} p8={game.p8}
				s1={game.s1} s2={game.s2} />);
		}
		
		return rows;
	}
	
	render() {
		let sticky = {
			top: this.state.offset
		};
		let outer = this.props.id + '-outer';
		let inner = this.props.id + '-inner';
		
		return (
			<div id={outer}>
				<div className='cntr-title'>{this.props.header}</div>
				<div id={inner}>
					<div className='table-header' style={sticky}>
						<div className='match'> Match </div>
						<div className='team1'> Team 1 </div>
						<div className='scores'> Scores </div>
						<div className='team2'> Team 2 </div>
					</div>
					{this.displayMatchRows()}
				</div>
			</div>
		);
	}
}
