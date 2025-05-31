import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Authorization, CreateEditProject, Projects, Registration, UserSettings, Main, Analytics } from './pages';
import { ControlPanel } from './components/header/components';
import styled from 'styled-components';
import './App.css';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './actions';
import { selectUser } from './selectors';

const AppContainer = styled.div`
	font-family: sans-serif; // Use a common font
	min-height: 100vh; // Ensure it takes the full viewport height
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1400px;
	margin: 0 auto;
	padding: 20px;
	box-sizing: border-box;
`;

export const Tracker = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			if (!user && window.location.pathname !== '/') {
				window.location.replace('/');
			}
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({ ...currentUserData, id: currentUserData?.id }));
	}, [dispatch]);

	return (
		<AppContainer>
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
						<Route path="/analytics" element={<Analytics />} />
						<Route path="/settings" element={<UserSettings />} />
						<Route path="*" element={<div>Ошибка</div>} />
					</Route>
				</Routes>
			</Content>
		</AppContainer>
	);
};
