export const formatDate = (date: Date | string | undefined) => {
	if (!date) return '';
	const formattedDate = typeof date === 'string' ? new Date(date) : date;
	return formattedDate.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
};
