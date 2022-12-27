import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Game from './routes/Game';
import Home from './routes/Home';
import CreateMap from './routes/CreateMap';
import CreateRound from './routes/CreateRound';
import Error from './routes/Error';
import Unauthenthicated from './routes/Unauthenthicated';
import Login from './routes/Login';
import Register from './routes/Register';
import ProtectedRoute from './components/protectedRoute';
import PersistentLogin from './routes/persistentLogin';
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
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/map/:id' element={<Game />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				{/* create login and register routes */}
				{/* these routes should be protected if you aren't an admin or verified user*/}
				<Route element={<PersistentLogin />}>
					{/* if you already have a refresh token then you shouldnt have access to register and login routes */}

					<Route
						element={<ProtectedRoute acceptedRoles={[ROLES.Admin]} />}
					>
						<Route path='create/map' element={<CreateMap />} />
						<Route path='create/round' element={<CreateRound />} />
					</Route>
				</Route>
				<Route path='unauthenthicated' element={<Unauthenthicated />} />
				<Route path='*' element={<Error />} />
				{/* for testing only */}
				{/* <Route path='test' element={<Test />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
