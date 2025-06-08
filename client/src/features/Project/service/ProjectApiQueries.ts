import { serverAddr } from "@/config/config";
import { getCookie } from "@/features/Auth/utils/cookies";
import { ProjectSchema } from "@/features/Project/types/Project";
import { useQuery } from "@tanstack/react-query";
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
			// console.log("PARSED PROJECTS = ", parsedProjects);
			// console.log("PARSED PROJECTS DATA = ", parsedProjects.data);
			if (parsedProjects.success) {
				return parsedProjects.data;
			} else {
				console.log(`${parsedProjects.error}`);
			}
		},
	});
	return { data, isLoading };
};
