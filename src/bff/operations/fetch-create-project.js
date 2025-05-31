import { createProject } from '../api';

export const fetchCreateProject = async (userSession, userId, name, description, tag) => {
	if (!userSession) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const project = await createProject(userId, name, description, tag);

	return {
		error: null,
		res: project,
	};
};
