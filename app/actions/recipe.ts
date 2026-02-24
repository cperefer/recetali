"use server";

import { auth } from "@/auth";
import {
  getRecipeBySlug,
  insertFavoriteRecipe,
  removeFavoriteRecipe,
} from "@/lib/dal";
import { revalidatePath } from "next/cache";

export const toggleRecipeAction = async (slug: string, isFavorite: boolean) => {
  const session = await auth();

  if (!session) {
    throw new Error("No session provided");
  }

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    throw new Error("No correct recipe provided");
  }

  try {
    if (isFavorite) {
      await removeFavoriteRecipe(Number(session.user.id), Number(recipe?.id));
    } else {
      await insertFavoriteRecipe(Number(session.user.id), Number(recipe?.id));
    }

    revalidatePath(`/recetas/${slug}`);
  } catch (error) {
    console.error(error);
  }
};
