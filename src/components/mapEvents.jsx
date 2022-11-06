import { useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';
function MapEvents({ dispatch, gameState }) {
	useMapEvents({
		click: (e) => {
			if (gameState.roundConfirmed === false) {
				console.log(e.latlng);
				dispatch({ type: 'UPDATE_COORDS', coords: e.latlng });
			}
		},

		// mouseover or mousemove for changing size of the map
	});
	return null;
}
MapEvents.propTypes = {
	dispatch: PropTypes.func.isRequired,
	gameState: PropTypes.object.isRequired,
};

export default MapEvents;
