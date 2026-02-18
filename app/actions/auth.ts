"use server";

import { validatePassword } from "@/lib/auth";
import { getUserByEmail } from "@/lib/dal";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Debe contener por lo menos 6 caracteres" }),
});

export type LoginActionResponse = {
  email?: string;
  password?: string;
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export const loginAction = async (
  _prevState: LoginActionResponse | null,
  form: FormData,
): Promise<LoginActionResponse> => {
  try {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    console.log({ email, password });

    const validateFields = loginSchema.safeParse({
      email,
      password,
    });

    if (!validateFields.success) {
      return {
        success: false,
        email,
        password,
        errors: validateFields.error.flatten().fieldErrors,
      };
    }

    const result = await getUserByEmail(email);

    if (!result) {
      return {
        success: false,
        email,
        password,
        message: "Email o contraseña no válidos",
        errors: {
          email: ["Email o contraseña no válidos"],
          password: ["Email o contraseña no válidos"],
        },
      };
    }

    const isValidPassword = await validatePassword(password, result.password);

    if (!isValidPassword) {
      return {
        success: false,
        email,
        password,
        message: "Email o contraseña no válidos",
        errors: {
          email: ["Email o contraseña no válidos"],
          password: ["Email o contraseña no válidos"],
        },
      };
    }

    return {
      email,
      password,
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Ha ocurrido un error",
    };
  }
};
