import MainHeroTitle from "./MainHeroTitle";

export default function MainHero({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="p-2">
      <MainHeroTitle />
    </div>
  );
}
