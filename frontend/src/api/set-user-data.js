export const setUserData = (userId, email, password, userName) =>
	fetch(process.env.REACT_APP_API_URL + `users/${userId}`, {
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
