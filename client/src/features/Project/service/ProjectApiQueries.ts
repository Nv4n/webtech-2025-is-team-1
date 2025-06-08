import { serverAddr } from "@/config/config";
import { getCookie } from "@/features/Auth/utils/cookies";
import { ProjectSchema } from "@/features/Project/types/Project";
import { useQuery } from "@tanstack/react-query";

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
			const parsedProjects = ProjectSchema.safeParse(jsonedProjects);
			if (parsedProjects.success) {
				return parsedProjects.data;
			} else {
				console.log(`${parsedProjects.error}`);
			}
		},
	});
	return { data, isLoading };
};
