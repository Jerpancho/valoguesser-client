import React from 'react';
import Map from './map';
import style from '../css/GameOver.module.css';
function gameOver({ state, rounds, gameState }) {
	return (
		<div className={style.gameOver}>
			<Map mapData={state} rounds={rounds} gameState={gameState} width={500} height={500} />
		</div>
	);
}

export default gameOver;
