import { Session } from "next-auth";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { getUserInitial } from "@/lib/utils";

export default function MainSession({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <p>
        <Link className="btn btn-primary text-white!" href={"/login"}>
          Login
        </Link>
      </p>
    );
  }

  return (
    <details className="relative">
      <summary className="flex list-none items-center gap-1 cursor-pointer marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary font-semibold">
          {getUserInitial(session)}
        </span>
        <ChevronDown size={16} />
      </summary>
      <ul className="absolute right-0 z-10 mt-2 w-40 rounded-2xl border bg-background p-2 shadow-md">
        <li>
          <Link
            href="/settings"
            className="block rounded-xl px-2 py-1 hover:bg-primary/10"
          >
            Configuración
          </Link>
        </li>
        <li>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-xl px-2 py-1 text-left hover:bg-primary/10 cursor-pointer"
            >
              Logout
            </button>
          </form>
        </li>
      </ul>
    </details>
  );
}
