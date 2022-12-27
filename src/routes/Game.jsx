import React, { useReducer, useState, useEffect } from 'react';
import useTimer from '../utils/useTimer';
import styles from '../css/Game.module.css';
import Map from '../components/map';
import ProgressBar from '../components/progressBar';
import Modal from '../components/modal';
import RightPanel from '../components/rightPanel';
import GameOver from '../components/gameOver';
import HomeIcon from '../components/homeIcon';
import { calculateScore } from '../utils/calculateScore';
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
	const [openModal, setOpenModal] = useState(false);
	// gets the map data in state
	const { state } = useLocation();
	const { time, pause, start, restart } = useTimer(() => {
		const roundTimedOut = rounds.map((val, index) => {
			if (gameState.roundNumber === index) {
				return { ...val, timedOut: true };
			}
			return val;
		});
		setOpenModal(() => false);
		setRounds(roundTimedOut);
		dispatch({ type: 'TIMEDOUT' });
	}, 30);
	// get rounds data
	const { isLoading, data, isError } = useQuery(
		['rounds'],
		() => {
			return fetch(`https://localhost:4444/rounds/${state.map_uid}`)
				.then((res) => res.json())
				.then((val) => {
					if (val.status === 'ok') {
						const newValue = val.data.map((el) => {
							return {
								...el,
								xChosen: 0,
								yChosen: 0,
								score: 0,
								timedOut: false,
								distance: 0,
							};
						});
						setRounds(newValue);
					}
					return val;
				});
		},
		{ refetchOnWindowFocus: false, cacheTime: 0, keepPreviousData: true }
	);

	function handleRoundButton() {
		if (gameState.mapClicked) {
			if (!gameState.roundConfirmed) {
				// calculate score
				const updateRounds = rounds.map((val, index) => {
					if (index === gameState.roundNumber) {
						const { lat, lng } = gameState.coords;
						const score = calculateScore(
							val.x_coord,
							val.y_coord,
							lng,
							lat
						);
						console.log(score);
						return {
							...val,
							xChosen: lng,
							yChosen: lat,
							score: score.score,
							distance: score.distance,
						};
					}
					return val;
				});
				pause();
				setRounds(updateRounds);
				dispatch({ type: 'CONFIRM_ROUND' });
			} else {
				console.log('should restart');
				setOpenModal(() => false);
				dispatch({ type: 'NEXT_ROUND' });
				restart();
			}
		}
	}

	function handlePopupModal() {
		pause();
		setOpenModal(true);
	}
	// start the timer when data is loaded
	useEffect(() => {
		if (!isLoading && data.status === 'ok') {
			start();
		}
	}, [isLoading, data, start]);
	// stop timer when game ends
	useEffect(() => {
		if (gameState.gameOver) {
			pause();
		}
	}, [gameState]);

	if (isLoading) return <div>Loading</div>;

	if (isError) return <div>Error retrieving data</div>;

	if (data.status === 'error') {
		return <div>{data.message}</div>;
	}

	// where the game logic should live
	if (data.status === 'ok') {
		// console.log(rounds);
		return (
			<>
				{gameState.gameOver ? (
					// convert to a gameover component
					<GameOver state={state} rounds={rounds} gameState={gameState} />
				) : (
					<div className={styles.game}>
						<Modal
							open={openModal}
							closeModal={setOpenModal}
							start={start}
							time={time}
							confirmed={gameState.roundConfirmed}
						/>
						<div className={styles.leftPanel}>
							<div className={styles.gameNav}>
								<HomeIcon />
								{/* <img
									className={styles.homeButton}
									src='https://res.cloudinary.com/dna7c2j1e/image/upload/v1670288041/assets/home_ck8duw.png'
									alt='home button'
									draggable={false}
									onClick={() => {
										navigate('/');
									}}
								/> */}
								<div className={styles.buttonContainer}>
									<button
										className={styles.helpButton}
										type='button'
										onClick={handlePopupModal}
									>
										?
									</button>
								</div>
							</div>

							<div>{time}</div>
							<Map
								dispatch={dispatch}
								mapData={state}
								gameState={gameState}
								rounds={rounds}
							/>

							{gameState.roundConfirmed && (
								<div>
									<ProgressBar
										amount={rounds[gameState.roundNumber].score}
									/>
								</div>
							)}

							<button
								className={styles.gameButton}
								type='button'
								onClick={handleRoundButton}
								disabled={!gameState.mapClicked}
							>
								{gameState.roundConfirmed ? 'NEXT' : 'SUBMIT'}
							</button>
						</div>
						{/* TODO: convert right-panel to seperate component */}
						<RightPanel rounds={rounds} gameState={gameState} />
					</div>
				)}
			</>
		);
	}
};

export default Game;
