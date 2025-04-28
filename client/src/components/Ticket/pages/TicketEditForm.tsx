"use client";

import { FakeProfileApi } from "@/components/Profile/service/profileApi";
import { FakeProjectApi } from "@/components/Project/service/projectApi";
import {
	FakeTicketApi
} from "@/components/Ticket/service/ticketApi";
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
import {
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function TicketEditForm(id: string) {
	const form = useForm<Ticket>({
		resolver: zodResolver(TicketSchema),
		defaultValues: {
			title: "",
			status: "not-started",
			description: "",
			asignedTo: "",
			createdAt: new Date(),
			updatedAt: new Date(),
			updatedBy: "",
			project: "",
		},
	});
	const queryClient = useQueryClient();

	const { data: ticket, isLoading: isTicketLoading } = useQuery({
		queryKey: ["tickets", id],
		queryFn: () => FakeTicketApi().getTicketDetails(),
		select: (data) => {
			console.log(data);
			console.log(id);

			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
		},
	});
	console.log(ticket);

	const { data: users, isLoading: isUsersLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
	});

	const { data: projects, isLoading: isProjectsLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: () => {
			return FakeProjectApi().getProjectList();
		},
	});

	const mutation = useMutation({
		mutationFn: (data: Ticket) => {
			return FakeTicketApi().updateTicket(data);
		},
		onSuccess: () => {
			toast.success("Ticket created successfully!");
			queryClient.invalidateQueries({ queryKey: ["tickets", id] });
		},
		onError: () => {
			toast.error("Failed to create ticket.");
		},
	});

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

	function onSubmit(data: Ticket) {
		data = form.getValues();
		data.updatedAt = new Date();
		if (!data.asignedTo) {
			data.asignedTo = ticket?.asignedTo;
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
		mutation.mutate(data);
	}

	form.setValue("title", ticket?.title || "");
	form.setValue("description", ticket?.description || "");
	return (
		ticket && (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
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
									defaultValue={ticket.status}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a verified email to display" />
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
						name="asignedTo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Asignee</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
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
									defaultValue={field.value}
									onValueChange={field.onChange}
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
									defaultValue={field.value}
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

					<Button type="submit" disabled={mutation.isPending}>
						{mutation.isPending ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		)
	);
}
