// массив базы данных db.json
export const getUsers = () =>
	fetch('hhtp://localhost:3005/users').then((loadedUsers) => loadedUsers.json());
