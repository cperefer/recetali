import { PropsWithChildren } from "react";

export default function RecipesPage({ children }: PropsWithChildren) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
