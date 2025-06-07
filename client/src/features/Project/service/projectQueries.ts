import { FakeProjectApi } from "@/features/Project/service/projectApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useGetProjectList = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: () => {
			return FakeProjectApi().getProjectList();
		},
	});
	return { data, isLoading };
};

export const useGetProject = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["projects", id],
		queryFn: () => FakeProjectApi().getProjectList(),
		select: (data) => {
			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
		},
	});

	return { data, isLoading };
};

export const useUpdateProject = (id: string) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const isPending = false;
	return { isPending };
};
