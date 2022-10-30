// should pass in the setter function ( either a use state or dispatch from reducer)
export const handleCoords = (e, setter) => {
	if (setter) {
		setter(e.latlng);
	}
};
