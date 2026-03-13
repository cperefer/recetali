"use client";
import { useState } from "react";

function RecipeFormIngredient() {
  return (
    <input
      type="text"
      className="pl-1 mb-2 w-full h-8 border border-primary rounded-md"
      name="title"
      id="title"
    />
  );
}

export function RecipeFormIngredients() {
  const [ingredients, setIngredients] = useState([""]);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-xl min-h-67 h-full">
      <div className="mx-2 md:mx-3 pb-1 mt-2 border-bottom-gray">
        <h4 className="text-xl font-bold">Ingredientes</h4>
      </div>
      <div className="mx-2 md:mx-3 my-2">
        <div>
          {ingredients.map((_, i) => (
            <div className="flex flex-row" key={i}>
              <RecipeFormIngredient key={i} />
              <button
                onClick={() => removeIngredient(i)}
                className="btn w-8 h-8 border-none! text-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addIngredient}
          className="btn btn-primary bg-primary text-black rounded-md!"
        >
          Añadir ingrediente
        </button>
      </div>
    </div>
  );
}
