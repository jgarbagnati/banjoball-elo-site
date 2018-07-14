import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import PlayersTableRow from './PlayersTableRow';

export default class PlayersTable extends Component {
	constructor(props) {
		super(props);
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
		return (
			<div id="player-table-cntr-outer">
				<div className='player-table-title'>Leaderboard</div>
				<div className='player-table-cntr-inner'>
					<div className='player-table-header'>
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