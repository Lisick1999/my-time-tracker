import { request } from '../utils/request';

export const getProjectsReq = (userId, page = 1, limit = 6) => {
	if (!userId) {
		return Promise.reject(new Error('userId обязателен'));
	}

	return request(`/projects?userId=${userId}&page=${page}&limit=${limit}`, 'GET')
		.then((response) => {
			if (response.error) {
				return { error: response.error, data: { projects: [], lastPage: 1 } };
			}

			const projects = response.data ? response.data.projects : response.projects;
			const lastPage = response.data ? response.data.lastPage : response.lastPage;

			if (!projects || !Array.isArray(projects)) {
				return { error: 'Некорректный формат ответа сервера', data: { projects: [], lastPage: 1 } };
			}

			return {
				error: null,
				data: {
					projects,
					lastPage: lastPage || 1,
				},
			};
		})
		.catch((error) => {
			return { error: `Ошибка запроса: ${error.message}`, data: { projects: [], lastPage: 1 } };
		});
};
