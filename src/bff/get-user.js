// поиск пользователя с конкретным логином
import { getUsers } from './get-users';

// ищем пользователя по полученному логину loginToFind
// используем async await, потому что выполняется несколько операций. Поле получения пользователей нужно вернуть одного пользователя

export const getUser = async (loginToFind) => {
	// получаем пользователей
	const users = await getUsers();

	return users.find(({ login }) => login === loginToFind);
};
