import React, { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import leaflet from 'leaflet';
import { setMapResize } from '../utils/sizeObserver';
import MapEvents from './mapEvents';
import PropTypes from 'prop-types';
// pass in a setter for the coords or dispatch that will send the coordinates back
function Map({ dispatch, mapData, gameState, rounds }) {
	// bounds is the bottom left to top right points of the map container
	const mapRef = useRef();
	const bounds = [
		[0, 0],
		[500, 500],
	];
	// console.log(rounds);
	// console.log(gameState);
	const guessIcon = leaflet.icon({
		iconUrl: 'https://img.icons8.com/ios-glyphs/512/accuracy--v1.png',
		iconSize: [30, 30],
	});
	const answerIcon = leaflet.icon({
		iconUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
		iconSize: [30, 30],
	});
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
			{gameState.mapClicked && (
				<Marker
					icon={guessIcon}
					position={[Math.floor(gameState.coords.lat), Math.floor(gameState.coords.lng)]}
				/>
			)}
			{gameState.roundConfirmed && (
				<Marker
					icon={answerIcon}
					position={[
						rounds[gameState.roundNumber].y_coord,
						rounds[gameState.roundNumber].x_coord,
					]}
				/>
			)}

			{/* use component to manipulate map state */}
			<MapEvents dispatch={dispatch} gameState={gameState} />
		</MapContainer>
	);
}

Map.propTypes = {
	dispatch: PropTypes.func,
	mapData: PropTypes.object,
	gameState: PropTypes.object,
	rounds: PropTypes.array,
};

export default Map;
