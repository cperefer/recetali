import type { Dificulty, RecipeCategory } from "@/app/generated/prisma/client";

export interface RecipeSummary {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  category: RecipeCategory;
  dificulty: Dificulty;
  pax: number;
  timeToDone: number;
  timesDone: number;
}
