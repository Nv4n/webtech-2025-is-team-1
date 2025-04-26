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
};

export function User({
	labelContent,
	initials,
	fullName,
}: UserComponentProps) {
	return (
		<div className="flex items-center space-x-2">
			<label>{labelContent}</label>
			<Avatar>
				<AvatarFallback>
					<HoverCard>
						<HoverCardTrigger>{initials}</HoverCardTrigger>
						<HoverCardContent>{fullName}</HoverCardContent>
					</HoverCard>
				</AvatarFallback>
			</Avatar>
		</div>
	);
}