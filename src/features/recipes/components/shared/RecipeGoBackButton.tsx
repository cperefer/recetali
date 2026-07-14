"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecipeGoBackButton() {
  const router = useRouter();

  return (
    <button className="btn btn-primary btn-with-icon" onClick={router.back}>
      <ArrowLeft size={18} /> Volver
    </button>
  );
}
