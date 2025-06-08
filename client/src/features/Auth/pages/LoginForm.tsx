import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { serverAddr } from "@/config/config";
import {
	AuthResponseSchema,
	LoginSchema,
	LoginUser,
} from "@/features/Auth/types/AuthUser";
import { setCookie } from "@/features/Auth/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
	const navigate = useNavigate();
	const form = useForm<LoginUser>({
		resolver: zodResolver(LoginSchema),
	});

	async function onSubmit(data: LoginUser) {
		const res = await fetch(`${serverAddr}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const deseril = await res.json();

		const authResp = AuthResponseSchema.safeParse(deseril);

		if (authResp.success) {
			setCookie("authtoken", authResp.data.token);
			navigate({ to: "/" });
		} else {
			toast.error(authResp.error.message);
		}
	}

	return (
		<>
			<Card className="mx-auto my-0 w-fit min-w-[550px] py-4">
				<CardHeader className="mx-auto my-0">
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
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
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter your password"
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
									Login
								</Button>
								<Link
									to="/register"
									data-slot="navigation-menu-link"
								>
									<Button
										variant="outline"
										className="w-24 cursor-pointer"
									>
										Register
									</Button>
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}
