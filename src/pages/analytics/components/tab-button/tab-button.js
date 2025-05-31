import styled from 'styled-components';

const TabButtonContainer = ({ children, className, width, isActive, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const TabButton = styled(TabButtonContainer)`
	width: ${({ width = '100%' }) => width};
	font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
	cursor: pointer;

	& > Link {
		text-decoration: none;
	}
`;
