import { Share2 } from "lucide-react";
import { RecipeFavoriteButton } from "./RecipeFavoriteButton";

export function RecipeButtons({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <>
      {/** BOTONES PARA MOVIL */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <div className="px-4 pb-4 pt-2 bg-transparent">
          <div className="flex gap-3 max-w-md mx-auto">
            {!isAuthenticated && (
              <RecipeFavoriteButton isFavorite={false} isHeaderButton={false} />
            )}

            <button
              className={`flex items-center justify-center gap-2 border border-neutral-300 bg-white dark:bg-black hover:bg-neutral-100 transition py-3 rounded-xl ${isAuthenticated ? "flex-1" : "ml-auto px-6"}`}
            >
              <Share2 size={18} />
              Compartir
            </button>
          </div>
        </div>
      </div>

      {/** BOTON PARA DESKTOP */}
      <div className="hidden md:flex justify-end items-center gap-4 px-4 pb-8">
        {isAuthenticated && (
          <RecipeFavoriteButton isFavorite={false} isHeaderButton={false} />
        )}
      </div>
    </>
  );
}
