import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  console.log(session);
  return (
    <div className="">
      Home
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        {session && <button type="submit">Signout</button>}
      </form>
      {!session && (
        <p>
          <Link href="/login">Login</Link>
        </p>
      )}
      {session && (
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
