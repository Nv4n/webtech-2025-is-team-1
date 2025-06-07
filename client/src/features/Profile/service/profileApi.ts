import { Profile } from "@/features/Profile/types/Profile";

const users: Record<string, Profile> = {
	"1": {
		id: "1",
		fname: "Georgi",
		lname: "Ivanov",
		username: "georgi.ivanov",
	},
	"2": {
		id: "2",
		fname: "Ivana",
		lname: "Petrova",
		username: "ivana.petrova",
	},
	"3": {
		id: "3",
		fname: "Nikolay",
		lname: "Dimitrov",
		username: "nikolay.dimitrov",
	},
	"4": {
		id: "4",
		fname: "Elena",
		lname: "Georgieva",
		username: "elena.georgieva",
	},
	"5": { id: "5", fname: "Stefan", lname: "Kolev", username: "stefan.kolev" },
	"6": {
		id: "6",
		fname: "Maria",
		lname: "Stoyanova",
		username: "maria.stoyanova",
	},
	"7": {
		id: "7",
		fname: "Viktor",
		lname: "Hristov",
		username: "viktor.hristov",
	},
	"8": {
		id: "8",
		fname: "Simona",
		lname: "Ilieva",
		username: "simona.ilieva",
	},
	"9": {
		id: "9",
		fname: "Dimitar",
		lname: "Todorov",
		username: "dimitar.todorov",
	},
	"10": {
		id: "10",
		fname: "Desislava",
		lname: "Angelova",
		username: "desislava.angelova",
	},
};

export const FakeProfileApi = () => {
	const getProfileList = () => {
		return new Promise<Record<string, Profile>>((resolve) => {
			setTimeout(() => {
				resolve(users);
			}, 250);
		});
	};
	const updateProfile = async (profile: Profile) => {
			if (!profile.id) {
				return new Promise<Profile | undefined>((resolve) => {
					setTimeout(() => {
						resolve(undefined);
					}, 250);
				});
			}
	
			users[profile.id] = profile;
			return new Promise<Profile>((resolve) => {
				setTimeout(() => {
					resolve(profile);
				}, 1000);
			});
		};
	return { getProfileList, updateProfile: updateProfile };
};