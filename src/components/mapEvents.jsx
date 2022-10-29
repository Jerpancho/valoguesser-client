import { useMapEvents } from 'react-leaflet';

function MapEvents() {
	useMapEvents({
		click: (e) => {
			console.log(e.latlng);
		},
	});
	return null;
}

export default MapEvents;
