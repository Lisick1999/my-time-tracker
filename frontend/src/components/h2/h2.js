import styled from 'styled-components';

const H2Container = ({ children, className }) => {
	return <h2 className={className}>{children}</h2>;
};

export const H2 = styled(H2Container)`
	text-align: center;
	margin-bottom: 40px;
	color: #333;
	font-size: 35px;
`;
