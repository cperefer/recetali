import { validateSession } from "@/lib/validateSession";
import { RecipeForm } from "@recipes/form/RecipeForm";

export async function generateMetadata() {
  return {
    title: "Recetali - Crear receta",
  };
}

export default async function AddRecipePage() {
  await validateSession();

  return <RecipeForm />;
}
