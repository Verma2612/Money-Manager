import moment from "moment";
import { addThousandSeparator } from "../util/util";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div
      className="
      bg-white
      rounded-sm
      shadow-xl
      border
      border-slate-300
      p-2
      min-w-[120px] min-h-[100px]
    "
    >
      {/* Date */}

      <p className="text-xs font-bold text-slate-800">
        {moment(data.date).format("DD MMM YYYY")}
      </p>

      {/* Total */}

      <div className="mt-2 border-t pt-2">
        <p className="text-xs tracking-wide text-slate-800 font-bold">
          
         Total: <span className="text-xs font-bold text-[#2563EB]">
          ₹{addThousandSeparator(data.amount)}
          </span>
        </p>

        
      </div>

      {/* Details */}

      <div className="mt-2 border-t pt-2 max-h-48 overflow-y-auto">
        <p className="text-xs font-bold text-slate-900 mb-1">
          Details:
        </p>

        {data.details?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <span className="text-xs font-medium text-slate-900">
              {item.category}:
            </span>

            <span className="text-xs font-medium text-slate-900">
              ₹{addThousandSeparator(item.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTooltip;