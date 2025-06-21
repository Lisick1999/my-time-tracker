import { request } from '../utils/request';

// export const getProjectsReq = (userId, page, limit) =>
// 	request(`/posts?search=${userId}&page=${page}&limit=${limit}`)
// 		.then((loadedProjects) => Promise.all([loadedProjects.json(), loadedProjects.headers.get('Link')]))
// 		.then(([loadedProjects, links]) => ({
// 			projects: loadedProjects,
// 			links,
// 		}));

export const getProjectsReq = (userId, page, limit) =>
	request(`/projects?userId=${userId}&page=${page}&limit=${limit}`)
		.then((response) => response.json())
		.then((data) => ({
			res: data.projects, // Переименовываем projects в res для соответствия MainContainer
			links: data.lastPage, // Передаем lastPage как links, если нужно
		}))
		.catch((error) => {
			console.error('Error fetching projects:', error);
			return { res: [], links: null };
		});
