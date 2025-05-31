import { deleteProject } from '../api';

export const removeProject = async (userSession, projectId) => {
	if (!userSession) {
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
