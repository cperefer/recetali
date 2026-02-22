import { Heart, Share2 } from "lucide-react";

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
            {isAuthenticated && (
              <button className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition text-white py-3 rounded-xl font-medium">
                <Heart size={18} />
                Guardar
              </button>
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
      <div className=" hidden md:flex justify-end items-center gap-4 px-4 pb-8">
        {isAuthenticated && (
          <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-2 rounded-full font-medium">
            <span className="float-left pr-3">
              <Heart />
            </span>
            Guardar
          </button>
        )}
      </div>
    </>
  );
}
