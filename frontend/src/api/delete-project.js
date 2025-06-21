export const deleteProject = (projectId) =>
	fetch(`http://localhost:3001/api/projects/${projectId}`, {
		method: 'DELETE',
	});
