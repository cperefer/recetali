import { fromDatabaseToHuman } from "@/utilites/parseDificulty";
import { RecipeFavoriteButton } from "./RecipeFavoriteButton";

type Props = {
  imageUrl: string;
  title: string;
  time: number;
  dificulty: string;
  people: number;
  isAuthenticated: boolean;
  isFavorite: boolean;
};

export function RecipeHeader({
  imageUrl,
  title,
  time,
  dificulty,
  people,
  isAuthenticated,
  isFavorite,
}: Props) {
  return (
    <div
      className={`w-full h-full min-h-50 md:min-h-65 md:max-h-80   bg-cover sm:bg-auto relative`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {isAuthenticated && (
        <RecipeFavoriteButton isFavorite={isFavorite} isHeaderButton={true} />
      )}

      <div className="absolute inset-0 flex flex-col justify-end items-center bg-black/20 backdrop-opacity-60">
        <div className="text-center pb-5 text-shadow-lg text-white">
          <h1 className="text-3xl md:text-6xl">{title}</h1>
          <div className="pt-2">
            <p>
              {time} min · {fromDatabaseToHuman(dificulty)} · {people} personas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
