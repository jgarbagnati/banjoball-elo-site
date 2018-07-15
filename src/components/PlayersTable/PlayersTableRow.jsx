import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

export default class PlayersTableRow extends Component {
	constructor(props) {
		super(props);
		let cntrClass = 'player-table-row' + ((this.props.alt)? ' alt': '');
		let games = this.props.wins + this.props.loss;
		let gamesSafe = Math.max(1, games);
		let winrate = (Math.floor((this.props.wins / gamesSafe) * 1000) / 10).toFixed(1);
		let winbarStyle = {
			width: winrate + '%'
		};
		
		let wins = (this.props.wins > 0)? 
			(<span className="txt left">  {this.props.wins + "W"} </span>): null;
		let loss = (this.props.loss > 0)? 
			(<span className="txt right"> {this.props.loss + "L"} </span>): null;
		
		this.state = {
			cntrClass: cntrClass,
			wins: wins,
			loss: loss,
			winrate: winrate,
			winbarStyle: winbarStyle
		}
	}
	
	shouldComponentUpdate(nextProps, nextState, context) {
		return false;
	}
	
	render() {
		return (
			<div className={this.state.cntrClass}>
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
					<div className='winloss-bar'>
						<div className='win-bar' style={this.state.winbarStyle}>
						</div>
						<div className='txt-cntr'>
							{this.state.wins}
							{this.state.loss}
						</div>
					</div>
					<div className='winloss-rate'>
						{this.state.winrate + "%"}
					</div>
				</div>
			</div>
		);
	}
}
