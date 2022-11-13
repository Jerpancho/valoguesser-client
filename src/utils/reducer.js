export const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_COORDS': {
			return { ...state, coords: action.coords, mapClicked: true };
		}
		case 'TIMEDOUT': {
			return { ...state, mapClicked: true, timeout: true, roundConfirmed: true };
		}
		case 'CONFIRM_ROUND': {
			console.log('round confirmed');
			return { ...state, roundConfirmed: true };
		}
		case 'NEXT_ROUND': {
			// refactor this
			if (state.roundNumber < 4) {
				return {
					...state,
					roundNumber: state.roundNumber + 1,
					mapClicked: false,
					roundConfirmed: false,
					timeout: false,
				};
			}
			return {
				...state,
				mapClicked: false,
				roundConfirmed: false,
				gameOver: true,
				timeout: false,
			};
		}
		default: {
			throw Error('incorrect action type specified');
		}
	}
};
