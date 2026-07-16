import { auth } from "@/auth";
import MainHero from "@/features/home/components/MainHero";

export default async function Home() {
  const session = await auth();

  return (
    <div className="">
      <MainHero isAuthenticated={!!session} />
    </div>
  );
}
