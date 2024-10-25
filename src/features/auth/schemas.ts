import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
	name: z.string().trim().min(1, "You need to enter your name"),
	email: z.string().email(),
	password: z
		.string()
		.min(8, "You need to set a password with at least 8 Characters")
		.max(256),
});
