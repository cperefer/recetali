import { useState } from "react";

export function RecipeFormInput({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (text: string) => {
    setValue(text);
    onChange?.(text);
  };
  return (
    <input
      type="text"
      className="pl-1 mb-2 w-full h-8 border border-primary rounded-md"
      name="title"
      id="title"
      value={value}
      onChange={({ target }) => onChangeHandler(target.value)}
    />
  );
}
