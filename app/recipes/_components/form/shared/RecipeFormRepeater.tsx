"use client";

import { useState } from "react";
import { RecipeFormInput } from "./RecipeFormInput";

interface Props {
  items?: string[];
  text: string;
  onChange?: (items: string[]) => void;
}

export function RecipeFormRepeater({ items, text, onChange }: Props) {
  const [elements, setElements] = useState<string[]>(items ?? [""]);
  const sanitized = text.replace(/[^\w\-]+/g, "-").toLowerCase();

  const onChangeHandler = (index: number, value: string) => {
    const next = [...elements];
    next[index] = value;
    setElements(next);
    onChange?.(next);
  };

  const addElement = () => {
    setElements([...elements, ""]);
  };

  const removeElement = (index: number) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-2 md:mx-3 my-2">
      <div>
        {elements.map((item, i) => (
          <div className="flex flex-row" key={i}>
            <RecipeFormInput
              initialValue={item}
              id={`${sanitized}-${i}`}
              name={`${sanitized}-${i}`}
              onChange={(value: string) => onChangeHandler(i, value)}
            />
            <button
              onClick={() => removeElement(i)}
              className="btn w-8 h-8 border-none! text-red-600"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addElement}
        className="btn btn-primary bg-primary text-black rounded-md!"
      >
        {text}
      </button>
    </div>
  );
}
