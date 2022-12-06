export const calculateScore = (x1, y1, x2, y2) => {
	let distance = findDistance(x1, y1, x2, y2);
	if (distance < 10) return { score: 5000, distance: Math.floor(distance) };
	if (distance > 450) return { score: 0, distance: Math.floor(distance) };
	return { score: Math.floor(5000 * Math.pow(0.9946, distance)), distance: Math.floor(distance) };
};

function findDistance(x1, y1, x2, y2) {
	const x = Math.pow(Math.abs(x2 - x1), 2);
	const y = Math.pow(Math.abs(y2 - y1), 2);
	let d = Math.sqrt(x + y);
	return d;
}
