import loginImage from "../../assets/login.jpg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import googleLogo from "../../assets/googleLogo.png";
import { useLoginMutation } from "../../redux/app/services/auth/authApi";
import toast from "react-hot-toast";
import Logo from "../../components/shared/Logo";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log("res-->", res);
      if (res.success) {
        toast.success("Logged in successfully");
        // navigate("/");
      }
    } catch (err) {
      console.error(err);

      if (err.data.message === "Password does not match") {
        toast.error("Invalid credentials");
      }

      if (err.data.message === "User is not verified") {
        toast.error("Your account is not verified");
        // navigate("/verify", { state: data.email });
      }
      if (err.data.message === "You have authenticated through Google login!") {
        toast.error("You are authenticated through google!", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden md:flex w-1/2 bg-slate-100 items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-slate-700/50 z-10"></div>
        <img
          src={loginImage}
          alt="Shop illustration"
          className="object-cover h-full w-full brightness-50"
        />
      </div>

      {/* Right side - Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Logo w="32" />

          {/* Welcome Text */}
          <h1 className="text-3xl font-semibold text-slate-900 mb-3">
            Hey, Welcome Back!
          </h1>
          <p className="text-slate-600 mb-8">
            Log in to your UniMart account and start shopping
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-2 font-medium text-slate-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-12 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

            <button
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_SERVER_URL}/auth/google`,
                  "_self"
                )
              }
              type="button"
              disabled={isLoading}
              className={`cursor-pointer flex items-center justify-center w-full gap-3 px-4 py-4 rounded-xl font-medium transition-colors duration-200 border ${
                isLoading
                  ? "bg-slate-100 cursor-not-allowed text-slate-400 border-slate-200"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-300 shadow-sm hover:shadow-md"
              }`}
            >
              <img src={googleLogo} alt="google" className="w-5 h-5" />
              <span>
                {isLoading ? "Signing up..." : "Continue with Google"}
              </span>
            </button>
          </form>

          <p className="text-center text-slate-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-slate-900 font-medium hover:underline transition-all"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
