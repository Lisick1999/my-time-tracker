import styled from 'styled-components';
import { Icon } from '../icon/icon';

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Icon id="fa-check-square-o" />
		<LargeText>TimeMaster</LargeText>
		<Icon id="fa-pie-chart" />
	</header>
);
export const Header = styled(HeaderContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 24px;
	background-color: #f5a623;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	z-index: 1000;
	width: 100%;
`;
