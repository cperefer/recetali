import Link from "next/link";

export default function MainMenu({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/"}>Inicio</Link>
        </li>
        <li>
          <Link href={"/recipes"}>Recetas</Link>
        </li>
        <li>
          <Link href={"/"}>Categorías</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link href="/recipes/add">Mis recetas</Link>
            </li>
            <li>
              <Link href="/recipes/sopas_de_ajo">Favoritos</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
