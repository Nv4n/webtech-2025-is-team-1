import { FakeProfileApi } from "@/features/Profile/service/profileApi";
import { Profile } from "@/features/Profile/types/Profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useGetUserList = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
	});
	return { data, isLoading };
};

export const useGetUser = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
		select: (data) => {
			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
		},
	});
	return { data, isLoading };
};

export const useUpdateUser = (id: string) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: Profile) => {
			return FakeProfileApi().updateProfile(data);
		},
		onSuccess: () => {
			toast.success("Profile updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["users", id] });
			navigate({
				to: "/profile",
			});
		},
		onError: () => {
			toast.error("Failed to update profile.");
		},
	});
	return { mutation };
};

