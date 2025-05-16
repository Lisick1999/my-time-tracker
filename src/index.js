import React from 'react';
import ReactDOM from 'react-dom/client';
// для роутинга подключить провайдер
import { BrowserRouter } from 'react-router-dom';
import { Tracker } from './tracker';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Tracker />
	</BrowserRouter>,
);
