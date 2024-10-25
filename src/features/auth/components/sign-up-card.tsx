import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { DottetSeperator } from "@/components/dottet-seperator";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

export const SignUpCard = () => {
	const { mutate } = useRegister();
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof registerSchema>) => {
		mutate({ json: data });
	};
	return (
		<Card className='w-full h-full md:w-[487px] border-none shadow-none'>
			<CardHeader className='flex items-center justify-center text-center p-7'>
				<CardTitle className='text-2xl'>Sign Up</CardTitle>
				<CardDescription>
					By signing up, you agree to our{" "}
					<Link href='/terms-of-service'>Terms of Service</Link> and{" "}
					<Link href='/privacy'>Privacy Policy</Link>
				</CardDescription>
			</CardHeader>
			<div className='px-7'>
				<DottetSeperator />
			</div>
			<CardContent className='p-7'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type='text'
											placeholder='Enter your Name'
										/>
									</FormControl>
									<FormMessage {...field} />
								</FormItem>
							)}
						/>
						<FormField
							name='email'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type='email'
											placeholder='Enter email address'
										/>
									</FormControl>
									<FormMessage {...field} />
								</FormItem>
							)}
						/>
						<FormField
							name='password'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type='password'
											placeholder='Enter password'
										/>
									</FormControl>
									<FormMessage {...field} />
								</FormItem>
							)}
						/>

						<Button type='submit' size='lg' className='w-full' disabled={false}>
							Sign Up
						</Button>
					</form>
				</Form>
			</CardContent>
			<div className='px-7'>
				<DottetSeperator />
			</div>
			<CardContent className='p-7 flex flex-col gap-y-4'>
				<Button
					variant='secondary'
					type='button'
					size='lg'
					className='w-full'
					disabled={false}
				>
					<FcGoogle className='mr-2 size-5' /> Continue with Google
				</Button>
				<Button
					variant='secondary'
					type='button'
					size='lg'
					className='w-full'
					disabled={false}
				>
					<FaGithub className='mr-2 size-5' /> Continue with Github
				</Button>
			</CardContent>
			<div className='px-7'>
				<DottetSeperator />
			</div>
			<CardContent className='p-7 flex items-center justify-center'>
				<p>
					Already have an account? <Link href='/sign-in'>Login</Link>
				</p>
			</CardContent>
		</Card>
	);
};
