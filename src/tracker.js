import { Route, Routes, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

const Content = styled.div`
	padding: 120px 0;
`;
const Header = () => <div>Шапка страницы</div>;
const Footer = () => <div>Подвал страницы</div>;

const UserPage = () => {
	return (
		<div>
			<h2>Страница пользователя</h2>
			{/* Здесь будет отображаться вложенный маршрут */}
			<Outlet />
		</div>
	);
};

export const Tracker = () => {
	return (
		<>
			<Header />
			<Content>
				<Routes>
					<Route path="/login" element={<div>Страница авторизации /login</div>} />
					<Route path="/register" element={<div>Страница регистрации /register</div>} />
					<Route path="/" element={<UserPage />}>
						<Route path="home" element={<div>Главная страница /</div>} />
						<Route path="projects" element={<div>Страница списка проектов projects</div>}>
							<Route path="create" element={<div>Страница создания проекта /projects/create</div>} />
							<Route path=":id/edit" element={<div>Страница редактирования проекта /projects/:id/edit</div>} />
						</Route>
						<Route path="analytics" element={<div>Страница аналитики /analytics</div>} />
						<Route path="settings" element={<div>Страница настроек аккаунта /settings</div>} />
					</Route>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	);
};
