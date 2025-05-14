import { useGetUserList } from "@/components/Profile/service/profileQueries";
import { useGetProjectList } from "@/components/Project/service/projectQueries";
import {
	useGetTicket,
	useUpdateTicket,
} from "@/components/Ticket/service/ticketQueries";
import { Ticket, TicketSchema } from "@/components/Ticket/types/Ticket";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function TicketEditForm(id: string) {
	const form = useForm<Ticket>({
		resolver: zodResolver(TicketSchema),
		defaultValues: {
			title: "Default title",
			status: "not-started",
			priority: "Low",
			description: "Default description",
			createdAt: new Date(),
			project: "1",
			updatedAt: new Date(),
			updatedBy: "1",
			id: id,
			assignee: "1",
			author: "1",
		},
	});

	const { data: ticket, isLoading: isTicketLoading } = useGetTicket(id);
	const { data: users, isLoading: isUsersLoading } = useGetUserList();
	const { data: projects, isLoading: isProjectsLoading } =
		useGetProjectList();

	const { mutation: updateTicket } = useUpdateTicket(id);

	function onSubmit(data: Ticket) {
		console.log(data);

		data.updatedAt = new Date();
		if (!data.assignee) {
			data.assignee = ticket?.assignee;
		}
		if (!data.id) {
			data.id = id;
		}
		if (!data.updatedBy) {
			data.updatedBy = ticket?.updatedBy || data.updatedBy;
		}
		if (!data.project) {
			data.project = ticket?.project || data.project;
		}
		updateTicket.mutate(data);
	}

	if (isTicketLoading || isUsersLoading || isProjectsLoading) {
		return (
			<>
				<div className="mx-auto my-0 w-fit flex-col space-y-3">
					<Skeleton className="h-[125px] w-[250px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</>
		);
	}

	if (!ticket) {
		throw new Error("No such ticket");
	}
	// form.reset({ ...ticket });

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((data) => onSubmit(data))}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter title"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={ticket.status || field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="not-started">
											Not started
										</SelectItem>
										<SelectItem value="in-progress">
											In progress
										</SelectItem>
										<SelectItem value="completed">
											Completed
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="assignee"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Asignee</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={
										ticket.assignee || field.value
									}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select asignees" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{users &&
											Object.values(users).map((user) => (
												<SelectItem
													key={user.id}
													value={user.id || ""}
												>
													{user.fname} {user.lname}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="updatedBy"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Updated By</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={
										ticket.updatedBy || field.value
									}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select user" />
										</SelectTrigger>
									</FormControl>

									<SelectContent>
										{users &&
											Object.values(users).map((user) => (
												<SelectItem
													key={user.id}
													value={user.id || ""}
												>
													{user.fname} {user.lname}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="project"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project</FormLabel>

								<Select
									defaultValue={ticket.project || field.value}
									onValueChange={field.onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select project" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{projects &&
											Object.values(projects).map(
												(project) => (
													<SelectItem
														key={project.id}
														value={project.id || ""}
													>
														{project.name}
													</SelectItem>
												)
											)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="priority"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Priority</FormLabel>

								<Select
									defaultValue={
										ticket.priority || field.value
									}
									onValueChange={field.onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select priority" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Object.values(
											TicketSchema.shape.priority.options
										).map((priority) => (
											<SelectItem
												key={priority}
												value={priority}
											>
												{priority}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={updateTicket.isPending}>
						{updateTicket.isPending ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</>
	);
}
