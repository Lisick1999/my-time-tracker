export const getUsers = () => fetch(process.env.REACT_APP_API_URL + '/users').then((loadedUsers) => loadedUsers.json());
