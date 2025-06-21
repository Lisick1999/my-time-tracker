import { ACTION_TYPE } from '../actions';

const initialState = [];

export const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_PROJECT:
			return [...state, action.payload];
		case ACTION_TYPE.UPDATE_PROJECT:
			return state?.map((p) => (p.id === action.payload.id ? action.payload : p));
		case ACTION_TYPE.GET_PROJECTS:
			return action.payload;
		default:
			return state;
	}
};
