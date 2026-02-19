import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-row justify-center align-middle items-center w-full h-screen">
      {children}
    </div>
  );
}
