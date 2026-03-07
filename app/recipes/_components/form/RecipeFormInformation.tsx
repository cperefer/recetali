export function RecipeFormInformation() {
  return (
    <div className="px-2 border bg-white dark:bg-transparent rounded-xl min-h-67">
      <div className="mx-2 md:mx-3 pb-1 mt-2 border-bottom-gray">
        <h4 className="text-xl font-bold">Información básica</h4>
      </div>
      <div className="mt-2 px-2 md:px-3">
        <form>
          <div className="flex flex-col">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="pl-1 h-8 border border-primary rounded-md"
              name="title"
              id="title"
            />
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="">Descripción</label>
            <textarea className="pl-1 h-15 border border-gray-300 dark:border-primary rounded-md"></textarea>
          </div>
        </form>
      </div>
      <div className="px-2 md:px-3 py-5 flex justify-around">
        <div className="w-1/3">
          <label htmlFor="people">Personas</label>
          <input
            type="text"
            className="ml-1 pl-1 w-20 h-8 border border-primary rounded-md"
            name="people"
            id="people"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="time">Tiempo</label>
          <input
            type="text"
            className="ml-1 pl-1 w-20 h-8 border border-primary rounded-md "
            name="time"
            id="time"
            placeholder="min."
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="dificulty">Dificultad</label>
          <select
            className="ml-1 pl-1 w-20 h-8 border border-primary rounded-md"
            name="dificulty"
            id="dificulty"
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
