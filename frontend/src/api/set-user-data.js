export const setUserData = (userId, email, password, userName) =>
	fetch(`http://localhost:3001/api/users/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			password,
			userName,
		}),
	});
