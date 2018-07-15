import {Component} from 'inferno';
import {Link, NavLink} from 'inferno-router';

export default class GamesTableRow extends Component {
	constructor(props) {
		super(props);
		
		let cntrClass = 'table-row' + ((this.props.alt)? ' alt': '');
		
		let scores = this.props.s1 + ' - ' + this.props.s2
		if (this.props.s1 == null || this.props.s2 == null) {
			scores = "vs"
		}
		
		this.state = {
			cntrClass: cntrClass,
			scores: scores
		}
	}
	
	shouldComponentUpdate(nextProps, nextState, context) {
		return false;
	}
	
	render() {
		
		return (
			<div className={this.state.cntrClass}>
				
				<div className='match'>
					{this.props.match}
				</div>
				<div className='team1'>
					<div className='player'>{this.props.p1}</div>
					<div className='player'>{this.props.p2}</div>
					<div className='player'>{this.props.p3}</div>
					<div className='player'>{this.props.p4}</div>
				</div>
				<div className='scores'>
					{this.state.scores}
				</div>
				<div className='team1'>
					<div className='player'>{this.props.p5}</div>
					<div className='player'>{this.props.p6}</div>
					<div className='player'>{this.props.p7}</div>
					<div className='player'>{this.props.p8}</div>
				</div>
			</div>
		);
	}
}
