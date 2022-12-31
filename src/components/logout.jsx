import React from 'react';
import useLogout from '../utils/useLogout';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../css/Button.module.css';
function logout() {
	const logout = useLogout();
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await logout();
		// console.log(location);
		navigate('/', { state: { from: location }, replace: true });
	};
	return (
		<button
			className={styles.button}
			onClick={() => {
				handleLogout();
			}}
		>
			logout
		</button>
	);
}

export default logout;
