import React, { useReducer } from 'react';
import Map from '../components/map';
import { reducer } from '../utils/reducer';
import { useLocation } from 'react-router-dom';

const defaultState = {
	roundNumber: 0,
	coords: { lat: 0, lng: 0 },
	mapClicked: false,
	roundConfirmed: false,
	timeout: false,
};

const Game = () => {
	const [gameState, dispatch] = useReducer(reducer, defaultState);
	// gets the map data in state
	const { state } = useLocation();

	return (
		<div className='game'>
			<Map dispatch={dispatch} mapData={state} gameState={gameState} />
		</div>
	);
};

export default Game;
