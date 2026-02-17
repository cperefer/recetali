import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row justify-center align-middle items-center w-full h-screen">
      {children}
    </div>
  );
}
