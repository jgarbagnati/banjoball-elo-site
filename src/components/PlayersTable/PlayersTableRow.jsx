import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

export default class PlayersTableRow extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let cntrClass = 'player-table-row' + ((this.props.alt)? ' alt': '');
		return (
			<div className={cntrClass}>
				<div className='rank'>
					{this.props.rank}
				</div>
				<div className='name'>
					{this.props.name}
				</div>
				<div className='elo'>
					{this.props.elo}
				</div>
				<div className='winloss'>
					{this.props.wins + "W - " + this.props.loss + "L"}
				</div>
			</div>
		);
	}
}
