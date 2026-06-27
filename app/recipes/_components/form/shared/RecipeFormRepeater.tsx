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
  const { setValue, getValues, control } = useFormContext();
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

  const onChangeHandler = (index: number, value: string) => {
    setValue(`${name}.${index}`, value, { shouldDirty: true });
  };

  const addElement = () => {
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
              name={name}
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
        {textButton}
      </button>
    </div>
  );
}
