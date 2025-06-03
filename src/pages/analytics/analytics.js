import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { Input, Icon, Loader } from '../../components';
import { TableRow } from './components/table-row/table-row';
import { ProjectRow } from './components/project-row/project-row';
import { StackedBarChart } from './components/stacked-bar-chart/stacked-bar-chart';
import { TabButton } from './components/tab-button/tab-button';
import styled from 'styled-components';

const AnalyticsContainer = ({ className }) => {
	const [allProjects, setAllProjects] = useState([]);
	const [displayedProjects, setDisplayedProjects] = useState([]);
	const [searchTag, setSearchTag] = useState('');
	const [tab, setTab] = useState('table');
	const [sortOption, setSortOption] = useState('alphabetAsc');
	const [loading, setLoading] = useState(true);
	const user = useSelector((state) => state.auth.user);
	const requestServer = useServerRequest();

	useEffect(() => {
		if (user?.id) {
			setLoading(true);
			setTimeout(() => {
				requestServer('fetchAnalytics', user.id).then((data) => {
					const projects = data?.res || [];
					setAllProjects(projects);
					setDisplayedProjects(applySort(projects, sortOption));
					setLoading(false);
				});
			}, 2000);
		}
	}, [user, requestServer]);

	const applySort = (projects, option) => {
		const sorted = [...projects];
		switch (option) {
			case 'alphabetAsc':
				return sorted.sort((a, b) => a.name.localeCompare(b.name, ['ru', 'en'], { numeric: true, caseFirst: 'upper' }));
			case 'alphabetDesc':
				return sorted.sort((a, b) => b.name.localeCompare(a.name, ['ru', 'en'], { numeric: true, caseFirst: 'upper' }));
			case 'dateAsc':
				return sorted.sort((a, b) => {
					const dateA = a.created_at.split('/').reverse().join('-');
					const dateB = b.created_at.split('/').reverse().join('-');
					return new Date(dateA) - new Date(dateB);
				});
			case 'dateDesc':
				return sorted.sort((a, b) => {
					const dateA = a.created_at.split('/').reverse().join('-');
					const dateB = b.created_at.split('/').reverse().join('-');
					return new Date(dateB) - new Date(dateA);
				});
			default:
				return projects;
		}
	};

	const filterAndSortProjects = useCallback(() => {
		let filtered = allProjects;
		if (searchTag.trim()) {
			filtered = allProjects.filter((project) => project.tag.toLowerCase().includes(searchTag.toLowerCase()));
		}
		const sorted = applySort(filtered, sortOption);
		setDisplayedProjects(sorted);
	}, [allProjects, searchTag, sortOption]);

	useEffect(() => {
		if (user?.id) {
			requestServer('fetchAnalytics', user.id).then((data) => {
				setAllProjects(data?.res || []);
			});
		}
	}, [user, requestServer]);

	useEffect(() => {
		filterAndSortProjects();
	}, [allProjects, searchTag, sortOption, filterAndSortProjects]);

	const handleSearchChange = (event) => {
		setSearchTag(event.target.value);
	};

	const handleSearchClick = () => {
		filterAndSortProjects();
	};

	const handleClearClick = () => {
		setSearchTag('');
	};

	const handleSortChange = (e) => {
		setSortOption(e.target.value);
	};

	return (
		<div className={className}>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="styled-filter-bar">
						<div className="search-container">
							<Input
								placeholder="Поиск по тегам..."
								value={searchTag}
								onChange={handleSearchChange}
								onKeyPress={(e) => {
									if (e.key === 'Enter') handleSearchClick();
								}}
							/>
							<div className="search-button-container">
								{searchTag && (
									<Icon id="fa-times" size="25px" onClick={handleClearClick} title="Очистить поиск" />
								)}
								<Icon id="fa-search" size="25px" onClick={handleSearchClick} />
							</div>
							{searchTag && displayedProjects.length === 0 && (
								<div className="no-results-message">Задачи с таким тегом не найдено</div>
							)}
						</div>
						<select className="styled-select" value={sortOption} onChange={handleSortChange}>
							<option value="alphabetAsc">Сортировать по алфавиту (А-Я)</option>
							<option value="alphabetDesc">Сортировать по алфавиту (Я-А)</option>
							<option value="dateDesc">Сортировать по дате (новые)</option>
							<option value="dateAsc">Сортировать по дате (старые)</option>
						</select>
						<TabButton
							className="styled-button"
							isActive={tab === 'table'}
							onClick={() => setTab('table')}
							width="100px"
						>
							Таблица
						</TabButton>
						<TabButton
							className="styled-button"
							isActive={tab === 'chart'}
							onClick={() => setTab('chart')}
							width="100px"
						>
							График
						</TabButton>
					</div>
					{tab === 'table' && (
						<div className="styled-table-container">
							<TableRow>
								<div className="column-header">Название проекта</div>
								<div className="column-header">Тег</div>
								<div className="column-header">Дата создания</div>
								<div className="column-header">Количество времени</div>
							</TableRow>
							{displayedProjects.map((project) => (
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
					)}
					{tab === 'chart' && (
						<div>
							<StackedBarChart projects={displayedProjects} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export const Analytics = styled(AnalyticsContainer)`
	width: 1350px;
	margin: 35px 0 0 10px;
	padding: 24px 32px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	& .column-header {
		text-align: center;
		font-weight: bold;
		padding: 10px;
		border-bottom: 2px solid #ccc;
		background-color: #f1ad3dcf;
	}

	& .search-container {
		display: flex;
		align-items: center;
		position: relative;

		& .search-button-container {
			display: flex;
			position: absolute;
			top: 14px;
			right: 20px;
			width: 55px;
			justify-content: flex-end;

			& > div {
				margin-left: 7px;
			}
		}
	}

	& .styled-select {
		padding: 5px 7px;
		border-radius: 6px;
		font-size: 14px;
		cursor: pointer;

		&:hover,
		&:focus {
			border-color: #f5a623;
			outline: none;
		}
	}

	& .styled-button {
		border: none;
		font-weight: 600;
		font-size: 16px;
		padding: 8px 10px;
		color: #586069;
		border-radius: 4px;
		cursor: pointer;
		margin-left: 15px;

		&.active,
		&.styled-button:hover {
			background-color: #f1ad3dcf;
			color: white;
		}
	}

	& .styled-table-container {
		margin-top: 20px;

		padding: 5px;
	}
`;
