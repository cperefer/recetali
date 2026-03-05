import { Recipe } from "@/app/generated/prisma/client";
import { RecipeFormHeader } from "./RecipeFormHeader";
import { RecipeFormInformation } from "./RecipeFormInformation";

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  console.log(recipe);
  return (
    <div className="w-full h-full px-3 md:px-5 pt-5 flex flex-col relative bg-gray-100 dark:bg-transparent">
      <RecipeFormHeader />
      <RecipeFormInformation />
    </div>
  );
}
