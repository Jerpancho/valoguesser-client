import React, { useReducer } from 'react';
import Map from '../components/map';
import { reducer } from '../utils/reducer';

const defaultState = {
	roundNumber: 0,
	coords: { lat: 0, lng: 0 },
	mapClicked: false,
	roundConfirmed: false,
	timeout: false,
};

const Game = () => {
	const [gameState, dispatch] = useReducer(reducer, defaultState);

	return (
		<div className='game'>
			<Map dispatch={dispatch} />
			<p>
				chosen coords:
				<span>
					{gameState.coords.lat},{gameState.coords.lng}
				</span>
			</p>
		</div>
	);
};

export default Game;
