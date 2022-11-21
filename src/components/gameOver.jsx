import React, { useState, useEffect } from 'react';
import Map from './map';
import PropTypes from 'prop-types';
import ProgressBar from './progressBar';
import style from '../css/Game.module.css';
import { useNavigate } from 'react-router-dom';
function gameOver({ state, rounds, gameState }) {
	const [totalScore, setTotalScore] = useState(0);
	const navigate = useNavigate();

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
			<Map mapData={state} rounds={rounds} gameState={gameState} width={500} height={500} />
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
						window.location.reload(false);
					}}
				>
					PLAY AGAIN
				</button>
			</div>
		</div>
	);
}

gameOver.propTypes = {
	state: PropTypes.object,
	rounds: PropTypes.array,
	gameState: PropTypes.object,
};
export default gameOver;
