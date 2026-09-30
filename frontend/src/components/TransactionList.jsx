import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";



const TransactionList = ({title, type,transactions, onEdit, onDelete, onDownload, onEmail}) => {
    const [emailLoading, setEmailLoading] = useState(false);
const [downloadLoading, setDownloadLoading] = useState(false);
    const handleEmail = async () => {
       setEmailLoading(true);
       try{
          await onEmail();
       }finally{
        setEmailLoading(false);
       }
    }
    const handleDownload = async () =>{
      setDownloadLoading(true);
      try{
await onDownload();
       }finally{
        setDownloadLoading(false);
       }
    }
    return (
        <div className="card bg-gradient-to-br from-white via-[#FDFEFF] to-[#F8FBFF] rounded-sm border border-[#2563EB]/10 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
                <h4 className="text-lg font-semibold text-slate-800">
                    {title}
                </h4>
                    <div className="flex items-center justify-end gap-2">
                        <button
                        disabled={emailLoading}   
                        onClick={handleEmail}
                        className="
              flex items-center gap-2
              px-4 py-2
              rounded
              bg-gradient-to-br
              from-[#EFF6FF]
              to-[#ECFEFF]
              border border-[#2563EB]/15
              text-[#2563EB]
              text-sm font-medium
              shadow-sm
              hover:bg-[#EAF4FF]
hover:border-[#2563EB]/30
              hover:shadow-md
              hover:-translate-y-0.5
              transition-all duration-200
              cursor-pointer
            ">
                            {
                                emailLoading ? (
                                    <>
                                    <LoaderCircle className="w-4 h-4 animate-spin"/>
                                    Emailing...
                                    </>
                                ) : (
                                    <>
                                    <Mail size ={15} className="text-base" />
                                    Email
                                    </>
                                )
                            }
                        </button>
                         <button 
                         disabled={downloadLoading} 
                         onClick={handleDownload}
                         className=" flex items-center gap-2
              px-4 py-2
              rounded
              bg-gradient-to-r
              from-[#2563EB]
              to-[#06B6D4]
              text-white
              text-sm font-medium
              shadow-md shadow-[#2563EB]/20
              hover:from-[#1D4ED8]
              hover:to-[#0891B2]
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-200
              cursor-pointer">
                {
                                downloadLoading ? (
                                    <>
                                    <LoaderCircle className="w-4 h-4 animate-spin"/>
                                    Downlaoding...
                                    </>
                                ) : (
                                    <>
                                     <Download size ={15} className="text-base"/>
                                     Download
                                    </>
                                )
                            }
                           
                        </button>
                    </div>
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/*display the transaction */}
                {transactions?.map((transaction) => (
                    <TransactionInfoCard 
                    key ={transaction.id}
                    title={transaction.name}
                    icon={transaction.icon}
                    date={moment(transaction.date).format("Do MMM YYYY")}
                    amount={transaction.amount}
                    type={type}
                    onEdit={() => onEdit(transaction)}
                    onDelete={() => onDelete(transaction.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default TransactionList;