import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data,
  colors,
  label,
  totalAmount,
  showTextAnchor = false,
}) => {
  return (
    <div className="w-full h-[400px] flex ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="47%"
            innerRadius={85}
            outerRadius={120}
            paddingAngle={2}
            stroke="white"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-500 text-sm font-medium"
              >
                {label}
              </text>

              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-800 text-[24px] font-bold"
              >
                {totalAmount}
              </text>
            </>
          )}

          <Tooltip
            formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`]}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              paddingTop: 20,
              fontSize: 14,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;