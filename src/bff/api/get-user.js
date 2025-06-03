export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3005/users?email=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser);
