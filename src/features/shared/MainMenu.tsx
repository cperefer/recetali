import Link from "next/link";

export default function MainMenu({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div>
      <div>Menu</div>
      {isAuthenticated && (
        <p>
          <Link href="/recipes/add">Añadir receta</Link>
        </p>
      )}
      <p>
        <Link href="/recipes/sopas_de_ajo">Sopas de ajo</Link>
      </p>
    </div>
  );
}
