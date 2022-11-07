import React, { useReducer, useState } from 'react';
import styles from '../css/Game.module.css';
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
	gameOver: false,
};

const Game = () => {
	const [gameState, dispatch] = useReducer(reducer, defaultState);
	const [rounds, setRounds] = useState([]);
	// gets the map data in state
	const { state } = useLocation();
	const { isLoading, data, isError } = useQuery(
		['rounds'],
		() => {
			return fetch(`http://localhost:4444/rounds/${state.map_uid}`)
				.then((res) => res.json())
				.then((val) => {
					if (val.status === 'ok') {
						const newValue = val.data.map((el) => {
							return { ...el, xChosen: 0, yChosen: 0, score: 0, timedOut: false };
						});
						setRounds(newValue);
					}
					return val;
				});
		},
		{ refetchOnWindowFocus: false, cacheTime: 0 }
	);
	console.log(data);
	// TODO: prioritize refining the game mechanic
	function handleRoundButton() {
		if (gameState.mapClicked) {
			if (!gameState.roundConfirmed) {
				dispatch({ type: 'CONFIRM_ROUND' });
			} else {
				dispatch({ type: 'NEXT_ROUND' });
			}
		}
	}

	if (isLoading) return <div>Loading</div>;

	if (isError) return <div>Error retrieving data</div>;

	// where the game logic should live
	if (data.status === 'ok') {
		// console.log(rounds);
		return (
			<>
				{gameState.gameOver ? (
					// convert to a gameover component
					<div> Game Over</div>
				) : (
					<div className={styles.game}>
						{/* should add a condition for gameover */}
						<div className={styles.leftPanel}>
							<Map
								dispatch={dispatch}
								mapData={state}
								gameState={gameState}
								rounds={rounds}
							/>
							<button type='button' onClick={handleRoundButton}>
								Submit
							</button>
						</div>
						{/* TODO: convert right-panel to seperate component */}
						<div className={styles.rightPanel}>
							{gameState.roundConfirmed ? (
								<img src={rounds[gameState.roundNumber].expanded_img} />
							) : (
								<img src={rounds[gameState.roundNumber].guess_img} />
							)}
						</div>
					</div>
				)}
			</>
		);
	}
	if (data.status === 'error') {
		return <div>{data.message}</div>;
	}
};

export default Game;
