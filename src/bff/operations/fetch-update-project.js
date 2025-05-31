import { setProjectData } from '../api';

export const fetchUpdateProject = async (userSession, userId, projectId, name, description, tag) => {
	if (!userSession) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const project = await setProjectData(userId, projectId, name, description, tag);

	return {
		error: null,
		res: project,
	};
};
