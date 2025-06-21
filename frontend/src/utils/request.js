export function request(path, method, data) {
	console.log({ data });
	return fetch('http://localhost:3001/api' + path, {
		headers: {
			'Content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}
