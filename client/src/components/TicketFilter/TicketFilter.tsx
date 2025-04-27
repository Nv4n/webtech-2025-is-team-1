import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { LabelSpan } from "../LabelSpan";
import { Input } from "../ui/input";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

export function TicketFilter() {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
	};

	const handleApplyFilters = () => {
		console.log("Filters applied");
		setIsOpen(false);
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="cursor-pointer">
					Filter By
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-accent dark:bg-accent z-10 rounded-lg border border-gray-300 px-3 py-2 transition-all dark:border-gray-600">
				<DropdownMenuLabel>Filter by</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Input placeholder="Keyword/s..." />
					</DropdownMenuItem>
					<div className="py-3">
						<LabelSpan content={"Status"} />
					</div>
					<DropdownMenuItem className="py-1">
						<div className="flex items-center space-x-2">
							<Checkbox id="not-started" />
							<label
								htmlFor="not-started"
								className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								not-started
							</label>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem className="py-1">
						<div className="flex items-center space-x-2">
							<Checkbox id="in-progress" />
							<label
								htmlFor="in-progress"
								className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								in-progress
							</label>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem className="pt-1 pb-3">
						<div className="flex items-center space-x-2">
							<Checkbox id="completed" />
							<label
								htmlFor="completed"
								className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								completed
							</label>
						</div>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<Button
					variant="outline"
					className="cursor-pointer bg-primary/70 dark:bg-primary/70"
					onClick={handleApplyFilters}
				>
					Apply filters
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
