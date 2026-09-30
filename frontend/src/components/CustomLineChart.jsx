import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import moment from "moment";
import CustomTooltip from "./CustomTooltip";
import { addThousandSeparator } from "../util/util";

const CustomLineChart = ({ data, yAxisStep }) => {
  const maxValue =
    data.length > 0
      ? Math.max(...data.map((item) => item.amount))
      : 100;
let maxYAxis ;
let ticks = [];

if (yAxisStep) {
  maxYAxis = Math.ceil(maxValue / yAxisStep) * yAxisStep;

  for (let i = 0; i <= maxYAxis; i += yAxisStep) {
    ticks.push(i);
  }
} else {
  maxYAxis = Math.ceil(maxValue * 1.2);

  const step = Math.max(1, Math.ceil(maxYAxis / 5));

  for (let i = 0; i <= maxYAxis; i += step) {
    ticks.push(i);
  }
}

 
  return (
    <div className="w-full h-[360px] outline-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 25,
            left: 10,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient
              id="incomeGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563EB"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#2563EB"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              moment(value).format("Do MMM")
            }
            tick={{
              fill: "#64748B",
              fontSize: 13,
            }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            ticks={ticks}
            domain={[0, maxYAxis]}
            tickFormatter={(value) =>
              addThousandSeparator(value)
            }
            tick={{
              fill: "#64748B",
              fontSize: 13,
            }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#CBD5E1",
              strokeWidth: 2,
            }}
            content={<CustomTooltip />}
          />

          <Area
            type="monotone"
            dataKey="amount"
            fill="url(#incomeGradient)"
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{
              fill: "#2563EB",
            r:3,
            }}
            activeDot={{
              r: 5,
              fill: "#2563EB",
              stroke: "#fff",
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;