export function request(path, method, data) {
	return fetch('http://localhost:3001/api' + path, {
		headers: {
			'Content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		credentials: 'include',
	}).then((res) => res.json());
}
