import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';
import PlayersTableRow from './PlayersTableRow';

export default class PlayersTable extends Component {
	constructor(props) {
		super(props);
	}
	
	displayLeaderboardRows() {
		let name = ["Tenk", "NY_Mets", "Sir", "kwakster", "Lethal", "Bizarro", "Sleek", "Carterboy", "PROMASTER", "Coobykins", "Blierg"];
		let elos = [2574, 1997, 1784, 1506, 1471, 1460, 1428, 1365, 1337, 1314, 1262];
		let wins = [89, 31, 22, 26, 18, 54, 44, 50, 26, 15, 94, 30];
		let loss = [50, 9, 8, 18, 46, 37, 43, 20, 8, 91, 29];
		
		let rows = [];
		for (let i = 0; i < 10; ++i) {
			let rank = i+1;
			rows.push(<PlayersTableRow rank={rank} name={name[i]}
				elo={elos[i]} wins={wins[i]} loss={loss[i]} alt={rank%2==0}/>);
		}
		
		return rows;
	}
	
	render() {
		return (
			<div id="player-table-cntr-outer">
				<div className='player-table-header'>Leaderboard</div>
				<div className='player-table-cntr-inner'>
					{this.displayLeaderboardRows()}
				</div>
			</div>
		);
	}
}