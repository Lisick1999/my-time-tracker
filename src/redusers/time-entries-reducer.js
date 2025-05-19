const initialTimeEntriesState = {
	// timeEntries: [],
	// loading: false,
	// error: null,
};

export const timeEntriesReducer = (state = initialTimeEntriesState, action) => {
	switch (action.type) {
		default:
			return state;
	}
	// switch (action.type) {
	// 	case 'FETCH_TIME_ENTRIES_REQUEST':
	// 		return {
	// 			...state,
	// 			loading: true,
	// 			error: null,
	// 		};
	// 	case 'FETCH_TIME_ENTRIES_SUCCESS':
	// 		return {
	// 			...state,
	// 			loading: false,
	// 			timeEntries: action.payload,
	// 		};
	// 	case 'FETCH_TIME_ENTRIES_FAILURE':
	// 		return {
	// 			...state,
	// 			loading: false,
	// 			error: action.payload,
	// 		};
	// 	case 'ADD_TIME_ENTRY':
	// 		return {
	// 			...state,
	// 			timeEntries: [...state.timeEntries, action.payload],
	// 		};
	// 	case 'DELETE_TIME_ENTRY':
	// 		return {
	// 			...state,
	// 			timeEntries: state.timeEntries.filter((entry) => entry.id !== action.payload),
	// 		};
	// 	case 'UPDATE_TIME_ENTRY':
	// 		return {
	// 			...state,
	// 			timeEntries: state.timeEntries.map((entry) => (entry.id === action.payload.id ? action.payload : entry)),
	// 		};
	// 	default:
	// 		return state;
	// }
};
