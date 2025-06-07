import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/features/Auth/types/AuthUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterUser = z.infer<typeof RegisterSchema>;

function RegisterForm() {
	const form = useForm<RegisterUser>({
		resolver: zodResolver(RegisterSchema),
	});

	function onSubmit(data: RegisterUser) {
		console.log(data);
		// TODO: Call register API
	}

	return (
		<>
			<Card className="mx-auto my-0 w-fit min-w-[550px] py-4">
				<CardHeader className="mx-auto my-0">
					<CardTitle>Register</CardTitle>
				</CardHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mx-auto w-full max-w-sm space-y-6"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Enter Username..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Enter Email..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter Password..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="rePassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Re-Enter Password..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-around gap-4">
							<Button
								type="submit"
								className="w-24 cursor-pointer"
							>
								Register
							</Button>
							<Link to="/login" data-slot="navigation-menu-link">
								<Button
									variant="outline"
									className="w-24 cursor-pointer"
								>
									Login
								</Button>
							</Link>
						</div>
					</form>
				</Form>
			</Card>
		</>
	);
}

export default RegisterForm;
