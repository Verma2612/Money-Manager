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

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //fetch expense details from the api

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense details", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch expense details!",
      );
    } finally {
      setLoading(false);
    }
  };

  //Fetch categories for income
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense"),
      );
      if (response.status === 200) {
        console.log("expense categories", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch expense categories", error);
      toast.error(error.data?.message || "Failed to fetch expense categories.");
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setEditingExpense(null);
        setOpenAddExpenseModal(false);
        toast.success("Expense added succesfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.log("Error adding expense", error);
      toast.error(error.response?.data?.message || "Failed to add expense.");
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    setLoading(true);
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(expenseId));

      toast.success("Expense deleted successfully!");

      setOpenDeleteAlert({
        show: false,
        data: null,
      });

      fetchExpenseDetails();
    } catch (error) {
      console.log("Error deleting expense", error);
      toast.error(error.response?.data?.message || "Failed to delete expense.");
    } finally {
      setLoading(false);
    }
  };
   
  const handleUpdateExpense = async (expense) => {
  const { id, name, amount, date, icon, categoryId } = expense;

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
      API_ENDPOINTS.UPDATE_EXPENSE(id),
      {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      }
    );

    if (response.status === 200) {
      toast.success("Expense updated successfully!");

      setEditingExpense(null);
      setOpenAddExpenseModal(false);

      fetchExpenseDetails();
    }
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Failed to update expense."
    );
  }
};

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );
      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully!");
    } catch (error) {
      console.log("Error downloading the expense details:", error);
      toast.error(
        error.response?.data?.message || "Failed to download expense",
      );
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Expense details emailed successfully!");
      }
    } catch (error) {
      console.log("Error emailing expense details:", error);
      toast.error(error.response?.data?.message || "Failed to email expense.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/*overview for income with line chart */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold text-slate-800">
                All Expenses
              </h2>
              <button
                onClick={() => setOpenAddExpenseModal(true)}
                className="flex items-center gap-1  px-4 py-2.5 rounded
                       bg-gradient-to-r from-[#2563EB] to-[#06B6D4]
                       text-white font-medium shadow-md
                       hover:from-[#1D4ED8] hover:to-[#0891B2]
                       hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-200 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Add Expense
              </button>
            </div>

            <Overview
              yAxisStep={null}
              title="Expense Overview"
              description="Track your spending trends over time and analyze where your money goes."
              transactions={expenseData}
              prepareChartData={prepareTransactionLineChartData}
            />
          </div>

          <TransactionList
            title="Expense Sources"
            type="expense"
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
            onEdit={(expense) => {
              setEditingExpense(expense);
              setOpenAddExpenseModal(true);
            }}
          />

          {/*Add Income Modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => {setOpenAddExpenseModal(false);
              setEditingExpense(null);
            }}
              title={editingExpense ? "Update Expense" : "Add Expense"} 
          >
            <TransactionForm
            initialData={editingExpense}
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              categories={categories}
              sourceLabel="Expenses"
              sourcePlaceholder="e.g., Transportation, Daily Life, Electricity"
               buttonText={editingExpense ? "Update Expense" : "Add Expense"}
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
              expenseData.find((expense) => expense.id === openDeleteAlert.data)
                ?.name
            }
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
            loading={loading}
          />
        </div>
      </div>
    </Dashboard>
  );
};
export default Expense;
