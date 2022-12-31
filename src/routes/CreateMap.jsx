import React, { useRef, useState } from 'react';
import styles from '../css/MapForm.module.css';
import buttonStyle from '../css/Button.module.css';
import Logout from '../components/logout';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';
function CreateMap() {
	const { auth } = useAuth();
	const [error, setError] = useState([]);
	const formNameRef = useRef();
	const guessImageRef = useRef();
	const calloutImageRef = useRef();
	const thumbnailImageRef = useRef();
	const navigate = useNavigate();
	// console.log(auth);
	const { isError, isLoading, data, mutate } = useMutation(async (data) => {
		const res = await fetch(
			'https://valoguesser-server.up.railway.app/maps/',
			{
				method: 'POST',
				credentials: 'include',
				headers: { Authorization: `Bearer ${auth?.accessToken}` },
				body: data,
			}
		);
		return await res.json();
	});
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
		if (!thumbnailImageRef.current.files[0]) {
			setError((prev) => [...prev, 'no thumbnail file found']);
		}

		if (
			formNameRef.current.value &&
			guessImageRef.current.files[0] &&
			calloutImageRef.current.files[0] &&
			thumbnailImageRef.current.files[0]
		) {
			formData.append('name', formNameRef.current.value);
			formData.append('base-map', guessImageRef.current.files[0]);
			formData.append('callout-map', calloutImageRef.current.files[0]);
			formData.append('thumbnail', thumbnailImageRef.current.files[0]);
			mutate(formData);
		}
	}
	// add thumbnail
	return (
		<div className={styles.form}>
			<div className={styles.mapNav}>
				<Logout />
				<button
					className={buttonStyle.button}
					onClick={() => {
						navigate('/create/round');
					}}
				>
					create round
				</button>
				<button
					className={buttonStyle.button}
					onClick={() => {
						navigate('/');
					}}
				>
					home
				</button>
			</div>

			<div className='errors'>
				{error.length > 0 &&
					error.map((val, idx) => <p key={idx}>{val}</p>)}
			</div>
			<div className={styles.mapForm}>
				<label htmlFor='name'>Name: </label>
				<input type='text' name='name' ref={formNameRef} />
				<label htmlFor='guess-image'>Base image (no callouts): </label>
				<input
					type='file'
					name='guess-image'
					ref={guessImageRef}
					accept='.png,.jpg'
				/>
				<label htmlFor='callout-image'>Answer image (with callout): </label>
				<input
					type='file'
					name='callout-image'
					ref={calloutImageRef}
					accept='.png,.jpg'
				/>
				<label htmlFor='thumbnail'>Thumbnail: </label>
				<input
					type='file'
					name='thumbnail'
					ref={thumbnailImageRef}
					accept='.png,.jpg'
				/>
				<button type='button' onClick={handleSubmit}>
					SUBMIT
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
							<p>{data.data.name}</p>
							<p>{data.data.map_uid}</p>
							<img src={data.data.base_img} alt='base map' />
							<img src={data.data.callout_img} alt='callout map' />
							<img src={data.data.thumbnail} alt='callout map' />
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default CreateMap;
