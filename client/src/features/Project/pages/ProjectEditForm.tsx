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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	useGetProject,
	useUpdateProject,
} from "@/features/Project/service/projectQueries";
import {
	Project,
	ProjectEdit,
	ProjectEditSchema,
} from "@/features/Project/types/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import "@xyflow/react/dist/style.css";
import { useForm } from "react-hook-form";

export function ProjectEditForm(id: string) {
	const form = useForm<ProjectEdit>({
		resolver: zodResolver(ProjectEditSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});
	const { data: project, isLoading: isProjectLoading } = useGetProject(id);
	const { isPending: updateProject } = useUpdateProject(id);

	if (isProjectLoading) {
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
	if (!project) {
		throw new Error("No such project");
	}

	const onSubmit = (data: ProjectEdit) => {
		console.log("Form Submitted:", data);
		const resProject: Project = {
			id: project?.id,
			name: data.name,
			description: data.description,
			createdAt: project.createdAt,
			workflowId: project.workflowId,
			ownerId: project.ownerId,
		};
		console.log(resProject);
	};

	form.setValue("name", project.name);
	form.setValue("description", project.description);

	return (
		<>
			<Card className="mx-auto my-0 w-fit py-8">
				<CardHeader>
					<CardTitle>Edit project</CardTitle>
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
									disabled={updateProject}
								>
									{updateProject ? "Submitting..." : "Submit"}
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
}
