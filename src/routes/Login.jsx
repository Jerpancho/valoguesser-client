import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../utils/useAuth';
function Login() {
	const { setAuth } = useAuth();
	const userRef = useRef('vlgAdmin406');
	const passRef = useRef('KjJtFdSg123');
	const [error, setError] = useState('');
	const location = useLocation();
	const navigate = useNavigate();

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
			<div className='login'></div>
			<div>{error}</div>
			<form onSubmit={handleLogin}>
				<label htmlFor='username'>username: </label>
				<input type='text' id='username' name='username' ref={userRef} />
				<label htmlFor='password'>password: </label>
				<input type='text' id='password' name='password' ref={passRef} />
				<button>login</button>
			</form>
		</div>
	);
}

export default Login;
