import React, { useState, useReducer } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import styles from '../css/RoundForm.module.css';
import Map from '../components/map';
import Logout from '../components/logout';
import { useNavigate } from 'react-router-dom';
import { reducer } from '../utils/reducer';
import useAuth from '../utils/useAuth';
import buttonStyle from '../css/Button.module.css';
const defaultState = {
	roundNumber: 0,
	coords: { lat: 0, lng: 0 },
	mapClicked: false,
	roundConfirmed: false,
	timeout: false,
};
const CreateRoundForm = () => {
	const [selectedMap, setSelectedMap] = useState('N/A');
	const [difficulty, setDifficulty] = useState('normal');
	const [guessImage, setGuessImage] = useState(null);
	const [answerImage, setAnswerImage] = useState(null);
	const [gameState, dispatch] = useReducer(reducer, defaultState);

	const { auth } = useAuth();
	const navigate = useNavigate();
	const { isLoading, data, isError } = useQuery(
		['maps'],
		() => {
			return fetch('https://valoguesser-server.up.railway.app/maps').then(
				(res) => res.json()
			);
		},
		{ refetchOnWindowFocus: false }
	);
	const mutation = useMutation((form) =>
		fetch('https://valoguesser-server.up.railway.app/rounds', {
			method: 'POST',
			headers: { Authorization: `Bearer ${auth?.accessToken}` },
			body: form,
		}).then((res) => res.json())
	);
	const handleSelectMap = (e) => {
		if (e.target.value === 'N/A') setSelectedMap('N/A');
		else {
			const value = data[parseInt(e.target.value)];
			setSelectedMap(value);
		}
	};
	const handleDifficultyChange = (e) => {
		setDifficulty(e.target.value);
	};
	const handleImageUpload = (e, setter) => {
		setter(e.target.files[0]);
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();

		const form = new FormData();
		// convert all data to formData
		if (
			selectedMap !== 'N/A' &&
			guessImage !== null &&
			answerImage !== null &&
			gameState.coords.lat >= 0 &&
			gameState.coords.lat <= 500 &&
			gameState.coords.lng >= 0 &&
			gameState.coords.lng <= 500
		) {
			form.append('map_uid', selectedMap.map_uid);
			form.append('guess-image', guessImage);
			form.append('answer-image', answerImage);
			form.append('latitude', Math.floor(gameState.coords.lat));
			form.append('longitude', Math.floor(gameState.coords.lng));
			form.append('difficulty', difficulty);

			// submit a request and send data to server
			mutation.mutate(form);
			// console.log(form);
		} else {
			alert('missing required inputs');
		}
	};
	return (
		<>
			{isLoading ? (
				<div>loading</div>
			) : isError ? (
				<div>error loading data</div>
			) : (
				<div className={styles.container}>
					<div className={styles.navbar}>
						<button
							className={buttonStyle.button}
							onClick={() => {
								navigate('/');
							}}
						>
							Home
						</button>
						<Logout />
					</div>

					<form className={styles.form}>
						<label htmlFor='map-select'>Select map</label>
						<select
							name='map-select'
							id='map-select'
							onChange={handleSelectMap}
						>
							<option value='N/A'>N/A</option>
							{data.map((val, index) => {
								return (
									<option key={val.map_uid} value={index}>
										{val.name}
									</option>
								);
							})}
						</select>
						{selectedMap !== 'N/A' && (
							<Map
								dispatch={dispatch}
								mapData={selectedMap}
								gameState={gameState}
								rounds={[]}
							/>
						)}
						<br />
						<label htmlFor='guess-image'>Upload guessing image</label>
						<input
							type='file'
							id='guess-image'
							name='guess-image'
							accept='.png,.jpg'
							onChange={(e) => {
								handleImageUpload(e, setGuessImage);
							}}
							required
						/>
						<br />
						<label htmlFor='answer-image'>Upload answer image</label>
						<input
							type='file'
							id='answer-image'
							name='answer-image'
							accept='.png,.jpg'
							onChange={(e) => {
								handleImageUpload(e, setAnswerImage);
							}}
							required
						/>
						<br />
						<label htmlFor='difficulty'>Difficulty</label>
						<select
							name='difficulty'
							id='difficulty'
							onChange={handleDifficultyChange}
						>
							<option value='normal'>normal</option>
							<option value='hard'>hard</option>
						</select>
						<button
							className={styles.submit}
							type='submit'
							onClick={handleSubmitForm}
						>
							submit
						</button>
					</form>
					<div className={styles.confirmation}>
						{mutation.isLoading ? (
							<div>loading...</div>
						) : mutation.isError ? (
							<div>error handling request</div>
						) : mutation.data ? (
							<div>success</div>
						) : null}
						<h1>confirmation form</h1>
						{selectedMap !== 'N/A' && (
							<>
								<p>selected map name: {selectedMap.name}</p>
								<p>selected map id: {selectedMap.map_uid}</p>
							</>
						)}
						<p>
							selected coords (lat,lng):
							{Math.floor(gameState.coords.lat)},
							{Math.floor(gameState.coords.lng)}
						</p>
						<p>
							guess image: <span>{guessImage && guessImage.name}</span>
						</p>
						<p>
							answer image:{' '}
							<span>{answerImage && answerImage.name}</span>
						</p>
						<p>selected difficulty: {difficulty}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateRoundForm;
