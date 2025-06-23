import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';

const ProjectRowContainer = ({ className, id, nameProject, tag, createdAt, timers }) => {
	const totalDuration = timers.reduce((sum, timer) => sum + Number(timer.duration), 0);

	return (
		<div className={className}>
			<TableRow>
				<div>{nameProject || 'Без названия'}</div>
				<div>{tag || 'Без тега'}</div>
				<div>{createdAt || 'Не указана'}</div>
				<div>{totalDuration > 0 ? `${totalDuration} сек` : '0 сек'}</div>
			</TableRow>
		</div>
	);
};

export const ProjectRow = styled(ProjectRowContainer)`
	& .project-column {
		padding: 5px;
		border: 1px solid #ccc;
		text-align: center;
	}
`;
