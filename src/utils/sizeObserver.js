export const setMapResize = (mapRef) => {
	// will invalidate the dom element referencing the map and resize to fit the image
	const resizeObserver = new ResizeObserver(() => {
		mapRef.current?.invalidateSize();
	});
	const container = document.getElementById('map-container');
	if (container) {
		resizeObserver.observe(container);
	}
};
