import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../css/Home.module.css';
const Card = ({ mapData }) => {
	return (
		<div className={styles.card}>
			{/* style image to be object fit cover */}
			<img className={styles.cardImage} src={mapData.base_img} alt='map thumbnail' />
			<h4>{mapData.name}</h4>
			<Link to='/game' state={mapData}>
				play
			</Link>
		</div>
	);
};

Card.propTypes = {
	mapData: PropTypes.object.isRequired,
};
export default Card;
