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
import MultipleSelector from "@/components/ui/multiple-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiUsers } from "@/features/Profile/service/profileApiQueries";
import { useGetApiProjects } from "@/features/Project/service/ProjectApiQueries";
import {
	TicketFilter,
	TicketFilterForm,
	TicketFilterFormSchema,
	TicketTransformSchema,
} from "@/features/Ticket/types/TicketFilter";
import {
	getProjectFilterList,
	getStatusFilterList,
	getUsersFilterList,
} from "@/features/Ticket/utils/filterUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

const statusFiltersList = getStatusFilterList();

export function TicketsFilter() {
	const navigate = useNavigate();

	const { data: projects, isLoading: isProjectsLoading } =
		useGetApiProjects();

	const { data: users, isLoading: isUsersLoading } = useGetApiUsers();

	const form = useForm<TicketFilterForm>({
		resolver: zodResolver(TicketFilterFormSchema),
		defaultValues: {
			projectIds: [],
			assigneeIds: [],
			statuses: [],
		},
	});

	const onSubmit = async (data: TicketFilterForm) => {
		const filter = TicketTransformSchema.parse(data) as TicketFilter;
		console.log(filter);

		navigate({
			to: "/tickets/filter",
			search: filter,
		});
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
						name="statuses"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Statuses</FormLabel>
								<FormControl>
									<MultipleSelector
										{...field}
										defaultOptions={statusFiltersList}
										placeholder="Select statuses"
										emptyIndicator={
											<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
												no results found.
											</p>
										}
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
								<FormLabel>Assignees</FormLabel>
								<FormControl>
									<MultipleSelector
										{...field}
										defaultOptions={getUsersFilterList(
											users || []
										)}
										placeholder="Select assignees"
										emptyIndicator={
											<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
												no results found.
											</p>
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="projectIds"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Projects</FormLabel>
								<FormControl>
									<MultipleSelector
										{...field}
										defaultOptions={getProjectFilterList(
											projects || []
										)}
										placeholder="Select projects"
										emptyIndicator={
											<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
												no results found.
											</p>
										}
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
