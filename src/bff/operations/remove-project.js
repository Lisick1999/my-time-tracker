import { deleteProject } from '../api';
import { sessions } from '../sessions';

export const removeProject = async (userSession, projectId) => {
	if (!sessions.access(userSession)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteProject(projectId);

	return {
		error: null,
		res: true,
	};
};
