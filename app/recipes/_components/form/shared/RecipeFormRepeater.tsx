"use client";

import { useEffect } from "react";
import { RecipeFormInput } from "./RecipeFormInput";
import { useFormContext, useFieldArray } from "react-hook-form";

interface Props {
  items?: string[];
  name: string;
  textButton: string;
}

export function RecipeFormRepeater({ items, textButton, name }: Props) {
  const { getValues, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });
  const initial = (getValues(name) as string[] | undefined) ?? items ?? [""];

  useEffect(() => {
    if ((fields?.length ?? 0) === 0 && initial.length > 0) {
      initial.forEach((val) => append(val));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sanitized = textButton
    .split(" ")[1]
    .replace(/[^\w\-]+/g, "-")
    .toLowerCase();

  const focusFirstEmptyField = () => {
    const currentValues = (getValues(name) as string[] | undefined) ?? [];
    const firstEmptyIndex = currentValues.findIndex((value) => !value?.trim());

    if (firstEmptyIndex >= 0) {
      const field = document.getElementById(`${sanitized}-${firstEmptyIndex}`);
      field?.focus();
      return true;
    }

    return false;
  };

  const addElement = () => {
    if (focusFirstEmptyField()) {
      return;
    }

    append("");
  };

  const removeElement = (index: number) => {
    remove(index);
  };

  return (
    <div className="mx-2 md:mx-3 my-2">
      <div>
        {fields.map((field, i) => (
          <div className="flex flex-row" key={field.id}>
            <RecipeFormInput
              initialValue={
                (getValues(name) as string[] | undefined)?.[i] ?? ""
              }
              id={`${sanitized}-${i}`}
              fieldName={`${name}[${i}]`}
            />
            <button
              type="button"
              onClick={() => removeElement(i)}
              className="btn w-8 h-8 border-none! text-red-600"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addElement}
        className="btn btn-primary bg-primary text-black rounded-md!"
      >
        {textButton}
      </button>
    </div>
  );
}
