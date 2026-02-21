import { Clock, PencilLine, Users } from "lucide-react";

const icons = {
  time: <Clock />,
  pax: <Users />,
  dificulty: <PencilLine />,
};

export default function RecipeBadge({
  text,
  type,
}: {
  text: string;
  type: "time" | "pax" | "dificulty";
}) {
  return (
    <div className="text-black dark:bg-amber-600 dark:text-white border border-gray-300 dark:border-0 text-center w-35 h-2/3 min-h-7 flex flex-col items-center justify-around rounded-md">
      <p>
        <span className="float-left pr-3">{icons[type]}</span> {text}
      </p>
    </div>
  );
}
