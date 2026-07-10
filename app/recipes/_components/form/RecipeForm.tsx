"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createRecipe } from "@/app/actions/recipe";
import { Recipe } from "@/app/generated/prisma/client";
import { RecipeFormHeader } from "./RecipeFormHeader";
import { RecipeFormInformation } from "./RecipeFormInformation";
import { RecipeFormImage } from "./RecipeFormImage";
import { RecipeFormRepiterContainer } from "./shared/RecipeFormRepeaterContainer";

interface FormValues {
  title?: string;
  description?: string;
  ingredients?: string[];
}

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const methods = useForm();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    createRecipe(data as Partial<Recipe>);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-[90%] max-w-6xl"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="w-full h-full px-3 md:px-5 pt-5 flex flex-col relative bg-gray-100 dark:bg-transparent">
          <RecipeFormHeader />
          <div className="create-recipe-section">
            <div className="w-full md:w-2/3">
              <RecipeFormInformation />
            </div>
            <div className="w-full md:w-1/3">
              <RecipeFormImage />
            </div>
          </div>
          <div className="create-recipe-section">
            <div className="w-full md:w-2/3">
              <RecipeFormRepiterContainer
                fieldName="steps"
                textTitle="Pasos"
                textButton="Añadir paso"
              />
            </div>
            <div className="w-full md:w-1/3">
              <RecipeFormRepiterContainer
                fieldName="ingredients"
                textTitle="Ingredientes"
                textButton="Añadir ingrediente"
              />
            </div>
          </div>
        </div>
        <button>manda cosass</button>
      </form>
    </FormProvider>
  );
}
