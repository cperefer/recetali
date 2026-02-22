"use client";

import { Recipe, RecipeIngredient } from "@/app/generated/prisma/client";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeBadges } from "./RecipeBadges";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeSteps } from "./RecipeSteps";

type Props = {
  recipe: Recipe;
  ingredients: RecipeIngredient[];
};

export function RecipeView({ recipe, ingredients }: Props) {
  return (
    <div className="flex flex-col relative w-full h-full">
      <RecipeHeader
        imageUrl={recipe.imageUrl}
        title={recipe.name}
        dificulty={recipe.dificulty}
        people={recipe.pax}
        time={recipe.timeToDone}
      />
      <RecipeBadges
        dificulty={recipe.dificulty}
        people={recipe.pax}
        time={recipe.timeToDone}
      />
      <div className="flex flex-col md:flex-row items-center md:items-baseline pr-4 md:gap-8">
        <RecipeIngredients ingredients={ingredients} />
        <RecipeSteps steps={recipe.steps} />
      </div>
    </div>
  );
}
