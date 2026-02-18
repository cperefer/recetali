"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
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
      errors: validateFields.error.flatten().fieldErrors,
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
    console.log(error);
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
};
