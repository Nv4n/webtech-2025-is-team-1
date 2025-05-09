"use client";

import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { FolderDot, ListTodo } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FakeProjectApi } from "@/components/Project/service/projectApi";

const statusFiltersList = [
	{ value: "not-started", label: "Not Started", icon: ListTodo },
	{ value: "in-progress", label: "In Progress", icon: ListTodo },
	{ value: "completed", label: "Completed", icon: ListTodo },
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

	return (
		<div>
			<h1 className="mb-4 text-2xl font-bold">Tickets Filter</h1>

			<form className="flex max-w-2xl items-center gap-4 p-4">
				{projectFiltersList && !isPorjectFiltersLoading && (
					<MultiSelect
						name="projects-filters"
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
					name="statuses-filters"
					options={statusFiltersList}
					onValueChange={setSelectedFrameworks}
					defaultValue={selectedStatusFilters}
					placeholder="Select Filters By Status"
					variant="inverted"
					animation={2}
					maxCount={3}
				/>
				<Button type="submit">Apply Filters</Button>
			</form>
		</div>
	);
}

export const filtersSchema = z.object({
	projectsFilters: z.array(z.string()).optional(),
	statusesFilters: z.array(z.string()).optional(),
});

export function TestFilter() {
	type FormData = {
		projectsFilters?: string[];
		statusesFilters?: string[];
	};
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

	const FiltersForm = () => {
		const {
			control,
			handleSubmit,
			formState: { errors },
		} = useForm<FormData>({
			resolver: zodResolver(filtersSchema),
			defaultValues: {
				projectsFilters: [],
				statusesFilters: [],
			},
		});

		const onSubmit = (data: FormData) => {
			console.log("Selected Filters:", data);
		};

		return (
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label
						htmlFor="projectsFilters"
						className="block text-sm font-medium text-gray-700"
					>
						Select Filters By Projects
					</label>
					<Controller
						name="projectsFilters"
						control={control}
						render={({ field }) => (
							<MultiSelect
								name="projects-filters"
								options={projectFiltersList || []}
								onValueChange={field.onChange}
								placeholder="Select Filters By Projects"
								variant="inverted"
								animation={2}
								maxCount={3}
							/>
						)}
					/>
					{errors.projectsFilters && (
						<p className="text-sm text-red-500">
							{errors.projectsFilters.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="statusesFilters"
						className="block text-sm font-medium text-gray-700"
					>
						Select Filters By Status
					</label>
					<Controller
						name="statusesFilters"
						control={control}
						render={({ field }) => (
							<MultiSelect
								{...field}
								onValueChange={field.onChange}
								id="statusesFilters"
								options={statusFiltersList || []} 
								placeholder="Select Filters By Status"
								variant="inverted"
								animation={2}
								maxCount={3}
							/>
						)}
					/>
					{errors.statusesFilters && (
						<p className="text-sm text-red-500">
							{errors.statusesFilters.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
				>
					Submit
				</button>
			</form>
		);
	};
	return FiltersForm();
}
