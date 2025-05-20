import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Input, H2, Button } from '../../components';

const initialUserData = {
	userName: 'Иван Иванов',
	email: 'ivan@example.com',
	password: 'password123',
};

// const Container = styled.div`
// 	max-width: 400px;
// 	margin: 50px auto;
// 	padding: 20px;
// 	border-radius: 8px;
// 	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
// 	font-family: Arial, sans-serif;
// 	background-color: #fff;
// `;

const Card = styled.div`
	background-color: #fff;
	padding: 40px;
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
	const [userData, setUserData] = useState(initialUserData);
	const [editMode, setEditMode] = useState(false);
	const [tempData, setTempData] = useState(initialUserData);

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
	const handleSave = async () => {
		try {
			// Тут должна быть отправка данных на сервер
			await new Promise((resolve) => setTimeout(resolve, 500));
			setUserData(userData);
			setEditMode(false);
		} catch (error) {
			alert('Ошибка при сохранении данных');
		}
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
						<Icon id="fa-floppy-o" onClick={handleSave} />
						<Icon id="fa-times" onClick={handleCancel} />
					</>
				)}
			</ButtonsContainer>
		</Card>
	);
};

export const UserSettings = styled(UserSettingsContainer)``;
