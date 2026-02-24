"use client";

import { toggleRecipeAction } from "@/app/actions/recipe";
import { Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export function RecipeFavoriteButton({
  isFavorite,
  isHeaderButton,
}: {
  isFavorite: boolean;
  isHeaderButton: boolean;
}) {
  const params = useParams();
  const slug = params.slug as string;

  const [isPending, setIsPending] = useState(false);

  const handleToggleFavoriteRecipe = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);

    await toggleRecipeAction(slug, isFavorite);

    setIsPending(false);
  };

  return (
    <>
      {isHeaderButton ? (
        <button
          onClick={handleToggleFavoriteRecipe}
          disabled={isPending}
          className="absolute cursor-pointer right-5 z-50 text-white py-3 font-medium disabled:cursor-not-allowed"
        >
          <Heart fill={isFavorite ? "white" : "none"} size={24} />
        </button>
      ) : (
        <>
          <button
            onClick={handleToggleFavoriteRecipe}
            disabled={isPending}
            className="btn-primary btn-primary-mobile"
          >
            <Heart fill={isFavorite ? "white" : "none"} size={18} />
            {isFavorite ? "Eliminar" : "Guardar"}
          </button>
        </>
      )}
    </>
  );
}
