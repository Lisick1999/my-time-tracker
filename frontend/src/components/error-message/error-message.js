import styled from 'styled-components';

const ErrorMessageContainer = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};

export const ErrorMessage = styled(ErrorMessageContainer)`
	font-size: 20px;
	color: #a94442;
	background-color: #f2dede;
	padding: 12px 20px;
	border: 1px solid #ebccd1;
	border-radius: 4px;
	margin-bottom: 20px;
	margin-top: 20px;
	font-weight: normal;
	text-align: center;
`;
