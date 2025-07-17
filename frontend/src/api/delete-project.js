export const deleteProject = (projectId) =>
	fetch(process.env.REACT_API_URL + `/projects/${projectId}`, {
		method: 'DELETE',
	});
