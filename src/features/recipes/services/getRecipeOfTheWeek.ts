import { cache } from "react";
import { getRecipesForWeeklyHighlight } from "@/lib/dal";
import type { RecipeSummary } from "@/features/recipes/types/recipe";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const getIsoWeekNumber = (date: Date): number => {
  const current = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayOfWeek = (current.getUTCDay() + 6) % 7;
  current.setUTCDate(current.getUTCDate() - dayOfWeek + 3);

  const firstThursday = new Date(Date.UTC(current.getUTCFullYear(), 0, 4));
  const firstThursdayDayOfWeek = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(
    firstThursday.getUTCDate() - firstThursdayDayOfWeek + 3,
  );

  const weeksBetween =
    (current.getTime() - firstThursday.getTime()) / (7 * MILLISECONDS_PER_DAY);

  return 1 + Math.round(weeksBetween);
};

export const pickRecipeOfTheWeek = (
  recipes: RecipeSummary[],
  referenceDate: Date = new Date(),
): RecipeSummary | null => {
  if (recipes.length === 0) {
    return null;
  }

  const weekNumber = getIsoWeekNumber(referenceDate);
  const index = weekNumber % recipes.length;

  return recipes[index];
};

export const getRecipeOfTheWeek = cache(
  async (): Promise<RecipeSummary | null> => {
    const recipes = await getRecipesForWeeklyHighlight();

    if (!recipes) {
      return null;
    }

    return pickRecipeOfTheWeek(recipes);
  },
);
