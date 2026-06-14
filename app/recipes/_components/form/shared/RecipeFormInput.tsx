"use client";

import { useState } from "react";

export function RecipeFormInput({
  initialValue,
  onChange,
  id,
  name,
}: {
  initialValue: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [generatedId] = useState(
    () => `input-${Math.random().toString(36).slice(2, 9)}`,
  );

  const onChangeHandler = (text: string) => {
    setValue(text);
    onChange?.(text);
  };
  return (
    <input
      type="text"
      className="pl-1 mb-2 w-full h-8 border border-primary rounded-md"
      name={name ?? generatedId}
      id={id ?? generatedId}
      value={value}
      onChange={({ target }) => onChangeHandler(target.value)}
    />
  );
}
