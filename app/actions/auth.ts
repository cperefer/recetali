"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
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
  error?: string;
};

const GENERIC_ERROR = "Email o contraseña no válidos";
export const loginAction = async (
  _prevState: LoginActionResponse | null,
  form: FormData,
): Promise<LoginActionResponse> => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const validateFields = loginSchema.safeParse({
    email,
    password,
  });

  if (!validateFields.success) {
    return {
      success: false,
      email,
      password,
      error: GENERIC_ERROR,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      email,
      password,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage =
        error.type === "CredentialsSignin"
          ? GENERIC_ERROR
          : "Algo ha salido mal";

      return {
        success: false,
        email,
        password,
        message: "Email o contraseña no válidos",
        error: errorMessage,
      };
    }

    throw error;
  }
};
