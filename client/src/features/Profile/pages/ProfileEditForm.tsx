import { Button } from "@/components/ui/button";
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
import { serverAddr } from "@/config/config";
import {
	useGetUser,
	useUpdateUser,
} from "@/features/Profile/service/profileQueries";
import { Profile, ProfileSchema } from "@/features/Profile/types/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const inputStyle = "mx-[10px] my-0 w-[460px]";
const itemStyle = "mx-[10px]";

export function ProfileEditForm({ id }: { id: string }) {
	const form = useForm<Profile>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			id: id,
			firstName: "",
			lastName: "",
			username: "",
		},
	});
	const { data: user, isLoading: isUserLoading } = useGetUser(id);
	const { mutation: mutateUser } = useUpdateUser(id);

	useEffect(() => {
		if (user) {
			form.reset({ ...user });
		}
	}, [user]);

	function onSubmit(data: Profile) {
		mutateUser.mutate(data);
		const res = fetch(`${serverAddr}/api/users/me`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		console.log(res);
	}

	if (isUserLoading) {
		return (
			<div className="mx-auto my-0 w-fit flex-col space-y-3">
				<Skeleton className="h-[125px] w-[250px] rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto w-[550px] space-y-6"
			>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem className={itemStyle}>
							<FormLabel>First Name</FormLabel>
							<FormControl className={inputStyle}>
								<Input
									placeholder="Enter first name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem className={itemStyle}>
							<FormLabel>Last Name</FormLabel>
							<FormControl className={inputStyle}>
								<Input
									placeholder="Enter last name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className={itemStyle}>
							<FormLabel>Username</FormLabel>
							<FormControl className={inputStyle}>
								<Input
									placeholder="Enter username"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="mx-[10px] rounded-full">
					{"Save"}
				</Button>

				<Link
					to="/profile"
					className="rounded-full bg-red-700 px-4 py-2 text-center font-semibold text-white hover:bg-red-800"
				>
					Cancel
				</Link>
			</form>
		</Form>
	);
}
