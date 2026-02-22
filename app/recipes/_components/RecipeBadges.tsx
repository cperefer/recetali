"use client";

import { fromDatabaseToHuman } from "@/utilites/parseDificulty";
import RecipeBadge from "./RecipeBadge";

type Props = {
  time: number;
  dificulty: string;
  people: number;
};

export function RecipeBadges({ time, dificulty, people }: Props) {
  return (
    <div className="w-full h-1/12 max-h-18 py-3 px-2 flex justify-center items-center gap-2 md:gap-4 border-b border-gray-400/30">
      <RecipeBadge text={`${String(time)} min`} type="time" />
      <RecipeBadge text={fromDatabaseToHuman(dificulty)} type="dificulty" />
      <RecipeBadge text={`${String(people)} personas`} type="pax" />
    </div>
  );
}
