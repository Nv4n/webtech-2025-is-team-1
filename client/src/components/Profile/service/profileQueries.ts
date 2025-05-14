import { FakeProfileApi } from "@/components/Profile/service/profileApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUserList = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
	});
	return { data, isLoading };
};
