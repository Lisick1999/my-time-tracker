export const getTimers = async (userId) =>
	fetch(`http://localhost:3005/timeEntries?userId=${userId}`).then((loadedProjects) => loadedProjects.json());
