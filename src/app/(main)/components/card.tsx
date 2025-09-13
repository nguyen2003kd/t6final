import { LucideIcon } from "lucide-react";

export default function Card({
  title,
  description,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  value: number;
  icon: LucideIcon;
  color: string;
}) {
  const isTailwindClass = color.startsWith("text-");

  const textColorClass = isTailwindClass ? color : "";
  const textColorStyle = !isTailwindClass ? { color } : undefined;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3
          className={`tracking-tight text-sm font-medium ${textColorClass}`}
          style={textColorStyle}
        >
          {title}
        </h3>
        <Icon className={`h-4 w-4 ${textColorClass}`} style={textColorStyle} />
      </div>
      <div className="p-6 pt-0">
        <div
          className={`text-2xl font-bold ${textColorClass}`}
          style={textColorStyle}
        >
          ${value}
        </div>
        <p className={`text-xs ${textColorClass}`} style={textColorStyle}>
          {description}
        </p>
      </div>
    </div>
  );
}
