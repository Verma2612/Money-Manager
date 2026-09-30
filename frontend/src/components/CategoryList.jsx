import { Layers2, PencilIcon,Trash2 } from "lucide-react";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
  return (
    <div className="card bg-gradient-to-br from-white via-[#FDFEFF] to-[#F8FBFF] rounded-sm border border-[#2563EB]/10 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>

      {/*Category List */}
      {categories.length === 0 ? (
        <p className="text-[#2563EB]/60 text-center py-8">
          No categories added yet. Add some to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 rounded
                         border border-transparent
                         bg-transparent
                         transition-all duration-300
                         hover:bg-gradient-to-br
                         hover:from-white
                         hover:via-[#F8FBFF]
                         hover:to-[#F0FDFF]
                         hover:border-[#2563EB]/20
                         hover:shadow-sm"
            >
              {/* Icon/Emoji display */}
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full
                           bg-gradient-to-br
                           from-[#EFF6FF]
                            via-[#F8FAFC]
                            to-[#ECFEFF]
                           border border-[#2563EB]/20
                           shadow-sm "
              >
                {category.icon ? (
                  <span className="text-2xl">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-5 w-5"
                    />
                  </span>
                ) : (
                  <Layers2 className="text-[#2563EB]/70" size={22} />
                )}
              </div>
              {/* Category Details */}
              <div className="flex-1 flex items-center justify-between">
                {/* Category name and type*/}
                <div>
                  <p className="font-semibold text-gray-800">{category.name}</p>
                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {category.type}
                  </p>
                </div>
                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                   onClick={() => onEditCategory (category)}
                  className="
  w-8 h-8
  flex items-center justify-center
  rounded-full
  opacity-0 translate-x-1
  group-hover:opacity-100
  group-hover:translate-x-0
  text-[#2563EB]/50
  hover:bg-gradient-to-br
  hover:from-[#EFF6FF]
  hover:to-[#ECFEFF]
  hover:text-[#2563EB]
  transition-all duration-200
  cursor-pointer
"
                  >
                    <PencilIcon size={16} />
                  </button>

                  <button
    onClick={() => onDeleteCategory(category)}
    className="
      w-8 h-8
      flex items-center justify-center
      rounded-full
      opacity-0 translate-x-1
      group-hover:opacity-100
      group-hover:translate-x-0
      text-red-400
      hover:bg-red-50
      hover:text-red-600
      transition-all duration-200
      cursor-pointer
    "
  >
    <Trash2 size={16} />
  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
