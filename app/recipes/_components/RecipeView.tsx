"use client";

import { Recipe, RecipeIngredient } from "@/app/generated/prisma/client";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeBadges } from "./RecipeBadges";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeSteps } from "./RecipeSteps";
import { RecipeButtons } from "./RecipeButtons";

type Props = {
  recipe: Recipe;
  ingredients: RecipeIngredient[];
  isAuthenticated: boolean;
};

export function RecipeView({ recipe, ingredients, isAuthenticated }: Props) {
  return (
    <div className="flex flex-col relative w-full h-full">
      <RecipeHeader
        imageUrl={recipe.imageUrl}
        title={recipe.name}
        dificulty={recipe.dificulty}
        people={recipe.pax}
        time={recipe.timeToDone}
        isAuthenticated={isAuthenticated}
      />
      <RecipeBadges
        dificulty={recipe.dificulty}
        people={recipe.pax}
        time={recipe.timeToDone}
      />
      <div className="flex flex-col md:flex-row items-center md:items-baseline md:pr-4 md:gap-8 pb-22">
        <RecipeIngredients ingredients={ingredients} />
        <RecipeSteps steps={recipe.steps} />
      </div>
      <RecipeButtons isAuthenticated={isAuthenticated} />
    </div>
  );
}
