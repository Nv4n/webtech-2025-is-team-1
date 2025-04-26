import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

type UserComponentProps = {
	labelContent: string;
	initials: string;
	fullName: string;
	email: string;
};

export function User({
	labelContent,
	initials,
	fullName,
	email,
}: UserComponentProps) {
	return (
		<div className="flex items-center space-x-2">
			<label>{labelContent}</label>
			<Avatar>
				<AvatarFallback>
					<HoverCard>
						<HoverCardTrigger>{initials}</HoverCardTrigger>
						<HoverCardContent>
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarFallback>{initials}</AvatarFallback>
								</Avatar>
								<pre>{fullName}</pre>
							</div>

							<hr className="my-2 border-t-3" />

							<div className="flex items-center space-x-2">
								<label className="font-semibold">Email:</label>
								<pre>{email}</pre>
							</div>
						</HoverCardContent>
					</HoverCard>
				</AvatarFallback>
			</Avatar>
		</div>
	);
}
