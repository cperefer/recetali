"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainMenu({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();

  const activeLinkClass = "border-b pb-2 border-primary";
  const getLinkClass = (href: string) =>
    pathname === href ? activeLinkClass : "";

  return (
    <div className="hidden md:block w-2/4">
      <ul className="flex flex-row gap-5">
        <li>
          <Link href={"/"} className={getLinkClass("/")}>
            Inicio
          </Link>
        </li>
        <li>
          <Link href={"/recipes"} className={getLinkClass("/recipes")}>
            Recetas
          </Link>
        </li>
        <li>
          <Link href={"/categories"} className={getLinkClass("/categories")}>
            Categorías
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link
                href="/recipes/add"
                className={getLinkClass("/recipes/add")}
              >
                Mis recetas
              </Link>
            </li>
            <li>
              <Link
                href="/recipes/sopas_de_ajo"
                className={getLinkClass("/recipes/sopas_de_ajo")}
              >
                Favoritos
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
