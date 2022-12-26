import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useRefresh from '../utils/useRefreshToken';
import useAuth from '../utils/useAuth';

function PersistentLogin() {
	const [isLoading, setLoading] = useState(true);
	const refresh = useRefresh();
	const { auth } = useAuth;
	useEffect(() => {
		const verifyUser = async () => {
			try {
				await refresh();
			} catch (error) {
				// console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (!auth?.accessToken) {
			verifyUser();
		} else {
			setLoading(false);
		}
	}, []);

	return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
}

export default PersistentLogin;
