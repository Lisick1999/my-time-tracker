import { setTimerData } from '../api';

export const saveTimerData = async (userSession, currentProjectId, comment, totalSeconds, userId) => {
	if (!userSession) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await setTimerData(currentProjectId, comment, totalSeconds, userId);

	return {
		error: null,
	};
};
