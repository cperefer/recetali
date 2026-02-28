import { ArrowLeft } from "lucide-react";

export function RecipeGoBackButton() {
  return (
    <button className="button-with-icon border border-gray-400 dark:border-amber-500 rounded-2xl p-1 px-2">
      <ArrowLeft size={18} /> Volver
    </button>
  );
}
