import { ACTION_TYPE } from './action-type';

export const startTimer = () => ({
	type: ACTION_TYPE.START,
});

export const pauseTimer = () => ({
	type: ACTION_TYPE.PAUSE,
});

export const resumeTimer = () => ({
	type: ACTION_TYPE.RESUME,
});

export const resetTimer = () => ({
	type: ACTION_TYPE.RESET,
});

export const tickTimer = () => ({
	type: ACTION_TYPE.TICK,
});

export const setProjectTimer = (currentProjectId) => ({
	type: ACTION_TYPE.SET_PROJECT_TIMER,
	payload: currentProjectId,
});
