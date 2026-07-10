"use client";
import { RecipeFormSectionTitle } from "./shared/RecipeFormSectionTitle";
import { RecipeFormRepeater } from "./shared/RecipeFormRepeater";

export function RecipeFormSteps() {
  return (
    <div className="p-2 border bg-white dark:bg-transparent rounded-xl h-fit">
      <RecipeFormSectionTitle text="Pasos" />
      <RecipeFormRepeater name="steps" textButton="Añadir paso" />
    </div>
  );
}
