import { useFormContext } from "react-hook-form";

export function RecipeFormInformation() {
  const { register } = useFormContext();
  return (
    <div className="px-2 border bg-white dark:bg-transparent rounded-xl min-h-67">
      <div className="mx-2 md:mx-3 pb-1 mt-2 border-bottom-gray">
        <h4 className="text-xl font-bold">Información básica</h4>
      </div>
      <div className="mt-2 px-2 md:px-3">
        <div className="flex flex-col">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            className="pl-1 h-8 border border-primary rounded-md"
            id="title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex flex-col mt-1">
          <label htmlFor="">Descripción</label>
          <textarea
            {...register("description", { required: true })}
            className="pl-1 h-15 border border-gray-300 dark:border-primary rounded-md"
          ></textarea>
        </div>
      </div>
      <div className="px-2 md:px-3 py-5 flex justify-around">
        <div className="w-1/3">
          <label htmlFor="people">Personas</label>
          <input
            type="text"
            className="ml-1 pl-1 w-20 h-8 border border-primary rounded-md"
            id="people"
            {...register("people", { required: true })}
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="time">Tiempo</label>
          <input
            type="text"
            className="ml-1 pl-1 w-20 h-8 border border-primary rounded-md "
            id="time"
            placeholder="min."
            {...register("time", { required: true })}
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="dificulty">Dificultad</label>
          <select
            className="ml-1 pl-1 w-20 h-8 border border-primary rounded-md"
            id="dificulty"
            {...register("dificulty", { required: true })}
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
      </div>
    </div>
  );
}
