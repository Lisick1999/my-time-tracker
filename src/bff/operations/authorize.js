import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			res: null,
		};
	}

	if (user.password !== authPassword) {
		return {
			error: 'Неверный пароль',
			res: null,
		};
	}

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
