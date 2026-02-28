"use client";

import { Step } from "@/app/generated/prisma/client";

export function RecipeSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-5 w-9/10 md:w-3/4 rounded-md shadow-md dark:shadow-xs dark:shadow-amber-600/30">
      <div className="px-2 pt-2 pb-2 pl-4 text-xl text-white bg-linear-to-r from-amber-600 to-amber-900 rounded-t-sm">
        <h2>Instrucciones</h2>
      </div>
      <div className="mt-1 pb-4 px-4 text-justify">
        <ul>
          {steps.map(({ step, order }: Step) => (
            <li key={order}>
              <span className="text-amber-600 text-2xl font-bold w-8 inline-block text-right mr-1">
                {order}.
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
