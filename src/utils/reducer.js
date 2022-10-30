export const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_COORDS': {
			return { ...state, coords: action.coords, mapClicked: true };
		}
		default: {
			throw Error('incorrect action type specified');
		}
	}
};
