"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function RecipeFormInput({
  initialValue,
  id,
  fieldName,
}: {
  initialValue: string;
  id?: string;
  fieldName: string;
}) {
  const { register } = useFormContext();
  const [generatedId] = useState(
    () => `input-${Math.random().toString(36).slice(2, 9)}`,
  );

  const fieldProps = register(fieldName, { required: true });

  return (
    <input
      type="text"
      defaultValue={initialValue}
      className="pl-1 mb-2 w-full h-8 border border-primary rounded-md"
      id={id ?? generatedId}
      {...fieldProps}
    />
  );
}
