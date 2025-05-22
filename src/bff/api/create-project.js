// создание проекта
import { getCurrentDate } from '../get-current-date';

// для записи данных в базу - вызвать метот fetch с методом POST, чтобы сделать запись , а не чтение
export const createProject = (userId, name, description, tag) =>
	fetch('http://localhost:3005/projects', {
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
