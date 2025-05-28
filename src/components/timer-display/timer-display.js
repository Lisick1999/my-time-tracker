import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTimer } from '../../selectors';
import { tickTimer } from '../../actions';

export const TimerDisplay = () => {
	const { totalSeconds, isRunning, isPaused } = useSelector(selectTimer);
	const dispatch = useDispatch();
	const timerRef = useRef(null);

	useEffect(() => {
		if (isRunning && !isPaused) {
			timerRef.current = setInterval(() => {
				dispatch(tickTimer());
			}, 1000);
		}

		if (isPaused || !isRunning) {
			clearInterval(timerRef.current);
		}

		return () => clearInterval(timerRef.current);
	}, [isRunning, isPaused]);

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600)
			.toString()
			.padStart(2, '0');
		const minutes = Math.floor((seconds % 3600) / 60)
			.toString()
			.padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${hours}:${minutes}:${secs}`;
	};

	const displayTimer = useMemo(() => {
		return formatTime(totalSeconds);
	}, [totalSeconds, formatTime]);

	return <div>{displayTimer}</div>;
};
