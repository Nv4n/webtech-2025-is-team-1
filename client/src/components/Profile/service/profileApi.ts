import { Profile, User } from "@/components/Profile/types/Profile";

const FakeProfileApi = () => {
	const getProfileList = (): Record<string, Profile> => {
		const users: Record<string, Profile> = {
			"1": {
				fname: "Georgi",
				lname: "Ivanov",
				username: "georgi.ivanov",
			},
			"2": {
				fname: "Ivana",
				lname: "Petrova",
				username: "ivana.petrova",
			},
			"3": {
				fname: "Nikolay",
				lname: "Dimitrov",
				username: "nikolay.dimitrov",
			},
			"4": {
				fname: "Elena",
				lname: "Georgieva",
				username: "elena.georgieva",
			},
			"5": { fname: "Stefan", lname: "Kolev", username: "stefan.kolev" },
			"6": {
				fname: "Maria",
				lname: "Stoyanova",
				username: "maria.stoyanova",
			},
			"7": {
				fname: "Viktor",
				lname: "Hristov",
				username: "viktor.hristov",
			},
			"8": {
				fname: "Simona",
				lname: "Ilieva",
				username: "simona.ilieva",
			},
			"9": {
				fname: "Dimitar",
				lname: "Todorov",
				username: "dimitar.todorov",
			},
			"10": {
				fname: "Desislava",
				lname: "Angelova",
				username: "desislava.angelova",
			},
		};
		return users;
	};
	return { getProfileList };
};
