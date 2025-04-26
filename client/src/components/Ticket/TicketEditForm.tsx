"use client";

import { fetchUsers, fetchProjects, createTicket } from "@/components/Ticket/service/ticketApi";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



export function TicketForm() {
	const form = useForm<Ticket>({
		resolver: zodResolver(TicketSchema),
		defaultValues: {
			title: "",
			status: "",
			description: "",
			asignedTo: "",
			createdAt: new Date(),
			updatedAt: new Date(),
			updatedBy: "",
			project: "",
		},
	});

	const { data: users } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	const { data: projects } = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	});

	const mutation = useMutation({
		mutationFn: createTicket,
		onSuccess: () => {
			toast.success("Ticket created successfully!");
			form.reset();
		},
		onError: () => {
			toast.error("Failed to create ticket.");
		},
	});

	function onSubmit(data: Ticket) {
		mutation.mutate(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter title" {...field} />
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
							<FormControl>
								<Input placeholder="Enter status" {...field} />
							</FormControl>
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
							<FormLabel>Asignees</FormLabel>
							<FormControl>
								<Select
									value={field.value[0]}
									onValueChange={(value) =>
										field.onChange(value)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select asignees" />
									</SelectTrigger>
									<SelectContent>
										{users?.map((user) => (
											<SelectItem
												key={user.id}
												value={user.id}
											>
												{user.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
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
							<FormControl>
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select user" />
									</SelectTrigger>
									<SelectContent>
										{users?.map((user) => (
											<SelectItem
												key={user.id}
												value={user.id}
											>
												{user.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
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
							<FormControl>
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select project" />
									</SelectTrigger>
									<SelectContent>
										{projects?.map((project) => (
											<SelectItem
												key={project.id}
												value={project.id}
											>
												{project.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={mutation.isPending}>
					{mutation.isPending ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
