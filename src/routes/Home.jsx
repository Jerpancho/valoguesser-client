import React from 'react';
import styles from '../css/Home.module.css';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/card';
import Tutorial from '../components/tutorial';
function App() {
	const { isLoading, data, isError } = useQuery(['maps'], () => {
		return fetch('http://localhost:4444/maps').then((res) => res.json());
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading page...</div>;
	if (data)
		return (
			<div className='App'>
				{/* display tutorial here */}
				<Tutorial />
				{
					<li className={styles.cardContainer}>
						{data.map((val) => {
							return <Card key={val.map_uid} mapData={val} />;
						})}
					</li>
				}
			</div>
		);
}

export default App;
