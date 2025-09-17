import registerImage from "../../assets/register.jpg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../redux/app/services/user/userApi";
import toast from "react-hot-toast";
import googleLogo from "../../assets/googleLogo.png";
import Logo from "../../components/shared/Logo";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      console.log(result);
      if (result?.data?.success) {
        toast.success(
          <h1 className="text-center font-serif">
            User Account created successfully
          </h1>,
          {
            position: "bottom-right",
          }
        );
        reset({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      }

      if (result.error) {
        toast.error(
          <p className="text-center font-serif">
            {result.error?.data?.message}
          </p>,
          { position: "bottom-right" }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(<h1 className="font-serif">{`${error?.data?.message}`}</h1>, {
        position: "bottom-right",
      });
    }
  };

  const password = watch("password");

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}' '
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-10">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <Logo w="32" />

          {/* Welcome Text */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create your account
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Join UniMart and start shopping with ease
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Full name is required" })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-400 outline-none transition"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black-400 outline-none transition"
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black-400 outline-none transition pr-10"
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

            {/* Confirm Password */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black-400 outline-none transition pr-10"
                placeholder="Confirm your password"
              />
              <span
                className="absolute top-10 right-3 cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`cursor-pointer w-full ${
                isLoading ? "bg-gray-500" : "bg-black"
              } text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition`}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            <button
              onClick={handleGoogleLogin}
              type="submit"
              disabled={isGoogleLoading}
              className={`flex items-center justify-center w-full gap-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                isGoogleLoading
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              <img src={googleLogo} alt="google" className="w-5 h-5" />
              <span>
                {isGoogleLoading ? "Signing up..." : "Sign Up with Google"}
              </span>
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* Right side - Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src={registerImage}
          alt="Shopping illustration"
          className="object-cover h-full w-full brightness-50"
        />
      </div>
    </div>
  );
}
