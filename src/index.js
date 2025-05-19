import React from 'react';
import ReactDOM from 'react-dom/client';
// для роутинга подключить провайдер
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import { Tracker } from './tracker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Tracker />
		</Provider>
	</BrowserRouter>,
);
