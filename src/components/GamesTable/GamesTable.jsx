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
			let p1 = this.props.
			
			rows.push(<GamesTableRow rank={rank} name={name}
				elo={elo} wins={wins} loss={loss} alt={rank%2==0} />);
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
					<div id='player-table-header' style={sticky}>
						<div className='match'> Match </div>
						<div className='Team 1'> Team 1 </div>
						<div className='Scores'> Scores </div>
						<div className='Team 2'> Team 2 </div>
					</div>
					
				</div>
			</div>
		);
	}
}
