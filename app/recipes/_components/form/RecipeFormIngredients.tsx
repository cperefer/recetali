"use client";

import { RecipeFormSectionTitle } from "./shared/RecipeFormSectionTitle";
import { RecipeFormRepeater } from "./shared/RecipeFormRepeater";

export function RecipeFormIngredients() {
  return (
    <div className="p-2 border bg-white dark:bg-transparent rounded-xl h-fit">
      <RecipeFormSectionTitle text="Ingredientes" />
      <RecipeFormRepeater name="ingredients" textButton="Añadir ingrediente" />
    </div>
  );
}
