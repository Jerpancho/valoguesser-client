import React, { useState, useEffect } from 'react';
import Map from './map';
import PropTypes from 'prop-types';
import ProgressBar from './progressBar';
import style from '../css/Game.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function gameOver({ state, rounds, gameState }) {
	const [totalScore, setTotalScore] = useState(0);
	const navigate = useNavigate();
	const location = useLocation();
	function calculateTotalScore() {
		let result = 0;
		rounds.forEach((val) => {
			result += val.score;
		});
		setTotalScore(result);
	}

	useEffect(() => {
		calculateTotalScore();
	}, []);
	return (
		<div className={style.gameOver}>
			<div className={style.history}>
				<h1>Results</h1>
				{rounds.map((value, index) => {
					return (
						<ResultDetails
							key={index}
							roundNumber={index + 1}
							score={value.score}
							distance={value.distance}
						/>
					);
				})}
			</div>
			<div className={style.menu}>
				<Map
					mapData={state}
					rounds={rounds}
					gameState={gameState}
					width={500}
					height={500}
				/>
				<ProgressBar amount={totalScore} total={25000} width={700} />
				<div className={style.gameOverButtons}>
					<button
						className={style.gameButton}
						onClick={() => {
							navigate('/');
						}}
					>
						HOME
					</button>
					<button
						className={style.gameButton}
						onClick={() => {
							console.log(location);
							navigate(0, {
								replace: true,
								state: location.state,
							});
						}}
					>
						PLAY AGAIN
					</button>
				</div>
			</div>
		</div>
	);
}

function ResultDetails({ roundNumber, distance, score }) {
	return (
		<div className={style.detail}>
			<h3>Round {roundNumber}</h3>
			<p className={style.subText}>Score - {score} </p>
			<p className={style.subText}>Distance - {distance}</p>
		</div>
	);
}

ResultDetails.propTypes = {
	roundNumber: PropTypes.number,
	distance: PropTypes.number,
	score: PropTypes.number,
};

gameOver.propTypes = {
	state: PropTypes.object,
	rounds: PropTypes.array,
	gameState: PropTypes.object,
};

export default gameOver;
