import { auth } from "@/auth";
import MainHeader from "@/features/shared/MainHeader";
import { PropsWithChildren } from "react";

export default async function HomeLayout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <div className="p-3 flex flex-col items-center w-full min-w-sm h-screen">
      <div className="w-[98%] md:w-[90%] border border-gray-400/30 rounded-2xl">
        <MainHeader session={session} />
        {children}
      </div>
    </div>
  );
}
