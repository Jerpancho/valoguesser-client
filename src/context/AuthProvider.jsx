import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

function AuthProvider({ children }) {
	const [auth, setAuth] = useState({});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.element,
};

export default AuthProvider;
