import { useState } from "react";
import { EyeOff,Eye,ChevronDown} from "lucide-react";

const Input = ({label, value, onChange, placeholder, type,icon,isSelect, options}) =>{

        const [showPassword, setShowPassword] = useState(false);

        const toggleShowPassword = () => {
            setShowPassword(!showPassword);
        }

    return(
        <div className="mb-4">
            <label className="text-[15px] font-medium text-slate-800 block mb-1">
{label}
            </label>

            <div className="relative">
                
                {isSelect ? (
                    <>
                    <select
                     className="w-full appearance-none rounded border border-gray-300
             py-2 px-3 pr-10
             bg-white text-[15px] text-gray-700
             focus:outline-none
             focus:border-[#2563EB]
             focus:ring-4 focus:ring-[#2563EB]/15
             transition-all"
  value={value}
                    onChange={(e) => onChange(e)}
                    >
                    
     {options.map((option) => (
                            <option key = {option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                       <ChevronDown
        size={18}
        className="pointer-events-none absolute right-3 inset-y-0 my-auto text-[#2563EB]/60"
      />

</>
                    
                ) :(
                    
                    <input 
                className ={`w-full rounded border border-gray-300 py-2 ${icon ? "pl-10" : "px-3" } pr-5 bg-white text-[15px] text-gray-700 leading-tight focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15 transition-all`}
                type={type === 'password' ? (showPassword ? 'text': 'password') :type} 
                placeholder ={placeholder} 
                value = {value}
                onChange ={(e) => onChange(e)}/>

                )}

                 {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

                
                {
                    type === 'password' && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2  cursor-pointer">
                                {showPassword ? (<Eye 
                                size={18}
                                className ="text-[#2563EB]"
                                onClick={toggleShowPassword}
                                 /> 
                                )
                                 : (
                                 <EyeOff
                                  size={18}
                                  className="text-gray-400"
                                  onClick={toggleShowPassword}
                                   />)}
                        </span>
                    )
                }
            </div>
            
        </div>
    )
}

export default Input;