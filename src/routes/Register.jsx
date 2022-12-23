import React, { useState } from 'react';

const userRegex = /^[a-z0-9]+$/;
const passwordLength = /(?=.{8,})/;
const passwordUpper = /(?=.*[A-Z])/;
const passwordLower = /(?=.*[a-z])/;
const specialCharacters = /(?=.*[!#$%&? "])/;
function Register() {
	const [errors, setErrors] = useState([]);
	const [serverError, setServerErrors] = useState([]);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [matchPassword, setMatchPassword] = useState('');

	// handle user validation here
	const handleSubmit = (e) => {
		e.preventDefault();
		// reset errors
		setErrors(() => []);
		const userLowerCase = user.toLowerCase();
		if (!userRegex.test(userLowerCase) || user.length <= 3)
			setErrors((prev) => [
				...prev,
				'username must be alphanumeric and longer than 3 characters',
			]);
		if (!passwordLength.test(password))
			setErrors((prev) => [
				...prev,
				'password must at least be 8 characters long',
			]);
		if (!passwordLower.test(password) || !passwordUpper.test(password))
			setErrors((prev) => [
				...prev,
				'password must at least have 1 upper and 1 lower case character',
			]);
		if (!specialCharacters.test(password))
			setErrors((prev) => [
				...prev,
				'password must have at least one special character e.g. !&$',
			]);
		if (matchPassword !== password)
			setErrors((prev) => [...prev, 'both passwords must be matching']);
		if (errors.length > 0) return null;

		/* if it got passed this point, 
			then account should be valid and can be registered with the server
		*/
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
