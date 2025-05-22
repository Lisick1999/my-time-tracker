import { getProjects } from '../api';
import { sessions } from '../sessions';

export const fetchProjects = async (userSession, userId) => {
	if (!sessions.access(userSession)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const projects = await getProjects(userId);

	return {
		error: null,
		res: projects,
	};
};
