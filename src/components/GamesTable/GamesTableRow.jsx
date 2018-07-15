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
	
	render() {
		
		return (
			<div className={this.state.cntrClass}>
				
				<div className='match'>
					{this.props.match}
				</div>
				<div className='team1'>
					{this.props.p1}
					{this.props.p2}
					{this.props.p3}
					{this.props.p4}
				</div>
				<div className='scores'>
					{this.state.scores}
				</div>
				<div className='team1'>
					{this.props.p5}
					{this.props.p6}
					{this.props.p7}
					{this.props.p8}
				</div>
			</div>
		);
	}
}
