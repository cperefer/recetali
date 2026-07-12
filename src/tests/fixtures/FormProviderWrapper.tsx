"use client";

import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function FormProviderWrapper({ children }: { children: ReactNode }) {
  const methods = useForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
}
