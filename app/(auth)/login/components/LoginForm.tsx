"use client";

import { loginAction } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  if (state?.success) {
    redirect("/");
  }

  return (
    <div className="h-3/5 max-h-150 md:h-4/5 w-4/5 md:w-1/3 border-2 border-white rounded-2xl ">
      <form action={formAction} className="h-full flex flex-col justify-around">
        <div className="h-4/6 bg-[url(/login.webp)] bg-cover rounded-2xl rounded-b-[200px] "></div>
        <div className="h-3/6 flex flex-col justify-around">
          <div className="h-3/4 flex flex-col justify-around">
            <div className="flex flex-col items-center">
              <input
                className={`border-2 border-gray-400 rounded-sm w-3/5 pl-1 ${state?.error && "border-red-400"}`}
                type="text"
                name="email"
                id="email"
                defaultValue={state?.email}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col items-center">
              <input
                className={`border-2 border-gray-400 rounded-sm w-3/5 pl-1 ${state?.error && "border-red-400"}`}
                type="password"
                name="password"
                id="password"
                defaultValue={state?.password}
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-red-400 text-xs md:text-sm">
                {state?.error || ""}
              </p>
            </div>
          </div>
          <div className="h-1/2 flex flex-col items-center">
            <div className="h-2/4 text-center pr-2 pt-2">
              <p className="text-xs hidden md:text-sm">
                ¿Has olvidado tu contraseña? Haz click aquí
              </p>
            </div>
            <button
              disabled={isPending}
              className={`cursor-pointer border-2  w-25 h-7.5 rounded-2xl text-black ${isPending ? "bg-gray-400 border-gray-400" : "bg-white border-white"} `}
            >
              {isPending ? "Enviando.." : "Enviar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
