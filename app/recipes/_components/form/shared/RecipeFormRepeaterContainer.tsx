"use client";
import { RecipeFormSectionTitle } from "./RecipeFormSectionTitle";
import { RecipeFormRepeater } from "./RecipeFormRepeater";

interface Props {
  textTitle: string;
  textButton: string;
  fieldName: string;
}
export function RecipeFormRepiterContainer({
  textTitle,
  fieldName,
  textButton,
}: Props) {
  return (
    <div className="p-2 border bg-white dark:bg-transparent rounded-xl h-fit">
      <RecipeFormSectionTitle text={textTitle} />
      <RecipeFormRepeater name={fieldName} textButton={textButton} />
    </div>
  );
}
