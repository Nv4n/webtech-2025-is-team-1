import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteCookie } from "@/features/Auth/utils/cookies";
import { useGetApiProfile } from "@/features/Profile/service/profileApiQueries";
import { getInitials } from "@/features/Profile/utils/getInitials";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export function ProfileData() {
	const navigate = useNavigate();
	const { data: profileData, isLoading: isProfileLoading } =
		useGetApiProfile();

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

	function onLogOut() {
		deleteCookie("authtoken");
		navigate({ to: "/login" });
	}

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
						{/* <Badge variant="outline">{profileData.role}</Badge> */}
					</div>
				</div>
			</div>

			<div className="space-y-1">
				<p className="text-sm font-medium text-gray-600">
					Account Created:
				</p>
				{/* <Badge className="bg-blue-500 dark:bg-blue-700">
					{new Date(profileData.createdAt).toLocaleDateString(
						"en-US",
						{
							year: "numeric",
							month: "long",
							day: "numeric",
						}
					)}
				</Badge> */}
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
						to="/profile/edit"
						className="bg-primary flex-1 rounded-full text-gray-600 dark:text-white"
					>
						<Button variant="outline" className="w-full flex-1">
							Edit
						</Button>
					</Link>
				</div>

				<Button
					onClick={onLogOut}
					// variant=""
					data-slot="navigation-menu-link"
				>
					<LogOut className="h-4 w-4" />
					Log Out
				</Button>
			</div>
		</div>
	);
}
