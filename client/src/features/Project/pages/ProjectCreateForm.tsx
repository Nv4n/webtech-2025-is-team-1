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
import { Textarea } from "@/components/ui/textarea";
import {
	ProjectCreate,
	ProjectCreateSchema,
	ProjectEdit,
} from "@/features/Project/types/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import "@xyflow/react/dist/style.css";
import { useForm } from "react-hook-form";

export const ProjectCreateForm = () => {
	const form = useForm<ProjectCreate>({
		resolver: zodResolver(ProjectCreateSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const onSubmit = (data: ProjectEdit) => {
		console.log("Form Submitted:", data);
	};

	return (
		<>
			<Card className="mx-auto my-0 w-fit py-8">
				<CardHeader>
					<CardTitle>Create project</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((data) =>
								onSubmit(data)
							)}
							className="w-xl space-y-6"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter name"
												{...field}
											/>
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

							<div className="flex gap-2">
								<Button
									type="submit"
									className="cursor-pointer"
									variant="outline"
									disabled={false}
								>
									{false ? "Submitting..." : "Submit"}
								</Button>

								<Link to="/">
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
		</>
	);
};
