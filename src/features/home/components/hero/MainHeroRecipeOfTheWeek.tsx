import { getRecipeOfTheWeek } from "@/features/recipes/services/getRecipeOfTheWeek";
import RecipeOfTheWeekCard from "@/features/recipes/components/shared/RecipeOfTheWeekCard";

export default async function MainHeroRecipeOfTheWeek() {
  const recipe = await getRecipeOfTheWeek();

  if (!recipe) {
    return null;
  }

  return <RecipeOfTheWeekCard recipe={recipe} />;
}
