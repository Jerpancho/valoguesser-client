import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
function Register() {
	const [errors, setErrors] = useState([]);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [matchPassword, setMatchPassword] = useState('');
	const navigate = useNavigate();

	const mutate = useMutation(
		(user) => {
			return fetch('https://valoguesser-server.up.railway.app/register', {
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
						state: { registration: data?.message },
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
		<section>
			<ul>
				{errors.length > 0
					? errors.map((val, i) => <li key={i}>{val}</li>)
					: null}
			</ul>

			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>username:</label>
				<input
					type='text'
					name='username'
					id='username'
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<label htmlFor='password'>password:</label>
				<input
					type='text'
					name='password'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor='matchPassword'>type password again:</label>
				<input
					type='text'
					name='matchPassword'
					id='matchPassword'
					value={matchPassword}
					onChange={(e) => setMatchPassword(e.target.value)}
				/>
				<button type='submit'>login</button>
			</form>
		</section>
	);
}

export default Register;
