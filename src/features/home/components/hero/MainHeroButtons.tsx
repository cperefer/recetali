import { Compass, PenTool } from "lucide-react";
import Link from "next/link";

export default function MainHeroButtons({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="flex gap-3 pt-2">
      {isAuthenticated && (
        <p className="btn btn-primary-filled btn-with-icon">
          <PenTool />
          <Link href="/recipes/add">Crear receta</Link>
        </p>
      )}
      <p className="btn btn-secondary btn-with-icon">
        <Compass /> <Link href="/recipes">Explorar recetas</Link>
      </p>
    </div>
  );
}
