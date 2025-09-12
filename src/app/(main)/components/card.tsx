
import { LucideIcon } from "lucide-react";

export default function Card({title,description,value,icon: Icon}:{title:string,description:string,value:number,icon:LucideIcon}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold text-expense">${value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
