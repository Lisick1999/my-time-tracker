import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatTime } from '../../../../utils/format-time';

// Функция для подготовки данных для стека
const prepareChartData = (projects) => {
	return projects.map((project) => {
		const dataPoint = { name: project.name };
		// Для каждого таймера создаем поле с его duration и сохраняем comment
		project.timers.forEach((timer) => {
			dataPoint[`timer_${timer.id}`] = timer.duration;
			dataPoint[`comment_${timer.id}`] = timer.comment; // Сохраняем comment для Tooltip
		});
		return dataPoint;
	});
};

export const StackedBarChart = ({ projects }) => {
	// Собираем уникальные id таймеров для создания Bar
	const uniqueTimerIds = [...new Set(projects.flatMap((project) => project.timers.map((timer) => timer.id)))];

	// Цвета для разных таймеров
	const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff4d4f', '#a4de6c', '#d0ed57'];

	const data = prepareChartData(projects);

	return (
		<div style={{ width: '100%', height: 550 }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis label={{ value: 'Проекты', position: 'bottom', offset: 1 }} dataKey="name" />
					<YAxis label={{ value: 'Время (сек)', angle: -90, position: 'insideLeft' }} />
					<Tooltip
						formatter={(value, name, props) => {
							const timerId = name.replace('timer_', '');
							return [`${formatTime(value)}`, props.payload[`comment_${timerId}`] || `Timer ${timerId}`];
						}}
					/>

					{uniqueTimerIds.map((timerId, index) => (
						<Bar
							key={timerId}
							dataKey={`timer_${timerId}`}
							stackId="a"
							fill={colors[index % colors.length]}
							name={`timer_${timerId}`}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
