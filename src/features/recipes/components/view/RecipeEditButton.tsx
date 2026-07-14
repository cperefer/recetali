"use client";

import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";

export function RecipeEditButton() {
  const params = useParams();
  const slug = params.slug as string;

  const handleEditRecipe = async () => {
    console.log(slug);
  };

  return (
    <button
      onClick={handleEditRecipe}
      className="cursor-pointer text-white font-medium disabled:cursor-not-allowed pr-5"
    >
      <Pencil fill="none" size={24} />
    </button>
  );
}
