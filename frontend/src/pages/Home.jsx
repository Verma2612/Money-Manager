import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import { addThousandSeparator } from "../util/util.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";


const Home = () => {
    useUser();

    const navigate = useNavigate();
    const[dashboardData, setDashboardData] = useState(null);
     const[loading, setLoading] = useState(false);

     const fetchDashboardData = async() => {
      if(loading) return;
      setLoading(true);
      try{
        const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
        if(response.status === 200){
          setDashboardData(response.data);
        }
      }catch(error){
        console.error('Something went wrong while fetching dashboard data', error);
        toast.error('Something went wrong!');

      }finally{
        setLoading(false);
      }
     }

     useEffect(() => {
      fetchDashboardData();
      return() => {};
     }, []);
  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/*Display the cards*/}
            <InfoCard 
             icon={WalletCards}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-gradient-to-r from-[#2563EB] to-[#06B6D4]"
            />
            <InfoCard 
             icon={Wallet}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0 )}
            color="bg-gradient-to-r from-emerald-500 to-green-600"
            />
            <InfoCard 
            icon={Coins}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-gradient-to-r from-rose-500 to-red-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/*Recent transactions */}
            <RecentTransactions
            transactions = {dashboardData?.recentTransactions}
            onMore={() => navigate("/expense")}
            
            />
            {/*finance overview chart */}
            <FinanceOverview 
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
            />
            {/*Expense transactions */}
            <Transactions 
            transactions = {dashboardData?.recent5Expenses || []}
            onMore={() =>navigate("/expense")}
            type="expenses"
            title="Recent Expenses"
            />
            {/*Income transactions */}
            <Transactions 
            transactions = {dashboardData?.recent5Incomes || []}
            onMore={() =>navigate("/income")}
            type="income"
            title="Recent Incomes"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};
export default Home;
