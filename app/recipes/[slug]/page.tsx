import {
  getRecipeBySlug,
  getRecipeFavoriteForUser,
  getRecipeIngredientsById,
} from "@/lib/dal";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { RecipeView } from "@recipes/_components/view/RecipeView";

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
  const session = await auth();
  const isAuthenticated = !!session;

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const ingredients = await getRecipeIngredientsById(recipe.id);
  const isFavorite =
    isAuthenticated &&
    !!(await getRecipeFavoriteForUser(Number(session.user.id), recipe.id));

  // console.log(recipe);
  // console.log(ingredients);
  // console.log(isFavorite);

  return (
    <RecipeView
      recipe={recipe}
      ingredients={ingredients ?? []}
      isAuthenticated={!!session}
      isFavorite={isFavorite}
    />
  );
}
