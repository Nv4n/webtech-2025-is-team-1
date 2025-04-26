import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserHoverCardProps } from "@/components/Profile/types/UserHoverCardProps";
import { LabelSpan } from "@/components/LabelSpan";

export function UserHoverCard({
	labelContent,
	initials,
	fullName,
	email,
}: UserHoverCardProps) {
	return (
		<div className="flex items-center space-x-2">
			<LabelSpan content={labelContent}/>
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
							<LabelSpan content="Email:"/>
								<pre>{email}</pre>
							</div>
						</HoverCardContent>
					</HoverCard>
				</AvatarFallback>
			</Avatar>
		</div>
	);
}