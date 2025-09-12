// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuSeparator, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";
// import { LogOut, User, DollarSign, TrendingUp } from "lucide-react";
// import { toast } from "sonner";

// import 
// //data
// const generateMockExpenses = (): Expense[] => [
//   {
//     id: "1",
//     title: "Cà phê sáng",
//     amount: 45000,
//     category: "Ăn uống",
//     description: "Cà phê đá + bánh mì",
//     date: new Date(2024, 8, 10),
//   },
//   {
//     id: "2", 
//     title: "Xăng xe",
//     amount: 200000,
//     category: "Đi lại",
//     description: "Đổ xăng cho xe máy",
//     date: new Date(2024, 8, 8),
//   },
//   {
//     id: "3",
//     title: "Áo sơ mi",
//     amount: 350000,
//     category: "Mua sắm",
//     description: "Áo sơ mi công sở",
//     date: new Date(2024, 7, 25),
//   },
//   {
//     id: "4",
//     title: "Tiền điện",
//     amount: 120000,
//     category: "Hóa đơn",
//     description: "Hóa đơn điện tháng 8",
//     date: new Date(2024, 7, 15),
//   },
// ];

// const Dashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [showExpenseForm, setShowExpenseForm] = useState(false);
//   const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (!userData) {
//       navigate("/");
//       return;
//     }
//     setUser(JSON.parse(userData));

//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("expenses");
//     toast({ title: "Đã đăng xuất thành công!" });
//     navigate("/");
//   };

  
//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
//       {/* Header */}
//       <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 text-primary">
//               <DollarSign className="h-6 w-6" />
//               <TrendingUp className="h-4 w-4" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
//                 Expense Tracker
//               </h1>
//             </div>
//           </div>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage src={user.avatar} />
//                   <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
//                     {user.name?.charAt(0).toUpperCase() || 'U'}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <div className="flex items-center justify-start gap-2 p-2">
//                 <div className="flex flex-col space-y-1 leading-none">
//                   <p className="font-medium">{user.name}</p>
//                   <p className="w-[200px] truncate text-sm text-muted-foreground">
//                     {user.email}
//                   </p>
//                 </div>
//               </div>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => navigate('/profile')}>
//                 <User className="mr-2 h-4 w-4" />
//                 Thông tin cá nhân
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 Đăng xuất
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-6 space-y-6">
//         {/* Welcome Section */}
//         <div className="space-y-2">
//           <h2 className="text-2xl font-bold">Chào mừng, {user.name}!</h2>
//           <p className="text-muted-foreground">
//             Theo dõi chi tiêu và quản lý tài chính của bạn
//           </p>
//         </div>

//         {/* Summary Cards */}
//         <SummaryCards
//           currentMonth={currentMonthExpenses}
//           previousMonth={previousMonthExpenses}
//           totalAll={totalAllExpenses}
//         />

//         {/* Chart */}
//         <ExpenseChart data={chartData} />

//         {/* Expense Table */}
//         <ExpenseTable
//           expenses={expenses.slice().sort((a, b) => b.date.getTime() - a.date.getTime())}
//           onEdit={handleEditExpense}
//           onDelete={handleDeleteExpense}
//           onAdd={handleAddExpense}
//         />
//       </main>

//       {/* Expense Form Modal */}
//       <ExpenseForm
//         open={showExpenseForm}
//         onOpenChange={setShowExpenseForm}
//         expense={editingExpense}
//         onSubmit={handleSubmitExpense}
//       />
//     </div>
//   );
// };

// export default Dashboard;