import type {
  Dificulty,
  RecipeCategory,
} from "@/app/generated/prisma/client";

interface CreateRecipeInput {
  name?: string;
  description?: string;
  category?: RecipeCategory;
  observations?: string;
  timesDone?: number;
  pax?: number;
  dificulty?: Dificulty;
  timeToDone?: number;
  imageUrl?: string;
  steps?: string[];
  ingredients?: string[];
  image?: File;
}

export const buildRecipeInput = (
  overrides: CreateRecipeInput = {},
): CreateRecipeInput => ({
  name: "Tarta de manzana",
  pax: 4,
  timeToDone: 45,
  dificulty: "EASY",
  category: "POSTRES",
  ...overrides,
});
