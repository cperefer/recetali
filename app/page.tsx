import { auth, signOut } from "@/auth";

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
    </div>
  );
}
