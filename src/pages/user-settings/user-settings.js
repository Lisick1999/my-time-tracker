import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Input, H2 } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, updateUser } from '../../actions';
import { useServerRequest } from '../../hooks/use-server-request';

const Card = styled.div`
	margin: 40px auto;
	height: 620px;
	background-color: #fff;
	padding: 0 33px 0 33px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 500px;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`;

const Label = styled.label`
	margin-bottom: 5px;
	font-weight: bold;
	color: #555;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`;

// Основной компонент
const UserSettingsContainer = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const [userData, setUserData] = useState(user);
	const [editMode, setEditMode] = useState(false);
	const [tempData, setTempData] = useState();

	// Обновляем локальный userData при изменении user из Redux
	useEffect(() => {
		setUserData(user);
	}, [user]);

	// Включение режима редактирования
	const handleEdit = () => {
		setTempData(userData);
		setEditMode(true);
	};

	// Отмена изменений
	const handleCancel = () => {
		setUserData(tempData);
		setEditMode(false);
	};

	// Сохранение данных
	const handleSave = (userId, newUserEmail, newUserPassword, newUserName) => {
		requestServer('updateUserData', userId, newUserEmail, newUserPassword, newUserName).then(() => {
			setEditMode(false);
			dispatch(setUser({ ...user, email: newUserEmail, password: newUserPassword, userName: newUserName }));
		});
	};

	// Обработчик изменения полей
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Card>
			<H2>Настройки пользователя</H2>

			<FormGroup>
				<Label>Логин:</Label>
				<Input type="text" name="userName" value={userData.userName} onChange={handleChange} disabled={!editMode} />
			</FormGroup>

			<FormGroup>
				<Label>Email:</Label>
				<Input type="email" name="email" value={userData.email} onChange={handleChange} disabled={!editMode} />
			</FormGroup>

			<FormGroup>
				<Label>Пароль:</Label>
				<Input type="password" name="password" value={userData.password} onChange={handleChange} disabled={!editMode} />
			</FormGroup>

			{/* Кнопки */}
			<ButtonsContainer>
				{!editMode && <Icon id="fa-pencil" onClick={handleEdit} />}
				{editMode && (
					<>
						<Icon
							id="fa-floppy-o"
							onClick={() => handleSave(user.id, userData.email, userData.password, userData.userName)}
						/>
						<Icon id="fa-times" onClick={handleCancel} />
					</>
				)}
			</ButtonsContainer>
		</Card>
	);
};

export const UserSettings = styled(UserSettingsContainer)``;
