import React from 'react';
import Square from './Square';

/**
 * Board component outputs the game board rows.
 */
 export default class Board extends React.Component {

	/**
	 * Renders individual squares within the game board.
	 */
	renderSquare( square ) {
		return ( 
			<Square 
				key={ square }
				value={ this.props.squares[ square ] }
				onClick={ () => this.props.onClick( square ) }
			/> 
		);
	}

	/**
	 * Renders the game board rows.
	 */
	render() {
		const rows = [];
		
		// Create three board rows with a loop and add its squares.
		for ( let row = 0; row < 3; row++ ) {
			const squares = [];

			// Create three squares to add to the board row.
			for ( let square = 0; square < 3; square++ ) {
				squares.push( this.renderSquare( row * 3 + square ) );
			}

			// Append each row element with its squares to the array.
			rows.push( 			
				<div key={ row } className="game-board__row">
					{ squares }
				</div> 
			);
		}

		// Renders the game board rows.
		return( 
			<>
				{ rows }
			</>
		);
	}
}