import React from 'react';
import useLogout from '../utils/useLogout';
import { useNavigate, useLocation } from 'react-router-dom';
function logout() {
	const logout = useLogout();
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await logout();
		console.log(location);
		navigate('/login', { state: { from: location }, replace: true });
	};
	return (
		<button
			onClick={() => {
				handleLogout();
			}}
		>
			logout
		</button>
	);
}

export default logout;
