import { fromDatabaseToHuman } from "@/utilites/parseDificulty";
import { Heart } from "lucide-react";

type Props = {
  imageUrl: string;
  title: string;
  time: number;
  dificulty: string;
  people: number;
  isAuthenticated: boolean;
};

export function RecipeHeader({
  imageUrl,
  title,
  time,
  dificulty,
  people,
  isAuthenticated,
}: Props) {
  return (
    <div
      className={`w-full h-1/3 min-h-50 md:min-h-65 md:max-h-80   bg-cover sm:bg-auto relative`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {!isAuthenticated && (
        <button className="absolute cursor-pointer right-5 z-50 text-white py-3 font-medium">
          <Heart fill="white" size={24} />
        </button>
      )}

      <div className="`w-full h-full flex flex-col justify-end items-center bg-black/20 backdrop-opacity-60">
        <div className="text-center pb-5 text-shadow-lg text-white">
          <h1 className="text-3xl md:text-6xl">{title}</h1>
          <div className="pt-2">
            <p>
              {time} mins · {fromDatabaseToHuman(dificulty)} · {people} personas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
