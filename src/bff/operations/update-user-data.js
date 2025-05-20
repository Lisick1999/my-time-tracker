import { setUserData } from '../api';

export const updateUserData = async (session, userId, email, password, userName) => {
	if (!session) {
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
