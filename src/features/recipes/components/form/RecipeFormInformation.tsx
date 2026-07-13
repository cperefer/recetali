import { useFormContext } from "react-hook-form";
import { RecipeFormInput } from "./shared/RecipeFormInput";
import { RecipeFormSectionTitle } from "./shared/RecipeFormSectionTitle";

export function RecipeFormInformation() {
  const { register } = useFormContext();
  return (
    <div className="px-2 border bg-white dark:bg-transparent rounded-xl min-h-67">
      <RecipeFormSectionTitle text="Información básica" />
      <div className="mt-2 px-2 md:px-3">
        <div className="flex flex-col">
          <label htmlFor="name">Título</label>
          <RecipeFormInput fieldName="name" />
        </div>
        <div className="flex flex-col mt-1">
          <label htmlFor="">Descripción</label>
          <textarea
            {...register("description", { required: true })}
            className="pl-1 h-15 border border-gray-300 dark:border-primary rounded-md"
          ></textarea>
        </div>
      </div>
      <div className="px-2 md:px-3 py-5 grid grid-cols-2 gap-x-6 gap-y-3">
        <div className="flex flex-col">
          <label className="pr-1" htmlFor="people">
            Personas
          </label>
          <RecipeFormInput fieldName="pax" width="full" placeholder="2" />
        </div>
        <div className="flex flex-col">
          <label className="pr-1" htmlFor="time">
            Tiempo
          </label>
          <RecipeFormInput
            fieldName="timeToDone"
            width="full"
            placeholder="min"
          />
        </div>
        <div className="flex flex-col">
          <label className="pr-1" htmlFor="dificulty">
            Dificultad
          </label>
          <select
            className="w-full h-8 border border-primary rounded-md"
            id="dificulty"
            {...register("dificulty", {
              required: true,
              setValueAs(value: string) {
                return value.toUpperCase();
              },
            })}
          >
            <option className="bg-black" value="easy">
              Fácil
            </option>
            <option className="bg-black" value="medium">
              Medio
            </option>
            <option className="bg-black" value="hard">
              Difícil
            </option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="pr-1" htmlFor="category">
            Categoría
          </label>
          <select
            className="w-full h-8 border border-primary rounded-md"
            id="category"
            {...register("category", {
              required: true,
              setValueAs(value: string) {
                return value.toUpperCase();
              },
            })}
          >
            <option className="bg-black" value="entrantes">
              Entrantes
            </option>
            <option className="bg-black" value="ensaladas">
              Ensaladas
            </option>
            <option className="bg-black" value="sopas_y_cremas">
              Sopas y cremas
            </option>
            <option className="bg-black" value="verduras">
              Verduras
            </option>
            <option className="bg-black" value="legumbres">
              Legumbres
            </option>
            <option className="bg-black" value="carnes">
              Carnes
            </option>
            <option className="bg-black" value="pescados_y_mariscos">
              Pescados y mariscos
            </option>
            <option className="bg-black" value="arroces">
              Arroces
            </option>
            <option className="bg-black" value="huevos">
              Huevos
            </option>
            <option className="bg-black" value="pastas">
              Pastas
            </option>
            <option className="bg-black" value="postres">
              Postres
            </option>
            <option className="bg-black" value="otro">
              Otro
            </option>
          </select>
        </div>
      </div>
      <div className="px-2 md:px-3 pb-3">
        <div className="flex flex-col">
          <label htmlFor="observations">Observaciones</label>
          <textarea
            {...register("observations")}
            className="pl-1 h-15 border border-gray-300 dark:border-primary rounded-md"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
