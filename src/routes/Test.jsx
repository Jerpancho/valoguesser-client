import React from 'react';
import { useQuery } from '@tanstack/react-query';
const Test = () => {
	// eslint-disable-next-line no-unused-vars
	const ascent = 'f5b53ff5-34ca-4bed-84d9-a9c0d841fd59';
	const bind = '240838d1-58fe-4c51-9fca-8d4836a942f3';
	const { isLoading, data, isError, placeholderData } = useQuery(
		['rounds'],
		() => {
			return fetch(`https://valoguesser-server.up.railway.app/rounds/${bind}`).then(
				(res) => res.json()
			);
		},
		{ placeholderData: { data: 'Loading' } }
	);
	console.log(isLoading);
	console.log(data);
	console.log(isError);
	console.log(placeholderData);
	return (
		<div>
			{isLoading ? (
				<div>{placeholderData.data}</div>
			) : (
				<div>{data.status}</div>
			)}
		</div>
	);
};

export default Test;
