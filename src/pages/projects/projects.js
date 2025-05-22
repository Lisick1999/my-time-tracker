import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { deleteProject } from '../../actions';
import { useServerRequest } from '../../hooks/use-server-request';
import { getProjects } from '../../actions/get-projects';

const Container = styled.div`
	padding: 20px;
`;

const Button = styled.button`
	margin-bottom: 20px;
	padding: 10px 20px;
`;

const ProjectCard = styled.div`
	border: 1px solid #ccc;
	padding: 15px;
	margin-bottom: 10px;
`;

const ProjectTitle = styled.h3`
	margin: 0;
`;

const ButtonsContainer = styled.div`
	margin-top: 10px;
`;

const ProjectsContainer = () => {
	const projects = useSelector((state) => state.projects);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	useEffect(() => {
		if (user?.id) {
			requestServer('fetchProjects', user.id).then((data) => {
				dispatch(getProjects(data));
			});
		}
	}, [user]);

	const handleCreateProject = () => {
		navigate('/projects/create');
	};

	const handleEditProject = (projectId) => {
		navigate(`/projects/${projectId}/edit`);
	};

	const handleDeleteProject = (id) => {
		requestServer('removeProject', id).then(() => {
			requestServer('fetchProjects', user.id).then((data) => {
				dispatch(getProjects(data));
			});
		});
	};

	return (
		<Container>
			<Button onClick={handleCreateProject}>Создать проект</Button>
			{!!projects.length ? (
				projects.map((project) => (
					<ProjectCard key={project.id}>
						<ProjectTitle>{project.name}</ProjectTitle>
						<p>Описание: {project.description}</p>
						<p>Метка/тег: {project.tag}</p>
						<ButtonsContainer>
							<button onClick={() => handleEditProject(project.id)}>Редактировать</button>
							<button onClick={() => handleDeleteProject(project.id)}>Удалить</button>
						</ButtonsContainer>
					</ProjectCard>
				))
			) : (
				<p>Нет созданных проектов</p>
			)}
		</Container>
	);
};

export const Projects = styled(ProjectsContainer)``;
