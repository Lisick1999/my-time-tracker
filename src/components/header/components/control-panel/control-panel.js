import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth, selectUserName } from '../../../../selectors';

const NavLink = styled(Link)`
	margin-right: 20px;
	text-decoration: none;
	color: #333;

	&:hover {
		color: #007bff;
	}
`;

const UserIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="7" r="4" />
		<path d="M5.5 21a9 9 0 0 1 13 0" />
	</svg>
);

const ControlPanelContainer = ({ className }) => {
	const userName = useSelector(selectUserName);
	console.log(
		'Redux state:',
		useSelector((state) => state),
	);
	console.log('User name:', userName);
	return (
		<nav className={className}>
			<NavLink className="header-nav" to="/home">
				Главная
			</NavLink>
			<NavLink className="header-nav" to="/projects">
				Проекты
			</NavLink>
			<NavLink className="header-nav" to="/analytics">
				Аналитика
			</NavLink>
			{/* <div style={{ fontSize: '20px' }}>{name}</div> */}
			{userName || 'Нет имени'}
			<NavLink className="header-nav" to="/settings">
				<UserIcon />
				{/* {auth ? <></> : <div>Что-то пошло не по плану...</div>} */}
			</NavLink>
		</nav>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	gap: 20px;
	font-size: 25px;
	margin-top: 30px;

	& .header-nav {
		margin: 0 auto;

		text-decoration: none;
		color: #555;
		font-weight: 500;
		transition:
			color 0.3s,
			transform 0.3s;
	}

	& .header-nav:hover {
		color: #007bff;
		transform: translateY(-2px);
	}
`;
