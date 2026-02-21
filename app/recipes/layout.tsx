import { PropsWithChildren } from "react";

export default function RecipeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center w-screen h-screen py-5">
      <div
        className="w-9/10 md:w-8/10 border-2 border-amber-600 rounded-2xl p-2 overflow-hidden 
        "
      >
        <div
          className="w-full h-full pr-2 overflow-x-hidden overflow-y-scroll 
            [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-amber-700
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-amber-700"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
