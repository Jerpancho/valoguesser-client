import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../utils/useAuth';
import styles from '../css/Login.module.css';
function Login() {
	const { auth, setAuth } = useAuth();
	const userRef = useRef();
	const passRef = useRef();
	const [error, setError] = useState('');
	const location = useLocation();
	const navigate = useNavigate();

	//redirect if tried to route back to login
	useEffect(() => {
		// console.log(auth);
		if (auth?.accessToken) navigate('/');
	}, []);

	const mutation = useMutation(
		(data) => {
			// console.log(JSON.stringify(data));
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
				// console.log(data);
				// console.log(location);
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
		<section>
			<h1 className={styles.header}>Login</h1>
			<div className={styles.message}>
				<h3 className={styles.notice}>
					Notice:
					<span className={styles.message}>
						We are allowing account creation but uploading rounds are
						currently for admins only. Verifying users to allow round
						uploads is currently in development.
					</span>
				</h3>
			</div>
			<div className={styles.body}>
				{location?.state?.status && <div>{location?.state?.status}</div>}
				<div className={styles.error}>{error}</div>
				<form onSubmit={handleLogin} className={styles.login}>
					<label htmlFor='username'>Username</label>
					<input type='text' id='username' name='username' ref={userRef} />
					<label htmlFor='password'>Password</label>
					<input type='text' id='password' name='password' ref={passRef} />
					<button>login</button>
				</form>
				<Link
					to='/register'
					className={styles.register}
				>{`don't have an account? register here.`}</Link>
			</div>
		</section>
	);
}

export default Login;
