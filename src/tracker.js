import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Authorization, Registration, UserSettings } from './pages';
import { ControlPanel } from './components/header/components';
import styled from 'styled-components';
import './App.css';
import { useEffect } from 'react';
import { useServerRequest } from './hooks/use-server-request';

const Content = styled.div`
	display: flex;
	flex-direction: column;

	// justify-content: space-between;
	width: 1200px;

	min-height: 100%;
	margin: 0 auto;
`;

export const Tracker = () => {
	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([requestServer('fetchUsers')]).then(([usersRes]) => {
			if (usersRes.error && window.location.pathname !== '/') {
				window.location.replace('/');
			}
		});
	}, [requestServer, window.location.pathname]);

	return (
		<>
			<Header />

			<Content>
				<Routes>
					<Route path="/" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/user" element={<ControlPanel />}>
						<Route path="home" element={<div>Главная страница /</div>} />
						<Route path="projects" element={<div>Страница списка проектов projects</div>}>
							<Route path="create" element={<div>Страница создания проекта /projects/create</div>} />
							<Route path=":id/edit" element={<div>Страница редактирования проекта /projects/:id/edit</div>} />
						</Route>
						<Route path="analytics" element={<div>Страница аналитики /analytics</div>} />
						<Route path="settings" element={<UserSettings />} />
					</Route>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
		</>
	);
};
