import Link from "next/link";
import { Clock, PencilLine, Users } from "lucide-react";
import { fromDatabaseToHuman } from "@/lib/parseDificulty";
import type { RecipeSummary } from "@/features/recipes/types/recipe";

interface RecipeOfTheWeekCardProps {
  recipe: RecipeSummary;
  label?: string;
}

export default function RecipeOfTheWeekCard({
  recipe,
  label = "Receta de la semana",
}: RecipeOfTheWeekCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-gray-300 dark:border-0"
    >
      <div
        className="h-48 w-full bg-gray-200 bg-cover bg-center transition-transform duration-300 group-hover:scale-105 md:h-56"
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/20 to-transparent p-4 text-white">
        <span className="btn btn-primary-filled w-fit cursor-default text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
        <p className="mt-2 text-lg font-bold text-shadow-lg md:text-xl">
          {recipe.name}
        </p>
        <div className="mt-1 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <Clock size={16} /> {recipe.timeToDone} min
          </span>
          <span className="flex items-center gap-1">
            <PencilLine size={16} /> {fromDatabaseToHuman(recipe.dificulty)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={16} /> {recipe.pax} personas
          </span>
        </div>
      </div>
    </Link>
  );
}
