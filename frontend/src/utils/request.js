export function request(path, method, data) {
	return fetch(process.env.REACT_APP_API_URL + path, {
		headers: {
			'Content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		credentials: 'include',
	}).then((res) => res.json());
}
