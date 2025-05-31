import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Icon } from '../../components';
import { TableRow } from './components/table-row/table-row';
import { ProjectRow } from './components/project-row/project-row';
import { useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { StackedBarChart } from './components/stacked-bar-chart/stacked-bar-chart';
import { TabButton } from './components/tab-button/tab-button';

const AnalyticsContainer = ({ className }) => {
	const [projectsData, setProjectsData] = useState([]);
	const [tab, setTab] = useState('table');
	const user = useSelector((state) => state.auth.user);
	const requestServer = useServerRequest();

	useEffect(() => {
		if (user?.id) {
			requestServer('fetchAnalytics', user.id).then((data) => {
				setProjectsData(data?.res);
			});
		}
	}, [user]);

	return (
		<div className="styled-container">
			<h2 className="styled-title">Аналитика таймеров</h2>

			<div className="styled-filter-bar">
				<select className="styled-select">
					<option value="">По дате</option>
					<option value="">По тегу</option>
				</select>
				<TabButton className="styled-button" isActive={tab === 'table'} onClick={() => setTab('table')}>
					Таблица
				</TabButton>
				<TabButton className="styled-button" isActive={tab === 'chart'} onClick={() => setTab('chart')}>
					График
				</TabButton>
				<div className="search-container">
					<Input placeholder="Поиск по заголовкам..." />
					<Icon id="fa-search" size="21px" />
				</div>
			</div>

			{tab === 'table' && (
				<div className="styled-table-container">
					<div>
						<TableRow>
							<div className="login-column">Название проекта</div>
							<div className="registered-at-column">Тег</div>
							<div className="role-column">Дата создания</div>
							<div className="role-column">Количество времени</div>
						</TableRow>

						{projectsData?.map((project) => (
							<ProjectRow
								key={project.id}
								id={project.id}
								nameProject={project.name}
								tag={project.tag}
								createdAt={project.created_at}
								timers={project.timers}
							/>
						))}
					</div>
				</div>
			)}

			{tab === 'chart' && (
				<div>
					<StackedBarChart projects={projectsData} />
				</div>
			)}
		</div>
	);
};

export const Analytics = styled(AnalyticsContainer)`
	& .search-container {
		display: flex;
	}
`;
