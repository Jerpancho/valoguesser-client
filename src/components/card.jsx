import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Home.module.css';
const Card = ({ mapData }) => {
	const navigate = useNavigate();

	const navigateToGame = () => {
		navigate(`/map/${mapData.map_uid}`, { state: mapData });
	};
	return (
		<div className={styles.card}>
			{/* style image to be object fit cover */}
			<div className={styles.imgContainer}>
				<img
					className={styles.cardImage}
					src={mapData.thumbnail}
					alt='map thumbnail'
					draggable={false}
				/>
				<h4 className={styles.mapTitle}>{mapData.name}</h4>
			</div>
			{/* <Link className={styles.gameLink} to={`/map/${mapData.map_uid}`} state={mapData}>
				Play
			</Link> */}
			<button
				className={styles.gameLink}
				onClick={() => {
					navigateToGame();
				}}
			>
				PLAY
			</button>
		</div>
	);
};

Card.propTypes = {
	mapData: PropTypes.object.isRequired,
};
export default Card;
