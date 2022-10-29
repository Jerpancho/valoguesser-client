export const setMapResize = (mapRef) => {
	const resizeObserver = new ResizeObserver(() => mapRef.current?.invalidateSize());
	const container = document.getElementById('map-container');
	if (container) {
		resizeObserver.observe(container);
	}
};
