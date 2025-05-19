import { getUsers } from '../get-users';
import { sessions } from '../sessions';

export const fetchUsers = async (userSession) => {
	if (!sessions.access(userSession)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
