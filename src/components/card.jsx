import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../css/Home.module.css';
const Card = ({ mapData }) => {
	return (
		<div className={styles.card}>
			{/* style image to be object fit cover */}
			<img className={styles.cardImage} src={mapData.thumbnail} alt='map thumbnail' />
			<h4>{mapData.name}</h4>
			<Link to={`/map/${mapData.map_uid}`} state={mapData}>
				play
			</Link>
		</div>
	);
};

Card.propTypes = {
	mapData: PropTypes.object.isRequired,
};
export default Card;
