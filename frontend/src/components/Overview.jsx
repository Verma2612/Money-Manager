import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart";

const Overview = ({ title, description,transactions,prepareChartData, yAxisStep }) => {
  const [chartData, setChartData] = useState([]);

    useEffect(() => {
    setChartData(prepareChartData(transactions));
  }, [transactions, prepareChartData]);

  return (
    <div
      className="
      bg-gradient-to-br
      from-white
      via-[#FDFEFF]
      to-[#F8FBFF]
      rounded-sm
      border border-[#2563EB]/10
      shadow-sm
      p-6
      mt-5
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            {title}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {description}
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-[#EFF6FF] text-[#2563EB] text-sm font-medium">
          {transactions.length} Transactions
        </div>
      </div>

      {/* Chart */}

      <div className="mt-8 h-[360px]">
        <CustomLineChart data={chartData} yAxisStep={yAxisStep}/>
      </div>
    </div>
  );
};

export default Overview;