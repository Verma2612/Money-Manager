import { Trash2, LoaderCircle } from "lucide-react";
import Modal from "./Modal";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  itemName,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Category">
      <div className="flex flex-col items-center text-center">
        <div
          className="w-16 h-16 rounded-full
          bg-red-50
          border border-red-200
          flex items-center justify-center mb-4"
        >
          <Trash2 className="text-red-500" size={28} />
        </div>

        <h3 className="text-lg font-semibold text-slate-800">
          Delete "{itemName}"?
        </h3>

        <p className="text-sm text-slate-500 mt-2 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="px-5 py-2 rounded
            bg-red-500
            hover:bg-red-600
            text-white
            shadow-md
            transition  flex items-center justify-center gap-2
            disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
