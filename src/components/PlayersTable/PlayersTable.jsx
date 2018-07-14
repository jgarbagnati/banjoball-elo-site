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
			isOff: false,
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
		let cntr = document.getElementById("player-table-cntr-inner");
		let bnd = cntr.getBoundingClientRect();
		let offset = Math.min(bnd.height-14, Math.max(0, -bnd.top));
		this.setState({
			offset: offset,
			isOff: bnd.top < 0
		});
	}
	
	displayLeaderboardRows() {
		let rows = [];
		for (let i = 0; i < this.props.players.length; ++i) {
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
		let isStickied = (this.state.isOff)? 'sticky': null;
		let sticky = {
			top: this.state.offset
		};
		return (
			<div id="player-table-cntr-outer">
				<div className='player-table-title'>Leaderboard</div>
				<div id='player-table-cntr-inner' className={isStickied}>
					<div id='player-table-header' style={sticky}>
						<div className='rank'> Rank </div>
						<div className='name'> Name </div>
						<div className='elo'> Elo </div>
						<div className='winloss'> Win/Loss </div>
					</div>
					{this.displayLeaderboardRows()}
				</div>
			</div>
		);
	}
}