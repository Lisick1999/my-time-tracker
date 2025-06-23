export const getUsers = () => fetch('http://localhost:3001/api/users').then((loadedUsers) => loadedUsers.json());
