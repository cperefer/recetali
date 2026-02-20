import { getRecipeBySlug } from "@/lib/dal";
import { notFound } from "next/navigation";

export default async function SeeRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  console.log(recipe);

  return <div>page {slug}</div>;
}
