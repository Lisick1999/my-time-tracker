import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, TimerDisplay } from '../../components';
import { resumeTimer, startTimer, pauseTimer, resetTimer, getProjects, setProjectTimer } from '../../actions';
import styled from 'styled-components';
import { selectTimer } from '../../selectors';
import { useServerRequest } from '../../hooks/use-server-request';

const TextAreaStyled = styled.textarea`
	width: 100%;
	height: 80px;
	padding: 8px;
`;

const MainContainer = () => {
	const { isRunning, isPaused, currentProjectId } = useSelector(selectTimer);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const requestServer = useServerRequest();
	const projects = useSelector((state) => state.projects);
	const kek = useSelector(selectTimer);

	const handleStart = () => {
		if (isRunning) return;

		if (!isPaused) {
			dispatch(startTimer());
		} else {
			dispatch(resumeTimer());
		}
	};

	const handleStop = () => {
		if (!isRunning) return;

		dispatch(pauseTimer());
	};

	useEffect(() => {
		if (user?.id) {
			requestServer('fetchProjects', user.id).then((data) => {
				dispatch(getProjects(data));
			});
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (!currentProjectId && !!projects?.length) {
			dispatch(setProjectTimer(projects[0].id));
		}
	}, [projects, currentProjectId, dispatch]);

	console.log(kek, '1');
	return (
		<div>
			<div>
				<TimerDisplay />
				<Icon id="fa-play" margin="0 0 0 10px" disabled={isRunning} onClick={handleStart} />
				<Icon id="fa-pause" margin="0 0 0 10px" disabled={!isRunning} onClick={handleStop} />
			</div>
			<select
				value={currentProjectId || ''}
				onChange={(e) => {
					console.log(e, '2');

					dispatch(setProjectTimer(e.target.value));
				}}
			>
				{projects.map(({ id: projectId, name: projectName }) => (
					<option key={projectId} value={projectId}>
						{projectName}
					</option>
				))}
			</select>
			<TextAreaStyled value={''} onChange={() => {}} />
			<div>
				<Button onClick={() => dispatch(resetTimer())}>Сбросить</Button>
				<Button>Сохранить</Button>
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)``;
