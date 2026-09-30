import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";

import { Mail, Lock, LoaderCircle } from "lucide-react";
import { validateEmail } from "../util/validate";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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

    //login api call
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);

         toast.success("Logged in successfully!");
         
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.log("Something went wrong", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
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

      <div className="relative w-full max-w-md p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded shadow-2xl p-8  overflow-y-auto border border-white/60">
          <h3 className="text-2xl font-semibold text-center text-black mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="name@example.com"
              type="email"
            />

            <Input
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="********"
              type="password"
            />

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full rounded py-2 text-lg font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#1D4ED8] hover:to-[#0891B2] shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:shadow-[0_25px_70px_-20px_rgb(37_99_235_/_0.55)] transition-all mt-5 flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Logging In ...
                </>
              ) : (
                "LOG IN"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-1">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-[#2563EB]  text-primary underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
