import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword, userName) => {
	const userExists = await getUser(regLogin);

	if (userExists) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		};
	}

	const user = await addUser(regLogin, regPassword, userName);

	return {
		error: null,
		res: {
			id: user.id,
			email: user.email,
			userName: user.userName,
			password: user.password,
			session: sessions.create(user),
		},
	};
};
