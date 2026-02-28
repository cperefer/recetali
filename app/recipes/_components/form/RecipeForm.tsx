import { Recipe } from "@/app/generated/prisma/client";
import { RecipeFormHeader } from "./RecipeFormHeader";

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  console.log(recipe);
  return (
    <div>
      <RecipeFormHeader />
    </div>
  );
}
