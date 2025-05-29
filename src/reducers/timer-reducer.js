import { ACTION_TYPE } from '../actions';

const initialState = {
	totalSeconds: 0,
	isRunning: false,
	isPaused: false,
	currentProjectId: null,
};

export const timerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.START:
			return {
				...state,
				totalSeconds: 0,
				isRunning: true,
				isPaused: false,
			};
		case ACTION_TYPE.PAUSE:
			return { ...state, isPaused: true, isRunning: false };
		case ACTION_TYPE.RESUME:
			return { ...state, isPaused: false, isRunning: true };
		case ACTION_TYPE.RESET:
			return { ...state, totalSeconds: 0, isRunning: false, isPaused: false, currentProjectId: null };
		case ACTION_TYPE.TICK:
			if (state.isRunning) {
				return { ...state, totalSeconds: state.totalSeconds + 1 };
			}
			return state;
		case ACTION_TYPE.SET_PROJECT_TIMER:
			return { ...state, currentProjectId: action.payload };
		default:
			return state;
	}
};
