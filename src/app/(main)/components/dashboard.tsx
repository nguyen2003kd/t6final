import { useGetUser } from "@/api/endpoints/usegetUser";
import ThisMonthCard from "@/app/(main)/components/card";
import RecentExpenses from "@/app/(main)/components/Recent-Expenses";
import { Calendar } from "lucide-react";
import { CircleDollarSign } from 'lucide-react';
import { TrendingUp } from 'lucide-react';  
import { TrendingDown } from 'lucide-react';
import { useExpenseStore } from "@/stores/list-expenses";
import {totalThisMonth,total}from "@/helpers/total-expenses"
import { useEffect, useState } from "react";
export default function Dashboard() {
  const { expenses } = useExpenseStore();
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalall, setTotalAll] = useState(0);
  const [count,setCount]=useState(0);
  const [Average,setAverage]=useState(0);
  const { data, isLoading, error } = useGetUser();
  useEffect(()=>{
    if(expenses)
    {
      setTotalMonth(totalThisMonth(expenses))
      setTotalAll(total(expenses))
      setCount(expenses.length)
      setAverage(total(expenses)/expenses.length)
    }
  },[expenses])
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-foreground">{`Welcome back,${data?.data.user.name}`}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 p-4 md:grid-cols-2 ">
          <ThisMonthCard title={"This Month"} description="Current month expenses" value={totalMonth} icon={Calendar} />
          <ThisMonthCard title={"Total Expenses"} description="All time total" value={totalall} icon={CircleDollarSign} />
          <ThisMonthCard title={"Transactions"} description="Current month expenses" value={count} icon={TrendingUp} />
          <ThisMonthCard title={"Average"} description="Per transaction" value={Average} icon={TrendingDown} />
      </div>
      <RecentExpenses />
    </div>
  );
}
