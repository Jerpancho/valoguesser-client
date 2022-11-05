import React from 'react';
import styles from '../css/Home.module.css';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/card';
function App() {
	const { isLoading, data, isError } = useQuery(['maps'], () => {
		return fetch('http://localhost:4444/maps').then((res) => res.json());
	});

	return (
		<div className='App'>
			{isLoading ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error loading page.</div>
			) : (
				data && (
					<li className={styles.cardContainer}>
						{data.map((val) => {
							return <Card key={val.map_uid} mapData={val} />;
						})}
					</li>
				)
			)}
		</div>
	);
}

export default App;
