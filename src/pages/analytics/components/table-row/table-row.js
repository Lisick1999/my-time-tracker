import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => <div className={className}>{children}</div>;

export const TableRow = styled(TableRowContainer)`
	display: contents;
	display: grid;
	grid-template-columns: repeat(4, 1fr); /* 4 колонки одинаковой ширины */
	gap: 2px; /* Отступы между ячейками */
`;
