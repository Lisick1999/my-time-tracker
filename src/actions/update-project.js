import { ACTION_TYPE } from './action-type';

export const updateProject = (project) => ({
	type: ACTION_TYPE.UPDATE_PROJECT,
	payload: project,
});
