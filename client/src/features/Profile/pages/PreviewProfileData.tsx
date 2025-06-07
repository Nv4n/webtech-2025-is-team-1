import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { serverAddr } from "@/config/config";
import { getCookie } from "@/features/Auth/utils/cookies";
import { ProfileHoverCardProps } from "@/features/Profile/components/ProfileHoverCard";
import { FakeFullProfileApi } from "@/features/Profile/service/fullProfileApi";
import { ProfileSchema } from "@/features/Profile/types/Profile";
import { getInitials } from "@/features/Profile/utils/getInitials";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

function getProfileDataWithFakeApi({ id }: ProfileHoverCardProps) {
	const { data } = useQuery({
		queryKey: ["fullDataUsers", id],
		queryFn: () => FakeFullProfileApi().getFullProfileList(),
		select: (data) =>
			Object.entries(data).filter(([key]) => key === id)[0][1],
	});
	return { data };
}

export function ProfileData({ id }: ProfileHoverCardProps) {
	const navigate = useNavigate();
	const { data: profileData, isLoading: isProfileLoading } = useQuery({
		queryKey: ["fullDataUsers", id],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/users/me`, {
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
			});
			if (!(res.status >= 400)) {
				navigate({ to: "/" });
			}
			const jsonedProfile = await res.json();
			const parsedProfile = ProfileSchema.safeParse(jsonedProfile);
			if (parsedProfile.success) {
				return parsedProfile.data;
			} else {
				console.log(`${parsedProfile.error}`);
			}
		},
	});

	if (isProfileLoading) {
		return (
			<div className="mx-auto my-0 w-fit flex-col space-y-3">
				<Skeleton className="h-[125px] w-[250px] rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		);
	}

	if (!profileData) return null;

	return (
		<div className="bg-secondary mx-auto mt-10 max-w-md space-y-6 rounded-2xl p-6 text-gray-800 shadow-md">
			<div className="flex items-center space-x-4">
				<Avatar className="h-10 w-10 rounded-full bg-zinc-800">
					<AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-white dark:bg-black">
						{getInitials(
							profileData?.firstName || "",
							profileData?.lastName || ""
						)}
					</AvatarFallback>
				</Avatar>
				<div className="space-y-1">
					<h2 className="text-lg font-semibold text-gray-600">
						{profileData.firstName} {profileData.lastName}
					</h2>
					<div className="flex flex-wrap gap-2">
						<Badge variant="secondary">
							{profileData.username}
						</Badge>
						<Badge variant="outline">{profileData.role}</Badge>
					</div>
				</div>
			</div>

			<div className="space-y-1">
				<p className="text-sm font-medium text-gray-600">
					Account Created:
				</p>
				<Badge className="bg-blue-500 dark:bg-blue-700">
					{new Date(profileData.createdAt).toLocaleDateString(
						"en-US",
						{
							year: "numeric",
							month: "long",
							day: "numeric",
						}
					)}
				</Badge>
			</div>

			<div className="w-full space-y-2">
				<div className="mb-2 flex space-x-2">
					<Link to="/profile" className="flex-1">
						<Button
							variant="outline"
							className="w-full text-gray-600 dark:text-white"
						>
							Change Password
						</Button>
					</Link>
					<Link
						to="/profile-edit"
						className="bg-primary flex-1 rounded-full text-gray-600 dark:text-white"
					>
						<Button variant="outline" className="w-full flex-1">
							Edit
						</Button>
					</Link>
				</div>

				<Link
					to="/login"
					className={cn(
						"hover:bg-muted flex w-full items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 transition dark:text-white",
						navigationMenuTriggerStyle()
					)}
					data-slot="navigation-menu-link"
				>
					<LogOut className="h-4 w-4" />
					Log Out
				</Link>
			</div>
		</div>
	);
}
