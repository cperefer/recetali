import MainHeroButtons from "./MainHeroButtons";
import MainHeroTitle from "./MainHeroTitle";
import MainHeroRecipeOfTheWeek from "./MainHeroRecipeOfTheWeek";

export default function MainHero({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-6 p-2 md:grid-cols-2">
      <div>
        <MainHeroTitle />
        <MainHeroButtons isAuthenticated={isAuthenticated} />
      </div>
      <MainHeroRecipeOfTheWeek />
    </div>
  );
}
