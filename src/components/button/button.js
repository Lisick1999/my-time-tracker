import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	padding: 14px;
	background-color: #f5a623; /* ваш цвет */
	color: #fff;
	font-size: 24px;
	border-radius: 4px;

	border: none;

	cursor: pointer;

	& > Link {
		text-decoration: none;
	}
`;
