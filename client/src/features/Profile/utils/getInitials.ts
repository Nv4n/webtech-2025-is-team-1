export const getInitials = (fname: string, lname: string) => {
	if((fname === "" && lname === "")) {
		return `""`;
	}
	if(fname === "") {
		return `""${lname[0].toUpperCase()}`;
	}
	if(lname === "") {
		return `${fname[0].toUpperCase()}""`;
	}
	return `${fname[0].toUpperCase()}${lname[0].toUpperCase()}`;
};
