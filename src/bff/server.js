import { getUser } from './get-user';
import { addUser } from './add-user';
import { createSession } from './create-session';

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
		if (authPassword) {
			return {
				error: 'Неверный пароль',
				// никаких данных не отправлять
				res: null,
			};
		}

		// если ни одно из условий не сработало (пользователь нашелся по логину и пароль совпал), то вернуть объект с раширенными возможностями

		return {
			error: null,
			res: createSession(),
		};
	},

	// РУЧКА ДЛЯ РЕГИСТРАЦИИ

	// для регистрации пользователь присылает логин и пароль
	async register(regLogin, regPassword, nameUser) {
		// поиск пользователя по логину
		const user = await getUser(regLogin);

		// если пользователь найден, то вернуть ошибку и не продолжать регистрацию
		if (user) {
			return {
				error: 'Такой логин уже занят',
				// никаких данных не отправлять
				res: null,
			};
		}

		// если пользователь не найден, то логин свободен , пароль можно не проверять

		// добавить нового пользователя в базу данных, передаем логин (regLogin), пароль (regPassword) и имя пользователя (nameUser)
		await addUser(regLogin, regPassword, nameUser);

		// вернуть сообщение, что ошибки нет, ответ (res) - информация о том, что пользователь зарегистрировался (отправить сессию), если пользователь зарегистрировался, его можно сразу авторизовать
		return {
			error: null,
			res: createSession(),
		};
	},
};
