import { getProjects, getTimers } from '../api';

export const fetchAnalytics = async (userSession, userId) => {
	if (!userSession) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const projects = await getProjects(userId);
	const timers = await getTimers(userId);

	const projectsWithTimers = projects.map((project) => ({
		...project,
		timers: timers.filter((timer) => timer.projectId === project.id),
	}));

	return {
		error: null,
		res: projectsWithTimers,
	};
};
