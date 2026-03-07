import { RecipeGoBackButton } from "../shared/RecipeGoBackButton";

export function RecipeFormHeader() {
  return (
    <div>
      <div>
        <RecipeGoBackButton />
      </div>
      {/* En movil está bien, pero en desktop flotar el botón a la izquierda con flex para que
      esté a la altura del header */}
      <div className="text-center">
        <h1>Crear una receta</h1>
        <h2>Comparte una receta para no olvidarla!</h2>
      </div>
    </div>
  );
}
