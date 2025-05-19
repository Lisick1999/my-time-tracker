export const createSession = (session) => {
	return {
		// когда пользователь нажмет logout, пройдем по всем методам сессии и удалим все методы, которые у него есть. key - имя метода
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},

		removeProekt() {
			console.log('удаление проекта');
		},
	};
};
