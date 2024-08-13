import z from "zod";

const userSchema = z.object({
  avatar: z.optional(z.string()).default(null),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}
