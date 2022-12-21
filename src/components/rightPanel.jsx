import React from 'react';
import styles from '../css/RightPanel.module.css';
import PropTypes from 'prop-types';

function rightPanel({ rounds, gameState }) {
	return (
		<div className={styles.roundsDisplay}>
			{gameState.roundConfirmed ? (
				<img
					src={rounds[gameState.roundNumber].expanded_img}
					draggable={false}
				/>
			) : (
				<img
					src={rounds[gameState.roundNumber].guess_img}
					draggable={false}
				/>
			)}
		</div>
	);
}

rightPanel.propTypes = {
	rounds: PropTypes.array.isRequired,
	gameState: PropTypes.object.isRequired,
};
export default rightPanel;
