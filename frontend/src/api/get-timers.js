export const getTimers = async (userId) =>
	fetch(`http://localhost:3001/api/timeEntries?userId=${userId}`).then((loadedProjects) => loadedProjects.json());
