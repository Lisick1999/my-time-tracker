import { ACTION_TYPE } from './action-type';

export const logout = (session) => {
	console.log('logout');
	// server.logout(session);
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
