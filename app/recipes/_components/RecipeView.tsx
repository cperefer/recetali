import { Recipe } from "@/app/generated/prisma/client";
import Image from "next/image";

export const RecipeView = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="flex flex-col relative">
      <div className="w-full pb-2">
        <h1 className="text-4xl text-amber-500 text-center">{recipe.name}</h1>
      </div>
      <div>
        <div className="float-left w-fit rounded-3xl mr-0 md:mr-5 mb-3 md:mb-0 overflow-hidden">
          <Image
            src={recipe.imageUrl}
            width={300}
            height={300}
            alt={recipe.name}
            layout="responsive"
            sizes="(max-width: 700px) 100vw, 300px"
            // placeholder="blur"
            // blurDataURL="/images/sample-blur.jpg"
          />
        </div>
        <div className="text-justify">{recipe.steps}</div>
      </div>
    </div>
  );
};
