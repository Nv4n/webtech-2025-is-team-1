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
import { useGetApiProfile, useGetApiUsers } from "@/features/Profile/service/profileApiQueries";
import { useGetApiProjects } from "@/features/Project/service/ProjectApiQueries";
import {
	useGetApiTicket,
	useUpdateApiTicket,
} from "@/features/Ticket/service/ticketApiQueries";
import {
	Ticket,
	TicketSchema,
	TicketStatuses,
} from "@/features/Ticket/types/Ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

const inputStyle = "mx-[10px] my-0 w-[460px]";
const selectStyle = "mx-[10px] my-0 w-[150px]";
const itemStyle = "mx-[10px]";

export function TicketEditForm(id: string) {
	const { mutate: mutateTicket } = useUpdateApiTicket(id);
	const { data: updatedBy } = useGetApiProfile();
	const form = useForm<Ticket>({
		resolver: zodResolver(TicketSchema),
		defaultValues: {
			"createdAt": new Date().toLocaleString(),
			"updatedAt": new Date().toLocaleString(),
			"updatedBy": updatedBy?.id
		}
	});

	const { data: ticket, isLoading: isTicketLoading } = useGetApiTicket(id);
	const { data: users, isLoading: isUsersLoading } = useGetApiUsers();

	const { data: projects, isLoading: isProjectsLoading } =
		useGetApiProjects();

	/*useEffect(() => {
		if (ticket) {
			form.reset({ ...ticket });
		}
	}, [ticket]);*/

	async function onSubmit(data: Ticket) {
		mutateTicket(data);
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
	console.log(ticket);

	form.setValue("title", ticket.title);
	form.setValue("description", ticket.description);
	form.setValue("projectId", ticket.projectId);
	form.setValue("status", ticket.status);
	form.setValue("assigneeId", ticket.assigneeId);
	form.setValue("priority", ticket.priority);
	console.log(ticket);

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
											{TicketStatuses.map((status) => {
												return (
													<SelectItem
														key={status}
														value={status}
													>
														{status}
													</SelectItem>
												);
											})}
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
												users.map((user) => {
													return (
														<>
															{user.id && (
																<SelectItem
																	key={
																		user.id
																	}
																	value={
																		user.id
																	}
																>
																	{user.firstName +
																		" " +
																		user.lastName}
																</SelectItem>
															)}
														</>
													);
												})}
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
								className="cursor-pointer"
							>
								{"Submit"}
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
