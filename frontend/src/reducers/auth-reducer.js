import { ACTION_TYPE } from '../actions';

const initialAuthState = {
	isAuthenticated: false,
	user: null,
	prevWasLogout: false,
};

export const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				prevWasLogout: false,
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null,
				prevWasLogout: true,
			};
		case 'UPDATE_USER':
			return {
				...state,
				user: { ...action.payload },
			};
		default:
			return state;
	}
};
