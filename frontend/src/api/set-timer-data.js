import { request } from '../utils/request';

export const setTimerData = (projectId, comment, duration, userId) => {
	if (!userId || !projectId || !duration) {
		return Promise.reject(new Error('userId, projectId, and duration are required'));
	}

	const data = {
		userId,
		projectId: projectId.toString(),
		comment,
		duration: duration,
	};

	return request('/timeEntries', 'POST', data)
		.then((response) => {
			if (response.error) {
				return Promise.reject(new Error(response.error));
			}

			return response.data || {};
		})
		.catch((err) => {
			return Promise.reject(new Error(err.message));
		});
};
