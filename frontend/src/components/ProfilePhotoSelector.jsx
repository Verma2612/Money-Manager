import { Upload,User,Trash } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({image, setImage})=> {

    const inputRef = useRef (null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            setImage(file);

           const preview = URL.createObjectURL(file);
           setPreviewUrl(preview);
           
        }
    }

    const handleRemoveImage = (e) =>{
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }
    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return(
        <div className="flex justify-center mb-6">
            <input type ="file"
            accept ="image/*"
            ref={inputRef}
            onChange ={handleImageChange}
            className="hidden"
            />

        {!image ? (
    <button
        type="button"
        onClick={onChooseFile}
        className="relative group"
    >
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#EFF6FF] to-[#ECFEFF] border-2 border-dashed border-[#2563EB]/30 grid place-items-center overflow-hidden">
            <User className="h-8 w-8 text-[#2563EB]/50" />
        </div>

        <div className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-md group-hover:scale-110 transition-transform">
            <Upload size={15} />
        </div>
    </button>
) : (
    <div className="relative group">
        <img
            src={previewUrl}
            alt="profile photo"
            className="h-20 w-20 rounded-full object-cover"
        />

        <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors"
        >
            <Trash size={15} />
        </button>
    </div>
)}
</div> ) }

export default ProfilePhotoSelector;



{/* {!image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full relative">
                <User className="text-purple-500 size={35}"/>
 <button 
 onClick={onChooseFile}
 className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4]  text-white shadow-md group-hover:scale-110 transition-transform" >

<Upload size={15}/>
 </button>
            </div>
        ) : (
            <div className="relative">
                <img src ={previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover"/>
                <button 
                onClick ={handleRemoveImage}
                className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1">
<Trash2 size ={15}/>
                </button>
            </div>
        )}
        </div> */}