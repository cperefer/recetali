import { Session } from "next-auth";
import MainTitle from "./MainTitle";
import MainMenu from "./MainMenu";

export default function MainHeader({ session }: { session: Session | null }) {
  return (
    <div>
      <MainTitle />
      <MainMenu isAuthenticated={!!session} />
    </div>
  );
}
