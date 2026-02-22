"use client";

import { RecipeIngredient } from "@/app/generated/prisma/client";

export function RecipeIngredients({
  ingredients,
}: {
  ingredients: RecipeIngredient[];
}) {
  // Sticky on desktop
  return (
    <div className="px-2 pt-2 mt-5 md:ml-8 w-9/10 md:w-1/4 rounded-md border-t-2 border-t-amber-600 shadow-md dark:shadow-xs dark:shadow-amber-600/30">
      <div className="border-b border-gray-200/60 text-xl pb-2 pl-1">
        Ingredientes
      </div>
      <div className="pl-5 mt-1 pb-4">
        <ul className="list-disc">
          {ingredients.map((recipeIngredient: RecipeIngredient) => (
            <li key={recipeIngredient.id}>{recipeIngredient.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
