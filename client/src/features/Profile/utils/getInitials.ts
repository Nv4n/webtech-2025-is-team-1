export const getInitials = (fname: string, lname: string) => {
	return `${fname[0].toUpperCase()}${lname[0].toUpperCase()}`;
};
