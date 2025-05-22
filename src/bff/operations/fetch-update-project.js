import { setProjectData } from '../api';
import { sessions } from '../sessions';

export const fetchUpdateProject = async (userSession, userId, projectId, name, description, tag) => {
	if (!sessions.access(userSession)) {
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
