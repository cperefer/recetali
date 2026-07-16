"use client";

import { useEffect, useRef, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function UserMenuDropdown({
  initial,
  children,
}: {
  initial: string;
  children: ReactNode;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeIfClickedOutside = (event: MouseEvent) => {
      if (detailsRef.current?.open && !detailsRef.current.contains(event.target as Node)) {
        detailsRef.current.open = false;
      }
    };

    document.addEventListener("click", closeIfClickedOutside);
    return () => document.removeEventListener("click", closeIfClickedOutside);
  }, []);

  return (
    <details ref={detailsRef} className="relative">
      <summary className="flex list-none items-center gap-1 cursor-pointer marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary font-semibold">
          {initial}
        </span>
        <ChevronDown size={16} />
      </summary>
      {children}
    </details>
  );
}
