"use client";

import {
	createTicket,
	FakeTicketApi,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function TicketEditForm(id: string) {
	const { data: ticket } = useQuery({
		queryKey: ["tickets", id],
		queryFn: () => FakeTicketApi().getTicketDetails(),
		select: (data) => {
			Object.entries(data).filter(([key, _]) => {
				key === id;
			})[0][1];
		},
	});

	const { data: users } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return Faket;
		},
	});

	const { data: projects } = useQuery({
		queryKey: ["projects"],
		queryFn: () => {},
	});

	const FormTicketSchema = TicketSchema.omit({
		project: true,
		asignedTo: true,
		updatedBy: true,
	}).extend({ project: z.string(), asignedTo: z.string() });

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
