import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 ">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="profile image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#ECFEFF] border border-[#2563EB]/20 shadow-sm">
            <User className="w-10 h-10 text-[#2563EB]/70" />
          </div>
        )}
        <h5 className="font-semibold text-foreground leading-6">
          {user.fullName || ""}
        </h5>
      </div>
      {SIDE_BAR_DATA.map((item, index) => (
        <button
        onClick={() => navigate(item.path)}
          key={`menu_${index}`}
          className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-[5px] mb-2 transition-all duration-200 
            ${activeMenu == item.label 
                ? "gradient-brand text-white shadow-md"
                 : "text-slate-700 hover:bg-[#EFF6FF] hover:text-[#2563EB]"}`}
        >
          <item.icon size={25} />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
