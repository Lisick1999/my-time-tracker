const initialProjectsState = {
	// projects: [],
	// loading: false,
	// error: null,
};

export const projectsReducer = (state = initialProjectsState, action) => {
	switch (action.type) {
		default:
			return state;
	}
	// switch (action.type) {
	// 	case 'FETCH_PROJECTS_REQUEST':
	// 		return {
	// 			...state,
	// 			loading: true,
	// 			error: null,
	// 		};
	// 	case 'FETCH_PROJECTS_SUCCESS':
	// 		return {
	// 			...state,
	// 			loading: false,
	// 			projects: action.payload,
	// 		};
	// 	case 'FETCH_PROJECTS_FAILURE':
	// 		return {
	// 			...state,
	// 			loading: false,
	// 			error: action.payload,
	// 		};
	// 	case 'ADD_PROJECT':
	// 		return {
	// 			...state,
	// 			projects: [...state.projects, action.payload],
	// 		};
	// 	// ... Другие кейсы для обновления, удаления проектов ...
	// 	default:
	// 		return state;
	// }
};
