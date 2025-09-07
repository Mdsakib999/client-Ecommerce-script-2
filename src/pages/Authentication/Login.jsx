// components/Login.jsx
import logo from "../../assets/logo.png";
import loginImage from "../../assets/login.jpg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
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
          <Link to="/" className="flex flex-col relative -mb-5">
            <img className="w-32" src={logo} alt="UniMart logo" />
          </Link>

          {/* Welcome Text */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hey, Welcome Back!
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Log in to your UniMart account and start shopping
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-600">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition pr-10"
                placeholder="Enter your password"
              />
              <span
                className="absolute top-10 right-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-3 rounded-xl font-medium hover:bg-blue-500 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 font-medium cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
