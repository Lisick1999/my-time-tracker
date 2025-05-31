import { getProjects } from '../api';

export const fetchProjects = async (userSession, userId) => {
	if (!userSession) {
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
