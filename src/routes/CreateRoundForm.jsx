import React, { useState, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import Map from '../components/map';
import { reducer } from '../utils/reducer';
const defaultState = {
	roundNumber: 0,
	coords: { lat: 0, lng: 0 },
	mapClicked: false,
	roundConfirmed: false,
	timeout: false,
};
const CreateRoundForm = () => {
	const [selectedMap, setSelectedMap] = useState('N/A');
	const [gameState, dispatch] = useReducer(reducer, defaultState);
	const { isLoading, data, isError } = useQuery(
		['maps'],
		() => {
			return fetch('http://localhost:4444/maps').then((res) => res.json());
		},
		{ refetchOnWindowFocus: false }
	);

	const handleSelectMap = (e) => {
		setSelectedMap(e.target.value);
	};
	return (
		<>
			{isLoading ? (
				<div>loading</div>
			) : isError ? (
				<div>error loading data</div>
			) : (
				<form>
					<label htmlFor='map-select'>select map: </label>
					<select name='map-select' id='map-select' onChange={handleSelectMap}>
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
						<Map dispatch={dispatch} mapData={data[parseInt(selectedMap)]} />
					)}
				</form>
			)}
		</>
	);
};

export default CreateRoundForm;
