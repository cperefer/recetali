import { Session } from "next-auth";
import MainTitle from "./MainTitle";
import MainMenu from "./MainMenu";
import MainSession from "./MainSession";

export default function MainHeader({ session }: { session: Session | null }) {
  return (
    <div className="px-2 pt-2 flex border-bottom-gray">
      <MainTitle />
      <MainMenu isAuthenticated={!!session} />
      <div className="ml-auto">
        <MainSession session={session} />
      </div>
    </div>
  );
}
