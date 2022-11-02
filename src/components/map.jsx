import React, { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import leaflet from 'leaflet';
import { setMapResize } from '../utils/sizeObserver';
import MapEvents from './mapEvents';
import PropTypes from 'prop-types';
// pass in a setter for the coords or dispatch that will send the coordinates back
function Map({ dispatch, mapData }) {
	// bounds is the bottom left to top right points of the map container
	const mapRef = useRef();
	const bounds = [
		[0, 0],
		[500, 500],
	];
	return (
		<MapContainer
			id='map-container'
			ref={(ref) => (mapRef.current = ref)}
			maxBounds={bounds}
			bounds={bounds}
			center={[250, 250]}
			crs={leaflet.CRS.Simple}
			zoomControl={false}
			whenReady={() => setMapResize(mapRef)}
		>
			<ImageOverlay url={mapData.base_img} bounds={bounds} />

			{/* use component to manipulate map state */}
			<MapEvents dispatch={dispatch} />
		</MapContainer>
	);
}

Map.propTypes = {
	dispatch: PropTypes.func,
	mapData: PropTypes.object,
};

export default Map;
