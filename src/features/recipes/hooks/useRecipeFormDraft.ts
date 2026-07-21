"use client";

import { useEffect } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

const DRAFT_STORAGE_KEY = "recipe-form-draft";

export function useRecipeFormDraft<TFieldValues extends FieldValues>(
  methods: UseFormReturn<TFieldValues>,
) {
  const { watch, reset } = methods;

  useEffect(() => {
    const storedDraft = sessionStorage.getItem(DRAFT_STORAGE_KEY);

    if (!storedDraft) {
      return;
    }

    try {
      reset(JSON.parse(storedDraft));
    } catch {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    }
    // Restore only once, when the form mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = watch((values) => {
      const { image: _image, ...draftValues } = values as FieldValues;
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftValues));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  return { clearDraft };
}
