import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './routes/Game';
import Home from './routes/Home';
import CreateMap from './routes/CreateMapForm';
import CreateRound from './routes/CreateRoundForm';
import Error from './routes/Error';
import './css/App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				{/* instead, maybe create two routes to be a child of '/' which will be either mapSelect or the game.
						this way, we can grab the map data in the parent element and pass in the data to either child
						via outlet context and useOutletContext
				*/}
				<Route path='/map/:id' element={<Game />} />
				<Route path='map/create' element={<CreateMap />} />
				<Route path='round/create' element={<CreateRound />} />
				<Route path='*' element={<Error />} />
				{/* for testing only */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
