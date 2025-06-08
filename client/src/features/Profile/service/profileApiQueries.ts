import { serverAddr } from "@/config/config";
import { getCookie } from "@/features/Auth/utils/cookies";
import {
	FetchingUserSchema,
	Profile,
	ProfileSchema,
	UserSchema,
} from "@/features/Profile/types/Profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const useGetApiProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["fullDataUsers", "me"],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/users/me`, {
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
			});

			const jsonedProfile = await res.json();
			const parsedProfile = ProfileSchema.safeParse(jsonedProfile);
			if (parsedProfile.success) {
				return parsedProfile.data;
			} else {
				console.error(`${parsedProfile.error}`);
			}
		},
	});
	return { data, isLoading };
};

export const useUpdateApiProfile = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async (data: Profile) => {
			return await fetch(`${serverAddr}/api/users/me`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
				body: JSON.stringify(data),
			});
		},
		onSuccess: () => {
			toast.success("Profile updated successfully!");
			queryClient.invalidateQueries({
				queryKey: ["fullDataUsers", "me"],
			});
			navigate({
				to: "/profile",
			});
		},
		onError: () => {
			toast.error("Failed to update profile.");
		},
	});
	return { mutate };
};

export const useGetApiUsers = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/users`, {
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
			});

			const jsonedUsers = await res.json();
			const parsedUsers = z
				.array(FetchingUserSchema)
				.safeParse(jsonedUsers);
			if (parsedUsers.success) {
				return parsedUsers.data;
			} else {
				console.error(`Parsed users error: ${parsedUsers.error}`);
			}
		},
	});
	return { data, isLoading };
};

export const useGetApiUser = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["users", id],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/users/${id}`, {
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
			});

			const jsonedUser = await res.json();
			const parsedUser = UserSchema.safeParse(jsonedUser);
			if (parsedUser.success) {
				return parsedUser.data;
			} else {
				console.error(`${parsedUser.error}`);
			}
		},
	});
	return { data, isLoading };
};
