import { useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';
function MapEvents({ dispatch }) {
	useMapEvents({
		click: (e) => {
			console.log(e.latlng);
			dispatch({ type: 'UPDATE_COORDS', coords: e.latlng });
		},
		// mouseover or mousemove for changing size of the map
	});
	return null;
}
MapEvents.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

export default MapEvents;
