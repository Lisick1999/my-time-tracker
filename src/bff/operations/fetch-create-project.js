import { createProject } from '../api';
import { sessions } from '../sessions';

export const fetchCreateProject = async (userSession, userId, name, description, tag) => {
	if (!sessions.access(userSession)) {
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
