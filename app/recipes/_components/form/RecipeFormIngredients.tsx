"use client";

import { RecipeFormSectionTitle } from "./shared/RecipeFormSectionTitle";
import { RecipeFormRepeater } from "./shared/RecipeFormRepeater";

export function RecipeFormIngredients() {
  return (
    <div className="border rounded-xl min-h-67 h-full">
      <RecipeFormSectionTitle text="Ingredientes" />
      <RecipeFormRepeater text="Añadir ingrediente" />
    </div>
  );
}
