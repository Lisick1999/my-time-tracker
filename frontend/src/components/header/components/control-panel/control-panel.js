import styled from 'styled-components';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectUserSession } from '../../../../selectors';
import { Icon } from '../../../icon/icon';
import { logout } from '../../../../actions';

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
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
		navigate('/');
	};

	return (
		<>
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
				{<div className="user-name">{userName}</div> || 'Нет имени'}
				<NavLink className="header-nav user-icon" to="/users">
					<UserIcon />
				</NavLink>
				<Icon id="fa-sign-out" size="35px" onClick={onLogout} />
			</nav>

			<Outlet />
		</>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
	padding: 20px 0 20px 20px;
	font-size: 25px;
	margin-top: 30px;

	& > *:not(:nth-last-child(-n + 3)) {
		margin-right: auto;
	}

	& > *:first-child {
		margin-left: 0;
	}

	& .header-nav {
		text-decoration: none;
		color: #555;
		font-weight: 500;
		transition:
			color 0.3s,
			transform 0.3s;

		&:hover {
			color: #007bff;
			transform: translateY(-2px);
		}
	}

	& .user-name {
		font-size: 20px;
		font-weight: bold;
		color: #333;
	}

	& .user-icon {
		margin-left: 15px;
	}
`;
