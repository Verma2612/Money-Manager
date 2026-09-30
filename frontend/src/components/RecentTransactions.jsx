import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div
      className="p-6 bg-gradient-to-br
      from-white
      via-[#FDFEFF]
      to-[#F8FBFF]
      rounded-sm
      border border-[#2563EB]/10
      shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-slate-800">
          Recent Transactions
        </h4>

        <button
          className="group flex items-center gap-1 text-[#2563EB] font-medium
          hover:text-[#1D4ED8] transition-colors cursor-pointer"
          onClick={onMore}
        >
          More
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="mt-4">
        {transactions?.slice(0, 5).map(item => (

            <TransactionInfoCard
               key={`${item.type}-${item.id}`}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
              hideEditBtn
            />
        
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;