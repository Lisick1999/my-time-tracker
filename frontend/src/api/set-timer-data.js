import { getCurrentDate } from './get-current-date';

export const setTimerData = (currentProjectId, comment, totalSeconds, userId) =>
	fetch(`http://localhost:3001/api/timeEntries`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			userId,
			projectId: currentProjectId,
			duration: totalSeconds,
			comment,
			created_at: getCurrentDate(),
		}),
	});
