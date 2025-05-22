import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks/use-server-request';
import { getProjects } from '../../actions';

const Container = styled.div`
	padding: 20px;
`;

const InputStyled = styled.input`
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
`;

const TextAreaStyled = styled.textarea`
	width: 100%;
	height: 80px;
	padding: 8px;
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 10px;
`;

const CreateEditProjectContainer = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projects);
	const user = useSelector((state) => state.auth.user);
	const requestServer = useServerRequest();

	// Если редактируем — ищем проект
	const existingProject = projects?.find((p) => p.id === id);

	// Локальные стейты для формы
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('');

	// Изначально заполняем поля при редактировании
	useEffect(() => {
		if (existingProject) {
			setName(existingProject.name);
			setDescription(existingProject.description);
			setTag(existingProject.tag);
		}
	}, [existingProject]);

	// Обработчик сохранения
	const handleSave = (userId, name, description, tag) => {
		if (id) {
			requestServer('fetchUpdateProject', userId, id, name, description, tag).then(() => {
				requestServer('fetchProjects', user.id).then((data) => {
					dispatch(getProjects(data));
				});
			});
		} else {
			requestServer('fetchCreateProject', userId, name, description, tag).then(() => {
				requestServer('fetchProjects', user.id).then((data) => {
					dispatch(getProjects(data));
				});
			});
		}
		navigate('/projects');
	};

	return (
		<Container>
			<h2>{id ? 'Редактировать проект' : 'Создать проект'}</h2>
			<div>
				<label>Название проекта:</label>
				<br />
				<InputStyled value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div>
				<label>Описание:</label>
				<br />
				<TextAreaStyled value={description} onChange={(e) => setDescription(e.target.value)} />
			</div>
			<div>
				<label>Метка/тег:</label>
				<br />
				<InputStyled value={tag} onChange={(e) => setTag(e.target.value)} />
			</div>

			{/* Кнопки */}
			<ButtonGroup>
				<button onClick={() => handleSave(user.id, name, description, tag)}>Сохранить</button>
				<button onClick={() => navigate('/projects')}>Отмена</button>
			</ButtonGroup>
		</Container>
	);
};

export const CreateEditProject = styled(CreateEditProjectContainer)``;
