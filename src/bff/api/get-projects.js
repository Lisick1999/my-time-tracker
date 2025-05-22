// ищем проекты по userId
// используем async await, потому что выполняется несколько операций. Поле получения пользователей нужно вернуть одного пользователя

export const getProjects = async (userId) =>
	fetch(`http://localhost:3005/projects?userId=${userId}`).then((loadedProjects) => loadedProjects.json());
