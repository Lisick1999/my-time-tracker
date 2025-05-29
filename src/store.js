import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Импортируем thunk
import { authReducer, projectsReducer, timerReducer } from './reducers';

const reducer = combineReducers({
	auth: authReducer,
	projects: projectsReducer,
	timer: timerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
