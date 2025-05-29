import styled from 'styled-components';

const CardContainer = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};

export const Card = styled(CardContainer)`
	background-color: #fff;
	padding: 40px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 500px;
`;
