import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Game from './routes/Game';
import Home from './routes/Home';
import CreateMap from './routes/CreateMap';
import CreateRound from './routes/CreateRound';
import Error from './routes/Error';
import ProtectedRoute from './components/requiresAuth';
// import Test from './routes/Test';
import './css/App.css';

const ROLES = {
	User: 0,
	Admin: 1000,
	verifiedUser: 1001,
};

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/map/:id' element={<Game />} />
					{/* create login and register routes */}

					{/* these routes should be protected */}
					<Route
						element={
							<ProtectedRoute
								acceptedRoles={[ROLES.Admin, ROLES.verifiedUser]}
							/>
						}
					>
						<Route path='create/map' element={<CreateMap />} />
						<Route path='create/round' element={<CreateRound />} />
					</Route>
					<Route path='*' element={<Error />} />
					{/* for testing only */}
					{/* <Route path='test' element={<Test />} /> */}
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
