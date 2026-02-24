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
            className="flex-1 md:hidden flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition text-white py-3 rounded-xl font-medium disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <Heart fill={isFavorite ? "white" : "none"} size={18} />
            {isFavorite ? "Eliminar" : "Guardar"}
          </button>
          <button
            onClick={handleToggleFavoriteRecipe}
            disabled={isPending}
            className="hidden md:block bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-2 rounded-full font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <span className="float-left pr-3">
              <Heart fill={isFavorite ? "white" : "none"} />
            </span>
            {isFavorite ? "Eliminar" : "Guardar"}
          </button>
        </>
      )}
    </>
  );
}
