export const getCurrentDate = () => {
	const today = new Date();

	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	const formattedDay = day.toString().padStart(2, '0');
	const formattedMonth = month.toString().padStart(2, '0');

	return `${formattedDay}/${formattedMonth}/${year}`;
};
