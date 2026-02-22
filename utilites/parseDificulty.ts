const databaseToHuman: Record<string, string> = {
  EASY: "Fácil",
  MEDIUM: "Medio",
  HARD: "Difícil",
};

const humanToDatabase: Record<string, string> = Object.fromEntries(
  Object.entries(databaseToHuman).map(([key, value]) => [value, key]),
);

export const fromDatabaseToHuman = (input: string) => databaseToHuman[input];
export const fromHumanToDatabase = (input: string) => humanToDatabase[input];
