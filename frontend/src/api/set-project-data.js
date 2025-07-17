import { getCurrentDate } from './get-current-date';

export const setProjectData = (userId, projectId, name, description, tag) =>
	fetch(process.env.REACT_APP_API_URL + `/projects/${projectId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			userId,
			name,
			description,
			tag,
			updated_at: getCurrentDate(),
		}),
	});
