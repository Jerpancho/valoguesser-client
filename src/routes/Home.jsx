import React from 'react';
import styles from '../css/Home.module.css';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Card from '../components/card';
import Tutorial from '../components/tutorial';
import useAuth from '../utils/useAuth';
import Logout from '../components/logout';
function App() {
	const { auth } = useAuth();
	const { isLoading, data, isError } = useQuery(['maps'], () => {
		return fetch('http://localhost:4444/maps').then((res) => res.json());
	});
	console.log(auth);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading page...</div>;
	if (data) {
		return (
			<div>
				<div className='navbar'>
					<Link to='/create/round'>upload a round</Link>
					{auth?.user && (
						<div>
							<div>{auth.user}</div>
							<Logout />
						</div>
					)}
				</div>
				<div className='App'>
					{/* display tutorial here */}
					<div className={styles.tutorialContainer}>
						<Tutorial />
					</div>
					{
						<div className={styles.cardContainer}>
							{data.map((val) => {
								return <Card key={val.map_uid} mapData={val} />;
							})}
						</div>
					}
				</div>
			</div>
		);
	}
}

export default App;
