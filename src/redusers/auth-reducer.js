import { ACTION_TYPE } from '../actions';

const initialAuthState = {
	isAuthenticated: false,
	user: null,
	prevWasLogout: false, // добавляем поле для отслеживания выхода
};

export const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				prevWasLogout: false, // при входе сбрасываем флаг
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null,
				prevWasLogout: true, // при выходе устанавливаем флаг
			};
		default:
			return state;
	}
};
