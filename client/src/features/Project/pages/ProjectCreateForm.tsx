import { Button } from "@/components/ui/button";
import {
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
	Project,
	ProjectCreate,
	ProjectCreateSchema,
	ProjectEdit,
} from "@/features/Project/types/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import "@xyflow/react/dist/style.css";
import { Form, useForm } from "react-hook-form";

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
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((data) => onSubmit(data))}
					className="space-y-6"
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

					<Button type="submit" disabled={false}>
						{false ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</>
	);
};
