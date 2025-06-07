import { FullProfile } from "@/features/Profile/types/FullProfile";

const fullUsersData: Record<string, FullProfile> = {
	"1": {
		id: "1",
		firstName: "Georgi",
		lastName: "Ivanov",
		username: "georgi.ivanov",
		email: "georgi.ivanov@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"2": {
		id: "2",
		firstName: "Ivana",
		lastName: "Petrova",
		username: "ivana.petrova",
		email: "ivana.petrova@yahoo.com",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"3": {
		id: "3",
		firstName: "Nikolay",
		lastName: "Dimitrov",
		username: "nikolay.dimitrov",
		email: "nikolay.dimitrov@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"4": {
		id: "4",
		firstName: "Elena",
		lastName: "Georgieva",
		username: "elena.georgieva",
		email: "elena.georgieva@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"5": {
		id: "5",
		firstName: "Stefan",
		lastName: "Kolev",
		username: "stefan.kolev",
		email: "stefan.kolev@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"6": {
		id: "6",
		firstName: "Maria",
		lastName: "Stoyanova",
		username: "maria.stoyanova",
		email: "maria.stoyanova@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"7": {
		id: "7",
		firstName: "Viktor",
		lastName: "Hristov",
		username: "viktor.hristov",
		email: "viktor.hristov@yahoo.com",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"8": {
		id: "8",
		firstName: "Simona",
		lastName: "Ilieva",
		username: "simona.ilieva",
		email: "simona.ilieva@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"9": {
		id: "9",
		firstName: "Dimitar",
		lastName: "Todorov",
		username: "dimitar.todorov",
		email: "dimitar.todorov@gmail.com",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
	},
	"10": {
		id: "10",
		firstName: "Desislava",
		lastName: "Angelova",
		username: "desislava.angelova",
		email: "desislava.angelova@abv.bg",
		password: "123456789",
		role: "user",
		createdAt: new Date(),
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
