import React, { useReducer } from 'react';
import Map from '../components/map';
import { useQuery } from '@tanstack/react-query';
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
	const { isLoading, data, isError } = useQuery(['rounds'], () => {
		return fetch(`http://localhost:4444/rounds/${state.map_uid}`).then((res) => res.json());
	});

	if (isLoading) return <div>Loading</div>;

	if (isError) return <div>Error retrieving data</div>;

	// where the game logic should live
	if (data.status === 'ok')
		return (
			<div className='game'>
				<Map dispatch={dispatch} mapData={state} gameState={gameState} />
			</div>
		);

	if (data.status === 'error') {
		return <div>{data.message}</div>;
	}
};

export default Game;
