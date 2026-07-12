"use server";

import { auth } from "@/auth";
import {
  getRecipeBySlug,
  insertFavoriteRecipe,
  removeFavoriteRecipe,
} from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import {
  Dificulty,
  Recipe as RecipeType,
  RecipeCategory,
} from "../generated/prisma/client";

interface CreateRecipeProps extends Partial<RecipeType> {
  steps?: string[];
  ingredients?: string[];
  image?: File;
}

const RECIPE_IMAGES_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "recipes",
);

const saveRecipeImage = async (image: File, slug: string) => {
  const extension = path.extname(image.name) || ".jpg";
  const filename = `${slug}${extension}`;
  const buffer = Buffer.from(await image.arrayBuffer());

  await mkdir(RECIPE_IMAGES_DIR, { recursive: true });
  await writeFile(path.join(RECIPE_IMAGES_DIR, filename), buffer);

  return `/images/recipes/${filename}`;
};

const normalizeSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]+/g, "")
    .replace(/^_+|_+$/g, "") || `receta-${Date.now()}`;

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

export const createRecipe = async (recipe: CreateRecipeProps) => {
  const session = await auth();

  if (!session) {
    throw new Error("No session provided");
  }

  const slug = normalizeSlug(recipe.name ?? "receta");

  const steps = Array.isArray(recipe.steps)
    ? recipe.steps
        .filter(
          (step): step is string =>
            typeof step === "string" && step.trim().length > 0,
        )
        .map((step, index) => ({ step: step.trim(), order: index + 1 }))
    : [];

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
        .filter(
          (description): description is string =>
            typeof description === "string" && description.trim().length > 0,
        )
        .map((description) => ({ description: description.trim() }))
    : [];

  const imageUrl = recipe.image
    ? await saveRecipeImage(recipe.image, slug)
    : (recipe.imageUrl ?? "");

  const createdRecipe = await prisma.recipe.create({
    data: {
      name: recipe.name ?? "Receta sin título",
      slug,
      imageUrl,
      category: recipe.category ?? RecipeCategory.OTRO,
      userId: Number(session.user.id),
      observations: recipe.observations ?? "",
      timesDone: recipe.timesDone ?? 0,
      pax: Number(recipe.pax) ?? 2,
      dificulty: recipe.dificulty ?? Dificulty.EASY,
      timeToDone: Number(recipe.timeToDone) ?? 30,
      steps: {
        create: steps,
      },
      ingredients: {
        create: ingredients,
      },
    },
  });

  revalidatePath("/recipes");

  return createdRecipe;
};
