"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { RecipeFormSectionTitle } from "./shared/RecipeFormSectionTitle";

export function RecipeFormImage() {
  const { setValue } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const setImage = (file: File) => {
    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return URL.createObjectURL(file);
    });
    setValue("image", file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setValue("image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border bg-white dark:bg-transparent rounded-xl min-h-67 h-full">
      <RecipeFormSectionTitle text="Imagen" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        id="recipe-image-input"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="Arrastra una imagen aquí o haz click para seleccionar"
        onClick={openFileDialog}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFileDialog();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="group mx-2 md:mx-3 mt-2 h-[60%] min-h-40 rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 dark:bg-primary/10 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:scale-[1.02] dark:hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Vista previa de la receta"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <p className="text-sm text-center px-2 text-gray-600 dark:text-gray-300">
            Arrastra una imagen aquí o haz click para seleccionar
          </p>
        )}
      </div>
      <div className="py-2 mx-2 md:mx-3 flex justify-around">
        <button
          type="button"
          onClick={openFileDialog}
          className="btn btn-primary bg-primary text-black rounded-md! transition-transform duration-150 hover:opacity-90 hover:scale-105 active:scale-95"
        >
          Cambiar imagen
        </button>
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="btn btn-secondary rounded-md! transition-transform duration-150 hover:opacity-90 hover:scale-105 active:scale-95"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
