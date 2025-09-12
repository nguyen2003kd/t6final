import { Calendar } from "lucide-react";

export default function ThisMonthCard() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">This Month</h3>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold text-expense">$1,231.00</div>
        <p className="text-xs text-muted-foreground">Current month expenses</p>
      </div>
    </div>
  );
}
