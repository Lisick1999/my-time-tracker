import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';
import { formatTime } from '../../../../utils/format-time';

const ProjectRowContainer = ({ className, nameProject, tag, createdAt, timers }) => {
	const totalDuration = formatTime(timers.reduce((total, timer) => total + timer.duration, 0));

	return (
		<div className={className}>
			<TableRow border>
				<div className="nameProject-column">{nameProject}</div>
				<div className="tag-column">{tag}</div>
				<div className="created-at-column">{createdAt}</div>
				<div className="time-column">{totalDuration}</div>
			</TableRow>
		</div>
	);
};

export const ProjectRow = styled(ProjectRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 16px;
	}
`;
