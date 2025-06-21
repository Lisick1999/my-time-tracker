import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => <div className={className}>{children}</div>;

export const TableRow = styled(TableRowContainer)`
	display: contents;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2px;
`;
