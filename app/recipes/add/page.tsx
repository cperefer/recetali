import { validateSession } from "@/utilites/validateSession";
import { RecipeForm } from "@recipes/_components/form/RecipeForm";

export default async function AddRecipePage() {
  await validateSession();

  return <RecipeForm />;
}
