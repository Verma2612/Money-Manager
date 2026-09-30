import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import TransactionList from "../components/TransactionList.jsx";
import Modal from "../components/Modal.jsx";
import { Plus } from "lucide-react";
import TransactionForm from "../components/TransactionForm.jsx";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import Overview from "../components/Overview.jsx";
import { prepareTransactionLineChartData } from "../util/util";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //fetch income details from the api

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch income details", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income details!",
      );
    } finally {
      setLoading(false);
    }
  };

  //Fetch categories for income
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income"),
      );
      if (response.status === 200) {
        console.log("income categories", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch income categories", error);
      toast.error(error.data?.message || "Failed to fetch income categories.");
    }
  };

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;
     
    if (!name.trim()) {
      toast.error("Please enter a name!");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number grater than 0!");
      return;
    }
    if (!date) {
      toast.error("Please select a date!");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in the future!");
      return;
    }
    if (!categoryId) {
      toast.error("Please select the category!");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setEditingIncome(null);
        setOpenAddIncomeModal(false);
        toast.success("Income added succesfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log("Error adding income", error);
      toast.error(error.response?.data?.message || "Failed to add income.");
    }
  };

  const handleDeleteIncome = async (incomeId) => {
    setLoading(true);
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(incomeId));

      toast.success("Income deleted successfully!");

      setOpenDeleteAlert({
        show: false,
        data: null,
      });

      fetchIncomeDetails();
    } catch (error) {
      console.log("Error deleting income", error);
      toast.error(error.response?.data?.message || "Failed to delete income.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIncome = async (income) => {
    const { id, name, amount, date, icon, categoryId } = income;

if (!name.trim()) {
  toast.error("Please enter a name!");
  return;
}

if (!amount || isNaN(amount) || Number(amount) <= 0) {
  toast.error("Amount should be greater than 0!");
  return;
}

if (!date) {
  toast.error("Please select a date!");
  return;
}

if (!categoryId) {
  toast.error("Please select a category!");
  return;
}
  try {
    const response = await axiosConfig.put(
      API_ENDPOINTS.UPDATE_INCOME(income.id),
      income
    );

    if (response.status === 200) {
      toast.success("Income updated successfully!");

      setEditingIncome(null);
      setOpenAddIncomeModal(false);

      fetchIncomeDetails();
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update income."
    );
  }
};

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );
      let filename = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully!");
    } catch (error) {
      console.log("Error downloading the income details:", error);
      toast.error(error.response?.data?.message || "Failed to download income");
    }
  };

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if (response.status === 200) {
        toast.success("Income details emailed successfully!");
      }
    } catch (error) {
      console.log("Error emailing income details:", error);
      toast.error(error.response?.data?.message || "Failed to email income.");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/*overview for income with line chart */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold text-slate-800">
                All Incomes
              </h2>
              <button
                onClick={() => setOpenAddIncomeModal(true)}
                className="add-btn flex items-center gap-1  px-4 py-2.5 rounded
                       bg-gradient-to-r from-[#2563EB] to-[#06B6D4]
                       text-white font-medium shadow-md
                       hover:from-[#1D4ED8] hover:to-[#0891B2]
                       hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-200 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Add Income
              </button>
            </div>

            <Overview
              yAxisStep={15000}
              title="Income Overview"
              description="Track your earnings over time and analyze your income trends."
              transactions={incomeData}
              prepareChartData={prepareTransactionLineChartData}
            />
          </div>

          <TransactionList
            title="Income Sources"
            type="income"
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
            onEdit={(income) => {
              setEditingIncome(income);
              setOpenAddIncomeModal(true);
            }}
          />

          {/*Add Income Modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() =>{ setOpenAddIncomeModal(false);
  setEditingIncome(null);}}
            title={editingIncome ? "Update Income" : "Add Income"}
          >
            <TransactionForm
            initialData={editingIncome}
              onSubmit={editingIncome ? handleUpdateIncome : handleAddIncome}
              categories={categories}
              sourceLabel="Income Source"
              sourcePlaceholder="e.g., Salary, Freelance, Bonus"
              buttonText={editingIncome ? "Update Income" : "Add Income"}
            />
          </Modal>

          {/* Delete Income Modal */}
          <DeleteConfirmationModal
            isOpen={openDeleteAlert.show}
            onClose={() =>
              setOpenDeleteAlert({
                show: false,
                data: null,
              })
            }
            itemName={
              incomeData.find((income) => income.id === openDeleteAlert.data)
                ?.name
            }
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
            loading={loading}
          />
        </div>
      </div>
    </Dashboard>
  );
};
export default Income;
