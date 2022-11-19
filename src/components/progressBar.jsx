import React, { useEffect, useState } from 'react';
import style from '../css/Progressbar.module.css';
const progressBar = ({ amount = 0, total = 5000 }) => {
	const [fillStyle, setFillStyle] = useState({});
	useEffect(() => {
		const newWidth = Math.floor((amount / total) * 100);
		setTimeout(() => {
			setFillStyle({
				width: `${newWidth}%`,
			});
		}, 200);
	}, [amount]);
	return (
		<div className={style.progress}>
			<div className={style.progressFill} style={fillStyle}></div>
		</div>
	);
};

export default progressBar;
