import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../actions';
import { Button, H2, Input } from '../../components';
import styled from 'styled-components';
import { getProjectsReq } from '../../api/get-projects';
import { setProjectData } from '../../api/set-project-data';
import { request } from '../../utils/request';

const TextAreaStyled = styled.textarea`
	width: 100%;
	height: 150px;
	padding: 10px;
	margin-bottom: 15px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 20px;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: #f5a623;
		box-shadow: 0 0 5px rgba(245, 166, 35, 0.5);
	}
`;

const CreateEditProjectContainer = ({ className }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projects);
	const user = useSelector((state) => state.auth.user);
	const existingProject = projects?.find((p) => p.id === id);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('');
	const [serverError, setServerError] = useState(null);

	useEffect(() => {
		if (existingProject) {
			setName(existingProject.name);
			setDescription(existingProject.description);
			setTag(existingProject.tag);
		}
	}, [existingProject]);

	const handleSave = (userId, name, description, tag) => {
		if (!userId || !name) {
			setServerError('Пользователь и название проекта обязательны');
			return;
		}

		const PAGINATION_LIMIT = 6;
		const page = 1;

		if (id) {
			setProjectData(userId, id, name, description, tag)
				.then(({ error }) => {
					if (error) {
						setServerError(`Ошибка обновления проекта: ${error}`);
						return;
					}
					return getProjectsReq(userId, page, PAGINATION_LIMIT);
				})
				.then(({ error, data }) => {
					if (error) {
						setServerError(`Ошибка загрузки проектов: ${error}`);
						return;
					}
					dispatch(getProjects(data?.res || []));
					navigate('/projects');
				})
				.catch((err) => {
					setServerError(`Неизвестная ошибка: ${err.message}`);
				});
		} else {
			request('/projects', 'POST', { userId, name, description, tag })
				.then((response) => {
					if (response.error) {
						setServerError(`Ошибка создания проекта: ${response.error}`);
						return;
					}
					return getProjectsReq(userId, page, PAGINATION_LIMIT);
				})
				.then(({ error, data }) => {
					if (error) {
						setServerError(`Ошибка загрузки проектов: ${error}`);
						return;
					}
					dispatch(getProjects(data?.res || []));
					navigate('/projects');
				})
				.catch((err) => {
					setServerError(`Неизвестная ошибка: ${err.message}`);
				});
		}
	};

	return (
		<div className={className}>
			{serverError && <p className="error-message">{serverError}</p>}
			<H2>{id ? 'Редактировать проект' : 'Создать проект'}</H2>
			<div className="form-group">
				<label className="form-label">Название проекта:</label>
				<Input value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="form-group">
				<label className="form-label">Описание:</label>
				<TextAreaStyled value={description} onChange={(e) => setDescription(e.target.value)} />
			</div>
			<div className="form-group">
				<label className="form-label">Метка / тег:</label>
				<Input value={tag} onChange={(e) => setTag(e.target.value)} />
			</div>

			<div className="button-container">
				<Button width="200px" onClick={() => handleSave(user?.id, name, description, tag)}>
					Сохранить
				</Button>
				<Button width="200px" onClick={() => navigate('/projects')}>
					Отмена
				</Button>
			</div>
		</div>
	);
};

export const CreateEditProject = styled(CreateEditProjectContainer)`
	background-color: #fff;
	padding: 40px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	width: 500px;

	& .form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 15px;
	}

	& .form-label {
		font-size: 21px;
		margin-bottom: 10px;
		font-weight: bold;
		color: #555;
	}

	& .button-container {
		display: flex;
		gap: 10px;
		margin-top: 10px;
		justify-content: space-between;
	}
`;
