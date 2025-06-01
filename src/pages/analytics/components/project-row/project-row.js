import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';
import { formatTime } from '../../../../utils/format-time';

const ProjectRowContainer = ({ className, nameProject, tag, createdAt, timers }) => {
	const totalDuration = formatTime(timers.reduce((total, timer) => total + timer.duration, 0));

	return (
		<div className={className}>
			<TableRow>
				<div className="project-column">{nameProject}</div>
				<div className="project-column">{tag}</div>
				<div className="project-column">{createdAt}</div>
				<div className="project-column">{totalDuration}</div>
			</TableRow>
		</div>
	);
};

export const ProjectRow = styled(ProjectRowContainer)`
	& .project-column {
		padding: 5px;
		border: 1px solid #ccc; /* Граница для ячеек */
		text-align: center;
	}
`;
