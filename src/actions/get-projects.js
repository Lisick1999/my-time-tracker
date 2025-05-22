import { ACTION_TYPE } from './action-type';

export const getProjects = (projects) => ({
	type: ACTION_TYPE.GET_PROJECTS,
	payload: [...projects.res] ?? [],
});
