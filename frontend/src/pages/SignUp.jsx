import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";

import { User, Mail, Lock, LoaderCircle } from "lucide-react";
import { validateEmail } from "../util/validate";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setIsLoading(true);

    if (!fullName.trim()) {
      setError("Please enter your fullname. ");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter valid email address. ");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password. ");
      setIsLoading(false);
      return;
    }

    setError("");

    //signup api call
    try {

    //upload image if presenet
    if(profilePhoto){
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";

    }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });
      if (response.status === 201) {
        toast.success("Profile Created successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Something went wrong", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const strength = useMemo(() => {
    let s = 0;

    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;

    return s;
  }, [password]);

  const strengthLabel = ["Too Weak", "Weak", "Fair", "Good", "Strong"][
    strength
  ];

  const strengthColor = [
    "bg-gray-300",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-green-500",
  ][strength];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#ECFEFF] flex items-center justify-center px-4 py-10">
      {/* Blue Glow */}
      <div className="absolute top-10 -left-20 h-64 w-64 rounded-full bg-[#2563EB]/35 blur-2xl animate-float"></div>

      {/* Cyan Glow */}
      <div
        className="absolute bottom-0 -right-16 h-72 w-72 rounded-full bg-[#06B6D4]/35 blur-2xl animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Green Glow */}
      <div
        className="absolute top-1/3 right-1/4 h-44 w-44 rounded-full bg-[#22C55E]/25 blur-xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="relative w-full max-w-lg p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded shadow-2xl p-8  overflow-y-auto border border-white/60">
          <h3 className="text-2xl font-semibold text-center text-black mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spendings by joining with us.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <ProfilePhotoSelector
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                icon={<User size={18} />}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />

              <Input
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="name@example.com"
                type="email"
              />

              <div className="col-span-2">
                <Input
                  icon={<Lock size={18} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="********"
                  type="password"
                />

                <div className="mt-3 ">
                  {password && (
                    <>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded ${
                              i < strength ? strengthColor : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs mt-2 text-gray-600">
                        Password Strength:
                        <span className="font-semibold ml-1">
                          {strengthLabel}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full rounded py-2 text-lg font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#1D4ED8] hover:to-[#0891B2] shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:shadow-[0_25px_70px_-20px_rgb(37_99_235_/_0.55)] transition-all mt-2 flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Signing Up...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-1">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-[#2563EB]  text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
