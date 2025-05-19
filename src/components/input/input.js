import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	padding: 12px 15px;
	margin-bottom: 35px;
	border-radius: 4px;
	border: 1px solid #ccc;

	font-size: 24px;

	&:focus {
		outline: none;
		border-color: #f5a623; /* оранжевый при фокусе */
		box-shadow: 0 0 5px rgba(245, 166, 35, 0.5);
	}
`;
