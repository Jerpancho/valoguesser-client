import React, { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay, Marker, LayerGroup, Polyline, Popup } from 'react-leaflet';
import leaflet from 'leaflet';
import { setMapResize } from '../utils/sizeObserver';
import MapEvents from './mapEvents';
import PropTypes from 'prop-types';
// pass in a setter for the coords or dispatch that will send the coordinates back
function Map({ dispatch, mapData, gameState, rounds, width = 400, height = 400 }) {
	// bounds is the bottom left to top right points of the map container
	const mapRef = useRef();
	const bounds = [
		[0, 0],
		[500, 500],
	];
	const maxBounds = [
		[-175, -175],
		[675, 675],
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
			style={{ width: `${width}px`, height: `${height}px` }}
			maxBounds={maxBounds}
			bounds={bounds}
			center={[250, 250]}
			crs={leaflet.CRS.Simple}
			zoomControl={false}
			whenReady={() => setMapResize(mapRef)}
		>
			<ImageOverlay url={mapData.base_img} bounds={bounds} />
			{gameState.gameOver ? (
				<>
					{rounds.map((val) => {
						return (
							<LayerGroup key={val.item_uid}>
								<Marker icon={answerIcon} position={[val.y_coord, val.x_coord]}>
									<Popup autoPan={true}>
										<img src={val.expanded_img} alt='result' width={200} />
									</Popup>
								</Marker>
								{/* if timed out, should only display the answer icon */}
								{!val.timedOut && (
									<>
										<Marker
											icon={guessIcon}
											position={[val.yChosen, val.xChosen]}
											interactive={false}
										/>
										<Polyline
											pathOptions={{ color: '#3ED3A8', weight: 4, dashArray: '10' }}
											positions={[
												[val.yChosen, val.xChosen],
												[val.y_coord, val.x_coord],
											]}
										/>
									</>
								)}
							</LayerGroup>
						);
					})}
				</>
			) : (
				<LayerGroup>
					{/* if timed out, should not display map clicked marker and line marker */}
					{gameState.mapClicked && !gameState.timeout && (
						<Marker
							icon={guessIcon}
							position={[Math.floor(gameState.coords.lat), Math.floor(gameState.coords.lng)]}
						/>
					)}
					{gameState.roundConfirmed && (
						// can convert to component
						<LayerGroup>
							<Marker
								icon={answerIcon}
								position={[
									rounds[gameState.roundNumber].y_coord,
									rounds[gameState.roundNumber].x_coord,
								]}
							>
								<Popup>
									<img
										src={rounds[gameState.roundNumber].expanded_img}
										alt='result'
										width={200}
									/>
								</Popup>
							</Marker>
							{!gameState.timeout && (
								<Polyline
									pathOptions={{ color: '#3ED3A8', weight: 4, dashArray: '10' }}
									positions={[
										[gameState.coords.lat, gameState.coords.lng],
										[
											rounds[gameState.roundNumber].y_coord,
											rounds[gameState.roundNumber].x_coord,
										],
									]}
								/>
							)}
						</LayerGroup>
					)}
					{/* use component to manipulate map state */}
					<MapEvents dispatch={dispatch} gameState={gameState} />
				</LayerGroup>
			)}
		</MapContainer>
	);
}

Map.propTypes = {
	dispatch: PropTypes.func,
	mapData: PropTypes.object,
	gameState: PropTypes.object,
	rounds: PropTypes.array.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default Map;
