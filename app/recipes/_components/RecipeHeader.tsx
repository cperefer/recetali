import { fromDatabaseToHuman } from "@/utilites/parseDificulty";

type Props = {
  imageUrl: string;
  title: string;
  time: number;
  dificulty: string;
  people: number;
};

export function RecipeHeader({
  imageUrl,
  title,
  time,
  dificulty,
  people,
}: Props) {
  return (
    <div
      className={`w-full h-1/3 min-h-50 md:min-h-65 md:max-h-80   bg-cover sm:bg-auto relative`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
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
