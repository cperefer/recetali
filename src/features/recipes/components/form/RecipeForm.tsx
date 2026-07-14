"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createRecipe } from "@/app/actions/recipe";
import { Recipe } from "@/app/generated/prisma/client";
import { RecipeFormHeader } from "./RecipeFormHeader";
import { RecipeFormInformation } from "./RecipeFormInformation";
import { RecipeFormImage } from "./RecipeFormImage";
import { RecipeFormRepiterContainer } from "./shared/RecipeFormRepeaterContainer";
import { useRouter } from "next/navigation";

interface FormValues {
  name?: string;
  description?: string;
  pax?: string;
  dificulty?: string;
  category?: string;
  observations?: string;
  timeToDone?: string;
  steps?: string[];
  ingredients?: string[];
  image?: File;
}

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const methods = useForm();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const createdRecipe: Recipe = await createRecipe(
      data as Partial<Recipe> & { image?: File },
    );

    if (createdRecipe) {
      router.replace(`/recipes/${createdRecipe.slug}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="pb-5 w-[95%] md:w-[90%] max-w-6xl h-fit"
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
        <div>
          <button className="ml-5 mt-3 btn btn-primary bg-primary text-black rounded-md!">
            Enviar
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
