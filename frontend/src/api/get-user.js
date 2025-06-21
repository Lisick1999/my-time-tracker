import { request } from '../utils/request';

export const getUser = async (loginToFind) =>
	request(`/users?email=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser);
