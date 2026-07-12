export function RecipeFormSectionTitle({ text }: { text: string }) {
  return (
    <div className="mx-2 md:mx-3 pb-1 mt-2 border-bottom-gray">
      <h4 className="text-xl font-bold">{text}</h4>
    </div>
  );
}
