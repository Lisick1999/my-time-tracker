import { getProjectsReq, getTimers } from '../api';

export const fetchAnalytics = async (userId) => {
	try {
		const projectsResult = await getProjectsReq(userId, 1, 6);
		const timersResult = await getTimers(userId);

		if (projectsResult.error) {
			return { error: projectsResult.error, res: [] };
		}

		const projects = projectsResult.data?.projects || [];
		if (!Array.isArray(projects)) {
			return { error: 'Проекты не найдены или некорректный формат', res: [] };
		}

		const timers = timersResult.data || [];
		if (!Array.isArray(timers)) {
			return { error: 'Таймеры не найдены или некорректный формат', res: [] };
		}

		const projectsWithTimers = projects.map((project) => {
			const projectTimers = timers.filter((timer) => {
				const match = timer.projectId === project._id;

				return match;
			});
			const totalDuration = projectTimers.reduce((sum, timer) => {
				const seconds = timer.totalSeconds || timer.duration || 0;
				return sum + seconds;
			}, 0);
			return {
				...project,
				timers: projectTimers,
				totalDuration,
			};
		});

		return { error: null, res: projectsWithTimers };
	} catch (error) {
		return { error: `Ошибка запроса: ${error.message}`, res: [] };
	}
};
