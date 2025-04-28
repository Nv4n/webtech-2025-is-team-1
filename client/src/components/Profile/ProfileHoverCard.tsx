import { FakeProfileApi } from "@/components/Profile/service/profileApi";
import { getInitials } from "@/components/Profile/utils/getInitials";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "lucide-react";

interface ProfileHoverCardProps {
	id: string;
}

export const ProfileHoverCard = ({ id }: ProfileHoverCardProps) => {
	const { data: profile, isLoading } = useQuery({
		queryKey: ["users", id],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
		select: (data) => {
			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
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
		!!profile && (
			<>
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarFallback>
							{getInitials(profile.fname, profile.lname)}
						</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">
							{profile.username}
						</h4>
						<p className="text-sm">
							{profile.fname} {profile.lname} is Senior Java
							Developer with 3 years experience
						</p>
						<div className="flex items-center pt-2">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
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
