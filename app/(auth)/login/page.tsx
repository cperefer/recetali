"use client";

import { loginAction } from "@/app/actions/auth";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="h-3/5 max-h-150 md:h-4/5 w-4/5 md:w-1/3 border-2 border-white rounded-2xl ">
      <form action={formAction} className="h-full flex flex-col justify-around">
        <div className="h-2/5"></div>
        <div className="h-3/5 flex flex-col justify-around">
          <div className="flex flex-col items-center">
            <input
              className={`border-2 border-gray-400 rounded-sm w-3/5 pl-1 ${state?.errors?.email && "border-red-400"}`}
              type="text"
              name="email"
              id="email"
              defaultValue={state?.email}
              placeholder="Email"
            />
          </div>
          <div>
            <div className="flex flex-col items-center">
              <input
                className={`border-2 border-gray-400 rounded-sm w-3/5 pl-1 ${state?.errors?.password && "border-red-400"}`}
                type="password"
                name="password"
                id="password"
                defaultValue={state?.password}
                placeholder="Password"
              />
            </div>
            <div className="text-right pr-2 pt-2">
              <p className="text-xs md:text-sm">
                ¿Has olvidado tu contraseña? Haz click aquí
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              disabled={isPending}
              className="cursor-pointer border-2 border-white w-25 h-7.5 rounded-2xl text-black bg-white"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
