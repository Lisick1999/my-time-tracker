import { request } from '../utils/request';

export const getTimers = (userId) => {
	if (!userId) {
		return Promise.reject(new Error('userId обязателен'));
	}

	return request(`/timeEntries?userId=${userId}`, 'GET')
		.then((result) => {
			return result;
		})
		.catch((err) => {
			throw err;
		});
};
