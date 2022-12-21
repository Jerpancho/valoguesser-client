import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
	const [auth, setAuth] = useState({});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
