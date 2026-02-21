import { Recipe } from "@/app/generated/prisma/client";
import { RecipeHeader } from "./RecipeHeader";

export function RecipeView({ recipe }: { recipe: Recipe }) {
  return (
    <div className="flex flex-col relative w-full h-full">
      <RecipeHeader
        imageUrl={recipe.imageUrl}
        title={recipe.name}
        dificulty={recipe.dificulty}
        people={recipe.pax}
        time={recipe.timeToDone}
      />
    </div>
  );
}
