import { Heart } from "lucide-react";

export function RecipeFavoriteButton({
  isFavorite,
  isHeaderButton,
}: {
  isFavorite: boolean;
  isHeaderButton: boolean;
}) {
  return (
    <>
      {isHeaderButton ? (
        <button className="absolute cursor-pointer right-5 z-50 text-white py-3 font-medium">
          <Heart fill={isFavorite ? "white" : "none"} size={24} />
        </button>
      ) : (
        <>
          <button className="flex-1 md:hidden flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition text-white py-3 rounded-xl font-medium">
            <Heart size={18} />
            Guardar
          </button>
          <button className="hidden md:block bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-2 rounded-full font-medium">
            <span className="float-left pr-3">
              <Heart />
            </span>
            Guardar
          </button>
        </>
      )}
    </>
  );
}
