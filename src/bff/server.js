import { getUser } from './get-user';
import { addUser } from './add-user';
// import { createSession } from './create-session';
import { sessions } from './sessions';
import {
	fetchUsers,
	updateUserData,
	fetchProjects,
	removeProject,
	fetchCreateProject,
	fetchUpdateProject,
	saveTimerData,
} from './operations';

export const server = {
	// РУЧКА ДЛЯ АВТОРИЗАЦИИ
	async authorize(authLogin, authPassword) {
		// получаем пользователя по логину
		const user = await getUser(authLogin);

		// если пользователя не нашли, то вернуть ошибку
		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				// никаких данных не отправлять
				res: null,
			};
		}

		// проверить, что полученный пароль совпадает с паролем найденного пользователя
		if (user.password !== authPassword) {
			return {
				error: 'Неверный пароль',
				// никаких данных не отправлять
				res: null,
			};
		}

		// если ни одно из условий не сработало (пользователь нашелся по логину и пароль совпал), то вернуть объект с раширенными возможностями

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
	},

	// РУЧКА ДЛЯ РЕГИСТРАЦИИ

	// для регистрации пользователь присылает логин и пароль
	async register(regLogin, regPassword, userName) {
		// поиск пользователя по логину
		const userExists = await getUser(regLogin);
		// если пользователь найден, то вернуть ошибку и не продолжать регистрацию
		if (userExists) {
			return {
				error: 'Такой логин уже занят',
				// никаких данных не отправлять
				res: null,
			};
		}

		// если пользователь не найден, то логин свободен , пароль можно не проверять

		// добавить нового пользователя в базу данных, передаем логин (regLogin), пароль (regPassword) и имя пользователя (nameUser)
		const user = await addUser(regLogin, regPassword, userName);

		// вернуть сообщение, что ошибки нет, ответ (res) - информация о том, что пользователь зарегистрировался (отправить сессию), если пользователь зарегистрировался, его можно сразу авторизовать
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
	},

	async logout(userSession) {
		sessions.remove(userSession);
	},

	fetchUsers,
	updateUserData,
	fetchProjects,
	removeProject,
	fetchCreateProject,
	fetchUpdateProject,
	saveTimerData,
};
