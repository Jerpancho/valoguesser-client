import React from 'react';
import styles from '../css/Tutorial.module.css';

function tutorial() {
	return (
		<div>
			<h1 className={styles.title}>How To Play</h1>
			<ol className={styles.list}>
				<li>Select A Map</li>
				<li>Guess the Images Location</li>
				<li>Pinpoint it on the map by clicking and submit your guess</li>
				<li>Aim for the highest score</li>
			</ol>
			<div className={styles.tutorialImg}>
				<img
					src='https://res.cloudinary.com/dna7c2j1e/image/upload/v1667702529/assets/Tutorial_Map_ydqfxd.png'
					alt='tutorial visual'
					draggable={false}
				/>
			</div>
		</div>
	);
}

export default tutorial;
