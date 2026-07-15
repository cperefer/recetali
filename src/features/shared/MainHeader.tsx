import { Session } from "next-auth";
import MainTitle from "./MainTitle";
import MainMenu from "./MainMenu";
import MainSession from "./MainSession";

export default function MainHeader({ session }: { session: Session | null }) {
  return (
    <div className="flex">
      <MainTitle />
      <MainMenu isAuthenticated={!!session} />
      <MainSession session={session} />
    </div>
  );
}
