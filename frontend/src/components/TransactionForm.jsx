import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const TransactionForm = ({
  onSubmit,
  categories,
  sourceLabel,
  sourcePlaceholder,
  buttonText,
  initialData,
}) => {
  const [transaction, setTransaction] = useState(
    initialData || {
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  } );
  const [loading, setLoading] = useState(false);
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setTransaction({ ...transaction, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(transaction);
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     if (categories.length > 0 && !transaction.categoryId) {
//       setTransaction((prev) => ({ ...prev, categoryId: categories[0].id }));
//     }
//   }, [categories, transaction.categoryId]);
useEffect(() => {
  if (initialData) {
    setTransaction(initialData);
  } else {
    setTransaction({
      name: "",
      amount: "",
      date: "",
      icon: "",
      categoryId: categories.length ? categories[0].id :  "",
    });
  }
}, [initialData, categories]);
  return (
    <div>
      <EmojiPickerPopup
        icon={transaction.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={transaction.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label={sourceLabel}
        placeholder={sourcePlaceholder}
        type="text"
      />

      <Input
        label="Category"
        value={transaction.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={transaction.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number"
      />
      <Input
        value={transaction.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
                flex items-center gap-2
                px-4 py-2.5
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
                cursor-pointer
                "
        >
          {loading ? (
            <>
              
                <LoaderCircle className="w-4 h-4 animate-spin" />
    {buttonText === "Add Income" || buttonText === "Add Expense"
      ? "Adding..."
      : "Updating..."}
            </>
          ) : (
            <>{buttonText}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
