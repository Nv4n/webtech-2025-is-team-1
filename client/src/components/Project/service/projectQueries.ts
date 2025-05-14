import { FakeProjectApi } from "@/components/Project/service/projectApi";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectList = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: () => {
			return FakeProjectApi().getProjectList();
		},
	});
	return { data, isLoading };
};
