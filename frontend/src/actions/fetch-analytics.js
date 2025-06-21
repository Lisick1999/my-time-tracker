import { getProjectsReq, getTimers } from '../api';

export const fetchAnalytics = async (userId) => {
	const { projects } = await getProjectsReq(userId);
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
