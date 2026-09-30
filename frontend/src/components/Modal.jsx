import { X } from "lucide-react";

const Modal = ({isOpen, onClose,children, title}) =>{
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm ">
            <div className="relative p-4 w-full max-w-2xl ">
                {/*Modal Header */}
                <div className="relative bg-white rounded shadow-xl  shadow-[#2563EB]/10 border border-gray-100">
                    {/*Modal Content */}
                    <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-200 rounded-t-xl">
                        <h3 className="text-xl font-semibold text-gray-800">
                           {title}
                        </h3>

                        <button 
                        onClick={onClose}
                        type="button"
                         className="w-9 h-9 flex items-center justify-center rounded
                                   bg-gradient-to-br from-[#F8FBFF] to-[#F0FDFF]
                                   border border-[#2563EB]/10
                                   text-[#2563EB]/70
                                   transition-all duration-200
                                   hover:from-[#EFF6FF]
                                   hover:to-[#E0F7FA]
                                   hover:border-[#2563EB]/40
                                   hover:shadow-md
                                   hover:scale-105
                                   focus:outline-none
                                   focus:ring-4
                                   focus:ring-[#2563EB]/30
                                   focus:ring-offset-2">
                       <X className="w-5 h-5 "/>
                        </button>
                    </div>
                    {/* Modal Body */}
                    <div className="p-5 md:p-6 text-gray-700">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;