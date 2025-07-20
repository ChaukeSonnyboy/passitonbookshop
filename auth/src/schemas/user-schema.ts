import { z } from "zod";

const emailSchema = z
  .string()
  .email("Please provide a valid email!")
  .nonempty("Email field cannot be empty!");

const passwordSchema = z.string().nonempty("Password must be a valid string!");

//Schema to validate login/signin
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

//Schema to validate register/signup
export const registerSchema = loginSchema.extend({
  firstname: z.string().nonempty("Firstname must be a valid string!"),
  lastname: z.string().nonempty("Lastname must be a valid string!"),
  password: passwordSchema.min(
    8,
    "Password must contain a minimum of 8 chars!"
  ),
});
