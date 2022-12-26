import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../utils/useAuth';
function Login() {
	const { auth, setAuth } = useAuth();
	const userRef = useRef();
	const passRef = useRef();
	const [error, setError] = useState('');
	const location = useLocation();
	console.log(location);
	const navigate = useNavigate();

	//LOG OUT if tried to route back to login
	useEffect(() => {
		console.log(auth);
		if (auth?.accessToken) navigate('/');
	}, []);

	const mutation = useMutation(
		(data) => {
			console.log(JSON.stringify(data));
			return fetch('http://localhost:4444/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then((res) => res.json());
		},
		{
			onSuccess: (data) => {
				console.log(data);
				console.log(location);
				setAuth(data);
				navigate(location?.state?.from || '/');
			},
			onError: () => {
				setError('Incorrect Username or Password');
			},
		}
	);

	const handleLogin = (e) => {
		e.preventDefault();
		if (!userRef.current.value || !passRef.current.value) {
			return setError('Missing Username or Password');
		}
		mutation.mutate({
			username: userRef.current?.value,
			password: passRef.current?.value,
		});
		return null;
	};
	return (
		<div>
			<h1>Login</h1>
			<div className='login'>
				{location?.state?.registration && (
					<div>{location?.state?.registration}</div>
				)}
				<div>{error}</div>
				<form onSubmit={handleLogin}>
					<label htmlFor='username'>username: </label>
					<input type='text' id='username' name='username' ref={userRef} />
					<label htmlFor='password'>password: </label>
					<input type='text' id='password' name='password' ref={passRef} />
					<button>login</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
