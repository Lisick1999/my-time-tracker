export const deleteProject = (projectId) =>
	fetch(process.env.REACT_APP_API_URL + `/projects/${projectId}`, {
		method: 'DELETE',
	});
