import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "lucide-react";
import { Profile } from "./types/Profile";
import { Skeleton } from "../ui/skeleton";
import { getInitials } from "./utils/getInitials";

const FakeUserApi = () => {
	const getProfile = (id: string) => {
		const profile: Profile = {
			fname: "Georgi",
			lname: "Petranov",
			username: "georgi_borimechka",
		};
		return new Promise<Profile>((resolve) => {
			setTimeout(() => {
				resolve(profile);
			}, 1000);
		});
	};

	return { getUser: getProfile };
};

interface ProfileHoverCardProps {
	id: string;
}

export const ProfileHoverCard = ({ id }: ProfileHoverCardProps) => {
	const { data, isLoading } = useQuery({
		queryKey: ["user", id],
		queryFn: () => {
			return FakeUserApi().getUser(id);
		},
	});
	if (isLoading) {
		return (
			<>
				<div className="mx-auto my-0 w-fit flex-col space-y-3">
					<Skeleton className="h-[125px] w-[250px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</>
		);
	}
	return (
		!!data && (
			<>
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarFallback>
							{getInitials(data.fname, data.lname)}
						</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">{data.fname}</h4>
						<p className="text-sm">
							Senior Java Developer with 3 years experience
						</p>
						<div className="flex items-center pt-2">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
							<span className="text-muted-foreground text-xs">
								Joined December 2020
							</span>
						</div>
					</div>
				</div>
			</>
		)
	);
};
