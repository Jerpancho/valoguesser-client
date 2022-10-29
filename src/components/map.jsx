import React, { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import leaflet from 'leaflet';
import { setMapResize } from '../utils/sizeObserver';
import MapEvents from './mapEvents';

function Map() {
	// bounds is the bottom left to top right points of the map container
	const mapRef = useRef();
	const bounds = [
		[0, 0],
		[500, 500],
	];
	console.log('render');
	return (
		<MapContainer
			id='map-container'
			ref={mapRef}
			maxBounds={bounds}
			bounds={bounds}
			center={[250, 250]}
			crs={leaflet.CRS.Simple}
			zoomControl={false}
			whenReady={() => setMapResize(mapRef)}
		>
			<ImageOverlay
				url='https://res.cloudinary.com/dna7c2j1e/image/upload/v1666997700/maps/ofti7d61rniagjsmbehc.png'
				bounds={bounds}
			/>

			<MapEvents num={10} />
		</MapContainer>
	);
}

export default Map;
