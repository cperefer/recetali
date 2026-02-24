import { cache } from "react";
import { prisma } from "./prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting user by email", error);

    return null;
  }
};

export const getUserByEmailWithRecipes = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
      include: {
        favorites: {
          select: {
            recipeId: true,
          },
        },
      },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting user by email", error);

    return null;
  }
};

export const getRecipeById = async (id: number) => {
  console.log({ id });

  try {
    const result = await prisma.recipe.findUnique({
      where: { id },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting recipe", error);

    return null;
  }
};

export const getRecipeBySlug = cache(async (slug: string) => {
  console.log({ slug });

  try {
    const result = await prisma.recipe.findUnique({
      where: { slug },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting recipe", error);

    return null;
  }
});

export const getRecipeIngredientsById = async (id: number) => {
  console.log({ id });

  try {
    const result = await prisma.recipeIngredient.findMany({
      where: { recipeId: id },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting recipe ingredients", error);

    return null;
  }
};

export const getRecipeFavoriteForUser = async (
  userId: number,
  recipeId: number,
) => {
  // console.log({ id });

  try {
    const result = await prisma.favorite.findUnique({
      where: { userId_recipeId: { userId, recipeId } },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting favorite", error);

    return null;
  }
};

export const insertFavoriteRecipe = async (
  userId: number,
  recipeId: number,
) => {
  // console.log({ id });

  try {
    const result = await prisma.favorite.create({
      data: {
        userId,
        recipeId,
      },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting favorite", error);

    return null;
  }
};

export const removeFavoriteRecipe = async (
  userId: number,
  recipeId: number,
) => {
  // console.log({ id });

  try {
    const result = await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    return result || null;
  } catch (error) {
    console.error("Error getting favorite", error);

    return null;
  }
};
