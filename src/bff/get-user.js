// ищем пользователя по полученному логину loginToFind
// используем async await, потому что выполняется несколько операций. Поле получения пользователей нужно вернуть одного пользователя

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3005/users?email=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser);
