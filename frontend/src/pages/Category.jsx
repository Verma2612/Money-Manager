import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser.jsx";
import CategoryList from "../components/CategoryList.jsx";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import axiosConfig from "../util/axiosConfig";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("Categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category Name is required.");
      return;
    }

    //check if the category already exist
    const isDuplicate = categoryData.some(
      (category) => category.name.toLowerCase() === name.trim().toLowerCase(),
    );

    if (isDuplicate) {
      toast.error("Category with this name already exists!");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 201) {
        toast.success("Category added successfully!");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Failed to add category.");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const {id,name,type,icon} = updatedCategory;
    if(!name.trim()){
      toast.error("Category Name is required!");
      return;
    }
    if(!id){
      toast.error("Category ID is missing for update!");
      return;
    }

    try{
    await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id) , {name,type,icon} );
    setOpenEditCategoryModal(false);
    setSelectedCategory(null);
    toast.success('Category updated Successfully!');
    fetchCategoryDetails();
    }catch(error){
      console.error('Error updating category:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update category");

    }
  };

  const handleDeleteCategory = async (category) => {
  try {
    await axiosConfig.delete(
      API_ENDPOINTS.DELETE_CATEGORY(category.id)
    );

    toast.success("Category deleted successfully!");
  
     setOpenDeleteModal(false);
    setSelectedCategory(null);

      fetchCategoryDetails();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to delete category."
    );
  }
};

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/*Button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold ">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="add-btn flex items-center gap-1  px-4 py-2.5 rounded
                       bg-gradient-to-r from-[#2563EB] to-[#06B6D4]
                       text-white font-medium shadow-md
                       hover:from-[#1D4ED8] hover:to-[#0891B2]
                       hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/*Category List */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
           onDeleteCategory={(category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  }}
        />

        {/*Adding category modal*/}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* Updating category modal */}
        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          title="Update Category"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Modal>

        <DeleteConfirmationModal
  isOpen={openDeleteModal}
  onClose={() => {
    setOpenDeleteModal(false);
    setSelectedCategory(null);
  }}
  itemName={selectedCategory?.name}
  onDelete={() => handleDeleteCategory(selectedCategory)}
/>
      </div>
    </Dashboard>
  );
};
export default Category;
