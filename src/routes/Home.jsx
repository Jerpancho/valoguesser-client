import React, { useState } from 'react';
import Map from '../components/map';
import '../App.css';

function App() {
	const [coords, setCoords] = useState({ lat: 0, lng: 0 });
	return (
		<div className='App'>
			<Map setCoords={setCoords} />
			<p>
				chosen coords:
				<span>
					{coords.lat},{coords.lng}
				</span>
			</p>
		</div>
	);
}

export default App;
