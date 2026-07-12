import { validateSession } from "@/utilites/validateSession";
import { RecipeForm } from "@recipes/_components/form/RecipeForm";

export async function generateMetadata() {
  return {
    title: "Recetali - Crear receta",
  };
}

export default async function AddRecipePage() {
  await validateSession();

  return <RecipeForm />;
}
