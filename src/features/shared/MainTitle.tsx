import { ChefHat } from "lucide-react";

export default function MainTitle() {
  return (
    <div className="w-2/3 md:w-1/4 h-10 flex flex-row">
      <div className="h-4/5 max-h-12 min-h-7 pr-2">
        <p>
          <span>
            <ChefHat size={30} />
          </span>
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold">
          Recet<span className="text-primary">Ali</span>
        </p>
      </div>
    </div>
  );
}
