import { getRecipeBySlug } from "@/lib/dal";
import { notFound } from "next/navigation";
import { RecipeView } from "../_components/RecipeView";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return { title: "Receta no encontrada" };
  }

  return {
    title: `Recetali - ${recipe?.name}`,
  };
}

export default async function SeeRecipePage({ params }: Params) {
  const { slug } = await params;

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  // console.log(recipe);

  return <RecipeView recipe={recipe} />;
}
