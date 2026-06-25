"use client";

import { Recipe } from "@/app/generated/prisma/client";
import { RecipeFormHeader } from "./RecipeFormHeader";
import { RecipeFormInformation } from "./RecipeFormInformation";
import { RecipeFormImage } from "./RecipeFormImage";
import { RecipeFormIngredients } from "./RecipeFormIngredients";
import { RecipeFormSteps } from "./RecipeFormSteps";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  title?: string;
  description?: string;
  ingredients?: string[];
}

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  console.log(recipe);
  const methods = useForm();

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              <RecipeFormSteps />
            </div>
            <div className="w-full md:w-1/3">
              <RecipeFormIngredients />
            </div>
          </div>
        </div>
        <button>manda cosass</button>
      </form>
    </FormProvider>
  );
}
