import { getProjects } from '../api';

export const fetchProjects = async (userSession, userId, page, limit) => {
	if (!userSession) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const projects = await getProjects(userId, page, limit);

	return {
		error: null,
		res: projects.projects,
		links: projects.links,
	};
};
