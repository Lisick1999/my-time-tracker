import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTimer } from '../../selectors';
import { tickTimer } from '../../actions';
import { formatTime } from '../../utils/format-time';

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

	const displayTimer = useMemo(() => {
		return formatTime(totalSeconds);
	}, [totalSeconds, formatTime]);

	return <div>{displayTimer}</div>;
};
