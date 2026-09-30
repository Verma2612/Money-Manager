import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleEmojiClick = (emoji) => {
    onSelect(emoji.imageUrl || "");
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className=" group relative flex items-center gap-4 cursor-pointer"
      >
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl rounded
                     bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#ECFEFF]
                     border border-[#2563EB]/20
                     group-hover:border-[#2563EB]/40
                     group-hover:shadow-sm
                     transition-all duration-200
                "
        >
          {icon ? (
            <img src={icon} alt="Icon" className="w-8 h-8 object-contain" />
          ) : (
            <Image size={22} className="text-[#2563EB]" />
          )}
        </div>
        <p className="text-sm font-medium text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors">
          {icon ? "Change icon" : "Pick Icon"}
        </p>
      </div>
      {isOpen && (
        <div
          className=" absolute top-16 left-40 sm:left-8 md:left-20 lg:left-40 z-50"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute  -top-3 -right-3 z-10
             flex h-7 w-7 items-center justify-center
             rounded-full
             bg-white
             border border-[#2563EB]/15
             shadow-sm
             transition-all duration-200
             hover:bg-[#EFF6FF]
             hover:border-[#2563EB]/35
             hover:shadow-md
             
             "
          >
            <X
              size={16}
              className="text-[#2563EB]/70 transition-colors duration-200 hover:text-[#2563EB]"
            />
          </button>
          <EmojiPicker
            open={isOpen}
            width={300}
            height={380}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
