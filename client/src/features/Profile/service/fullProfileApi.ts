import { FullProfile } from "@/features/Profile/types/FullProfile";

const fullUsersData: Record<string, FullProfile> = {
	"1": {
		id: "1",
		fname: "Georgi",
		lname: "Ivanov",
		username: "georgi.ivanov",
		email: "georgi.ivanov@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"2": {
		id: "2",
		fname: "Ivana",
		lname: "Petrova",
		username: "ivana.petrova",
		email: "ivana.petrova@yahoo.com",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"3": {
		id: "3",
		fname: "Nikolay",
		lname: "Dimitrov",
		username: "nikolay.dimitrov",
		email: "nikolay.dimitrov@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"4": {
		id: "4",
		fname: "Elena",
		lname: "Georgieva",
		username: "elena.georgieva",
		email: "elena.georgieva@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"5": { id: "5", 
		fname: "Stefan", 
		lname: "Kolev", 
		username: "stefan.kolev", 
		email: "stefan.kolev@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date() 
	},
	"6": {
		id: "6",
		fname: "Maria",
		lname: "Stoyanova",
		username: "maria.stoyanova",
		email: "maria.stoyanova@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"7": {
		id: "7",
		fname: "Viktor",
		lname: "Hristov",
		username: "viktor.hristov",
		email: "viktor.hristov@yahoo.com",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"8": {
		id: "8",
		fname: "Simona",
		lname: "Ilieva",
		username: "simona.ilieva",
		email: "simona.ilieva@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"9": {
		id: "9",
		fname: "Dimitar",
		lname: "Todorov",
		username: "dimitar.todorov",
		email: "dimitar.todorov@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
	"10": {
		id: "10",
		fname: "Desislava",
		lname: "Angelova",
		username: "desislava.angelova",
		email: "desislava.angelova@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date()
	},
};

export const FakeFullProfileApi = () => {
	const getFullProfileList = () => {
		return new Promise<Record<string, FullProfile>>((resolve) => {
			setTimeout(() => {
				resolve(fullUsersData);
			}, 250);
		});
	};
	return { getFullProfileList };
};