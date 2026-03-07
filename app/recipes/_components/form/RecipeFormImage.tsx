export function RecipeFormImage() {
  return (
    <div className="border rounded-xl">
      <div className="mx-2 md:mx-3 pb-1 mt-2 border-bottom-gray">
        <h4 className="text-xl font-bold">Imagen</h4>
      </div>
      <div className="mx-2 md:mx-3 h-30 border-2 border-dashed border-gray-400 flex items-center justify-center bg-gray-500/70">
        <p className="text-sm">
          Arrastra una imagen aquí o haz click para seleccionar
        </p>
      </div>
      <div className="py-2 mx-2 md:mx-3 flex justify-around">
        <button className="btn btn-primary bg-primary text-black rounded-md!">
          Cambiar imagen
        </button>
        <button className="btn btn-secondary rounded-md!">Eliminar</button>
      </div>
    </div>
  );
}
