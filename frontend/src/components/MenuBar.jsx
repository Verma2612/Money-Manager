import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef(null);
  const { user , clearUser} = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login",{ replace: true });
  }
  useEffect(() =>{
    const handleClickOutside = (event) =>{
    if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
      setShowDropdown(false);
    }
    };

    if(showDropdown){
document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  },[showDropdown]);

  

  return (
    <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* Left side -menu button and title*/}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-10" />
          <h2 className="font-bold text-lg tracking-tight text-foreground">
            Money<span className="text-gradient-brand">Manager</span>
          </h2>
        </div>
      </div>

      {/*Right side - Avatar photo */}
      <div className="relative" ref={dropDownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`h-10 w-10 rounded-full
             grid place-items-center
             cursor-pointer
             transition-all duration-300 ease-out
             ${
               showDropdown
                 ? "bg-gradient-to-br from-[#DBEAFE] to-[#CFFAFE]  ring-4 ring-[#2563EB]/60 ring-offset-2 shadow-[0_0_18px_rgba(37,99,235,0.12),0_0_32px_rgba(6,182,212,0.12)] scale-105"
                 : "bg-gradient-to-br from-[#F8FBFF] to-[#F0FDFF] border-2 border-dashed border-[#2563EB]/40 hover:from-[#EFF6FF] hover:to-[#E0F7FA] hover:border-[#2563EB]/60 hover:shadow-md hover:scale-105"
             }`}
        >
          <User className="h-5 w-5 text-[#2563EB]/90" />
        </button>

        {/*Dropdown menu*/}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded overflow-hidden shadow-lg shadow-[#2563EB]/5 border border-gray-200  z-50 animate-fade-up">
            {/*User info */}
            <div className="px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#ECFEFF] border border-[#2563EB]/40 shadow-sm">
                  <User className="w-4 h-4 text-[#2563EB]/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1E3A8A] truncate">
                    {user.fullName || ""}
                  </p>
                  <p className="text-xs text-[#2563EB]/70 truncate">
                    {user.email || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Drop options*/}
            <div></div>
            <button 
            onClick = {handleLogout}
            className="group flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 transition-all duration-200">
              <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-all duration-200" />
              <span>LogOut</span>
            </button>
          </div>
        )}
      </div>

      {/*MObile View */}
      {openSideMenu && (
       <div className="fixed top-[73px] left-0 w-64 h-[calc(100vh-73px)] bg-white shadow-xl z-20 lg:hidden">
  <Sidebar activeMenu={activeMenu} />
</div>
      )}
    </div>
  );
};
export default Menubar;
