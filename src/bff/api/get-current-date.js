// функция вывода текущей даты
export const getCurrentDate = () => {
	const today = new Date();

	const day = today.getDate(); // день месяца (1-31)
	const month = today.getMonth() + 1; // месяц (0-11), добавляем 1
	const year = today.getFullYear(); // год

	// добавляем ведущие нули для однозначных чисел, если нужно
	const formattedDay = day.toString().padStart(2, '0');
	const formattedMonth = month.toString().padStart(2, '0');

	return `${formattedDay}/${formattedMonth}/${year}`;
};
