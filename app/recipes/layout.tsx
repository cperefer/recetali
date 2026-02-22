import { PropsWithChildren } from "react";

export default function RecipeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center w-screen min-h-screen">{children}</div>
  );
}
