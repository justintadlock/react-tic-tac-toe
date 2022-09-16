import React from 'react';
import Board from './Board';
import { calculateWinner } from './functions-helpers';

/**
 * Game component outputs the full game app.
 */
 export default class Game extends React.Component {

	/**
	 * Constructor sets up the initial component state.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			history: [ {
				squares: Array( 9 ).fill( null )
			} ],
			xIsNext: true,
			stepNumber: 0
		};
	}

	/**
	 * Renders the game app.
	 */
	render() {
		const history = this.state.history;
		const current = history[ this.state.stepNumber ];
		const winner  = calculateWinner( current.squares );

		// Creates a list of moves based on the current game history.
		const moves = history.map( ( step, move ) => {
			const desc = move 
			           ? '← Go to move #' + move 
				   : '↻ Go to game start';

			return (
				<li className="game-moves__move" key={ move }>
					<button 
						className="game-moves__jump"
						onClick={ () => this.jumpTo( move ) }
					>
						{ move === this.state.stepNumber ? <strong>{ desc }</strong> : desc }
					</button>
				</li>
			);
		} );

		let status;
		let label;

		if ( winner ) {
			label = 'Winner:';
			status = 'Player ' + winner;
		} else {
			label = 'Next Move:';
			status = this.state.xIsNext ? 'Player  X' : 'Player  O';
		}

		return (
			<div className="game">
				<h1 className="game__title">Tic-tac-toe</h1>
				<div className="game__content">
					<div className="game-board">
						<Board 
							squares={ current.squares }
							onClick={ ( i ) => this.handleClick( i ) }
						/>
					</div>
					<div className="game-info">
						<div className="game-status">
							<div className="game-status__label">{ label }</div>
							<div className="game-status__state">{ status }</div>
						</div>
						<div className="game-moves">
							<h2 className="game-moves__title">History</h2>
							<ol className="game-moves__list">{ moves }</ol>
						</div>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Handling for when a square is clicked.
	 */
	handleClick( i ) {
		const history = this.state.history.slice( 0, this.state.stepNumber + 1 );
		const current = history[ history.length - 1 ];
		const squares = current.squares.slice();

		if ( calculateWinner( squares ) || squares[ i ] ) {
			return;
		}

		squares[ i ] = this.state.xIsNext ? 'x' : 'o';

		this.setState( { 
			history: history.concat( [ {
				squares: squares
			} ] ),
			xIsNext: ! this.state.xIsNext,
			stepNumber: history.length
		} );
	}

	/**
	 * Sets the step number and whether X/O is the next step when a link in 
	 * the game move history is clicked.
	 */
	jumpTo( step ) {
		this.setState( {
			stepNumber: step,
			xIsNext: ( step % 2 ) === 0
		} );
	}
}