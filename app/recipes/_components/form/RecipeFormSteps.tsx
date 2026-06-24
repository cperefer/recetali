"use client";
import { RecipeFormSectionTitle } from "./shared/RecipeFormSectionTitle";
import { RecipeFormRepeater } from "./shared/RecipeFormRepeater";

export function RecipeFormSteps() {
  return (
    <div className="px-2 border bg-white dark:bg-transparent rounded-xl min-h-67">
      <RecipeFormSectionTitle text="Pasos" />
      <RecipeFormRepeater text="Añadir paso" />
    </div>
  );
}
