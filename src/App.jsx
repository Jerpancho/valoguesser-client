import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './routes/Game';
import Home from './routes/Home';
import CreateMap from './routes/CreateMapForm';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='map/create' element={<CreateMap />} />
				{/* for testing only */}
				<Route path='/game' element={<Game />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
