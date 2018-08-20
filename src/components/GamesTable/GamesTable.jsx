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
			offset: 18,
			pageSize: 10,
			page: 0
		}
		
		this.onScroll = this.onScroll.bind(this);
	}
	
	componentDidMount() {
		this.props.updateHeights();
		root.addEventListener('scroll', this.onScroll);
	}
	
	componentWillUnmount() {
		root.removeEventListener('scroll', this.onScroll, false);
	}
	
	onScroll() {
		let cntr = document.getElementById(this.props.id + '-inner');
		let bnd = cntr.getBoundingClientRect();
		let offset = Math.max(18, (Math.min(bnd.height-147, Math.max(18, -bnd.top))) - 20);
		this.setState({
			offset: offset
		});
	}
	
	displayMatchRows() {
		let rows = [];
		let start = this.state.page * this.state.pageSize;
		let end = Math.min(this.props.matches.length,
			(this.state.page + 1) * this.state.pageSize);
		for (let i = start; i < end; ++i) {
			let game = this.props.matches[i];
			let players = [game.p1, game.p2, game.p3, game.p4,
			               game.p5, game.p6, game.p7, game.p8];
			for (let j = 0; j < players.length; ++j) {
				players[j] = this.props.getPlayerById(players[j]).name;
			}
			rows.push(<GamesTableRow alt={i%2==1} match={game.ID}
				p1={players[0]} p2={players[1]} p3={players[2]} p4={players[3]}
				p5={players[4]} p6={players[5]} p7={players[6]} p8={players[7]}
				s1={game.s1} s2={game.s2} />);
		}
		
		return rows;
	}
	
	render() {
		let sticky = {
			transform: "translate(0px, " + this.state.offset + "px)"
		};
		let outer = this.props.id + '-outer';
		let inner = this.props.id + '-inner';
		
		return (
			<div id={outer}>
				<div id={inner}>
					<div className='table-header' style={sticky}>
						<div className='match'> Match </div>
						<div className='team1'> Team 1 </div>
						<div className='scores'> Scores </div>
						<div className='team2'> Team 2 </div>
					</div>
					{this.displayMatchRows()}
				</div>
				<div className='cntr-title'>{this.props.header}</div>
			</div>
		);
	}
}
