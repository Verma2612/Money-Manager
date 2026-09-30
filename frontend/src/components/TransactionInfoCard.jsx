import { Pencil, IndianRupee ,Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { addThousandSeparator } from "../util/util";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  onEdit,
  hideEditBtn,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-rose-50 text-rose-700 border border-rose-200";

  return (
    <div
      className="group relative flex items-center gap-4 mb-3
p-3
rounded
border border-transparent
bg-transparent
transition-all duration-300
hover:bg-gradient-to-br
hover:from-white
hover:via-[#F8FBFF]
hover:to-[#F0FDFF]
hover:border-[#2563EB]/20
hover:shadow-sm"
    >
      <div
        className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gradient-to-br
from-[#EFF6FF]
via-[#F8FAFC]
to-[#ECFEFF]
border border-[#2563EB]/20
shadow-sm rounded-full"
      >
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <IndianRupee size={22} className="text-[#2563EB]/90" />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>

          <p className="text-xs text-slate-500 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
 {!hideEditBtn && (
            <button
    onClick={onEdit}
    className="
      w-8 h-8
      flex items-center justify-center
      rounded-full
      opacity-0
      group-hover:opacity-100
      text-blue-500
      hover:bg-blue-50
      hover:text-blue-700
      transition-all duration-200
      cursor-pointer"
  >
    <Pencil size={18} />
  </button>
 )}
            {!hideDeleteBtn && (
                <button 
                onClick={onDelete}
                className="w-8 h-8
      flex items-center justify-center
      rounded-full
      opacity-0
      group-hover:opacity-100
      text-red-400
      hover:bg-red-50
      hover:text-red-600
      transition-all duration-200
      cursor-pointer">
             <Trash2  size={18} />
          </button>
            )}

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${getAmountStyles()}`}>
                <h6 className="text-xs font-medium">
                    {type === 'income' ? '+' : '-'} ₹{addThousandSeparator(amount)}
                </h6>
                {type == 'income' ? (
                    <TrendingUp size={15}/>
                ) : (
                    <TrendingDown size ={15}/>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
