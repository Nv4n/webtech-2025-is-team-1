import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetUserList } from "@/features/Profile/service/profileQueries";
import { useGetProjectList } from "@/features/Project/service/projectQueries";
import {
	useGetTicket,
	useUpdateTicket,
} from "@/features/Ticket/service/ticketQueries";
import { Ticket, TicketSchema } from "@/features/Ticket/types/Ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const inputStyle = "mx-[10px] my-0 w-[460px]";
const selectStyle = "mx-[10px] my-0 w-[150px]";
const itemStyle = "mx-[10px]";

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

	useEffect(() => {
		if (ticket) {
			form.reset({ ...ticket });
		}
	}, [ticket]);

	function onSubmit(data: Ticket) {
		data.updatedAt = new Date();
		if (!data.assignee) data.assignee = ticket?.assignee || data.assignee;
		if (!data.id) data.id = id;
		if (!data.project) data.project = ticket?.project || data.project;

		updateTicket.mutate(data);
	}

	if (isTicketLoading || isUsersLoading || isProjectsLoading) {
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

	if (!ticket) {
		throw new Error("No such ticket");
	}
	form.setValue("project", ticket.project);

	return (
		<Card className="mx-auto my-0 w-fit py-8">
			<CardHeader>
				<CardTitle>Edit ticket</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mx-auto w-xl space-y-6"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className={itemStyle}>
									<FormLabel>Title</FormLabel>
									<FormControl className={inputStyle}>
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
								<FormItem className={itemStyle}>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl className={selectStyle}>
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
								<FormItem className={itemStyle}>
									<FormLabel>Description</FormLabel>
									<FormControl className={inputStyle}>
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
								<FormItem className={itemStyle}>
									<FormLabel>Assignee</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl className={selectStyle}>
											<SelectTrigger>
												<SelectValue placeholder="Select assignee" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{users &&
												Object.values(users).map(
													(user) => (
														<SelectItem
															key={user.id}
															value={
																user.id || ""
															}
														>
															{user.fname}{" "}
															{user.lname}
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
							name="project"
							render={({ field }) => (
								<FormItem className={itemStyle}>
									<FormLabel>Project</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl className={selectStyle}>
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
															value={
																project.id || ""
															}
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
								<FormItem className={itemStyle}>
									<FormLabel>Priority</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl className={selectStyle}>
											<SelectTrigger>
												<SelectValue placeholder="Select priority" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(
												TicketSchema.shape.priority
													.options
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

						<div className="flex gap-2">
							<Button
								type="submit"
								variant="outline"
								disabled={updateTicket.isPending}
								className="cursor-pointer"
							>
								{updateTicket.isPending
									? "Submitting..."
									: "Submit"}
							</Button>

							<Link
								to="/tickets/$ticketId"
								params={{ ticketId: id }}
							>
								<Button
									variant="default"
									className="cursor-pointer"
								>
									Cancel
								</Button>
							</Link>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
