import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser.jsx";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-hot-toast";
import moment from "moment";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";


const Filter = () => {
  useUser();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      console.log('transactions:', response.data);
      setTransactions(response.data);
    }catch(error){
        console.error('Failed to fetch transactions: ', error);
        toast.error(error.message || "Failed to fecth transactions. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-slate-800">
            Filter Transactions
          </h2>
        </div>

        <div
          className=" p-4 mb-4 bg-gradient-to-br
      from-white
      via-[#FDFEFF]
      to-[#F8FBFF]
      rounded-sm
      border border-[#2563EB]/10
      shadow-sm
      "
        >
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-slate-800">
              Select the filters
            </h5>
          </div>

          <form className="grid grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols gap-4">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium mb-1 text-slate-700 mb-2"
              >
                Type
              </label>
              <select
                value={type}
                id="type"
                className="w-full h-11 border  border-gray-300 rounded px-2 py-2 bg-white
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#2563EB]/15
                  focus:border-[#2563EB]
                  transition-all"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="startdate"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                Start Date
              </label>
              <input
                value={startDate}
                id="startdate"
                type="date"
                className=" h-11 w-full border border-gray-300 rounded px-2 py-2  focus:outline-none
                  focus:ring-4
                  focus:ring-[#2563EB]/15
                  focus:border-[#2563EB] "
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="enddate"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                End Date
              </label>
              <input
                value={endDate}
                id="enddate"
                type="date"
                className="h-11  w-full border border-gray-300 rounded px-2 py-2 focus:outline-none
                  focus:ring-4
                  focus:ring-[#2563EB]/15
                  focus:border-[#2563EB]"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="sortField"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                Sort Field
              </label>
              <select
                value={sortField}
                id="sortField"
                className="w-full h-11 border  border-gray-300 rounded px-2 py-2 bg-white
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#2563EB]/15
                  focus:border-[#2563EB]
                  transition-all"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortorder"
                className="block text-sm font-medium mb-2 text-slate-700"
              >
                Sort Order
              </label>
              <select
                value={sortOrder}
                id="sortorder"
                className="w-full h-11  border border-gray-300 rounded px-2 py-2 bg-white
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#2563EB]/15
                  focus:border-[#2563EB]"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="sm:col-span-1 md:col-span-1">
              <label
                htmlFor="keyword"
                className="block text-sm font-medium text-slate-700 mb-2 "
              >
                Search
              </label>
              <div className="relative">
                <input
                  value={keyword}
                  id="keyword"
                  type="text"
                  placeholder="Search..."
                  className="h-11  w-full border border-gray-300 rounded px-2 py-2
                             focus:outline-none
                    focus:ring-4
                    focus:ring-[#2563EB]/15
                    focus:border-[#2563EB]"
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 -translate-y-1/2
                   h-9 w-9
                    flex items-center justify-center
               text-slate-500
               hover:text-[#2563EB]
               transition-all duration-200
                    cursor-pointer"
                >
                  <Search className="w-5 h-5 stroke-[3]  transition-transform duration-200 hover:scale-125" />
                </button>
              </div>

            </div>
          </form>
        </div>
        <div className="p-4 bg-gradient-to-br
      from-white
      via-[#FDFEFF]
      to-[#F8FBFF]
      rounded-sm
      border border-[#2563EB]/10
      shadow-sm">
          <div className="flex justify-between items-center">
          <h5 className="text-lg font-semibold text-slate-800">
            Transactions
          </h5>
        </div>
        {transactions.length === 0  && !loading ? (
          <p className="text-gray-500 mb-4">Select the filters and click apply to filter the transactions.</p>
        ) : ""}
        {loading ? (
           <p className="text-gray-500">Loading Transactions</p>
        ) :("")}
        { transactions.map((transaction) => (
          <TransactionInfoCard
           key={transaction.id}
           title={transaction.name}
           icon={transaction.icon}
           date={moment(transaction.date).format('Do MMM YYYY')}
           amount={transaction.amount}
           type={type}
           hideDeleteBtn

          />
        ))
        }
      </div>
      </div>
    </Dashboard>
  );
};
export default Filter;
