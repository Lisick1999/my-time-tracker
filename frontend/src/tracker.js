import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, TimerDisplay, Error } from './components';
import { Authorization, CreateEditProject, Projects, Registration, UserSettings, Main, Analytics } from './pages';
import { ControlPanel } from './components/header/components';
import { setUser } from './actions';
import { selectUser, selectTimer } from './selectors';
import styled from 'styled-components';
import { ERROR } from './constants/error';

const AppContainer = styled.div`
	font-family: sans-serif;
	min-height: 100vh;
	position: relative;
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
const TimerContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	bottom: 50px;
	right: 50px;
	font-size: 25px;
`;

const HomeLink = styled(Link)`
	font-size: 18px;
	color: #007bff;
	text-decoration: none;

	&:hover {
		text-decoration: none;
		color: #0056b3;
	}
`;

export const Tracker = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const { isRunning } = useSelector(selectTimer);
	const location = useLocation();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			if (!user && location.pathname !== '/') {
				window.location.replace('/');
			}
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({ ...currentUserData, id: currentUserData?.id }));
	}, [dispatch]);

	return (
		<AppContainer>
			<Header />
			{isRunning && location.pathname !== '/home' && (
				<TimerContainer>
					<TimerDisplay />
					<HomeLink to="/home">К таймеру</HomeLink>
				</TimerContainer>
			)}
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
						<Route path="/users" element={<UserSettings />} />
						<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
					</Route>
				</Routes>
			</Content>
		</AppContainer>
	);
};
