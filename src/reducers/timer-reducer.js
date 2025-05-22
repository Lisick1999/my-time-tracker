const initialTimerState = {
	isRunning: false,
	startTime: null,
	currentProjectId: null,
	elapsedTime: 0, // Время в миллисекундах
};

export const timerReducer = (state = initialTimerState, action) => {
	switch (action.type) {
		default:
			return state;
	}
	// switch (action.type) {
	// 	case 'START_TIMER':
	// 		return {
	// 			...state,
	// 			isRunning: true,
	// 			startTime: Date.now(),
	// 			currentProjectId: action.payload,
	// 		};
	// 	case 'STOP_TIMER':
	// 		if (state.isRunning) {
	// 			// Проверяем, что таймер запущен
	// 			return {
	// 				...state,
	// 				isRunning: false,
	// 				elapsedTime: state.elapsedTime + (Date.now() - state.startTime),
	// 				startTime: null,
	// 			};
	// 		}
	// 		return state; // Если таймер не запущен, возвращаем текущее состояние
	// 	case 'RESET_TIMER':
	// 		return {
	// 			...state,
	// 			elapsedTime: 0,
	// 		};
	// 	default:
	// 		return state;
	// }
};
