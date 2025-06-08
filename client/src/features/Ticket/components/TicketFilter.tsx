"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Skeleton } from "@/components/ui/skeleton";
import {
	useGetApiFilteredUsers,
	useGetApiUsers,
} from "@/features/Profile/service/profileApiQueries";
import { useGetApiProjects } from "@/features/Project/service/ProjectApiQueries";
import { Project } from "@/features/Project/types/Project";
import {
	TicketFilter,
	TicketFilterSchema,
} from "@/features/Ticket/types/TicketFilter";
import {
	getProjectFilterList,
	getStatusFilterList,
	getUsersFilterList,
} from "@/features/Ticket/utils/filterUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ListTodo } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const statusFiltersList = getStatusFilterList();

export function TicketsFilter() {
	const navigate = useNavigate();

	const { data: projects, isLoading: isProjectsLoading } =
		useGetApiProjects();

	const { data: users, isLoading: isUsersLoading } = useGetApiUsers();

	const form = useForm<TicketFilter>({
		resolver: zodResolver(TicketFilterSchema),
		defaultValues: {
			projectIds: [],
			assigneeIds: [],
			statuses: [],
		},
	});

	const onSubmit = async (data: TicketFilter) => {
		console.log(data);

		navigate({ to: "/tickets/filter", search: data });
	};

	if (isProjectsLoading || isUsersLoading) {
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex flex-wrap gap-4">
					<FormField
						control={form.control}
						name="projectIds"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Select Filters By Projects
								</FormLabel>
								<FormControl>
									<MultiSelect
										name={field.name}
										options={getProjectFilterList(
											projects || []
										)}
										// onError={}
										onValueChange={field.onChange}
										placeholder="Select Filters By Projects"
										variant="inverted"
										animation={2}
										maxCount={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="assigneeIds"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Select Filters By Assignee
								</FormLabel>
								<FormControl>
									<MultiSelect
										name={field.name}
										options={getUsersFilterList(
											users || []
										)}
										onValueChange={field.onChange}
										placeholder="Select Filters By Assignee"
										variant="inverted"
										animation={2}
										maxCount={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="statuses"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<MultiSelect
										name={field.name}
										options={statusFiltersList}
										onValueChange={field.onChange}
										placeholder="Select Filters By Statuses"
										variant="inverted"
										animation={2}
										maxCount={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
