export const deleteProject = (projectId) =>
	fetch(`http://localhost:3005/projects/${projectId}`, {
		method: 'DELETE',
	});
