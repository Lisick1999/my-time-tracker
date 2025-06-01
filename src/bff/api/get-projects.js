export const getProjects = async (userId, page, limit) =>
	fetch(`http://localhost:3005/projects?userId=${userId}&_page=${page}&_limit=${limit}`)
		.then((loadedProjects) => Promise.all([loadedProjects.json(), loadedProjects.headers.get('Link')]))
		.then(([loadedProjects, links]) => ({
			projects: loadedProjects,
			links,
		}));
