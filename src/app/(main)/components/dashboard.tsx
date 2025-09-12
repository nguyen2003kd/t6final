import { useGetUser } from "@/api/endpoints/usegetUser";
import ThisMonthCard from "@/app/(main)/components/card";
import RecentExpenses from "@/app/(main)/components/Recent-Expenses";
export default function Dashboard() {
  const { data, isLoading, error } = useGetUser();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-foreground">{`Welcome back,${data?.data.user.name}`}</h1>

      <div className="grid grid-cols-4 gap-3 p-4">
        {[...Array(4)].map((_, i) => (
          <ThisMonthCard key={i} />
        ))}
      </div>
      <RecentExpenses />
    </div>
  );
}
