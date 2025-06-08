import { serverAddr } from "@/config/config";
import { getCookie } from "@/features/Auth/utils/cookies";
import { Project, ProjectEdit, ProjectSchema } from "@/features/Project/types/Project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const useGetApiProjects = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/projects`, {
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
			});

			const jsonedProjects = await res.json();
			const parsedProjects = z
				.array(ProjectSchema)
				.safeParse(jsonedProjects);
			if (parsedProjects.success) {
				return parsedProjects.data;
			} else {
				console.error(`${parsedProjects.error}`);
			}
		},
	});
	return { data, isLoading };
};

export const useGetApiProject = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["projects", id],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/projects/${id}`, {
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
			});

			const jsonedProject = await res.json();
			const parsedProject = (ProjectSchema).safeParse(jsonedProject);
			if (parsedProject.success) {
				return parsedProject.data;
			} else {
				console.error(`${parsedProject.error}`);
			}
		},
	});
	return { data, isLoading };
};

export const useUpdateApiProject = (id: string) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async (data: ProjectEdit) => {
			return await fetch(`${serverAddr}/api/projects/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
				body: JSON.stringify(data),
			});
		},
		onSuccess: () => {
			toast.success("Project updated successfully!");
			queryClient.invalidateQueries({
				queryKey: ["projects", id],
			});
			navigate({
				to: "/tickets", // we do not have view for project's details
			});
		},
		onError: () => {
			toast.error("Failed to update project.");
		},
	});
	return { mutate };
};

export const useCreateApiProject = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async (data: Project) => {
			return await fetch(`${serverAddr}/api/projects`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
				body: JSON.stringify(data),
			});
		},
		onSuccess: () => {
			toast.success("Project created successfully!");
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
			navigate({
				to: "/tickets", // We do not have all projects view so we go to the dashboard of tickets
			});
		},
		onError: () => {
			toast.error("Failed to create project.");
		},
	});
	return { mutate };
};