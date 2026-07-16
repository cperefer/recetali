import { Session } from "next-auth";
import MainHeaderTitle from "./MainHeaderTitle";
import MainMenu from "./MainMenu";
import MainSession from "./MainSession";

export default function MainHeader({ session }: { session: Session | null }) {
  return (
    <div className="p-2 flex items-center border-bottom-gray">
      <MainHeaderTitle />
      <MainMenu isAuthenticated={!!session} />
      <div className="ml-auto">
        <MainSession session={session} />
      </div>
    </div>
  );
}
