import { Session } from "next-auth";
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { getUserInitial } from "@/lib/utils";
import UserMenuDropdown from "./UserMenuDropdown";

export default function MainSession({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <div className="pt-1">
        <p>
          <Link className="btn btn-primary text-white!" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <UserMenuDropdown initial={getUserInitial(session)}>
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
    </UserMenuDropdown>
  );
}
