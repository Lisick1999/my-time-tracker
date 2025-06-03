import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Icon, TimerDisplay } from '../../components';
import { resumeTimer, startTimer, pauseTimer, resetTimer, getProjects, setProjectTimer } from '../../actions';
import { selectTimer } from '../../selectors';
import { useServerRequest } from '../../hooks/use-server-request';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const { isRunning, isPaused, currentProjectId, totalSeconds } = useSelector(selectTimer);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const requestServer = useServerRequest();
	const [projects, setProjects] = useState([]);
	const [comment, setComment] = useState('');

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
				setProjects(data.res);
				dispatch(getProjects(data));
			});
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (!currentProjectId && !!projects?.length) {
			dispatch(setProjectTimer(projects[0].id));
		}
	}, [projects, currentProjectId, dispatch]);

	const saveTimer = (currentProjectId, comment, totalSeconds, userId) => {
		requestServer('saveTimerData', currentProjectId, comment, totalSeconds, userId).then(() => {
			setComment('');
			dispatch(resetTimer());
		});
	};

	return (
		<div className={className}>
			<Card>
				<div className="timer-section">
					<TimerDisplay />
					<Icon size="30px" id="fa-pause" margin="0 0 0 10px" disabled={!isRunning} onClick={handleStop} />
					<Icon size="30px" id="fa-play" margin="0 20px 0 10px" disabled={isRunning} onClick={handleStart} />
				</div>
				<select
					disabled={isPaused || isRunning}
					className="timer-select"
					value={currentProjectId || ''}
					onChange={(e) => {
						dispatch(setProjectTimer(e.target.value));
					}}
				>
					{projects.map(({ id: projectId, name: projectName }) => (
						<option key={projectId} value={projectId}>
							{projectName}
						</option>
					))}
				</select>
				<textarea
					className="main-textarea"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Комментарий..."
				/>
				<div className="button-section">
					<Button width="250px" onClick={() => dispatch(resetTimer())}>
						Сбросить
					</Button>
					<Button
						disabled={!isPaused}
						width="250px"
						onClick={() => saveTimer(currentProjectId, comment, totalSeconds, user.id)}
					>
						Сохранить
					</Button>
				</div>
			</Card>
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 8px;
	width: 100%;
	max-width: 600px;
	margin: 80px auto;

	& .timer-section {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		justify-content: space-between;
		font-size: 50px;
	}

	& .timer-select {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ddd;
		margin-bottom: 20px;
		width: 420px;
		box-sizing: border-box;
	}

	& .main-textarea {
		width: 100%;
		height: 120px;
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 20px;
		resize: vertical;
		font-size: 16px;
		box-sizing: border-box;

		&:focus {
			outline: none;
			border-color: #f5a623;
			box-shadow: 0 0 5px rgba(245, 166, 35, 0.5);
		}
	}

	& .button-section {
		display: flex;
		gap: 15px;
		width: 100%;
		justify-content: center;
	}
`;
