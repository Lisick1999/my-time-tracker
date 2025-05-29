import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Authorization, CreateEditProject, Projects, Registration, UserSettings, Main } from './pages';
import { ControlPanel } from './components/header/components';
import styled from 'styled-components';
import './App.css';
import { useEffect } from 'react';
import { useServerRequest } from './hooks';

const Content = styled.div`
	display: flex;
	flex-direction: column;

	// justify-content: space-between;
	width: 1400px;

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
					<Route path="" element={<ControlPanel />}>
						<Route path="/home" element={<Main />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/projects/create" element={<CreateEditProject />} />
						<Route path="/projects/:id/edit" element={<CreateEditProject />} />
						<Route path="/analytics" element={<div>Страница аналитики /analytics</div>} />
						<Route path="/settings" element={<UserSettings />} />
						<Route path="*" element={<div>Ошибка</div>} />
					</Route>
				</Routes>
			</Content>
		</>
	);
};
