import { Profile } from "@/features/Profile/types/Profile";

const users: Record<string, Profile> = {
	"1": {
		id: "1",
		firstName: "Georgi",
		lastName: "Ivanov",
		username: "georgi.ivanov",
	},
	"2": {
		id: "2",
		firstName: "Ivana",
		lastName: "Petrova",
		username: "ivana.petrova",
	},
	"3": {
		id: "3",
		firstName: "Nikolay",
		lastName: "Dimitrov",
		username: "nikolay.dimitrov",
	},
	"4": {
		id: "4",
		firstName: "Elena",
		lastName: "Georgieva",
		username: "elena.georgieva",
	},
	"5": {
		id: "5",
		firstName: "Stefan",
		lastName: "Kolev",
		username: "stefan.kolev",
	},
	"6": {
		id: "6",
		firstName: "Maria",
		lastName: "Stoyanova",
		username: "maria.stoyanova",
	},
	"7": {
		id: "7",
		firstName: "Viktor",
		lastName: "Hristov",
		username: "viktor.hristov",
	},
	"8": {
		id: "8",
		firstName: "Simona",
		lastName: "Ilieva",
		username: "simona.ilieva",
	},
	"9": {
		id: "9",
		firstName: "Dimitar",
		lastName: "Todorov",
		username: "dimitar.todorov",
	},
	"10": {
		id: "10",
		firstName: "Desislava",
		lastName: "Angelova",
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
