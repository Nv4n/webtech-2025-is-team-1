import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ProfileHoverCardProps } from "@/features/Profile/components/ProfileHoverCard";
import { FakeFullProfileApi } from "@/features/Profile/service/fullProfileApi";
import { getInitials } from "@/features/Profile/utils/getInitials";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export function ProfileData({ id }: ProfileHoverCardProps) {
	const { data: profileData } = useQuery({
		queryKey: ["fullDataUsers", id],
		queryFn: () => FakeFullProfileApi().getFullProfileList(),
		select: (data) =>
			Object.entries(data).filter(([key]) => key === id)[0][1],
	});

	if (!profileData) return null;

	return (
		<div className="bg-secondary mx-auto mt-10 max-w-md space-y-6 rounded-2xl p-6 text-gray-800 shadow-md">
			<div className="flex items-center space-x-4">
				<Avatar className="h-10 w-10 rounded-full bg-zinc-800">
					<AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-zinc-800 dark:bg-black text-sm font-semibold text-white">
						{getInitials(
							profileData?.fname || "",
							profileData?.lname || ""
						)}
					</AvatarFallback>
				</Avatar>
				<div className="space-y-1">
					<h2 className="text-lg font-semibold text-gray-600">
						{profileData.fname} {profileData.lname}
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

			<div className="space-y-2 w-full">
				<div className="mb-2 flex space-x-2">
					<Link to="/profile" className="flex-1">
						<Button
							variant="outline"
							className="w-full text-gray-600 dark:text-white"
						>
							Change Password
						</Button>
					</Link>
					<Link to="/profile-edit" className="flex-1 bg-primary text-gray-600 dark:text-white rounded-full">
						<Button
							variant="outline"
							className="w-full flex-1"
						>
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
