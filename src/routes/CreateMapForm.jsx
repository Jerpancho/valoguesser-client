import React, { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
function CreateMap() {
	const [error, setError] = useState([]);
	const formNameRef = useRef();
	const guessImageRef = useRef();
	const calloutImageRef = useRef();

	const { isError, isLoading, data, mutate } = useMutation(
		async (data) => {
			const res = await fetch('http://localhost:4444/maps/images', {
				method: 'POST',
				body: data,
			});
			return await res.json();
		},
		{
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);
	function handleSubmit() {
		setError([]);
		const formData = new FormData();
		if (!formNameRef.current.value) {
			setError((prev) => [...prev, 'no file name']);
		}
		if (!guessImageRef.current.files[0]) {
			setError((prev) => [...prev, 'no base map file found']);
		}
		if (!calloutImageRef.current.files[0]) {
			setError((prev) => [...prev, 'no callout map file found']);
		}

		if (
			formNameRef.current.value &&
			guessImageRef.current.files[0] &&
			calloutImageRef.current.files[0]
		) {
			formData.append('name', formNameRef.current.value);
			formData.append('base-map', guessImageRef.current.files[0]);
			formData.append('callout-map', calloutImageRef.current.files[0]);
			mutate(formData);
		}
	}
	return (
		<div className='create-map'>
			<div className='errors'>
				{error.length > 0 && error.map((val, idx) => <p key={idx}>{val}</p>)}
			</div>
			<div className='create-map-form'>
				<label htmlFor='name'>name: </label>
				<input type='text' name='name' ref={formNameRef} />
				<label htmlFor='guess-image'>base image (no callouts): </label>
				<input type='file' name='guess-image' ref={guessImageRef} accept='.png,.jpg' />
				<label htmlFor='callout-image'>answer image (with callout): </label>
				<input type='file' name='callout-image' ref={calloutImageRef} accept='.png,.jpg' />
				<button type='button' onClick={handleSubmit}>
					submit
				</button>
			</div>
			<div>
				{isLoading ? (
					<p>waiting for data</p>
				) : isError ? (
					<p>error grabbing data</p>
				) : (
					data && (
						<div>
							<p>{data.name}</p>
							<p>{data.map_uid}</p>
							<img src={data.base_img} alt='base map' />
							<img src={data.callout_img} alt='callout map' />
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default CreateMap;
