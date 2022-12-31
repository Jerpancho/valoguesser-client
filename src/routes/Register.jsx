import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from '../css/Register.module.css';
function Register() {
	const [errors, setErrors] = useState([]);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [matchPassword, setMatchPassword] = useState('');
	const navigate = useNavigate();

	const mutate = useMutation(
		(user) => {
			return fetch('https://valoguesser.netlify.app/register', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: user.username,
					password: user.password,
				}),
			}).then((res) => res.json());
		},
		{
			onSettled: (data) => {
				if (data?.errors) {
					return setErrors(data.errors);
				}
				if (data?.user) {
					navigate('/login', {
						state: { status: data?.message },
					});
				}
			},
		}
	);
	// handle user validation here
	const handleSubmit = (e) => {
		e.preventDefault();
		// reset errors
		setErrors(() => []);
		const userLowerCase = user?.toLowerCase();
		if (!user || !password)
			return setErrors((prev) => [...prev, 'missing username or password']);
		if (password !== matchPassword)
			return setErrors((prev) => [...prev, 'passwords must be matching']);
		/* if it got passed this point, 
			then account should be valid and can be registered with the server
		*/
		mutate.mutate({ username: userLowerCase, password });
	};
	return (
		<section className={styles.register}>
			<h1 className={styles.header}>Register</h1>
			<div className={styles.errors}>
				{errors.length > 0
					? errors.map((val, i) => <div key={i}>{val}</div>)
					: null}
			</div>
			<div className={styles.container}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						id='username'
						value={user}
						onChange={(e) => setUser(e.target.value)}
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='text'
						name='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor='matchPassword'>Type password again</label>
					<input
						type='text'
						name='matchPassword'
						id='matchPassword'
						value={matchPassword}
						onChange={(e) => setMatchPassword(e.target.value)}
					/>
					<button type='submit'>register</button>
				</form>
				<Link className={styles.login} to='/login'>
					already have an account? login here.
				</Link>
			</div>
		</section>
	);
}

export default Register;
