import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks/use-server-request';
import { getProjects } from '../../actions/get-projects';
import { Button, Icon } from '../../components';
import { Pagination } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from './utils';

const ProjectsContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);
	const user = useSelector((state) => state.auth.user);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	useEffect(() => {
		if (user?.id) {
			requestServer('fetchProjects', user.id, page, PAGINATION_LIMIT).then((data) => {
				setProjects(data.res);
				dispatch(getProjects(data.res));
				setLastPage(getLastPageFromLinks(data.links));
			});
		}
	}, [user, page]);

	const handleCreateProject = () => {
		navigate('/projects/create');
	};

	const handleEditProject = (projectId) => {
		navigate(`/projects/${projectId}/edit`);
	};

	const handleDeleteProject = (id) => {
		requestServer('removeProject', id).then(() => {
			requestServer('fetchProjects', user.id).then((data) => {
				setProjects(data.res);
				dispatch(getProjects(data.res));
			});
		});
	};

	return (
		<div className={className}>
			<Button width="220px" onClick={handleCreateProject}>
				Создать проект
			</Button>
			<div className="card-container">
				{projects.length ? (
					projects.map((project) => (
						<div className="project-card" key={project.id}>
							<div className="project-title">{project.name}</div>
							<p className="project-description">Описание: {project.description}</p>
							<p className="project-tag">Метка/тег: {project.tag}</p>
							<div className="icon-container">
								<Icon id="fa-pencil" size="35px" onClick={() => handleEditProject(project.id)} />
								<Icon id="fa-trash" size="35px" onClick={() => handleDeleteProject(project.id)} />
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
		grid-template-columns: repeat(3, 1fr); /* 2 колонки, каждая занимает 1fr (равную долю) */
		gap: 20px; /* Отступы между карточками */
		padding: 15px; /* Общие отступы для контейнера */
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
