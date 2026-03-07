export function RecipeFormInformation() {
  return (
    <div className="px-2 border bg-white dark:bg-transparent rounded-xl">
      <div className="mx-2 md:mx-3 pb-1 mt-2 border-bottom-gray">
        <h4 className="text-xl font-bold">Información básica</h4>
      </div>
      <div className="mt-2 px-2 md:px-3">
        <form>
          <div className="flex flex-col">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="h-8 border border-primary rounded-md "
              name="title"
              id="title"
            />
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="">Descripción</label>
            <textarea className="h-15 border border-gray-300 dark:border-primary rounded-md"></textarea>
          </div>
        </form>
      </div>
      <div>raciones - tiempo - dificultad</div>
    </div>
  );
}
