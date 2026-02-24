"use server";

import { auth } from "@/auth";
import {
  getRecipeBySlug,
  insertFavoriteRecipe,
  removeFavoriteRecipe,
} from "@/lib/dal";
import { revalidatePath } from "next/cache";

export const toggleRecipeAction = async (slug: string, isFavorite: boolean) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await auth();
  const recipe = await getRecipeBySlug(slug);

  const recipeId = Number(recipe?.id);

  try {
    if (isFavorite) {
      removeFavoriteRecipe(Number(session?.user.id), recipeId);
    } else {
      insertFavoriteRecipe(Number(session?.user.id), recipeId);
    }

    revalidatePath(`/recetas/${slug}`);
  } catch (error) {
    console.error(error);
  }
};
