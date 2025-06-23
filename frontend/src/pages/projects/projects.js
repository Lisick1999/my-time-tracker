import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../../actions/get-projects';
import { Button, Icon } from '../../components';
import { Pagination } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';
import { getProjectsReq } from '../../api/get-projects';
import { deleteProject } from '../../api/delete-project';

const ProjectsContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [serverError, setServerError] = useState(null);

	useEffect(() => {
		if (user?.id) {
			getProjectsReq(user.id, page, PAGINATION_LIMIT)
				.then(({ error, data }) => {
					if (error) {
						setServerError(`Ошибка загрузки проектов: ${error}`);
						setProjects([]);
						return;
					}

					const projectsData = data?.projects || [];

					setServerError(null);
					setProjects(projectsData);
					dispatch(getProjects(projectsData));
					setLastPage(data?.lastPage || 1);
				})
				.catch((err) => {
					setServerError(`Неизвестная ошибка: ${err.message}`);
					setProjects([]);
				});
		} else {
			setProjects([]);
			setServerError('Пользователь не авторизован');
		}
	}, [user, page, dispatch]);

	const handleCreateProject = () => {
		navigate('/projects/create');
	};

	const handleEditProject = (projectId) => {
		navigate(`/projects/${projectId}/edit`);
	};

	const handleDeleteProject = (id) => {
		deleteProject(id).then(({ error }) => {
			if (error) {
				setServerError(`Ошибка удаления проекта: ${error}`);
				return;
			}

			getProjectsReq(user.id, page, PAGINATION_LIMIT).then(({ error, data }) => {
				if (error) {
					setServerError(`Ошибка загрузки проектов: ${error}`);
					setProjects([]);
					return;
				}

				const projectsData = data?.projects || [];

				setServerError(null);
				if (projectsData.length === 0 && page > 1) {
					setPage(page - 1);
				} else {
					setProjects(projectsData);
					dispatch(getProjects(projectsData));
					setLastPage(data?.lastPage || 1);
				}
			});
		});
	};

	return (
		<div className={className}>
			<Button width="220px" onClick={handleCreateProject}>
				Создать проект
			</Button>
			{serverError && <p className="error-message">{serverError}</p>}
			<div className="card-container">
				{projects.length > 0 ? (
					projects.map((project) => (
						<div className="project-card" key={project._id}>
							<div className="project-title">{project.name}</div>
							<p className="project-description">Описание: {project.description}</p>
							<p className="project-tag">Метка/тег: {project.tag}</p>
							<div className="icon-container">
								<Icon id="fa-pencil" size="35px" onClick={() => handleEditProject(project._id)} />
								<Icon id="fa-trash" size="35px" onClick={() => handleDeleteProject(project._id)} />
							</div>
						</div>
					))
				) : (
					<p>Нет созданных проектов</p>
				)}
			</div>
			{lastPage > 1 && projects.length > 0 && (
				<div className="pagination-container">
					<Pagination page={page} lastPage={Number(lastPage)} setPage={setPage} />
				</div>
			)}
		</div>
	);
};

export const Projects = styled(ProjectsContainer)`
	position: relative;
	padding: 30px;
	width: 1360px;
	height: 645px;
	margin: 20px 5px 0 5px;
	background-color: #f9f9f9;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	& .card-container {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		padding: 15px;
		justify-items: center;
	}

	& .project-card {
		border: 1px solid #ccc;
		padding: 15px;
		width: 400px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin-top: 20px;
		transition: transform 0.2s ease;

		&:hover {
			transform: translateY(-3px);
		}
	}

	& .project-title {
		margin: 0 0 12px;
		font-size: 24px;
		color: #333;
	}

	& .project-description {
		margin: 0 0 12px;
		font-size: 18px;
		color: #333;
	}

	& .project-tag {
		font-size: 14px;
		color: #888;
		margin-bottom: 15px;
	}

	& .icon-container {
		display: flex;
		justify-content: flex-end;
		gap: 15px;
	}
	& > button {
		display: block;
		margin-left: 25px;
	}

	& .pagination-container {
		position: absolute;
		width: 400px;
		margin: 0 auto;
		left: 480px;
		bottom: 8px;
	}
`;
