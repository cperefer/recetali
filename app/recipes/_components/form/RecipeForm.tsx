import { Recipe } from "@/app/generated/prisma/client";
import { RecipeFormHeader } from "./RecipeFormHeader";
import { RecipeFormInformation } from "./RecipeFormInformation";
import { RecipeFormImage } from "./RecipeFormImage";

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  console.log(recipe);
  return (
    <div className="w-full h-full px-3 md:px-5 pt-5 flex flex-col relative bg-gray-100 dark:bg-transparent">
      <RecipeFormHeader />
      <div className="flex flex-col md:flex-row gap-4 w-full mt-2 md:mt-5">
        <div className="w-full md:w-2/3">
          <RecipeFormInformation />
        </div>
        <div className="w-full md:w-1/3">
          <RecipeFormImage />
        </div>
      </div>
    </div>
  );
}
