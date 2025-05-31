import { setUserData } from '../api';

export const updateUserData = async (userSession, userId, email, password, userName) => {
	if (!userSession) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	setUserData(userId, email, password, userName);

	return {
		error: null,
		res: true,
	};
};
