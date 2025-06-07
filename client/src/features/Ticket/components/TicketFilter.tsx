"use client";

import { MultiSelect } from "@/components/ui/multi-select";
import { serverAddr } from "@/config/config";
import { FakeProjectApi } from "@/features/Project/service/projectApi";
import { TicketStatuses } from "@/features/Ticket/types/Ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { FolderDot, ListTodo } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

function getStatusFilterList() {
	return TicketStatuses.map((status) => {
		return {
			value: status,
			label: status.replace(/([a-z])([A-Z])/g, "$1 $2").split(" "),
			icon: ListTodo,
		};
	});
}
const statusFiltersList = getStatusFilterList();

export const filtersSchema = z.object({
	projectsFilters: z.array(z.string()).optional(),
	statusesFilters: z.array(z.string()).optional(),
});

export function TicketsFilter() {
	type FormData = {
		projectsFilters?: string[];
		statusesFilters?: string[];
	};
	const { data: projectFiltersList } = useQuery({
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

		const onSubmit = async (data: FormData) => {
			/*const queryParams = new URLSearchParams();

			if (data.projectsFilters?.length) {
				queryParams.append("projects", data.projectsFilters.join(","));
			}

			if (data.statusesFilters?.length) {
				queryParams.append("statuses", data.statusesFilters.join(","));
			}*/

			// TODO: to be implemented with the end end-point of the back-end
			const res = await fetch(
				//`/api/tickets?${queryParams.toString()}`
				`${serverAddr}/api/tickets/filter?projectIds=${data.projectsFilters}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(res);
			// You can now store these in state and render them
		};

		return (
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex flex-wrap gap-4">
					<div className="min-w-[250px] flex-1">
						<label
							htmlFor="projectsFilters"
							className="mb-1 block text-sm font-medium text-gray-700"
						>
							Select Filters By Projects
						</label>
						<Controller
							name="projectsFilters"
							control={control}
							render={({ field }) => (
								<MultiSelect
									id="projectsFilters"
									name="projectsFilters"
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

					<div className="min-w-[250px] flex-1">
						<label
							htmlFor="statusesFilters"
							className="mb-1 block text-sm font-medium text-gray-700"
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
