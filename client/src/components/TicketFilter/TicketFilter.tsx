"use client";

import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Cat, Dog, FolderDot, Turtle } from "lucide-react";
import { Button } from "../ui/button";
import { FakeProjectApi } from "../Project/service/projectApi";
import { useQuery } from "@tanstack/react-query";

const statusFiltersList = [
	{ value: "not-started", label: "Not Started", icon: Turtle },
	{ value: "in-progress", label: "In Progress", icon: Cat },
	{ value: "completed", label: "Completed", icon: Dog },
];

export function TicketFilter() {
	const [selectedStatusFilters, setSelectedFrameworks] = useState<string[]>(
		[]
	);
	const { data: projectFiltersList, isLoading: isPorjectFiltersLoading } =
		useQuery({
			queryKey: ["projects"],
			queryFn: async () => {
				return FakeProjectApi().getProjectList();
			},
			select: (data) => {
				return Object.entries(data).map(([_, value]) => {
					return {
						value: value.name.toLowerCase(),
						label: value.name,
						icon: FolderDot,
					};
				});
			},
		});

	if (projectFiltersList) {
	}
	return (
		<div>
			<h1 className="mb-4 text-2xl font-bold">Tickets Filter</h1>

			<div className="flex max-w-4xl flex-wrap items-center gap-4 p-4">
				{projectFiltersList && !isPorjectFiltersLoading && (
					<MultiSelect
						options={projectFiltersList}
						onValueChange={setSelectedFrameworks}
						defaultValue={selectedStatusFilters}
						placeholder="Select Filters By Projects"
						variant="inverted"
						animation={2}
						maxCount={3}
					/>
				)}
				<MultiSelect
					options={statusFiltersList}
					onValueChange={setSelectedFrameworks}
					defaultValue={selectedStatusFilters}
					placeholder="Select Filters By Status"
					variant="inverted"
					animation={2}
					maxCount={3}
				/>
				<Button>Apply Filters</Button>
			</div>
		</div>
	);
}
