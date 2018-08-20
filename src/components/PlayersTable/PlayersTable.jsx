import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import PlayersTableRow from './PlayersTableRow';

function getPosition(element) {
    let yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}

export default class PlayersTable extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			offset: 18,
			pageSize: 25,
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
		let cntr = document.getElementById("player-table-cntr-inner");
		let bnd = cntr.getBoundingClientRect();
		let offset = Math.max(18, (Math.min(bnd.height-75, Math.max(18, -bnd.top))) - 20);
		this.setState({
			offset: offset
		});
	}
	
	displayLeaderboardRows() {
		let rows = [];
		let start = this.state.page * this.state.pageSize;
		let end = Math.min(this.props.players.length,
			(this.state.page + 1) * this.state.pageSize);
		for (let i = start; i < end; ++i) {
			let rank = i+1;
			let player = this.props.players[i];
			let name = player.name;
			let elo = player.elo;
			let wins = player.win;
			let loss = player.loss;
			rows.push(<PlayersTableRow rank={rank} name={name}
				elo={elo} wins={wins} loss={loss} alt={rank%2==0}/>);
		}
		
		return rows;
	}
	
	render() {
		let sticky = {
			transform: "translate(0px, " + this.state.offset + "px)"
		};
		return (
			<div id="player-table-cntr-outer">
				<div id='player-table-cntr-inner'>
					{this.displayLeaderboardRows()}
					<div id='player-table-header' style={sticky}>
						<div className='rank'> Rank </div>
						<div className='name'> Name </div>
						<div className='elo'> Elo </div>
						<div className='winloss'> Win/Loss </div>
					</div>
				</div>
				<div className='player-table-title'>Leaderboard</div>
			</div>
		);
	}
}
