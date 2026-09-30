import { addThousandSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const COLORS = ["#2563EB", // Balance (Blue)
  "#EF4444", // Expense (Red)
  "#10B981", // Income (Green)
  ] ;

  const balanceData = [
    { name: "Total Balance", amount: Number(totalBalance)},
    {
    name: "Total Expenses",
    amount: Number(totalExpenses),
  },
  {
    name: "Total Income",
    amount: Number(totalIncome),
  },
  ];
  return (
    <div
      className="p-4 bg-gradient-to-br
      from-white
      via-[#FDFEFF]
      to-[#F8FBFF]
      rounded-sm
      border border-[#2563EB]/10
      shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      <CustomPieChart 
      data={balanceData} 
      label="TotalBalance"
      totalAmount={` ₹${addThousandSeparator(totalBalance)}`}
      colors={COLORS}
      showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
