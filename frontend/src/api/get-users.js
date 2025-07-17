export const getUsers = () => fetch(process.env.REACT_API_URL + '/users').then((loadedUsers) => loadedUsers.json());
