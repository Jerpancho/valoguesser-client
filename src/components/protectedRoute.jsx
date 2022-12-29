import React from 'react';
import PropTypes from 'prop-types';
import useAuth from '../utils/useAuth';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ acceptedRoles }) {
	const { auth } = useAuth();
	// console.log(auth);
	const location = useLocation();

	if (acceptedRoles.includes(auth?.role)) {
		return <Outlet />;
	}
	// not authenthicated
	if (auth?.user)
		return (
			<Navigate to='unauthenthicated' state={{ from: location }} replace />
		);
	// not authorized
	return <Navigate to='/login' state={{ from: location }} replace />;
}

ProtectedRoute.propTypes = {
	acceptedRoles: PropTypes.array.isRequired,
};
export default ProtectedRoute;
