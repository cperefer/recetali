"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  initialValue?: string;
  id?: string;
  fieldName: string;
  placeholder?: string;
  width?: string;
}
export function RecipeFormInput({
  initialValue,
  id,
  fieldName,
  placeholder,
  width = "full",
}: Props) {
  const { register } = useFormContext();
  const [generatedId] = useState(
    () => `input-${Math.random().toString(36).slice(2, 9)}`,
  );

  const fieldProps = register(fieldName, { required: true });

  return (
    <input
      type="text"
      defaultValue={initialValue}
      className={`w-${width} mb-2 pl-1 h-8 border border-primary rounded-md`}
      id={id ?? generatedId}
      placeholder={placeholder}
      {...fieldProps}
    />
  );
}
