import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderContainer = ({ className }) => {
	return <div className={className}></div>;
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Loader = styled(LoaderContainer)`
	width: 48px;
	height: 48px;
	border: 5px solid #ccc;
	border-top-color: #0366d6;
	border-radius: 50%;
	animation: ${spin} 1s linear infinite;
	margin: 50px auto;
	background-color: rgba(255, 255, 255, 0.8);
`;
