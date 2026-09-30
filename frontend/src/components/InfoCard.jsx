const InfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div
      className="relative overflow-hidden rounded-sm
                 border border-[#2563EB]/10
                 bg-gradient-to-br from-white via-[#FDFEFF] to-[#F8FBFF]
                 p-6 shadow-sm
                 hover:shadow-lg
                 "
    >
      {/* Decorative Background Circle */}
      <div className="absolute -right-9 -top-7 h-28 w-28 rounded-full bg-[#2563EB]/8"></div>

      <div className="relative flex items-center gap-5">
        {/* Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl
          ${color}
          shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm text-slate-700 mb-1">
            {label}
          </p>

          <h3 className="text-md font-semibold text-slate-900">
            ₹{value}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;