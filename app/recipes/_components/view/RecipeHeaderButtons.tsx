import { RecipeGoBackButton } from "../shared/RecipeGoBackButton";
import { RecipeEditButton } from "./RecipeEditButton";
import { RecipeFavoriteButton } from "./RecipeFavoriteButton";

interface Props {
  isAuthenticated: boolean;
  isFavorite: boolean;
}

export default function RecipeHeaderButtons({
  isAuthenticated,
  isFavorite,
}: Props) {
  return (
    <div className="w-full py-3 absolute cursor-pointer z-50">
      <div className="w-fit absolute left-5">
        <RecipeGoBackButton />
      </div>
      {isAuthenticated && (
        <div className="absolute right-5">
          <div>
            <RecipeEditButton />
            <RecipeFavoriteButton
              isFavorite={isFavorite}
              isHeaderButton={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
