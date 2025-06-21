import { getCurrentDate } from './get-current-date';

export const createProject = (userId, name, description, tag) =>
	fetch('http://localhost:3001/api/projects', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			userId,
			name,
			description,
			tag,
			created_at: getCurrentDate(),
		}),
	}).then((createdProject) => createdProject.json());
