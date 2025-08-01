// создание пользователя
import { getCurrentDate } from './get-current-date';

// добавить нового пользователя в базу данных
// для записи данных в базу - вызвать метот fetch с методом POST, чтобы сделать запись , а не чтение
export const addUser = (email, password, userName) =>
	fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			password,
			userName,
			createdAt: getCurrentDate(),
		}),
	}).then((createdUser) => createdUser.json());
