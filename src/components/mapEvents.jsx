import { useMapEvents } from 'react-leaflet';
import { handleCoords } from '../utils/handleCoords';
import PropTypes from 'prop-types';
function MapEvents({ setCoords }) {
	useMapEvents({
		click: (e) => {
			handleCoords(e, setCoords);
		},
	});
	return null;
}
MapEvents.propTypes = {
	setCoords: PropTypes.func.isRequired,
};

export default MapEvents;
