/**
 * Square component outputs a clickable button.
 */
 export default function Square( props ) {

	// Context class for styling squares by value.
	let context = "game-board__square--" + ( null === props.value ? 'empty' : props.value );

	// Returns the square's button.
	return (
		<button 
			className={ "game-board__square " + context }
			onClick={ props.onClick }
		>
			{ props.value }
		</button>
	);
}