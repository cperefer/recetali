import { Recipe, RecipeIngredient } from "@/app/generated/prisma/client";
import { RecipeHeader } from "./RecipeHeader";
import RecipeBadges from "./RecipeBadges";
import { RecipeIngredients } from "./RecipeIngredients";

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
      <RecipeIngredients ingredients={ingredients} />
    </div>
  );
}
